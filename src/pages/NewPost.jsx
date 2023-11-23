import { View, TextInput, Button, Text } from "react-native";
import Header from "./components/Header";
import { sendPost } from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";


export default NewPost = ({navigation}) => {

  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [newPost, setNewPost] = useState({
    "users_id": user.id,
    subject: '',
    content: '',
    categories: [1, 3],
    storage: '',
  });


  return (
    <View className="bg-sky-200 py-3">
    <View className="mx-2">
    <Text className="bg-slate-300 p-1 mb-1">{user.name}</Text>
      <TextInput
        value={newPost.subject}
        onChangeText={subject => setNewPost({...newPost, subject: subject})}
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
        onChangeText={content =>setNewPost({...newPost, content: content})}
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
    onPress={async ()=> !newPost.content || !newPost.subject ? setError(true) : (
      await sendPost(user.token, newPost),
      navigation.push('Posts')
    ) }
    title="Postar"
    color="#4EC20B"
    />
</View>
    </View>
  )
}
