import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from '../ormconfig';
import authRoutes from './routes/auth';
import pacienteRoutes from './routes/Paciente'

dotenv.config();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../..', 'frontend')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend', 'login.html'));
});

app.use('/api/auth', authRoutes);

AppDataSource.initialize()
  .then(() => {
    app.use('/api/pacientes', pacienteRoutes);
    app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
  })
  .catch((err) => console.error('Error al conectar DB:', err));
