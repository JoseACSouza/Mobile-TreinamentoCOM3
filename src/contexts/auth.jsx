import { createContext, useMemo, useState } from 'react';
import { User, logout } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const _storeData = async (user) => {
    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(user),
      );
    } catch (error) {
      //console.log('async storage:', error);
    }
  };

  const logIn = async (email, password, remember = false) => {
    try {
      const u = await User(email, password);
      const authUser = {
        name: u.data.user.name,
        id: u.data.user.id,
        token: u.data.token,
      };
      if(!remember){
        setUser(authUser);
      } else {
        await _storeData(authUser);
        setUser(authUser);
      }
      return authUser;
    } catch (error) {
        setUser({
          error: 'Usuário ou senha inválidos'
        });
    }
  }

  const logOut = async ()=> {
    try {
      await logout(user.token);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      //console.log(error.message);
    }
    setUser({});
  }

  const values = useMemo(() => ({
    user: user,
    logIn,
    logOut,
    setUser,
  }), [user]);


  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}
