import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  COMPANYNAME: string;

  @Column()
  COMPANYSHORTNAME: string;

  @Column()
  COMPANYADDRESS: string;

  @Column()
  COMPANYTAXID: string;

  @Column()
  COMPANYPHONENUMBER: string;

  @Column()
  COMPANYEMAIL: string;

  @Column()
  isActive: number;

  @Column()
  ISDELETED: number;

//   @Column({ default: true })
//   isActive: boolean;
}