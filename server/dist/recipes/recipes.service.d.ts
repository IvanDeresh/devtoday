import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
export declare class RecipesService {
    private readonly httpService;
    private readonly configService;
    private readonly apiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getRecipes(filters: FilterRecipesDto): Promise<any>;
    getRecipeById(id: string): Promise<any>;
}
