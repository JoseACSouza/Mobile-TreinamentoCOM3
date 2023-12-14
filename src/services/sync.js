import { hasUnsyncedChanges, synchronize } from '@nozbe/watermelondb/sync';
import { Q } from '@nozbe/watermelondb';
import { database } from '../database';
import { getAllCommentaries, getAllPosts, pushData } from './api';

export const sync = async(token)=> {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      try {
        // const response = await fetch(`http://10.0.2.2:8000/api/v1/sync`, {
        //   method:'GET',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   }});
        // //console.log(await response.json());
        // const res = await response.json();
        // //console.log('pull', res);
        // const { changes, timestamp } = res;
        // //console.log('pull', changes, timestamp);
        return { changes:[], timestamp:30000001 }  
      } catch (error) {
        //console.log('pull', error.message);
      }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      // console.log(await hasUnsyncedChanges({database}));
    //   console.log('posts created', changes.posts.created.filter(item=> !item.synced));
    //   console.log('commentaries created', changes.commentaries.created.filter(item=> !item.synced));
    //   console.log('untrated posts deleted', changes.posts.deleted.filter((item1) =>
    //     changes.posts.created.filter(item=> !item.synced).every((item2) => item1 !== item2.id)
    // ));
    //   console.log('push', changes.posts.updated);
      const unsyncedPostsCreated = changes.posts.created.filter(item=>!item.synced);
      const unsyncedPostsDeleted = changes.posts.deleted.filter(item=>!item.synced);
      const unsyncedCommentariesCreated = changes.commentaries.created.filter(item=>!item.synced);
      const unsyncedCommentariesDeleted = changes.commentaries.deleted.filter(item=>!item.synced);
      const changesToSync = {
          posts: {
            created: unsyncedPostsCreated.filter((item1) =>
              unsyncedPostsDeleted.every((item2) => item1.id !== item2)),
            deleted: unsyncedPostsDeleted.filter((item1) =>
              unsyncedPostsCreated.every((item2) => item1 !== item2.id)),
            updated: changes.posts.updated
        },
          commentaries: {
            created: unsyncedCommentariesCreated.filter((item1) =>
            unsyncedCommentariesDeleted.filter(item=> !item.synced).every((item2) => item1.id !== item2)),
            deleted: unsyncedCommentariesDeleted.filter((item1) =>
            unsyncedCommentariesCreated.every((item2) => item1 !== item2.id)),
            updated: changes.commentaries.updated
        },
      };
      console.log('post created', changesToSync.posts.created);
      console.log('post deleted', changesToSync.posts.deleted);
      console.log('commentary deleted', changesToSync.commentaries.created);
      console.log('commentary deleted', changesToSync.commentaries.deleted);
      try {
        await pushData(token, changesToSync);
      } catch (error) {
        
      } finally {
        await deleteSyncedData();
      }
    },
    migrationsEnabledAtVersion: 2,
  })
}

const deleteData = async ()=>{
  database.write(async ()=>{
    const deletePosts = await database.collections.get('posts').query().fetch();

    const postsTobeDeleted = deletePosts.map(items => {
      return items.prepareDestroyPermanently();
    });

    const deleteCommentaries = await database.collections.get('commentaries').query().fetch();

    const commentariesTobeDeleted = deleteCommentaries.map(items => {
      return items.prepareDestroyPermanently();
    });
  

    const itemsTobeDeleted = [...postsTobeDeleted, ...commentariesTobeDeleted];
    database.batch(...itemsTobeDeleted);
  });
};

const deleteSyncedData = async ()=>{
  database.write(async ()=>{
    const deletePosts = await database.collections.get('posts').query(Q.where('synced', false)).fetch();
    const deleteCommentaries = await database.collections.get('commentaries').query(Q.where('synced', false)).fetch();

    //console.log('delete synced', deletePosts.length);
  
    const postsTobeDeleted = deletePosts.map(items => {
      return items.prepareDestroyPermanently();
    });

    const commentariesTobeDeleted = deleteCommentaries.map(items => {
      return items.prepareDestroyPermanently();
    });
    const itemsTobeDeleted = [...postsTobeDeleted, commentariesTobeDeleted];
    database.batch(...itemsTobeDeleted);
  });

};

export const localSync = async (token) => {
try {
  const p = (await getAllPosts(token)).data;
  const c = (await getAllCommentaries(token)).data;
  await deleteData();
  // //console.log(c);
  await database.write(async () => {

    const syncPosts = p && p.map(apiPost =>
      database.collections
        .get('posts')
        .prepareCreate(post => {
          post._raw.id = `${apiPost.id}`,
          post.subject = apiPost.subject,
          post.content = apiPost.content,
          post.categories = apiPost.categories.map((item)=>item.id).toString(),
          post['categories_names'] = apiPost.categories.map((item)=>item.category).toString(),
          post.storage = apiPost.storage,
          post.synced = true,
          post['users_id'] = apiPost.user.id,
          post['users_name'] = apiPost.user.name
        })
    );
    //console.log(typeof ('' + c[0].post.id));
    const syncCommentaries = c && c.map(apiComment =>
      database.collections
        .get('commentaries')
        .prepareCreate(commentaries => {
          commentaries.content = apiComment.content,
          commentaries.storage = apiComment.storage,
          commentaries.synced = true,
          commentaries['users_id'] = `${apiComment.user.id}`,
          commentaries['users_name'] = apiComment.user.name,
          commentaries['post_id'] = `${apiComment.post.id}`
        })
    );
    const syncAll = [...syncPosts, ...syncCommentaries];
    await database.batch(...syncAll);
  });
    return p;
} catch (error) {
  if (error.message === 'Network request failed') {
    const op = await database.collections.get('posts').query().fetch();
    const oc = await database.collections.get('commentaries').query().fetch();
    const response = op.map((post)=>{
      if(typeof post.categories === 'string'){
        return {
          ...post._raw,
          user: { id: post['users_id'], name: post['users_name'] },
          commentaries: oc.filter((item)=>item['post_id'] == post.id),
          categories: post.categories.split(',').map((item, index)=>({
            category: post['categories_names'].split(',')[index],
            id: item
          }))
        }
      } else {
        return post
      }
    });
    //console.log('reponse', op.length);
    return response 
  }
  //console.log('localSync', error.message);
}}
