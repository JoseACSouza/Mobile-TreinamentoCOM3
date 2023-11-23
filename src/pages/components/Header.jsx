import { useContext } from "react";
import { Button, Text, Image, View } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default Header = ({ navigation }) => {
  const auth = useContext(AuthContext);
  return (
    <View className="m-1 bg-slate-100 p-1 flex flex-row justify-between items-center">
      <Image
        className="w-10 h-10"
        source={require('../../images/appIcon.png')} />
      <Text>{ auth.user.name }</Text>
      <Button 
        onPress={()=> navigation.navigate('NewPost')} 
        title="New Post"
      />
      <Button 
        onPress={ async ()=> {
          await auth.logOut();
          navigation.push('Login');
        }} 
        title="Log Out"
      />
    </View>
  )
}