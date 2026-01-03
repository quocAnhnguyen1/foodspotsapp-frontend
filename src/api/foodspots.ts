export type Foodspot = { id: number; name: string };
const base = import.meta.env.VITE_API_URL;

export async function fetchFoodspots(): Promise<Foodspot[]> {
  const res = await fetch(`${base}/api/foodspots`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function createFoodspot(name: string): Promise<Foodspot> {
  const res = await fetch(`${base}/api/foodspots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error("Failed to create");
  return res.json();
}

export async function deleteFoodspot(id: number): Promise<void> {
  const res = await fetch(`${base}/api/foodspots/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
}
