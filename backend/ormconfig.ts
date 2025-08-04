import 'dotenv/config'; 
import { DataSource } from 'typeorm';
import { Usuario } from './src/entities/Usuario';
import { Paciente } from './src/entities/Paciente';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: false,
  entities: [Usuario, Paciente],
});
