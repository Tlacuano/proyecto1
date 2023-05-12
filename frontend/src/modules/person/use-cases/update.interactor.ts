//importacion del caso de uso
import { UseCase } from "@/kernel/contacts";

//importacion del dto y entidad a utilizar
import { Person } from "../entities/person";
import { UpdatePersonDto } from "../adapters/dtos/update.dto";

//importacion de los repositorio a utilizar
import { personRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "@/kernel/type";

export class UpdatePersonInteractor implements UseCase<UpdatePersonDto, ResponseApi<Person>>{

    constructor (private repository : personRepository) {}
    
    execute(payload : UpdatePersonDto): Promise<ResponseApi<Person>> {
        return this.repository.update(payload);
    }

    

}