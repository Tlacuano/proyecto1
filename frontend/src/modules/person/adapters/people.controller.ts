//importacion de la respuesta generica
import { ResponseApi } from "@/kernel/type";

//importacion de los intercepores
import { FindAllPeopleInteractor } from "../use-cases/findAll.interactor";
import { FindOnePersonInteractor } from "../use-cases/findOne.interactor";
import { SavePersonInteractor } from "../use-cases/save.interactor";
import { UpdatePersonInteractor } from "../use-cases/update.interactor";

//importacion del gateway y el repositorio
import { PeopleStorageGateway } from "./people.storage.gateway";
import { personRepository } from './../use-cases/ports/person.repository'; 

//importacion de los dtos y entidades
import { CreatePersonDto } from "../adapters/dtos/create.dto";
import { UpdatePersonDto } from "../adapters/dtos/update.dto";
import { Person } from "../entities/person";


export class PersonController {

    findAllPeople(){
        //creacion del repositorio segun el principio de inversion de dependencias
        const repository : personRepository = new PeopleStorageGateway();
        //creacion del caso de uso segun el principio de inversion de dependencias
        const interactor : FindAllPeopleInteractor = new FindAllPeopleInteractor(repository);

        try {
            //ejecucion del caso de uso
            return interactor.execute(); 
        }catch(error){
            //manejo de errores
            return {
                status: 500,
                error: true,
                message: 'Error en el servidor',
            } as ResponseApi<Person>
        }
    }

    findOnePerson(id : number){
        const repository : personRepository = new PeopleStorageGateway();
        const interactor : FindOnePersonInteractor = new FindOnePersonInteractor(repository);

        try {
            return interactor.execute(id);
        }catch(error){
            return {
                status: 500,
                error: true,
                message: 'Error en el servidor',
            } as ResponseApi<Person>
        }
    }

    savePerson(payload : CreatePersonDto){
        const repository : personRepository = new PeopleStorageGateway();
        const interactor : SavePersonInteractor = new SavePersonInteractor(repository);

        try {
            return interactor.execute(payload);
        }catch(error){
            return {
                status: 500,
                error: true,
                message: 'Error en el servidor',
            } as ResponseApi<Person>
        }
    }

    updatePerson(payload : UpdatePersonDto){
        const repository : personRepository = new PeopleStorageGateway();
        const interactor : UpdatePersonInteractor = new UpdatePersonInteractor(repository);

        try {
            return interactor.execute(payload);
        }catch(error){
            return {
                status: 500,
                error: true,
                message: 'Error en el servidor',
            } as ResponseApi<Person>
        }
    }
}


