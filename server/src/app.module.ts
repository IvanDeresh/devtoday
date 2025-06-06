import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RecipesService } from './recipes/recipes.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
