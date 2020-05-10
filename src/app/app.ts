import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export class App {
  private app: INestApplication;

  async start() {
    this.app = await NestFactory.create(AppModule);
    this.configureNest();
    this.addSwagger();
    const port = this.app.get(ConfigService).get('port')
    await this.app.listen(port, () => {
      Logger.log('Listening at http://localhost:' + port);
    });
  }

  private configureNest() {
    this.app.enableCors({
      origin: '*',
      methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      allowedHeaders: 'X-Requested-With, content-type, Authorization',
      credentials: true
    });
  }

  private addSwagger() {
    const options = new DocumentBuilder()
      .setTitle('Employee-Manager-Backend')
      .setDescription('')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, options);
    const docPath = '/documentation';
    SwaggerModule.setup(docPath, this.app, document);
  }
}
