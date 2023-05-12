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
const express_1 = __importDefault(require("express"));
const person_gateway_1 = require("./person.gateway");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield (0, person_gateway_1.findAll)();
        console.log(people);
        res.json(people);
    }
    catch (err) {
        console.log(err);
    }
});
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = {
            id: parseInt(id),
            name: '',
            lastname: '',
            email: ''
        };
        const person = yield (0, person_gateway_1.findById)(payload);
        res.json(person);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: { err } });
    }
});
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, email } = req.body;
        const payload = {
            id: 0,
            name,
            lastname,
            email
        };
        const person = yield (0, person_gateway_1.create)(payload);
        res.json(person);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: { err } });
    }
});
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, lastname, email } = req.body;
        const payload = {
            id: parseInt(id),
            name,
            lastname,
            email
        };
        const person = yield (0, person_gateway_1.update)(payload);
        res.json(person);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: { err } });
    }
});
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const person = yield (0, person_gateway_1.remove)(parseInt(id));
        res.json(person);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: { err } });
    }
});
const personRouter = express_1.default.Router();
personRouter.get('/', getAll);
personRouter.get('/:id', getOne);
personRouter.post('/', createOne);
personRouter.put('/:id', updateOne);
personRouter.delete('/:id', deleteOne);
exports.default = personRouter;
