import {betterAuth} from "better-auth";
import {url, authToken} from '@/lib/db'
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

const db = new Kysely({
    dialect: new LibsqlDialect({
        url,authToken
    }),
});
export const auth = betterAuth({
    database : {db, type: "sqlite",},
    emailAndPassword: { enabled: true }
})
