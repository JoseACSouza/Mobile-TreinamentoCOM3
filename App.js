import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './src/Routes';
import { AuthProvider } from './src/contexts/auth';
import { PostProvider } from './src/contexts/posts';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <Routes />
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
