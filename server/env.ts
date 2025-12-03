import { type } from "arktype";

const envSchema = type({
  AIRTABLE_API_KEY: "string",
  AIRTABLE_BASE_ID: "string",
  AIRTABLE_TABLE_NAME: "string",
  "PORT?": "string",
});

const parsed = envSchema(process.env);

if (parsed instanceof type.errors) {
  console.error("Environment validation failed:");
  console.error(parsed.summary);
  process.exit(1);
}

export const env = parsed;
