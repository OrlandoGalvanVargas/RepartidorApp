import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { LogoutModal } from '../../components/LogoutModal';
import { InfoCard, InfoRow } from '../../components/InfoCard';
import { MenuItem } from '../../components/MenuItem';
import { styles } from './styles';

export default function SettingsScreen() {
  const { user, logout, setUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => setShowLogoutModal(true);

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
      
      <InfoCard iconName="car" title="Vehículo">
        <InfoRow label="Tipo:" value={user?.usuario.vehiculo.tipo || 'No especificado'} />
        <InfoRow label="Matrícula:" value={user?.usuario.vehiculo.matricula || 'N/A'} />
      </InfoCard>
      
      <InfoCard iconName="business" title="Sucursal">
        <Text style={styles.cardText}>{user?.usuario.sucursal || 'No asignada'}</Text>
      </InfoCard>
      
      {/* Sección de Configuración */}
      <Text style={styles.sectionTitle}>Configuración</Text>
      
      <MenuItem iconName="notifications" text="Notificaciones" />
      <MenuItem iconName="lock-closed" text="Seguridad" />
      <MenuItem iconName="help-circle" text="Ayuda y Soporte" />
      
      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
      <LogoutModal 
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </ScrollView>
  );
}