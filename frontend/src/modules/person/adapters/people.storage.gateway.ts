//importacion de respuesta generica
import { ResponseApi } from "@/kernel/type";

//importacion del repositorio
import { personRepository } from "../use-cases/ports/person.repository";

//importacion de los dto y de la entidad
import { CreatePersonDto } from "../adapters/dtos/create.dto";
import { UpdatePersonDto } from "../adapters/dtos/update.dto";
import { Person } from "../entities/person";


//creacion de la clase que implementa la interface repository
export class PeopleStorageGateway implements personRepository {
    
    //creacion de metodo de error
    getError(): ResponseApi<Person> {
        return {
            status: 500,
            error: true,
            message: 'Error en el servidor'
        } as ResponseApi<Person>;
    };


    //implementacion de los metodos de la interface repository agregando async y await
    async findAll(): Promise<ResponseApi<Person>> {
        return await fetch('http://localhost:3000/person/').then(data => data.json())
        .then(({data}) => {
            console.log(data)
            return {
                status: 200,
                error: false,
                message: 'Personas encontradas',
                entities: data
            } as ResponseApi<Person>
        }).catch(() => {
            return this.getError()
        });
    }


    async findById(payload: number): Promise<ResponseApi<Person>> {
        return await fetch(`http://localhost:3000/person/${payload}`).then(data => data.json())
        .then(({data}) => {
            return {
                status: 200,
                error: false,
                message: 'Persona encontrada',
                entity: data
            } as ResponseApi<Person>
        }).catch(() => {
            return this.getError()
        });
    }


    async save(payload: CreatePersonDto): Promise<ResponseApi<Person>> {
        return await fetch(`http://localhost:3000/person/`,{
            method:'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then(()=> {
            return {
                status: 200,
                error: false,
                message: 'registro exitoso',
            } as ResponseApi<Person>
        }).catch(() => this.getError())
    }


    async update(payload: UpdatePersonDto): Promise<ResponseApi<Person>> {
        return await fetch(`http://localhost:3000/person/${payload.id}`,{
            method: 'PUT',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then(()=>{
            return {
                status: 200,
                error: false,
                message: 'actualizacion exitosa',
            } as ResponseApi<Person>
        }).catch(()=>this.getError())
    }
}