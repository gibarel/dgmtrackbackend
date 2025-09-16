import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;
}
