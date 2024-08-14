import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from "pg-pool";

const pool = new Pool({
    connectionString: process.env.PSQLCS ?? "postgres://admin:admin1234@db:5432/tripplaner",
})

const db = drizzle(pool);
export default db;