"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRecipes } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function RecipeListPage() {
    const searchParams = useSearchParams();
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
        const query = searchParams.toString();
        fetchRecipes(query ? `?${query}` : "")
            .then((data) => setRecipes(data.meals || []))
            .catch(console.error);
    }, [searchParams]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:px-10 gap-4">
                {recipes.map((meal) => (
                    <Link key={meal.idMeal} href={`/pages/recipes/${meal.idMeal}`}>
                        <div className="border rounded p-2 hover:shadow">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-xl mt-2">{meal.strMeal}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
