import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';   
import { VerifyResponse } from './LoginTypes';
import { AuthService } from './AuthService';
import { 
  LogoCard, 
  LoginForm, 
  SuccessModal, 
  ErrorModal 
} from './LoginComponents';
import { styles } from './LoginStyles';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen() {
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de la UI y autenticación
  const [state, setState] = useState({
    emailError: '',
    passwordError: '',
    modalVisible: false,
    errorModalVisible: false,
    errorMessage: '',
    isLoading: false,
    verifyData: null as VerifyResponse | null,
    loginAttempts: 0,
    isBlocked: false,
    deviceId: '',
    lockoutEndTime: null as number | null,
    isSubmitting: false
  });

  const { setUser } = useAuth();
  const navigation = useNavigation();

  // Efectos secundarios

  useEffect(() => {
    if (state.errorModalVisible) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, errorModalVisible: false }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.errorModalVisible]);

 // Y modifica el efecto del modalVisible:
 useEffect(() => {
  if (state.modalVisible && state.verifyData) {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, modalVisible: false }));
    }, 1500);
    return () => clearTimeout(timer);
  }
}, [state.modalVisible, state.verifyData]);

  // Helpers
  const sanitizeInput = (text: string): string => {
    const forbiddenChars = /[<>"'`;\\/]/g;
    return text.trim().replace(forbiddenChars, '');
  };

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Validación de email
    if (!email) {
      setState(prev => ({ ...prev, emailError: 'El correo electrónico es requerido' }));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setState(prev => ({ ...prev, emailError: 'El correo electrónico no es válido' }));
      isValid = false;
    } else {
      setState(prev => ({ ...prev, emailError: '' }));
    }

    // Validación de contraseña
    if (!password) {
      setState(prev => ({ ...prev, passwordError: 'La contraseña es requerida' }));
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setState(prev => ({ ...prev, passwordError: 'Mínimo 8 caracteres, 1 mayúscula y 1 número' }));
      isValid = false;
    } else {
      setState(prev => ({ ...prev, passwordError: '' }));
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (state.loginAttempts >= 5 || (state.lockoutEndTime && Date.now() < state.lockoutEndTime)) {
      setState(prev => ({ 
        ...prev, 
        errorMessage: 'Demasiados intentos. Espere 5 minutos',
        errorModalVisible: true
      }));
      return;
    }
  
    if (!validateInputs() || state.isSubmitting) return;
    
    setState(prev => ({ ...prev, isSubmitting: true, isLoading: true }));
  
    try {
      const response = await AuthService.login(
        email.trim().toLowerCase(), 
        password, 
        state.deviceId
      );
  
      if (response.status === 429) {
        const blockEndTime = Date.now() + (5 * 60 * 1000);
        setState(prev => ({ 
          ...prev, 
          isBlocked: true,
          lockoutEndTime: blockEndTime
        }));
        throw new Error('Demasiados intentos');
      }
  
      const token = response.headers.get('Authorization');

      if (response.ok && token) {
        const verifyData = await AuthService.verifyToken(token, state.deviceId);
        
        if (verifyData.message === 'Token verificado. Login exitoso') {
          setState(prev => ({
            ...prev,
            verifyData,
            loginAttempts: 0,
            modalVisible: true, // Primero mostramos el modal
          }));
        
          setTimeout(() => {
            setUser({
              email,
              token,
              usuario: verifyData.data.usuario,
            });
          }, 1500); // Retrasamos la actualización de `user`
          
        } else {
          setState(prev => ({ 
            ...prev, 
            errorMessage: 'Error en el inicio de sesión',
            errorModalVisible: true
          }));
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          errorMessage: 'Credenciales incorrectas',
          errorModalVisible: true
        }));
      }
    } catch (error) {
      const errorMessage = AuthService.handleLoginError(
        error, 
        state.loginAttempts, 
        (newAttempts) => setState(prev => ({ ...prev, loginAttempts: prev.loginAttempts + 1 }))
      );
      
      setState(prev => ({ 
        ...prev, 
        errorMessage,
        errorModalVisible: true
      }));
    }finally {
      setState(prev => ({ ...prev, isSubmitting: false, isLoading: false }));
    }
  };

  return (
    <LinearGradient colors={['white', '#e2bd27']} style={styles.container}>
      <LogoCard />
      
      <LoginForm
        email={email}
        password={password}
        emailError={state.emailError}
        passwordError={state.passwordError}
        isLoading={state.isLoading || state.modalVisible} // Deshabilitar inputs durante modal
        setEmail={(text) => setEmail(sanitizeInput(text))}
        setPassword={(text) => setPassword(sanitizeInput(text))}
        handleLogin={handleLogin}
      />

    <SuccessModal 
     visible={state.modalVisible} 
     onRequestClose={() => setState(prev => ({ ...prev, modalVisible: false }))} 
    />

    <ErrorModal 
      visible={state.errorModalVisible} 
      message={state.errorMessage}
      onRequestClose={() => setState(prev => ({ ...prev, errorModalVisible: false }))} 
    />

    {state.isLoading && <Loader />}
  </LinearGradient>
);
}