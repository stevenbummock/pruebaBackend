import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			...DataSourceConfig,
			...(process.env.NODE_ENV === 'development' ? { synchronize: true, autoLoadEntities: true } : {}),
		}),
		UsersModule,
		AuthModule,
		CategoriesModule,
		ProductsModule,
	],
})
export class AppModule {}
