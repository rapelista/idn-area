import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('IDN-AREA BE', {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true,
        }),
      ),
    }),
    // new winston.transports.File({
    //   filename: 'logs/application-%DATE%.log',
    //   datePattern: 'YYYY-MM-DD',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.ms(),
    //     nestWinstonModuleUtilities.format.nestLike('SCRAPING ENGINE', {
    //       colors: false,
    //       prettyPrint: true,
    //       processId: true,
    //       appName: true,
    //     }),
    //   ),
    // }),
  ],
};
