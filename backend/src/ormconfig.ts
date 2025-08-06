import 'dotenv/config'; 
import { DataSource } from 'typeorm';
import { Usuario } from './entities/Usuario';
import { Paciente } from './entities/Paciente';

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
