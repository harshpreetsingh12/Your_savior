import React from 'react';
import { Text, View } from 'react-native'
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { TailwindProvider } from 'tailwindcss-react-native';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
  return (
    <NavigationContainer>
      <TailwindProvider>
      <AuthProvider>
      <StackNavigator/>
      </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}

