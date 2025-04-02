import React, { useState } from 'react';
import { View, TextInput, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './LoginStyles';
import { PasswordField } from '../../components/PasswordField';
import { LoginButton } from '../../components/LoginButton';
import { BaseModal } from '../../components/BaseModal';

export const LogoCard = () => (
  <View style={styles.logoCard}>
    <Image
      source={require('../../../assets/TortillasLogo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

export const LoginForm = ({
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  setEmail,
  setPassword,
  handleLogin
}: {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  handleLogin: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.card}>
      <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Correo electrónico"
        placeholderTextColor="#828282" 
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Campo de correo electrónico"
        accessibilityHint="Ingrese su correo electrónico registrado"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <PasswordField 
        password={password} 
        showPassword={showPassword} 
        setPassword={setPassword} 
        setShowPassword={setShowPassword} 
        passwordError={passwordError} 
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <LoginButton isLoading={isLoading} handleLogin={handleLogin} />
    </View>
  );
};

export const SuccessModal = ({ visible, onRequestClose }: { 
  visible: boolean, 
  onRequestClose: () => void 
}) => (
  <BaseModal visible={visible} onRequestClose={onRequestClose}>
    <ThemedText type="title" style={styles.modalText}>Login Exitoso</ThemedText>
    <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
  </BaseModal>
);

export const ErrorModal = ({ visible, message, onRequestClose }: { 
  visible: boolean, 
  message: string, 
  onRequestClose: () => void 
}) => (
  <BaseModal 
    visible={visible} 
    onRequestClose={onRequestClose}
    containerStyle={styles.errorModalContainer}
  >
    <ThemedText type="title" style={styles.errorModalText}>{message}</ThemedText>
  </BaseModal>
);