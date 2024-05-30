import { pgTable, varchar, text, numeric, integer } from 'drizzle-orm/pg-core';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

export const Budgets = pgTable('budgets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uid.rnd()),
  name: varchar('name').notNull(),
  allocatedAmount: numeric('allocatedAmount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull(),
  createdAt: numeric('createdAt').notNull()
});

export const Expenses = pgTable('expenses', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uid.rnd()),
  name: varchar('name').notNull(),
  allocatedAmount: numeric('allocatedAmount').notNull(),
  budgetId: text('budgetId').references(() => Budgets.id),
  createdAt: varchar('createdAt').notNull()
});
