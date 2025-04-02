import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { styles } from  './styles';

export default function SettingsScreen() {
  const { user, logout, setUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await EncryptedStorage.removeItem('user');
    setUser(null); 
    logout();
    setShowLogoutModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado con foto de perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={50} color="#fff" />
        </View>
        <Text style={styles.userName}>{user?.usuario.nombre || 'Usuario'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'correo@ejemplo.com'}</Text>
      </View>
      
      {/* Sección de Información Personal */}
      <Text style={styles.sectionTitle}>Información Personal</Text>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="car" size={24} color="#e2bd27" />
          <Text style={styles.cardTitle}>Vehículo</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoValue}>{user?.usuario.vehiculo.tipo || 'No especificado'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Matrícula:</Text>
          <Text style={styles.infoValue}>{user?.usuario.vehiculo.matricula || 'N/A'}</Text>
        </View>
      </View>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="business" size={24} color="#e2bd27" />
          <Text style={styles.cardTitle}>Sucursal</Text>
        </View>
        <Text style={styles.cardText}>{user?.usuario.sucursal || 'No asignada'}</Text>
      </View>
      
      {/* Sección de Configuración */}
      <Text style={styles.sectionTitle}>Configuración</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="notifications" size={22} color="#666" />
        <Text style={styles.menuItemText}>Notificaciones</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="lock-closed" size={22} color="#666" />
        <Text style={styles.menuItemText}>Seguridad</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="help-circle" size={22} color="#666" />
        <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
      
      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
      {/* Modal de confirmación */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="log-out" size={50} color="#ff4444" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>¿Cerrar sesión?</Text>
            <Text style={styles.modalText}>¿Estás seguro de que deseas salir de tu cuenta?</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <Text style={styles.confirmButtonText}>Sí, salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}