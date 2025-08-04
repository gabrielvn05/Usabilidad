import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Paciente } from '../entities/Paciente';

const router = Router();
const pacienteRepository = AppDataSource.getRepository(Paciente);

/**
 * 📌 Obtener todos los pacientes
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const pacientes = await pacienteRepository.find();
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los pacientes' });
  }
});

/**
 * 📌 Crear un nuevo paciente
 */
router.post('/nuevo', async (req: Request, res: Response) => {
  const { nombres, apellidos, cedula, sexo, edad, celular, correo } = req.body;

  try {
    const nuevoPaciente = pacienteRepository.create({
      nombres,
      apellidos,
      cedula,
      sexo,
      edad,
      celular,
      correo,
    });

    await pacienteRepository.save(nuevoPaciente);
    res.status(201).json({ mensaje: 'Paciente registrado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el paciente' });
  }
});

/**
 * 📌 Actualizar un paciente existente
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const datos = req.body;

  try {
    const paciente = await pacienteRepository.findOneBy({ id: Number(id) });
    if (!paciente) {
      res.status(404).json({ mensaje: 'Paciente no encontrado' });
      return;
    }

    pacienteRepository.merge(paciente, datos);
    const pacienteActualizado = await pacienteRepository.save(paciente);

    res.json({ mensaje: 'Paciente actualizado correctamente', paciente: pacienteActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el paciente' });
  }
});

/**
 * 📌 Eliminar un paciente
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const paciente = await pacienteRepository.findOneBy({ id: Number(id) });
    if (!paciente) {
      res.status(404).json({ mensaje: 'Paciente no encontrado' });
      return;
    }

    await pacienteRepository.remove(paciente);
    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el paciente' });
  }
});


export default router;
