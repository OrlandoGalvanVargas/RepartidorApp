import Config from 'react-native-config';

// Usa constantes para los valores por defecto (idealmente para desarrollo)
const DEFAULT_API_URL = 'https://dev-api.example.com'; 
const DEFAULT_RUTAS_URL = 'https://dev-rutas.example.com';

export const API_CONFIG = {
  baseUrl: Config.API_BASE_URL || DEFAULT_API_URL,
  endpoints: {
    login: '/login',
    verify: '/verify'
  },
  rutasUrl: Config.API_BASE_URL_RUTAS || DEFAULT_RUTAS_URL,
} as const;

export type ApiConfig = typeof API_CONFIG;
