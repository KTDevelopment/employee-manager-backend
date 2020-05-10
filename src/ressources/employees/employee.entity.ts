import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Project } from '../projects/project.entity';

@Entity()
export class Employee extends BaseEntity {

  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id: number;

  @Column()
  @IsString()
  name: string;

  @OneToMany(() => Project, project => project.employee)
  @ValidateNested()
  projects: Project[];
}
