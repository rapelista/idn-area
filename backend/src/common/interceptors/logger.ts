import { createLogger, format } from 'winston';
import { winstonConfig } from '../../config/winston.config';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `[${timestamp}] ${level.toUpperCase()}: ${message}\nStack: ${stack}`
        : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [winstonConfig.transports[0]],
});
