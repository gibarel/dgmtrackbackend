import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly repo: Repository<Departamento>,
  ) {}

  create(dto: CreateDepartamentoDto) {
    const dep = this.repo.create(dto);
    return this.repo.save(dep);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const dep = await this.repo.findOne({ where: { id } });
    if (!dep) throw new NotFoundException('Departamento no encontrado');
    return dep;
  }

  async update(id: number, dto: UpdateDepartamentoDto) {
    const dep = await this.findOne(id);
    Object.assign(dep, dto);
    return this.repo.save(dep);
  }

  async remove(id: number) {
    const dep = await this.findOne(id);
    await this.repo.remove(dep);
    return { deleted: true };
  }
}
