import { fetchRecipeById } from "@/utils/api";
import { Recipe } from "@/types/recipe";
import RecipeDetailPage from "./RecipeDetailPage";
import { Metadata } from "next";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await fetchRecipeById(params.id);
    const recipe: Recipe | undefined = data.meals?.[0];

    return {
        title: recipe?.strMeal ? `${recipe.strMeal} | Recipe Book` : "Recipe | Recipe Book",
        description: recipe?.strInstructions?.slice(0, 160) || "Recipe detail page",
    };
}

export default function Page({ params }: Props) {
    return <RecipeDetailPage id={params.id} />;
}
