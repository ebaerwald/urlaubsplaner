import { pgTable, serial, text, real, integer } from "drizzle-orm/pg-core";

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name'),
  user_id: integer('user_id'),
  longitude: real('longitude'),
  latitude: real('latitude')
});