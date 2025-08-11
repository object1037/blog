import { loadEnvFile } from 'node:process'
import { defineConfig } from 'drizzle-kit'

loadEnvFile('./.dev.vars')

export default process.env.LOCAL_DB_PATH
  ? defineConfig({
      dialect: 'sqlite',
      schema: './app/schema.ts',
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    })
  : defineConfig({
      dialect: 'sqlite',
      schema: './app/schema.ts',
      driver: 'd1-http',
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
        databaseId: process.env.DB_ID || '',
        token: process.env.CLOUDFLARE_API_TOKEN || '',
      },
    })
