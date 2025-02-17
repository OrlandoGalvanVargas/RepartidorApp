// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Simular una llamada a la API para obtener las rutas asignadas
    const fetchRoutes = () => {
      setRoutes([
        { id: '1', name: 'Ruta A', status: 'Asignada' },
        { id: '2', name: 'Ruta B', status: 'Asignada' },
      ]);
    };
    fetchRoutes();
  }, []);

  const handleStartTrip = (routeId) => {
    navigation.navigate('RouteDetails', { routeId });
  };

  return (
    <View style={styles.container}>
      <Text>Rutas Asignadas</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text>{item.name}</Text>
            <Button title="Iniciar Viaje" onPress={() => handleStartTrip(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  routeItem: { marginBottom: 16 },
});
