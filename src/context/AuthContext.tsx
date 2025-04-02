import React, { createContext, useContext, useState, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';

// Tipos fuertes (reemplaza 'any' con tu interfaz de usuario real)
type UserData = {
  id: number;
  nombre: string;
  vehiculo: {
    tipo: string;
    matricula: string;
  };
  sucursal: string;
};

type User = {
  email: string;
  token: string;
  usuario: UserData; // Tipo específico
  timestamp?: number; // Para control de expiración
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  resetNavigation?: () => void; // Nueva función
};

const AuthContext = createContext<AuthContextType | null>(null);

// Claves para EncryptedStorage
const USER_KEY = 'secure_user';
const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 horas

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario de EncryptedStorage con validación
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonUser = await EncryptedStorage.getItem(USER_KEY);
        if (jsonUser) {
          const parsedUser = JSON.parse(jsonUser) as User;
          
          // Validar expiración del token
          if (parsedUser.timestamp && Date.now() - parsedUser.timestamp > TOKEN_EXPIRATION_MS) {
            await EncryptedStorage.removeItem(USER_KEY);
            return;
          }
          
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        await EncryptedStorage.removeItem(USER_KEY);
      }
    };
    loadUser();
  }, []);

  // Guardar/eliminar usuario en EncryptedStorage
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          const userWithTimestamp = { ...user, timestamp: Date.now() };
          await EncryptedStorage.setItem(USER_KEY, JSON.stringify(userWithTimestamp));
        } else {
            await EncryptedStorage.removeItem(USER_KEY);
        }
      } catch (error) {
        console.error('Error saving user:', error);
      }
    };
    saveUser();
  }, [user]);

  // Logout seguro
  const logout = async () => {
    try {
      setUser(null);
      await EncryptedStorage.removeItem(USER_KEY);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión correctamente');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};