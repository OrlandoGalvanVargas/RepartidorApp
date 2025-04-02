import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import PedidoItem from './PedidoItem';
import { Ruta, Pedido } from './types';

interface RutaItemProps {
  ruta: Ruta;
  expandedRutas: Record<string, boolean>;
  toggleRuta: (rutaId: number) => void;
  togglePedido: (rutaId: number, pedidoId: number) => void;
  comenzarRuta: () => void; // Cambiamos el tipo ya que no necesita el parámetro ruta
}

const RutaItem: React.FC<RutaItemProps> = ({ 
  ruta, 
  expandedRutas, 
  toggleRuta, 
  togglePedido, 
  comenzarRuta 
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => toggleRuta(ruta.id)}
        style={styles.accordionHeader}
      >
        <Text style={styles.accordionTitle}>{ruta.nombre}</Text>
        <MaterialIcons
          name={expandedRutas[ruta.id] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {expandedRutas[ruta.id] && (
        <View style={styles.accordionContent}>
          <Text style={styles.sectionTitle}>Fecha Asignada: {ruta.fechaAsignada}</Text>
          <Text style={styles.sectionTitle}>Dirección: {ruta.direccion}</Text>

          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Resumen de la Ruta:</Text>
            <Text>Total de entregas: {ruta.totalEntregas}</Text>
            <Text>Kilometraje total estimado: {ruta.kilometraje}</Text>
            <Text>Tiempo estimado de finalización: {ruta.tiempoEstimado}</Text>
          </View>

          <Text style={styles.sectionTitle}>Lista de Pedidos:</Text>

          {ruta.pedidos.map((pedido) => (
            <PedidoItem
              key={`ruta-${ruta.id}-pedido-${pedido.id}`}
              rutaId={ruta.id}
              pedido={pedido}
              expandedRutas={expandedRutas}
              togglePedido={togglePedido}
            />
          ))}

          <TouchableOpacity
            style={styles.startButton}
            onPress={comenzarRuta} // Ahora solo ejecuta la función que muestra la alerta
          >
            <Text style={styles.startButtonText}>Comenzar Ruta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RutaItem;