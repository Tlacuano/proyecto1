//tipado de los identificadores de las entidades
export type Entity<Tidentifier extends number | string> = {
    id?: Tidentifier;
}

//tipado de las respuestas de las apis
export type ResponseApi<T> = {
    status: number,
    error: boolean,
    message: string,
    data: T[]
}