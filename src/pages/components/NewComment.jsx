import { View, TextInput, Button, Text } from "react-native";
import { sendComment } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";


export default NewComment = (props) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [newComment, setNewPost] = useState({
    "user_id": user.id,
    "post_id": props.postId,
    content: '',
    storage: '',
  });

  const verifyAndSend = async () => {
    if (!newComment.content) {
      setError(true);
    } else {
      try {
        await sendComment(user.token, newComment);
        props.handle();
      } catch (error) {
        console.log(error.message);
      }
    }

  };


  return (
    <View className="bg-sky-200 py-3">
      <View className="mx-2">
        <Text className="bg-slate-300 p-1 mb-1">{user.name}</Text>
        <TextInput
          value={newComment.content}
          multiline
          numberOfLines={4}
          onChangeText={content => setNewPost({ ...newComment, content: content })}
          className="bg-slate-300 my-2 h-24 w-42 overscroll-none p-1"
          placeholder="Content"
        />
        {
          error && <Text className="text-xs text-red-500">
            Campo Content é obrigatório!
          </Text>
        }
      </View>
      <View className="flex-row justify-end mr-3">
        <Button
          onPress={async () => await verifyAndSend()}
          title="Send"
          color="#4EC20B"
        />
      </View>
    </View>
  )
}
