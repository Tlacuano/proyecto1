import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const client = mysql.createPool({
    connectionLimit: 50,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE

});

const query = (query: string, params?: any) => {
    return new Promise((resolve, reject) => {
        client.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(query, params, (err, rows) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    });
}

export default query;
