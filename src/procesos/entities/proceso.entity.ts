import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dependencia } from '../../dependencias/entities/dependencia.entity';
import { RequisitoProceso } from '../../requisitos/entities/requisito-proceso.entity';


@Entity()
export class Proceso {
  @PrimaryGeneratedColumn()
  id: number;

  // Identificación
  @Column({ nullable: true })
  numeroExpediente?: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  tipoActo?: string;

  @Column({ nullable: true })
  caso?: string; // CASCOS, UNIMOG, etc.

  // Resumen ejecutivo
  @Column({ type: 'text', nullable: true })
  situacionActual?: string;

  @Column({ type: 'text', nullable: true })
  puntosPrincipales?: string;

  // Estado sistémico
  @Column({
    type: 'text',
    default: 'pendiente',
  })
  estado: 'pendiente' | 'en_progreso' | 'finalizado' | 'cancelado';

  // Fechas generales
  @Column({ type: 'date', nullable: true })
  fechaInicio?: string;

  @Column({ type: 'date', nullable: true })
  fechaFin?: string;

  // Presupuesto (fase inicial)
  @Column({ type: 'numeric', nullable: true })
  montoPrevisto?: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'int', nullable: true })
  diasEstimados?: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  // Relaciones
  @ManyToMany(() => Dependencia, { eager: true })
  @JoinTable()
  dependencias: Dependencia[];

  @OneToMany(() => RequisitoProceso, (r: RequisitoProceso) => r.proceso, { cascade: true })
  requisitos: RequisitoProceso[];
}
