//importacion de respuesta generica
import { ResponseApi } from "@/kernel/type";

//importacion de los dto y de la entidad
import { CreatePersonDto } from "../../adapters/dtos/create.dto";
import { UpdatePersonDto } from "../../adapters/dtos/update.dto";
import { Person } from "../../entities/person";


//creacion de la interface repository

export interface personRepository {
    //todos los tipados metodos de la entidad (firma de que recibe y que devuelve)
    findAll() : Promise<ResponseApi<Person>>
    findById(payload: number) : Promise<ResponseApi<Person>> // recibe el id de la entidad y retorna una promesa de respuesta de la entidad
    save(payload: CreatePersonDto) : Promise<ResponseApi<Person>> // recibe el dto de creacion y retorna una promesa de respuesta de la entidad
    update(payload: UpdatePersonDto) : Promise<ResponseApi<Person>> // recibe el dto de actualizacion y retorna una promesa de respuesta de la entidad
}