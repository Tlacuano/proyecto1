//importaciones de los dtos y entidades

import { Person } from "../../entities/person";
import { SavePersonDto } from "../../adapters/dtos/save-person.dto";
import { UpdatePersonDto } from "../../adapters/dtos/update-person.dto";
//importacion de la respuesta generica
import { ResponseApi } from "../../../../kernel/types";

//tipado de la firma de los contratos
export interface PersonRepository {
    findAll(): Promise<ResponseApi<Person>>;
    findById(payload: number) : Promise<ResponseApi<Person>>;
    savePerson(payload: SavePersonDto) : Promise<ResponseApi<Person>>;
    updatePerson(payload: UpdatePersonDto) : Promise<ResponseApi<Person>>;
}