import { Button, ScrollView, Text, View } from "react-native";
import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/posts";
import PostCard from "./components/PostCard";
import NewComment from "./components/NewComment";
import CommentCard from "./components/CommentCard";
import { AuthContext } from "../contexts/auth";
import { showComments } from "../services/api";
import { database } from "../database";
import { Q } from "@nozbe/watermelondb";

export default Comments = (props) => {
  const postId = props.route.params.postId;
  const { user } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const [newComment, setNewComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedPost = posts.find((sp)=> sp.id === postId);

  const handleNewComment = () => newComment ? setNewComment(false) : setNewComment(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const ac = await showComments(user.token, postId);
        ac.data && setComments(ac.data);
      } catch (error) {
        if (error.message === 'Network request failed') {
          const ac = await database.get('commentaries').query(Q.where('post_id', `${postId}` )).fetch();
          console.log('ac', ac.length);
          setComments(ac);
        }
      } finally {
        setIsLoading(false);
      }
    } fetchComments();
  }, []);

  return (
    <View>
      <Header
        navigation={props.navigation}
      />
      <ScrollView className="mb-32">
        {
          isLoading ? <Text>Carregando</Text> : <>
            <PostCard
              post={selectedPost} />
            {
              comments && comments.map((comment) => {
                return (
                  <CommentCard
                    comment={comment}
                    navigation={ props.navigation }
                  />
                )
              })
            }
            {
              newComment ? <NewComment 
              postId={postId}
              handle={handleNewComment}
              navigation={ props.navigation }
              /> : <View className="flex flex-row-reverse m-1">
                <Button title="New Comment" onPress={() => handleNewComment()} />
              </View>
            }</>
        }
      </ScrollView>
    </View>
  )
}