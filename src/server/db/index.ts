

import * as schema from "./schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


const client = postgres(process.env.DATABASE_URL!);


// Use this object to send drizzle queries to your DB
export const db = drizzle(client, { schema });
