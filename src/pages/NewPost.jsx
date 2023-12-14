import { View, TextInput, Button, Text, ToastAndroid } from "react-native";
import { sendPost } from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { database } from "../database";

export default NewPost = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [newPost, setNewPost] = useState({
    "users_id": user.id,
    subject: '',
    content: '',
    categories: [1, 3],
    storage: '',
  });

  const showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleSend = async () => {
    try {
      await sendPost(user.token, newPost);
      showToastWithGravity('Post criado com sucesso!');
    } catch (error) {
      if (error.message === 'Network request failed') {
        try {
          showToastWithGravity('Seu post será criado assim que sua conexão for reestabelecida!');
          await database.write(async () => {
            await database.get('posts').create(post => {
                post.subject = newPost.subject,
                post.content = newPost.content,
                post.categories = newPost.categories.toString(),
                post['categories_names'] = 'Anuncios Oficiais, RH',
                post.storage = newPost.storage,
                post.synced = false,
                post['users_id'] = user.id,
                post['users_name'] = user.name
            });
          })
        } catch (error) {
          //console.log(error);
        }
      }
    } finally {
      navigation.push('Posts');
    }
  }

  return (
    <View className="bg-sky-200 py-3">
      <View className="mx-2">
        <Text className="bg-slate-300 p-1 mb-1">{user.name}</Text>
        <TextInput
          value={newPost.subject}
          onChangeText={subject => setNewPost({ ...newPost, subject: subject })}
          className="bg-slate-300 p-1"
          placeholder="Subject"
        />
        {
          error && <Text className="text-xs text-red-500">
            Campo Content e o Subject são obrigatórios!
          </Text>
        }

        <TextInput
          value={newPost.content}
          multiline
          numberOfLines={4}
          onChangeText={content => setNewPost({ ...newPost, content: content })}
          className="bg-slate-300 my-2 h-36 w-42 overscroll-none p-1"
          placeholder="Content"
        />
        {
          error && <Text className="text-xs text-red-500">
            Campo Content e o Subject são obrigatórios!
          </Text>
        }
      </View>
      <View className="flex-row justify-end mr-3">
        <Button
          onPress={async () => !newPost.content || !newPost.subject ? setError(true) : (
            await handleSend()
          )}
          title="Postar"
          color="#4EC20B"
        />
      </View>
    </View>
  )
}
