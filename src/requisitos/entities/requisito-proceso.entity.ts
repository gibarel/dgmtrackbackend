import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proceso } from '../../procesos/entities/proceso.entity';

@Entity()
export class RequisitoProceso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proceso, (p: Proceso) => p.requisitos, { onDelete: 'CASCADE' })
  proceso: Proceso;

  @Column()
  orden: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ default: true })
  aplica: boolean;

  @Column({ type: 'text', default: 'pendiente' })
  estado: 'pendiente' | 'en_gestion' | 'completo' | 'no_aplica';

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
