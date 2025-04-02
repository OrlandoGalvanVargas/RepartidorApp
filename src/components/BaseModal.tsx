// components/BaseModal.tsx
import React from 'react';
import { Modal, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { styles } from '../screens/Login/LoginStyles';

interface BaseModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  containerStyle?: object;
}

export const BaseModal = ({
  visible,
  onRequestClose,
  children,
  containerStyle
}: BaseModalProps) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}
    statusBarTranslucent={true}
  >
    <View style={styles.modalBackground}>
      <View style={[styles.modalContainer, containerStyle]}>
        {children}
      </View>
    </View>
  </Modal>
);