import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'CUSTOMERS' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  USERNAME: string;
  @Column()
  PASSWORD: string;
  @Column()
  EMAIL: string;
  @Column()
  PHONENUMBER: string;
  @Column()
  FIRSTNAME: string;
  @Column()
  LASTNAME: string;
  @Column()
  BIRTHDATE: string;
  @Column()
  AVATAR: string;
  @Column()
  ISACTIVE: number
  @Column()
  ISDELETED: number
  @Column()
  CREATEDBY: string;
  @Column()
  CREATEDDATE: string;
  @Column()
  UPDATEDBY: string;
  @Column()
  UPDATEDDATE: string;
  @Column()
  COMPANYID: number;
  @Column()
  ADDRESS: string;
//   @Column({ default: true })
//   isActive: boolean;
}