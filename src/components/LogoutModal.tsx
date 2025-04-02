import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../screens/Settings/styles';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({ visible, onCancel, onConfirm }: LogoutModalProps) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Ionicons name="log-out" size={50} color="#ff4444" style={styles.modalIcon} />
        <Text style={styles.modalTitle}>¿Cerrar sesión?</Text>
        <Text style={styles.modalText}>¿Estás seguro de que deseas salir de tu cuenta?</Text>
        
        <View style={styles.modalButtons}>
          <TouchableOpacity 
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.modalButton, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Sí, salir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);