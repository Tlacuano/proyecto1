import e from "express";
import query from "../../../utils/mysql";
import {Person} from "./person.model";
import client from "../../../utils/dbpg";


//////////////////////////////////////////////////////////MYSQL/////////////////////////////////////////
/*
const findAll = async () => {
    const sql = `SELECT * FROM people`;
    return await query(sql, []);
};

const findById = async (person : Person) => {
    const sql = `SELECT * FROM people WHERE id = ?`;
    return await query(sql, [person.id]);
};

const create = async (person : Person) => {
    const sql = `INSERT INTO people (name, lastname, email) VALUES (?, ?, ?)`;
    return await query(sql, [person.name, person.lastname, person.email]);
};

const update = async (person : Person) => {
    const sql = `UPDATE people SET name = ?, lastname = ?, email = ? WHERE id = ?`;
    return await query(sql, [person.name, person.lastname, person.email, person.id]);
};

const remove = async (id: number) => {
    const sql = `DELETE FROM people WHERE id = ?`;
    return await query(sql, [id]);
};
*/
////////////////////////////////////////////////POSTGRES//////////////////////////////////////////


const findAll = async () => {
    return await client.query('SELECT * FROM people').then(({rows}) => {
        const people = {
            code: 200,
            error: false,
            message:  rows.length !== 0 ? "OK" : "EMPTY",
            data: rows,
        }
        return people;

    }).catch(err => {
        return {
            code: 500,
            error: true,
            message: err.message,
            data: [],
        }
    });
    
};

const findById = async (person : Person) => {
    return await client.query('SELECT * FROM people WHERE id = $1', [person.id]).then(({rows}) => {
        const people = {
            code: 200,
            error: false,
            message:  rows.length !== 0 ? "OK" : "EMPTY",
            data: rows,
        }
        return people;

    }).catch(err => {
        return {
            code: 500,
            error: true,
            message: err.message,
            data: [],
        }
    });
};

const create = async (person : Person) => {
    return await client.query('INSERT INTO people (name, lastname, email) VALUES ($1, $2, $3)', 
            [person.name, person.lastname, person.email]).then(({rows}) => {

        const people = {
            code: 200,
            error: false,
            message:  rows.length !== 0 ? "OK" : "EMPTY",
            data: rows,
        }
        return people;

    }).catch(err => {
        return {
            code: 500,
            error: true,
            message: err.message,
            data: [],
        }
    });
};

const update = async (person : Person) => {
    return await client.query('UPDATE people SET name = $1, lastname = $2, email = $3 WHERE id = $4',
        [person.name, person.lastname, person.email, person.id]).then(({rows}) => {
        const people = {
            code: 200,
            error: false,
            message:  rows.length !== 0 ? "OK" : "EMPTY",
            data: rows,
        }
        return people;

        }).catch(err => {
            return {
                code: 500,
                error: true,
                message: err.message,
                data: [],
            }
        });
};

const remove = async (id: number) => {
};



export {findAll, findById, create, update, remove};
