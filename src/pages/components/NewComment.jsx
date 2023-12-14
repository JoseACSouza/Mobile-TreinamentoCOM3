import { View, TextInput, Button, Text } from "react-native";
import { sendComment } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { database } from "../../database";


export default NewComment = (props) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [newComment, setNewPost] = useState({
    "user_id": user.id,
    "post_id": +props.postId,
    content: '',
    storage: '',
  });

  const verifyAndSend = async () => {
    console.log('teste');
    if (!newComment.content) {
      return setError(true);
    }
    try {
      const oi = await sendComment(user.token, newComment);
      showToastWithGravity('Comentário criado com sucesso!');
      console.log('response', oi);
    } catch (error) {
      if (error.message === 'Network request failed') {
        try {
          await database.write(async () => {
            await database.get('commentaries').create(commentary => {
              commentary.content = newComment.content,
              commentary['post_id'] = `${newComment['post_id']}`,
              commentary.storage = newComment.storage,
              commentary.synced = false,
              commentary['users_id'] = `${user.id}`,
              commentary['users_name'] = user.name
            });
          })
        } catch (error) {
          console.log(error);
        }
      }
    } finally {
      props.navigation.push('Comentary', { postId: props.postId});
    //  props.navigation.navigate('Posts');
    }
  }
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
