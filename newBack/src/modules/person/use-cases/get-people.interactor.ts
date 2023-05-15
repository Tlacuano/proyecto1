//importacion del tipado del contrato
import { UseCase } from "../../../kernel/contracts";

//importacion de los dtos y entidades a usar
import { Person } from "../entities/person";

//importacion del repositorio
import { PersonRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "../../../kernel/types";

export class GetPeopleInteractor implements UseCase<null,ResponseApi<Person>>{

    constructor(private repository : PersonRepository){}

    execute() : Promise<ResponseApi<Person>> {
        return this.repository.findAll()
    }

}