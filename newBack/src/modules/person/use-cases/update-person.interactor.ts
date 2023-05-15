//importacion del tipado del contrato
import { UseCase } from "../../../kernel/contracts";

//importacion de los dtos y entidades a usar
import { Person } from "../entities/person";
import { UpdatePersonDto } from "../adapters/dtos/update-person.dto";

//importacion del repositorio
import { PersonRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "../../../kernel/types";

export class UpdatePersonInteractor implements UseCase<UpdatePersonDto, ResponseApi<Person>>{
    constructor(private repository : PersonRepository){}

    execute(payload: UpdatePersonDto): Promise<ResponseApi<Person>> {
        return this.repository.updatePerson(payload);
    }
}