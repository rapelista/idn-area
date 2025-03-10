"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
exports.winstonConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('IDN-AREA BE', {
                colors: true,
                prettyPrint: true,
                processId: true,
                appName: true,
            })),
        }),
    ],
};
//# sourceMappingURL=winston.config.js.map