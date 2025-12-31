export async function fetchFoodspots() {
  const base = import.meta.env.VITE_API_URL;
  const res = await fetch(`${base}/foodspots`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
