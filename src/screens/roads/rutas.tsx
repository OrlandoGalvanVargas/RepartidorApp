import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import RutaItem from './RutaItem';
import { Pedido, Ruta } from './types';
import { API_CONFIG } from '../../config/Config';

export default function RutasScreen() {
  const [expandedRutas, setExpandedRutas] = useState<Record<string, boolean>>({});
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${API_CONFIG.rutasUrl}`, {
          method: 'GET',
          headers: {
            'id-repartidor': '3',
          },
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener las rutas');
        }
    
        const data = await response.json();
        setRutas(data.rutas_asignadas);
      } catch (error: any) {
        setError(error?.message || 'Ocurrió un error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const toggleRuta = (rutaId: number) => {
    setExpandedRutas((prev) => {
      const newState = { ...prev };
  
      if (newState[rutaId]) {
        rutas
          .find((ruta) => ruta.id === rutaId)
          ?.pedidos.forEach((pedido) => {
            const uniqueId = `ruta-${rutaId}-pedido-${pedido.id}`;
            newState[uniqueId] = false;
          });
      }
  
      newState[rutaId] = !newState[rutaId];
      return newState;
    });
  };

  const togglePedido = (rutaId: number, pedidoId: number) => {
    const uniqueId = `ruta-${rutaId}-pedido-${pedidoId}`;
    setExpandedRutas((prev) => ({
      ...prev,
      [uniqueId]: !prev[uniqueId],
    }));
  };

  const handleComenzarRuta = (rutaNombre: string) => {
    setSelectedRuta(rutaNombre);
    setShowModal(true);
  };

// Reemplaza el bloque de loading actual con este:
if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#e2bd27" />
          <Text style={styles.loadingText}>Cargando rutas...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>Rutas</Text>
        
        {rutas.map((ruta) => (
          <RutaItem
            key={ruta.id}
            ruta={ruta}
            expandedRutas={expandedRutas}
            toggleRuta={toggleRuta}
            togglePedido={togglePedido}
            comenzarRuta={() => handleComenzarRuta(ruta.nombre)}
          />
        ))}
      </ScrollView>

      {/* Modal de confirmación */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ruta Iniciada</Text>
            <Text style={styles.modalText}>
              Has iniciado la ruta: {selectedRuta}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}