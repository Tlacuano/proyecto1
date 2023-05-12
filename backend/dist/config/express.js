"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const person_controller_1 = __importDefault(require("../modules/controller/person/person.controller"));
app.set("port", process.env.PORT || 3000);
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json({ limit: "50mb" }));
//http://localhost:3000/
app.get("/", (req, res) => {
    res.send("Este es un servicio rest con typescript :3");
});
//http://localhost:3000/person
app.use("/person", person_controller_1.default);
exports.default = app;
