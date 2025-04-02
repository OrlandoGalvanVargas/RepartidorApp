import React from 'react';
import { View, Text, Image } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { createHomeStyles } from './HomeStyles';

interface ProfileSectionProps {
  usuario: any;
  styles: ReturnType<typeof createHomeStyles>;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ usuario, styles }) => (
  <View style={styles.profileSection}>
    <Text style={styles.sectionTitle}>PERFIL DEL CONDUCTOR</Text>
    <Image
      source={require('../../../assets/usuarioMovilReal.jpg')} 
      style={styles.userPhoto}
    />        
    <Text style={styles.driverLabel}>Nombre del Conductor</Text>
    <Text style={styles.driverName}>{usuario?.nombre || 'Nombre no disponible'}</Text> 
    
    <VehicleDetails usuario={usuario} styles={styles} />
  </View>
);

interface VehicleDetailsProps {
  usuario: any;
  styles: ReturnType<typeof createHomeStyles>;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ usuario, styles }) => (
  <View style={styles.vehicleDetails}>
    <DetailItem 
      title="Vehículo" 
      text={usuario?.vehiculo.tipo || 'Tipo no disponible'} 
      styles={styles}
    />
    <DetailItem 
      title="Sucursal" 
      text={usuario?.sucursal || 'Sucursal no disponible'} 
      styles={styles}
    />
    <DetailItem 
      title="Matrícula" 
      text={usuario?.vehiculo.matricula || 'Matrícula no disponible'} 
      styles={styles}
    />
  </View>
);

interface DetailItemProps {
  title: string;
  text: string;
  styles: ReturnType<typeof createHomeStyles>;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, text, styles }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailTitle}>{title}</Text>
    <View style={styles.divider} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

interface TransportSectionProps {
  styles: ReturnType<typeof createHomeStyles>;
}

export const TransportSection: React.FC<TransportSectionProps> = ({ styles }) => (
  <View style={styles.transportSection}>
    <Text style={styles.sectionTitle}>Transporte</Text>
    <Image
      source={require('../../../assets/motoMovil.png')}
      style={styles.transportImage}
    />
  </View>
);

interface HomeScreenLayoutProps {
  usuario: any;
  styles: ReturnType<typeof createHomeStyles>;
}

export const HomeScreenLayout: React.FC<HomeScreenLayoutProps> = ({ usuario, styles }) => (
  <ThemedView style={styles.container}>
    <ProfileSection usuario={usuario} styles={styles} />
    <TransportSection styles={styles} />
  </ThemedView>
);