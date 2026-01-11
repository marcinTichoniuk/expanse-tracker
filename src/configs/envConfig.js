import z, { ZodError } from 'zod';
import { NUMERIC_STRING_REGEX } from '../constants/regex.js';

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'test', 'development']).default('development'),
  PORT: z
    .string()
    .regex(NUMERIC_STRING_REGEX, { error: 'PORT must be a numeric string' })
    .transform((value) => parseInt(value, 10))
    .pipe(z.number().min(1).max(65535)),
  DB_URI: z.string().regex(/^mongodb(\+srv)?:\/\//, { error: 'DB_URI must start with mongodb:// or mongodb+srv://' }),
});

const parsedEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      console.dir(z.treeifyError(error), { depth: 3 });
    } else {
      console.error(`Failed to parse env: ${error.message}`);
    }
    process.exit(1);
  }
};

export const envConfig = parsedEnv();
