import { API_CONFIG } from '../../config/Config';
import  log  from '../../utils/logger';
import { colorize } from '../../utils/logger';

export const AuthService = {
  async login(email: string, password: string, deviceId: string) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const secureHeaders = {
      'Content-Type': 'application/json',
      'X-Device-ID': deviceId,
      'Cache-Control': 'no-store',
    };

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`, {
        method: 'POST',
        headers: secureHeaders,
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  },

  async verifyToken(token: string, deviceId: string) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.verify}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'X-Device-ID': deviceId,
          'Cache-Control': 'no-store',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en verificación: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en verifyToken:', error);
      throw error;
    }
  },

  handleLoginError(error: unknown, loginAttempts: number, setLoginAttempts: React.Dispatch<React.SetStateAction<number>>) {
    const attemptsLeft = 5 - loginAttempts - 1;
    setLoginAttempts(prev => prev + 1);
    
    let message = 'Error desconocido';
    if (error instanceof Error) {
      message = error.message.includes('abort') ? 'Timeout del servidor' : error.message;
    }
    
    log.error(colorize(`Login fallido. Intentos: ${loginAttempts + 1}`, 'redBright'));
    return message;
  }
};