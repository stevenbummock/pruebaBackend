import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { CORS } from './constants/cors';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(morgan('dev'));
	app.useGlobalPipes(
		new ValidationPipe({
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	const reflector = app.get(Reflector);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
	const configService = app.get(ConfigService);
	app.setGlobalPrefix('api');
	app.enableCors(CORS);
	await app.listen(configService.get('PORT'));
	console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
