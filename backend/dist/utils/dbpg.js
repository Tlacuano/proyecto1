"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const connection = {
    user: 'postgres',
    host: '',
    database: 'proyecto1',
    password: 'root',
    port: 5432,
};
const client = new pg_1.default.Client(connection);
client.connect();
exports.default = client;
