import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import InitialScreen from '../screens/InitialScreen';
import LoginScreen from '../screens/login/LoginScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { user } = useAuth();

  // Bloquear botón atrás cuando no hay usuario
  useEffect(() => {
    const backAction = () => {
      if (!user) {
        return true; // Bloquear navegación atrás
      }
      return false; // Permitir comportamiento normal
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [user]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Initial" component={InitialScreen} options={{ gestureEnabled: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        </>
      ) : (
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ gestureEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}