import { Entity } from "@/kernel/type";

//tipado de los identificadores de las entidades
//extiendo el tipado de los identificadores de las entidades para que sea solo number el identificador
export type Person = Entity<number> & {
    id: number;
    name: string;
    lastname: string;
    email: string;
}