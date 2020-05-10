/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { App } from './app/app';
import "reflect-metadata";

async function bootstrap() {
  const app = new App()
  await app.start();
}

bootstrap();
