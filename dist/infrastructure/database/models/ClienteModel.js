"use strict";
// src/infrastructure/database/models/ClienteModel.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const mongoose_1 = require("mongoose");
const ClienteSchema = new mongoose_1.Schema({
    _id: {
        type: String, // ← UUID como ID principal
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telefone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, //  createdAt + updatedAt
    versionKey: false,
});
exports.ClienteModel = (0, mongoose_1.model)('Cliente', ClienteSchema);
