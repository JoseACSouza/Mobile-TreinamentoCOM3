import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './pages/Login';
import Posts from './pages/Posts';
import Coments from './pages/Comments';
import NewPost from './pages/NewPost';

const Stack = createNativeStackNavigator();

function Routes() {
 return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={ Login } options={{headerShown:false}}/>
      <Stack.Screen name="Posts" component={ Posts } options={{headerShown:false}} />
      <Stack.Screen name="NewPost" component={ NewPost }/>
      <Stack.Screen name="Comentary" component={ Coments }/>
    </Stack.Navigator>
  );
}


export default Routes;