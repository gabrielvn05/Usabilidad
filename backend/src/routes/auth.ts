import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../ormconfig';
import { Usuario } from '../entities/Usuario';

const router = express.Router();

router.post('/registro', async (req: Request, res: Response): Promise<void> => {
  const { nombre, correo, contrasena } = req.body;

  const userRepo = AppDataSource.getRepository(Usuario);
  const userExist = await userRepo.findOneBy({ correo });

  if (userExist) {
    res.status(400).json({ mensaje: 'Correo ya registrado' });
    return;
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const newUser = userRepo.create({ nombre, correo, contrasena: hashedPassword });
  await userRepo.save(newUser);

  res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { correo, contrasena } = req.body;

  const userRepo = AppDataSource.getRepository(Usuario);
  const user = await userRepo.findOneBy({ correo });

  if (!user) {
    res.status(400).json({ mensaje: 'Usuario no encontrado' });
    return;
  }

  const valid = await bcrypt.compare(contrasena, user.contrasena);
  if (!valid) {
    res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({
    token,
    usuario: {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol,
    },
  });
});

export default router;
