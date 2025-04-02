import Config from 'react-native-config'

export const API_CONFIG = {
    baseUrl: Config.API_BASE_URL || 'https://domain.example.com',
    endpoints: {
      login: '/login',
      verify: '/verify'
    },
    rutasUrl: Config.API_BASE_URL_RUTAS || 'https://default-rutas-url.com',
  } as const;
