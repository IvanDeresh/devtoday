"use client";

import { useEffect, useState } from "react";
import { fetchRecipeById, fetchRecipes } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import { backArrow } from "@/assets/img";
import { Recipe } from "@/types/recipe";

type Props = {
    id: string;
};

export default function RecipeDetailPage({ id }: Props) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchRecipeById(id)
            .then((data) => setRecipe(data.meals?.[0]))
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!recipe?.strCategory) return;
        fetchRecipes(`?category=${recipe.strCategory}`)
            .then((data) => setRelatedRecipes(data.meals || []))
            .catch(console.error);
    }, [recipe]);

    if (!recipe) return <p className="text-center mt-10 text-gray-400">Loading...</p>;

    return (
        <div className="p-2 sm:p-6 max-w-7xl mx-auto">
            <Link href="/pages/recipes" className="absolute left-4 top-4 sm:left-10 sm:top-10 z-50">
                <Image
                    className="rounded-full w-[35px] sm:w-[40px] shadow-xl hover:shadow-2xl hover:scale-110 transition duration-300 ease-in-out bg-white/80 p-1"
                    src={backArrow}
                    width={40}
                    height={40}
                    alt="back"
                />
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-1/2">
                            <Image
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                width={500}
                                height={400}
                                className="w-full rounded-2xl shadow-lg"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h1 className="text-xl sm:text-4xl font-bold mb-2 text-white">
                                {recipe.strMeal}
                            </h1>
                            <Link
                                href={`/pages/recipes?area=${recipe.strArea}`}
                                className="uppercase text-gray-500 text-md sm:text-lg"
                            >
                                {recipe.strArea}
                            </Link>

                            <div className="mt-6">
                                <h2 className="text-lg sm:text-2xl font-semibold mb-2">
                                    Instructions
                                </h2>
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

                <aside className="w-full lg:w-1/4">
                    <h2 className="text-xl font-semibold mb-4 text-white">
                        More from {recipe.strCategory}
                    </h2>
                    <div className="space-y-4">
                        {relatedRecipes
                            .filter((r) => r.idMeal !== recipe.idMeal)
                            .slice(0, 6)
                            .map((r) => (
                                <Link key={r.idMeal} href={`/pages/recipes/${r.idMeal}`}>
                                    <div className="flex gap-3 hover:bg-gray-800 p-2 rounded transition">
                                        <Image
                                            src={r.strMealThumb}
                                            alt={r.strMeal}
                                            className="w-16 h-16 object-cover rounded"
                                            width={64}
                                            height={64}
                                        />
                                        <p className="text-sm text-white">{r.strMeal}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
