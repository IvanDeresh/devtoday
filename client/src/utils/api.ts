export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export async function fetchRecipes(params: string = "") {
    const res = await fetch(`${API_BASE_URL}/recipes${params}`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json();
}

export async function fetchRecipeById(id: string) {
    const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch recipe");
    return res.json();
}
