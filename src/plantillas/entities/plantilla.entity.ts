import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlantillaItem } from './plantilla-item.entity';

@Entity('plantillas')
export class Plantilla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  codigo: string;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => PlantillaItem, (i: PlantillaItem) => i.plantilla, { cascade: true })
  items: PlantillaItem[];
}
