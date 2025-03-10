"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const winston_config_1 = require("../../config/winston.config");
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.printf(({ timestamp, level, message, stack }) => {
        return stack
            ? `[${timestamp}] ${level.toUpperCase()}: ${message}\nStack: ${stack}`
            : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })),
    transports: [winston_config_1.winstonConfig.transports[0]],
});
//# sourceMappingURL=logger.js.map