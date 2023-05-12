//importacion del tipado de las promesas
import { UseCase } from "@/kernel/contacts";

//importacion del dto y entidad a utilizar
import { Person } from "../entities/person";
import { getPeople} from "../adapters/dtos/getPeople.dto"

//importacion de los repositorio a utilizar
import { personRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "@/kernel/type";


export class FindAllPeopleInteractor implements UseCase<getPeople, ResponseApi<Person>>{

    //constructor del caso de uso
    constructor(private repository: personRepository) {}

    execute(): Promise<ResponseApi<Person>> {
        return this.repository.findAll();
    }

}