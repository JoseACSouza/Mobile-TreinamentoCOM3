import { useContext } from 'react';
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../contexts/auth';
import { deleteComments } from '../../services/api';
import { database } from '../../database';

export default CommentCard = ({comment, navigation}) => {
  const { content, user, id } = comment;
  const commentaryOwner = useContext(AuthContext);
  const deleteCommentaryOnLocal = async (commentaryToDelete)=>{
    await database.write(async ()=>{
      try {
        await commentaryToDelete.markAsDeleted();
      } catch (error) {
        console.log(error);
      }
    });
  }
  
  return (
    <View className="bg-sky-400 p-1 m-1 rounded">
      <Text className="bg-sky-200 my-1">{user ? user.name : comment['users_name']}</Text>
      <Text className="bg-sky-200 mb-1">{content}</Text>
      {
        commentaryOwner.user.id == (user ? user.id : comment['users_id'] ) && <View className="flex flex-row justify-end mx-2 mb-1">
          <Button color="red" title="delete" onPress={
            async ()=> {
              try {
                console.log('deletando');
                await deleteComments(commentaryOwner.user.token, id);
                console.log('deletado');
              } catch (error) {
                if (error.message === 'Network request failed') {
                    try {
                      const c = await database.get('commentaries').find(id);
                    await deleteCommentaryOnLocal(c);
                    } catch (error) {
                      console.log(error);
                    }
                }
              } finally {
                navigation.push('Comentary', { postId: comment['post_id']});
              }
            }
            }/>
          </View>
      }
    </View>
  )
}