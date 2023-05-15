//importacion del repositorio
import { PersonRepository } from "../use-cases/ports/person.repository";

//importacion de los dtos y entidades
import { Person } from "../entities/person";
import { SavePersonDto } from "../adapters/dtos/save-person.dto";
import { UpdatePersonDto } from "../adapters/dtos/update-person.dto";

//importacion de la respuesta generica
import { ResponseApi } from "../../../kernel/types";

//importacion de la conexion a la base de datos
import client from "../../../utils/dbconfig";


export class PersonGateway implements PersonRepository {

    //error generico
    getError() : ResponseApi<Person>{
        return {
            status: 500,
            error: true,
            message: "Error en el servidor",
        } as ResponseApi<Person>
    }

    async findAll(): Promise<ResponseApi<Person>> {
        return await client.query("SELECT * FROM people").then(({rows})=>{
            return {
                status: 200,
                error: false,
                message: rows.length > 0 ? "OK" : "No hay registros",
                data: rows
            } as ResponseApi<Person>
        }).catch((error)=>{
            console.log(error);
            return this.getError();
        })
    }


    async findById(payload: number): Promise<ResponseApi<Person>> {
        return await client.query("SELECT * FROM people WHERE id = $1",[payload]).then(({rows})=>{
            return {
                status: 200,
                error: false,
                message: rows.length > 0 ? "OK" : "No hay registros",
                data: rows[0]
            } as ResponseApi<Person>
        }).catch((error)=>{
            console.log(error);
            return this.getError();
        })
            
    }
    async savePerson(payload: SavePersonDto): Promise<ResponseApi<Person>> {
        console.log(payload)
        return await client.query("INSERT INTO people (name, lastname, email) values ($1,$2,$3)",[payload.name,payload.lastname,payload.email])
        .then(({rows})=>{
            return {
                status: 200,
                error: false,
                message: "OK",
                data: rows[0]
            } as ResponseApi<Person>
        }).catch((error)=>{
            console.log(error);
            return this.getError();
        })
    }
    async updatePerson(payload: UpdatePersonDto): Promise<ResponseApi<Person>> {
        return await client.query("UPDATE people SET name = $1, lastname = $2, email = $3 WHERE id = $4",[payload.name,payload.lastname,payload.email,payload.id])
        .then(({rows})=>{
            return {
                status: 200,
                error: false,
                message: "OK",
                data: rows[0]
            } as ResponseApi<Person>
        }).catch((error)=>{
            console.log(error);
            return this.getError();
        })
    }

}