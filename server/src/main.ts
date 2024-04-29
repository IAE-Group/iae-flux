import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { appConfig } from './config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: Array.from(appConfig.corsAllowedOrigins),
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Flux Server')
    .setDescription('@codegasms')
    .setVersion('1.0')
    .addCookieAuth('accessToken')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (
        Array.isArray(method.security) &&
        method.security.includes('public')
      ) {
        method.security = [];
      }
    });
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.SERVER_PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
