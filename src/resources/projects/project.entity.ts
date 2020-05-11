import { BaseEntity } from '../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Employee } from '../employees/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project extends BaseEntity {

  @ApiProperty({readOnly: true})
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({readOnly: true})
  @Column()
  @IsString()
  name: string;

  @ApiProperty({readOnly: true})
  @Column({ type: 'simple-array' })
  languages: string[];

  @ApiProperty({readOnly: true, type: () =>Employee})
  @ManyToOne(() => Employee, employee => employee.projects, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'employeeId' })
  @ValidateNested()
  employee: Employee;
}
