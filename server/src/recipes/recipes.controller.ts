import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { FilterRecipesDto } from './dto/filter-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getRecipes(@Query() filterDto: FilterRecipesDto) {
    return this.recipesService.getRecipes(filterDto);
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string) {
    return this.recipesService.getRecipeById(id);
  }
}
