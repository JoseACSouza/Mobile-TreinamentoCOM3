import { useContext } from 'react';
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../contexts/auth';
import { deleteComments } from '../../services/api';

export default CommentCard = ({comment}) => {
  const { content, user } = comment;
  const commentaryOwner = useContext(AuthContext);
  return (
    <View className="bg-sky-400 p-1 m-1 rounded">
      {/* <Text className="bg-sky-200 my-1">{user.name}</Text> */}
      <Text className="bg-sky-200 mb-1">{content}</Text>
      {
        commentaryOwner.user.id === user.id && <View className="flex flex-row justify-end mx-2 mb-1">
          <Button color="red" title="delete" onPress={
            async ()=> await deleteComments(commentaryOwner.user.token, comment.id)
            }/>
          </View>
      }
    </View>
  )
}