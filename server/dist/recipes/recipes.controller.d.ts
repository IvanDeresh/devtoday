import { RecipesService } from './recipes.service';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    getRecipes(filterDto: FilterRecipesDto): Promise<any>;
    getRecipeById(id: string): Promise<any>;
}
