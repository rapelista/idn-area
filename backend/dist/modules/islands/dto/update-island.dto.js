"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIslandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_island_dto_1 = require("./create-island.dto");
class UpdateIslandDto extends (0, swagger_1.PartialType)(create_island_dto_1.CreateIslandDto) {
}
exports.UpdateIslandDto = UpdateIslandDto;
//# sourceMappingURL=update-island.dto.js.map