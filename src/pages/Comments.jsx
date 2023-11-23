import { Button, ScrollView, Text, View } from "react-native";
import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/posts";
import PostCard from "./components/PostCard";
import NewComment from "./components/NewComment";
import CommentCard from "./components/CommentCard";
import { AuthContext } from "../contexts/auth";
import { showComments } from "../services/api";

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
        let ac = await showComments(user.token, postId);
        ac.data && setComments(ac.data);
        setIsLoading(false);
      } catch (error) {

      }
    } fetchComments();
  }, [comments]);

  return (
    <View>
      <Header
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
                  />
                )
              })
            }
            {
              newComment ? <NewComment postId={postId} handle={handleNewComment} /> : <View className="flex flex-row-reverse m-1">
                <Button title="New Comment" onPress={() => handleNewComment()} />
              </View>
            }</>
        }
      </ScrollView>
    </View>
  )
}