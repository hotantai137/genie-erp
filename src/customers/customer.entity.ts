import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abtract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ 
  name: 'Customers',
  synchronize: true,
})
export class Customer extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;

  @Column()
  avatar: string;

  @Column()
  address: string;

  @Column({ nullable: false })
  companyId: number;
}