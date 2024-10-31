import { AbstractEntity } from 'src/common/entities/abtract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'Companies' })
export class Company extends AbstractEntity {
  @Column()
  companyShortName: string;

  @Column()
  companyAddress: string;

  @Column()
  companyTaxId: string;

  @Column()
  companyPhoneNumber: string;

  @Column()
  companyEmail: string;
}