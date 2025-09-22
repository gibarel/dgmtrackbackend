import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dependencia } from '../../dependencias/entities/dependencia.entity';

export type ProcesoEstado = 'pendiente' | 'en_progreso' | 'finalizado' | 'cancelado';

@Entity('procesos')
export class Proceso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', default: 'pendiente' })
  estado: ProcesoEstado;

  @Column({ type: 'date', nullable: true })
  fechaInicio?: string;

  @Column({ type: 'date', nullable: true })
  fechaFin?: string;

  @Column({ type: 'integer', nullable: true })
  diasEstimados?: number;

  @Column({ type: 'numeric', nullable: true })
  montoPrevisto?: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToMany(() => Dependencia, { eager: true })
  @JoinTable()
  dependencias: Dependencia[];
}
