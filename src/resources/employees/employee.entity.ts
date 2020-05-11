import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Project } from '../projects/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Employee extends BaseEntity {

  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({ readOnly: true })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ readOnly: true, type: () => Project, isArray: true })
  @OneToMany(() => Project, project => project.employee, { cascade: true })
  @ValidateNested()
  projects: Project[];
}
