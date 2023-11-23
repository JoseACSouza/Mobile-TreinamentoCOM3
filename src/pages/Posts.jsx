import { ScrollView, Text, View } from "react-native";
import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { PostContext } from "../contexts/posts";
import PostCard from "./components/PostCard";
import { getAllPosts } from "../services/api";

export default Posts = ({ navigation }) => {

  const { posts, setPosts } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    async function fetchPosts() {
      try {
        const u = await getAllPosts(user.token);
        u && u.data && setPosts(u.data);
        setIsLoading(false);
      } catch (error) {
        
      }
    } fetchPosts();
  }, [posts]);
  
  return (
    <View>
      <Header
      navigation={navigation}
      />
      <ScrollView className="mb-32">
      {
        isLoading ? <Text> Carregando... </Text> :
        posts.map((post, index)=>{
          if(post !== undefined){
            return (
              <PostCard
                key={index}
                post={post} 
                navigation = {navigation}/>
            )
          }
        })
      }
      </ScrollView>
    </View>
  )
}