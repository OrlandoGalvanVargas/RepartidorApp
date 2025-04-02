import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { HomeScreenLayout } from './HomeComponents';
import { createHomeStyles } from './HomeStyles';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const usuario = user?.usuario || null;
  const styles = createHomeStyles(width);

  return <HomeScreenLayout usuario={usuario} styles={styles} />;
}