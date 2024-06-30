import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_davelin",
    password: "EwN6FNCeAYK*q#9",
    database: "freedb_crudpontotrack",
});