"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRecipes } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import { recipeCategories } from "@/constants/recipeCategories";

export default function RecipeListPage() {
    const searchParams = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const query = searchParams.toString();
        fetchRecipes(query ? `?${query}` : "")
            .then((data) => setRecipes(data.meals || []))
            .catch(console.error);
    }, [searchParams]);

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 uppercase">Recipes</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {recipeCategories.map((cat) => (
                    <Link
                        key={cat}
                        href={`/pages/recipes?category=${cat}`}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition"
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:px-10 gap-8">
                {recipes.map((meal) => (
                    <Link key={meal.idMeal} href={`/pages/recipes/${meal.idMeal}`}>
                        <div className="border rounded-xl min-w-[280px] min-h-[300px] p-2 hover:shadow">
                            <Image
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                width={270}
                                height={192}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-xl flex items-center self-center mt-4">
                                {meal.strMeal}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
