// components/ThemedView.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type ThemedViewProps = {
  style?: any;
  children: React.ReactNode;
};

export  function ThemedView({ style, children }: ThemedViewProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Cambia el color de fondo según tu tema
  },
});