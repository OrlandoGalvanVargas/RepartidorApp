import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../screens/Settings/styles';

interface InfoCardProps {
  iconName: string;
  title: string;
  children: React.ReactNode;
}

export const InfoCard = ({ iconName, title, children }: InfoCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Ionicons name={iconName} size={24} color="#e2bd27" />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);