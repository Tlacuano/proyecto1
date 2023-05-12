"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.findAll = void 0;
const dbpg_1 = __importDefault(require("../../../utils/dbpg"));
//////////////////////////////////////////////////////////MYSQL/////////////////////////////////////////
/*
const findAll = async () => {
    const sql = `SELECT * FROM people`;
    return await query(sql, []);
};

const findById = async (person : Person) => {
    const sql = `SELECT * FROM people WHERE id = ?`;
    return await query(sql, [person.id]);
};

const create = async (person : Person) => {
    const sql = `INSERT INTO people (name, lastname, email) VALUES (?, ?, ?)`;
    return await query(sql, [person.name, person.lastname, person.email]);
};

const update = async (person : Person) => {
    const sql = `UPDATE people SET name = ?, lastname = ?, email = ? WHERE id = ?`;
    return await query(sql, [person.name, person.lastname, person.email, person.id]);
};

const remove = async (id: number) => {
    const sql = `DELETE FROM people WHERE id = ?`;
    return await query(sql, [id]);
};
*/
////////////////////////////////////////////////POSTGRES//////////////////////////////////////////
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dbpg_1.default.query('SELECT * FROM people').then(({ rows }) => {
        const pople = {
            code: 200,
            error: false,
            message: rows.length !== 0 ? "OK" : "EMPTY",
            data: rows,
        };
        console.log(pople);
        return pople;
    }).catch(err => {
        return {
            code: 500,
            error: true,
            message: err.message,
            data: [],
        };
    });
});
exports.findAll = findAll;
const findById = (person) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.findById = findById;
const create = (person) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.create = create;
const update = (person) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.remove = remove;
