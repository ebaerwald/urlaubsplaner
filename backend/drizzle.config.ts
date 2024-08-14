import type { Config } from "drizzle-kit";

export default {
        schema: "./src/db/schemas/*",
        out: "./src/db/migrations",
        dbCredentials: {
            connectionString: process.env.PSQLCS ?? "postgres://admin:admin1234@db:5432/tripplaner",
        },
        driver: "pg",
} satisfies Config;