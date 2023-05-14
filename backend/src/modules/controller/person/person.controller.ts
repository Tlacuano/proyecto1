import express from 'express';
import {findAll, findById, update, remove, create} from './person.gateway';
import {Person} from "./person.model";


const getAll = async(req : express.Request, res : express.Response) => {
    try{
        const people:any = await findAll();
        res.json(people);
    }catch(err){
        console.log(err);
    }
}

const getOne = async(req : express.Request, res : express.Response) => {
    try{
        const {id} = req.params;

        const payload : Person = {
            id: parseInt(id),
            name: '',
            lastname: '',
            email: ''
        }
        const person = await findById(payload);
        res.json(person);
    }catch(err){
        console.log(err);
        res.status(404).json({message: {err}});
    }
}

const createOne = async(req : express.Request, res : express.Response) => {
    try{
        const {name, lastname, email} = req.body;

        const payload : Person = {
            id: 0,
            name,
            lastname,
            email
        }

        const person = await create(payload);
        res.json(person);
    }catch(err){
        console.log(err);
        res.status(404).json({message: {err}});
    }
}

const updateOne = async(req : express.Request, res : express.Response) => {
    try{
        const {id} = req.params;
        const {name, lastname, email} = req.body;

        const payload : Person = { 
            id: parseInt(id),
            name,
            lastname,
            email
        }

        const person = await update(payload);
        res.json(person);
    }catch(err){
        console.log(err);
        res.status(404).json({message: {err}});
    }
}

const deleteOne = async(req : express.Request, res : express.Response) => {
    try{
        const {id} = req.params;
        const person = await remove(parseInt(id));
        res.json(person);
    }catch(err){
        console.log(err);
        res.status(404).json({message: {err}});
    }
}

const personRouter = express.Router();

personRouter.get('/', getAll);
personRouter.get('/:id', getOne);
personRouter.post('/', createOne);
personRouter.put('/:id', updateOne);
personRouter.delete('/:id', deleteOne);




export default personRouter;