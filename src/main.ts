import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './document/setupSwagger';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // // Some Configuration for API (Not about Swagger)
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  // // Setting API Path
  // const apiPath = 'api';
  // app.setGlobalPrefix(apiPath);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new ResponseInterceptor());
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
