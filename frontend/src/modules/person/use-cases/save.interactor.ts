//implementacion del caso de uso
import { UseCase } from "@/kernel/contacts";

//importacion del dto y entidad a utilizar
import { Person } from "../entities/person";
import { CreatePersonDto } from "../adapters/dtos/create.dto";

//importacion de los repositorio a utilizar
import { personRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "@/kernel/type";

export class SavePersonInteractor implements UseCase<CreatePersonDto, ResponseApi<Person>>{

    constructor (private repository : personRepository) {}

    execute(payload : CreatePersonDto): Promise<ResponseApi<Person>> {
        const response = this.repository.save(payload);
        return response;
    }
    
}