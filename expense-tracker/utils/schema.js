import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

export const Budgets = pgTable('budgets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uid.rnd()),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
});
