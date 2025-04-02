// utils/logger.ts
import { logger } from 'react-native-logs';

// Configurar el logger
const log = logger.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
});

// Función para agregar colores a los mensajes
export const colorize = (message: string, color: string) => {
  const colors: { [key: string]: string } = {
    blueBright: '\x1b[94m',
    yellowBright: '\x1b[93m',
    redBright: '\x1b[91m',
    reset: '\x1b[0m',
  };
  return `${colors[color]}${message}${colors.reset}`;
};

export default log;