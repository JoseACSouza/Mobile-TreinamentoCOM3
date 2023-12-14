import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import { deletePost } from '../../services/api';
import { database } from '../../database';
import { Q } from '@nozbe/watermelondb';

export default PostCard = (props) => {
  if(!props.post){
    return
  }

  const commentCount = async ()=> database.get('commentaries').query(Q.where('post_id', props.post.id)).fetchCount();

const deletePostOnLocal = async (postToDelete)=>{
  database.write(async ()=>{
    await postToDelete.markAsDeleted();

    const deleteCommentaries = await database.collections.get('commentaries')
      .query(Q.where('post_id', props.post.id)).fetch();

    const commentariesTobeDeleted = deleteCommentaries.map(items => items.prepareDestroyPermanently());

    database.batch(...commentariesTobeDeleted);
  });
}

  const { subject, content, commentaries, categories, user } = props.post;
  const { navigation } = props;
  const auth = useContext(AuthContext);
  return (
    <View className="m-1 bg-sky-300 p-1 rounded">
    <Text className="text-xs">{user.name}</Text>
    <Text className="text-lg font-bold mb-2">{ subject }</Text>
    {
      categories && <View className="flex flex-row mb-1"> 
      { 
          categories.map((item) => {
            return <Text className="bg-yellow-200 mr-1 px-1 rounded text-xs">{ item.category }</Text>
          }) 
      } 
      </View>
    }
    <Text className="bg-sky-200 p-1 rounded">{content}</Text>
    <Text onPress={ ()=>props.navigation.navigate('Comentary', { postId: props.post.id }) }>
      {commentaries.length + ' comentários'}
    </Text>
    {
      auth.user.id === user.id && <View className="flex flex-row justify-end mx-2 mb-1">
        <Button 
          title='excluir'
          color='red' 
          onPress={ async ()=> {
            try {
              //console.log('delete here');
              await deletePost(auth.user.token, props.post.id);
            } catch (error) {
              //console.log('chegou aqui');
              //console.log(p);
              if (error.message === 'Network request failed') {
                  const p = await database.get('posts').find(props.post.id);
                  console.log(p);
                  await deletePostOnLocal(p);
              }
              
            } finally { 
              navigation.push('Posts');
            }
            
          } } />
        </View>
    }
  </View>
  )
}