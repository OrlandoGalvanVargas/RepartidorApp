import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default function InitialScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  // Efecto para manejar el botón atrás
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Cierra la aplicación
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [user]);

  return null;
}