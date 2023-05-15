import express from 'express';

//importacion de los interactors
import { GetPeopleInteractor } from '../use-cases/get-people.interactor';
import { GetPersonInteractor } from '../use-cases/get-person.interactor';
import { SavePersonInteractor } from '../use-cases/save-person.interactor';
import { UpdatePersonInteractor } from '../use-cases/update-person.interactor';

//importacion de los dtos y entidades
import { SavePersonDto } from '../adapters/dtos/save-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';

//importacion del repositorio y gateway
import { PersonRepository } from '../use-cases/ports/person.repository';
import { PersonGateway } from './person.storage.gateway';

export class PersonController {

    async findAllPeople (req: express.Request, res: express.Response) {
        try{
            const repository : PersonRepository = new PersonGateway();
            const interactor : GetPeopleInteractor = new GetPeopleInteractor(repository);

            const response = await interactor.execute();

            return res.json(response);
        }catch(error){
            return res.json(error);
        }
    }

    async findOnePerson (req: express.Request, res: express.Response) {
        try{
            const repository : PersonRepository = new PersonGateway();
            const interactor : GetPersonInteractor = new GetPersonInteractor(repository);

            const { id } = req.params;
            const response = await interactor.execute(parseInt(id));

            return res.json(response);
        }catch(error){
            return res.json(error);
        }
    }

    async updatePerson (req: express.Request, res: express.Response) {
        try{
            const repository : PersonRepository = new PersonGateway();
            const interactor : UpdatePersonInteractor = new UpdatePersonInteractor(repository);

            const { id } = req.params;
            const entity : UpdatePersonDto = req.body;

            const payload : UpdatePersonDto = {
                id: parseInt(id),
                name: entity.name,
                lastname: entity.lastname,
                email: entity.email
            }
            
            const response = await interactor.execute(payload);

            return res.json(response);
        }catch(error){
            return res.json(error);
        }
    }

    async savePerson (req: express.Request, res: express.Response)  {
        try{
            const repository : PersonRepository = new PersonGateway();
            const interactor : SavePersonInteractor = new SavePersonInteractor(repository);

            const entity : SavePersonDto = req.body;

            const payload : SavePersonDto = {
                name: entity.name,
                lastname: entity.lastname,
                email: entity.email
            }

            const response = await interactor.execute(payload);

            return res.json(response);
        }catch(error){
            return res.json(error);
        }
    }
}

const personRouter = express.Router();
const personController = new PersonController();

personRouter.get('/', personController.findAllPeople);
personRouter.get('/:id', personController.findOnePerson);
personRouter.post('/', personController.savePerson);
personRouter.put('/:id', personController.updatePerson);

export default personRouter;