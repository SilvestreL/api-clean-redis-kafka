"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cliente_routes_1 = __importDefault(require("../interfaces/routes/cliente.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cliente_routes_1.default); // ← importantíssimo
exports.default = app;
