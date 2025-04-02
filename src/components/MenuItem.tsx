import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../screens/Settings/styles';

interface MenuItemProps {
  iconName: string;
  text: string;
  onPress?: () => void;
}

export const MenuItem = ({ iconName, text, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={iconName} size={22} color="#666" />
    <Text style={styles.menuItemText}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);