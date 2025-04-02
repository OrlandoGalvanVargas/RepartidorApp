// components/Loader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f1c40f" />
      <Text style={styles.text}>Verificando credenciales...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    marginTop: 16,
    color: 'white',
    fontSize: 16,
  },
});

export default Loader;