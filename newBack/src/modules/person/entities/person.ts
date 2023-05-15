import { Entity } from "../../../kernel/types";

export type Person = Entity<number> & {
    name: string,
    lastname: string,
    email: string,
}