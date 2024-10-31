import { Company } from 'src/companies/company.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    inject: [],
    useFactory: async () => {
      try{
        const dataSource = new DataSource({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [
              // Company
              __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        });
        await dataSource.initialize(); // initialize the data source
        console.log('Database connected successfully');
        
        return dataSource;
      }catch(error){
        console.log('Error connecting to database');
        throw error;
      }
    },
  },
];