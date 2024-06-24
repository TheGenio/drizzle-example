// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { is, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `testing_${name}`);

export const users = createTable("users", {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  forgotPasswordToken: varchar("forgot_password_token", { length: 256 }),
  forgotPasswordTokenExpiry: timestamp("forgot_password_token_expiry"),
  verifyToken: varchar("verify_token", { length: 256 }),
  verifyTokenExpiry: timestamp("verify_token_expiry"),

});


export const majors = createTable("majors", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  code: varchar("code", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const subjects = createTable("majors", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  code: varchar("code", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})


