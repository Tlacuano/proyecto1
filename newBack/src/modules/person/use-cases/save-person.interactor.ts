//importacion del tipado del contrato
import { UseCase } from "../../../kernel/contracts";

//importacion de los dtos y entidades a usar
import { Person } from "../entities/person";
import { SavePersonDto } from "../adapters/dtos/save-person.dto";

//importacion del repositorio
import { PersonRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "../../../kernel/types";

export class SavePersonInteractor implements UseCase<SavePersonDto, ResponseApi<Person>>{
    constructor(private repository : PersonRepository){}

    execute(payload: SavePersonDto): Promise<ResponseApi<Person>> {
        return this.repository.savePerson(payload);
    }

}