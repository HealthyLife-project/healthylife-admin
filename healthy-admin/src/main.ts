import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('HealthyLife API') // API 이름
    .setDescription('The HealthyLife API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Swagger 문서 생성
  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI 설정
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
