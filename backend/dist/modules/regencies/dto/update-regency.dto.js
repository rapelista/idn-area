"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegencyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_regency_dto_1 = require("./create-regency.dto");
class UpdateRegencyDto extends (0, mapped_types_1.PartialType)(create_regency_dto_1.CreateRegencyDto) {
}
exports.UpdateRegencyDto = UpdateRegencyDto;
//# sourceMappingURL=update-regency.dto.js.map