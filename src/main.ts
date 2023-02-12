import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { BasicAuth } from './types/basic-auth.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const version = configService.get<string>('version');
  const basicAuthInfo = configService.get<BasicAuth>('basicAuth');
  const docsPath = '/' + version + '/docs';

  app.setGlobalPrefix(version + '/api');

  app.use(
    docsPath,
    basicAuth({
      challenge: true,
      users: {
        [basicAuthInfo.username]: basicAuthInfo.password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('e-commerce API')
    .setDescription('API List for my e-commerce')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsPath, app, document);

  await app.listen(configService.get<number>('port'));
}
bootstrap();
