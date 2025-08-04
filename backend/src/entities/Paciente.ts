import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  cedula: string;

  @Column()
  sexo: string;

  @Column()
  edad: number;

  @Column()
  celular: string;

  @Column()
  correo: string;
}
