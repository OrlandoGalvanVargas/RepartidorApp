import React, { useState } from 'react';
import { View, TextInput, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './LoginStyles';

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

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null, styles.passwordInput]}
          placeholder="Contraseña"
          placeholderTextColor="#828282" 
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Campo de contraseña"
          accessibilityHint="Ingrese su contraseña registrada"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          accessibilityRole="button"
        >
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={24} 
            color="#999" 
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
        accessible={true}
        accessibilityLabel="Botón para iniciar sesión"
        accessibilityRole="button"
      >
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export const SuccessModal = ({ visible, onRequestClose }: { visible: boolean, onRequestClose: () => void }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}
    statusBarTranslucent={true}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <ThemedText type="title" style={styles.modalText}>Login Exitoso</ThemedText>
        <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
      </View>
    </View>
  </Modal>
);

export const ErrorModal = ({ visible, message, onRequestClose }: { 
  visible: boolean, 
  message: string, 
  onRequestClose: () => void 
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}
    statusBarTranslucent={true}
  >
    <View style={styles.modalBackground}>
      <View style={styles.errorModalContainer}>
        <ThemedText type="title" style={styles.errorModalText}>{message}</ThemedText>
      </View>
    </View>
  </Modal>
);