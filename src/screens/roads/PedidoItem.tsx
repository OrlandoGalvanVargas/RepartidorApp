import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styles } from './styles';
import { Pedido } from './types';

interface PedidoItemProps {
  rutaId: number;
  pedido: Pedido;
  expandedRutas: Record<string, boolean>;
  togglePedido: (rutaId: number, pedidoId: number) => void;
}

const PedidoItem: React.FC<PedidoItemProps> = ({ 
  rutaId, 
  pedido, 
  expandedRutas, 
  togglePedido 
}) => {
  const uniqueId = `ruta-${rutaId}-pedido-${pedido.id}`;

  return (
    <View>
      <TouchableOpacity
        onPress={() => togglePedido(rutaId, pedido.id)}
        style={styles.orderHeader}
      >
        <Text style={styles.orderTitle}>{pedido.nombre}</Text>
        <MaterialIcons
          name={expandedRutas[uniqueId] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color="black"
        />
      </TouchableOpacity>

      {expandedRutas[uniqueId] && (
        <View style={styles.orderDetails}>
          <Text>Dirección: {pedido.direccion}</Text>
          <Text>Kilos de tortilla: {pedido.kilosTortilla}</Text>
          <Text>Hora estimada de entrega: {pedido.horaEntrega}</Text>
          <Text>Teléfono del cliente: {pedido.telefono}</Text>
        </View>
      )}
    </View>
  );
};

export default PedidoItem;