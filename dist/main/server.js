"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongo_connection_1 = require("../infrastructure/database/mongo.connection");
const PORT = process.env.PORT || 3000;
(async () => {
    await (0, mongo_connection_1.connectMongo)();
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
})();
