import { FlatList, SafeAreaView, Text, View, ToastAndroid } from "react-native";
import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { sync, localSync } from '../services/sync';
import { AuthContext } from "../contexts/auth";
import { PostContext } from "../contexts/posts";
import PostCard from "./components/PostCard";
import { database } from "../database";
import { getApiStatus } from "../services/api";

export default Posts = ({ navigation }) => {

  const { posts, setPosts } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

    useEffect(() => {
      async function fetchPosts() {
        try {
          await getApiStatus();
          await sync(user.token);
        } catch (error) {
        console.log('is offline');
        }

        try {
          const p = await localSync(user.token);
          p && p && setPosts(p);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      } fetchPosts();
    }, []);
 
  return (
    <View>
      <Header
        navigation={navigation}
      />
      <SafeAreaView className="mb-44">
        {
          isLoading ? <Text> Carregando... </Text> :
          <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
          keyExtractor={item => item.id}
        />
        }
      </SafeAreaView>
    </View>
  )
}