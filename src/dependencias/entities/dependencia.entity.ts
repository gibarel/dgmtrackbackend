import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dependencias')
export class Dependencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Dependencia, (d) => d.hijos, { nullable: true, onDelete: 'SET NULL' })
  padre?: Dependencia;

  @OneToMany(() => Dependencia, (d) => d.padre)
  hijos: Dependencia[];
}
