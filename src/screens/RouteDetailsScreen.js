// src/screens/RouteDetailsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RouteDetailsScreen({ route, navigation }) {
  const { routeId } = route.params;

  const handleStartTrip = () => {
    // Lógica para iniciar el viaje
    alert(`Iniciando el viaje para la ruta ${routeId}`);
    navigation.goBack();  // Volver al home
  };

  return (
    <View style={styles.container}>
      <Text>Detalles de la Ruta {routeId}</Text>
      <Button title="Iniciar Viaje" onPress={handleStartTrip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});
