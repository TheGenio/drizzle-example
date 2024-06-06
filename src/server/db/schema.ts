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

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kfupm-g-todo_${name}`);

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


