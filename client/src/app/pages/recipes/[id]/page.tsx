"use client";

import { useEffect, useState } from "react";
import { fetchRecipeById } from "@/utils/api";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        fetchRecipeById(id.toString())
            .then((data) => setRecipe(data.meals?.[0]))
            .catch(console.error);
    }, [id]);

    if (!recipe) return <p className="text-center mt-10 text-gray-400">Loading...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full rounded-2xl shadow-lg"
                    />
                </div>

                <div className="w-full md:w-2/3">
                    <h1 className="text-4xl font-bold mb-2 text-white">{recipe.strMeal}</h1>

                    <Link
                        href={`/pages/recipes?area=${recipe.strArea}`}
                        className="text-blue-400 hover:underline text-lg"
                    >
                        {recipe.strArea}
                    </Link>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                        <p className="whitespace-pre-wrap text-sm font-thin leading-7 text-gray-200">
                            {recipe.strInstructions}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 20 }, (_, i) => {
                                const ingredient = recipe[`strIngredient${i + 1}`];
                                if (!ingredient) return null;
                                return (
                                    <Link
                                        key={i}
                                        href={`/pages/recipes?ingredient=${ingredient}`}
                                        className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
                                    >
                                        {ingredient}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
