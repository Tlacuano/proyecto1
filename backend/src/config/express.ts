import express from 'express';
import cors from 'cors';

const app = express();

import personRouter from '../modules/controller/person/person.controller';


app.set("port", process.env.PORT || 3000);
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));


//http://localhost:3000/
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Este es un servicio rest con typescript :3");
});

//http://localhost:3000/person
app.use("/person", personRouter);

export default app;