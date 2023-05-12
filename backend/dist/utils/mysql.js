"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = mysql_1.default.createPool({
    connectionLimit: 50,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
const query = (query, params) => {
    return new Promise((resolve, reject) => {
        client.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(query, params, (err, rows) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    });
};
exports.default = query;
