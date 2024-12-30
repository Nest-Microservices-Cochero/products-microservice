import 'dotenv/config';
import * as joi from 'joi';

/// 1) Que sea una variable requerida la conexion
interface EnvVars {
  PORT: number;
  ///
  DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    ///
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variables validation failed ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  ///
  databaseUrl: envVars.DATABASE_URL,
};
