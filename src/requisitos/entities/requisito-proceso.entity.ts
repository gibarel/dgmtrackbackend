import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Proceso } from '../../procesos/entities/proceso.entity';

export type EstadoRequisito = 'pendiente' | 'en_gestion' | 'completo' | 'no_aplica';

@Entity('requisitos_proceso')
@Unique(['proceso', 'orden'])
export class RequisitoProceso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proceso, (p) => p.requisitos, { onDelete: 'CASCADE' })
  @Index()
  proceso: Proceso;

  @Column({ type: 'int' })
  orden: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ default: true })
  aplica: boolean;

  @Column({ type: 'text', default: 'pendiente' })
  estado: EstadoRequisito;

  @Column({ nullable: true })
  responsableTexto?: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'int', nullable: true })
  diasEstimados?: number;

  @Column({ type: 'date', nullable: true })
  fechaInicio?: string;

  @Column({ type: 'date', nullable: true })
  fechaFin?: string;
}
