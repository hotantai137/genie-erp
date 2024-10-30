import { DeepPartial, DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOneById(id: FindOptionsWhere<T>): Promise<T> {
    return await this.repository.findOneBy(id);
  }

//   async create(data: DeepPartial<T> ) {
//    return await this.repository.save(data);
//   }

//   async update(id: FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>) {
//    return await this.repository.update(id, partialEntity);
//   }

//   async delete(id: FindConditions<T>): Promise<DeleteResult> {
//     return await this.repository.delete(id);
//   }
}