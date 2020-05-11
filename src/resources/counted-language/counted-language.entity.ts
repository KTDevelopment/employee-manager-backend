import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Employee } from '../employees/employee.entity';

@Entity()
export class CountedLanguage extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  count: number;

  @ManyToOne(() => Employee, employee => employee.countedLanguages, {onDelete: 'CASCADE'})
  employee: Employee;
}
