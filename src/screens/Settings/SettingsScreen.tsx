import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { LogoutModal } from '../../components/LogoutModal';
import { InfoCard, InfoRow } from '../../components/InfoCard';
import { MenuItem } from '../../components/MenuItem';
import { styles } from './styles';

// Helper function para valores por defecto
const getSafeValue = (value: string | undefined, defaultValue: string) => {
  return value || defaultValue;
};

// Extraer lógica de logout a un hook personalizado
const useLogout = () => {
  const { logout, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const performLogout = async () => {
    await EncryptedStorage.removeItem('user');
    setUser(null);
    logout();
  };

  return {
    showModal,
    requestLogout: () => setShowModal(true),
    cancelLogout: () => setShowModal(false),
    confirmLogout: async () => {
      await performLogout();
      setShowModal(false);
    }
  };
};

// Componente para el encabezado del perfil
const ProfileHeader = ({ user }: { user: any }) => (
  <View style={styles.profileHeader}>
    <View style={styles.profileImage}>
      <Ionicons name="person" size={50} color="#fff" />
    </View>
    <Text style={styles.userName}>{getSafeValue(user?.usuario.nombre, 'Usuario')}</Text>
    <Text style={styles.userEmail}>{getSafeValue(user?.email, 'correo@ejemplo.com')}</Text>
  </View>
);

// Componente para la sección de configuración
const ConfigurationSection = () => (
  <>
    <Text style={styles.sectionTitle}>Configuración</Text>
    <MenuItem iconName="notifications" text="Notificaciones" />
    <MenuItem iconName="lock-closed" text="Seguridad" />
    <MenuItem iconName="help-circle" text="Ayuda y Soporte" />
  </>
);

export default function SettingsScreen() {
  const { user } = useAuth();
  const {
    showModal,
    requestLogout,
    cancelLogout,
    confirmLogout
  } = useLogout();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader user={user} />
      
      <Text style={styles.sectionTitle}>Información Personal</Text>
      
      <InfoCard iconName="car" title="Vehículo">
        <InfoRow 
          label="Tipo:" 
          value={getSafeValue(user?.usuario.vehiculo.tipo, 'No especificado')} 
        />
        <InfoRow 
          label="Matrícula:" 
          value={getSafeValue(user?.usuario.vehiculo.matricula, 'N/A')} 
        />
      </InfoCard>
      
      <InfoCard iconName="business" title="Sucursal">
        <Text style={styles.cardText}>
          {getSafeValue(user?.usuario.sucursal, 'No asignada')}
        </Text>
      </InfoCard>
      
      <ConfigurationSection />
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={requestLogout}
      >
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
      <LogoutModal 
        visible={showModal}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
      />
    </ScrollView>
  );
}