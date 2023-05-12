//implementacion del caso de uso
import { UseCase } from "@/kernel/contacts";

//importacion del dto y entidad a utilizar
import { Person } from "../entities/person";

//importacion de los repositorio a utilizar
import { personRepository } from "./ports/person.repository";

//importacion de la respuesta generica
import { ResponseApi } from "@/kernel/type";

export class FindOnePersonInteractor implements UseCase<number, ResponseApi<Person>>{

    //constructor del caso de uso
    constructor(private repository: personRepository) { }

    execute(payload : number): Promise<ResponseApi<Person>> {
        return this.repository.findById(payload);
    }

}