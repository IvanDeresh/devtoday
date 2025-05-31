import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { FilterRecipesDto } from './dto/filter-recipes.dto';

@Injectable()
export class RecipesService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('RECIPE_API_URL');
  }

  async getRecipes(filters: FilterRecipesDto) {
    let url = `${this.apiUrl}/search.php?s=`;

    if (filters.ingredient) {
      url = `${this.apiUrl}/filter.php?i=${filters.ingredient}`;
    } else if (filters.area) {
      url = `${this.apiUrl}/filter.php?a=${filters.area}`;
    } else if (filters.category) {
      url = `${this.apiUrl}/filter.php?c=${filters.category}`;
    }

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipeById(id: string) {
    const url = `${this.apiUrl}/lookup.php?i=${id}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
