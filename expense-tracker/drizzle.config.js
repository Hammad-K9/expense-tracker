// /** @type { import("drizzle-kit").Config } */
// export default {
//   schema: "./utils/schema.js",
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: 'postgresql://neondb_owner:Ofx6nmsPL0Hz@ep-falling-union-a5fcatla.us-east-2.aws.neon.tech/neondb?sslmode=require',
//   }
// };

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL
  },
});