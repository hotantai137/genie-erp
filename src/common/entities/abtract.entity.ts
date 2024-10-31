import { Exclude } from "class-transformer";
import {
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column({default: 1})
  isActive: number;

  @Column({default: 0})
  isDeleted: number;
  
  @Column({type: 'varchar', length: 36})
  @Exclude()
  public createdBy: string;

  @Column({type: 'varchar', length: 12})
  @Exclude()
  public createdAt: string;

  @Column({type: 'varchar', length: 36})
  @Exclude()
  public updatedBy: string;

  @Column({type: 'varchar', length: 12})
  @Exclude()
  public updatedAt: Date;
}