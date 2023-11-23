import { useContext, useState, useEffect } from "react";
import { TextInput, Button, Text, Image, View } from "react-native";
import { AuthContext } from "../contexts/auth";


export default Login = ({ navigation }) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
return (
<View className="flex flex-1 justify-center items-center">
  <Image
    className="w-24 h-24"
    source={require('../images/appIcon.png')}/>
  <Text className="text-xl"> Entre na sua conta: </Text>
  <TextInput
    className="bg-slate-300 px-2 py-1 w-3/4 mt-2" 
    value={ email } 
    onChangeText={setEmail} 
    placeholder="Email" />
    {
      auth.user.error && <Text className="text-red-600 text-xs mb-2">{auth.user.error}</Text>
    }
  <TextInput 
    className="bg-slate-300 px-2 py-1 w-3/4 mt-2 mb-2"
    value={ password } 
    onChangeText={setPassword} 
    placeholder="Password" 
    secureTextEntry={true} />

    {
      auth.user.error && <Text className="text-red-600 text-xs mb-2">{auth.user.error}</Text>
    }
  
  <Button 
    onPress={ async () => {
        const authUser = await auth.logIn(email, password);
        if (authUser){
          navigation.navigate('Posts');
        } else {
          
        }
    }
    } 
    title="Log in" />
</View>
)}