// import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// const {Pool} = pg;

// const pool = new Pool ({
//     user:  process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PORT,
// })

// export default pool;

import {neon} from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

console.log("PGHOST:", PGHOST);
console.log("PGUSER:", PGUSER);
console.log("PGDATABASE:", PGDATABASE);
console.log("PGPASSWORD:", PGPASSWORD ? '*****' : undefined);
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
);
