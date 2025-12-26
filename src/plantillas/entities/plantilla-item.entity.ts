import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Plantilla } from './plantilla.entity';

@Entity('plantillas_items')
@Unique(['plantilla', 'orden'])
export class PlantillaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plantilla, (p: Plantilla) => p.items, { onDelete: 'CASCADE' })
  @Index()
  plantilla: Plantilla;

  @Column({ type: 'int' })
  orden: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ default: true })
  aplica: boolean;

  @Column({ type: 'int', nullable: true })
  diasEstimados?: number;
}
