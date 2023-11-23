import { createContext, useMemo, useState } from 'react';
import { User, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = async (email, password) => {
    try {
      const u = await User(email, password);
      const authUser = {
        name: u.data.user.name,
        id: u.data.user.id,
        token: u.data.token,
      };
      setUser(authUser);
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
    } catch (error) {
      console.log(error.message);
    }
    setUser({});
  }

  const values = useMemo(() => ({
    user: user,
    logIn,
    logOut,
  }), [user]);


  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}
