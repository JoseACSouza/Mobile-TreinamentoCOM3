import { useContext, useState, useEffect } from "react";
import { TextInput, Button, Text, Image, View, Alert } from "react-native";
import { AuthContext } from "../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const [rememberedUser, setRememberedUser] = useState(false);

  const buttonAlert = () =>
    Alert.alert('Lembrar usuário', 'Você gostaria de pular o login nas próximas vezes que você utilizar o app?', [
      {
        text: 'Talvez depois',
        onPress: async () => await handleLogin(false),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await handleLogin(true) },
    ]);

  const handleLogin = async (rememberUser) => {
    await auth.logIn(email, password, rememberUser);
    navigation.navigate('Posts');
  }

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        //console.log(JSON.parse(value));
        return JSON.parse(value);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    async function checkUserAsyncStorage() {
      try {
        const u = await _retrieveData();
        if (u) {
          u && auth.setUser(u);
          setRememberedUser(true);
        }
      } catch (error) {
        //console.log(error);
      }
    } checkUserAsyncStorage();
  }, []);

  return (
    <View className="flex flex-1 justify-center items-center">
      <Image
        className="w-24 h-24"
        source={require('../images/appIcon.png')} />
      {
      rememberedUser ? 
      <View>
        <Text>Bem-vindo: {auth.user.name}</Text>
      </View> :
        <>
          <Text className="text-xl"> Entre na sua conta: </Text>
          <TextInput
            className="bg-slate-300 px-2 py-1 w-3/4 mt-2"
            value={email}
            onChangeText={setEmail}
            placeholder="Email" />
          {
            auth.user.error && <Text className="text-red-600 text-xs mb-2">{auth.user.error}</Text>
          }
          <TextInput
            className="bg-slate-300 px-2 py-1 w-3/4 mt-2 mb-2"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true} />

          {
            auth.user.error && <Text className="text-red-600 text-xs mb-2">{auth.user.error}</Text>
          }
        </>
      }
      <Button
        onPress={async () => {
          buttonAlert();
        }}
        title="Log in" />
    </View>
  )}