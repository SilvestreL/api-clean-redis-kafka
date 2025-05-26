"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const BaseEntity_1 = require("./BaseEntity");
class Cliente extends BaseEntity_1.BaseEntity {
    constructor(id, nome, email, telefone, createdAt, updatedAt) {
        super(id, createdAt, updatedAt);
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
    updateInfo(nome, email, telefone) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.updateTimestamp();
    }
}
exports.Cliente = Cliente;
