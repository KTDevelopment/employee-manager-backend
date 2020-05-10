import { BaseEntity } from '../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Employee } from '../employees/employee.entity';

@Entity()
export class Project extends BaseEntity {

  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ type: 'simple-array' })
  languages: string[];

  @ManyToOne(() => Employee, employee => employee.projects)
  @JoinColumn({ name: 'employeeId' })
  @ValidateNested()
  employee: Employee;
}
