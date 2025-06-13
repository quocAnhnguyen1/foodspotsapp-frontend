<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import axios from "axios";

defineProps<{ title: string }>();

type Foodspot = { id: number; name: string }

const foodspots: Ref<Foodspot[]> = ref([]);
const nameField = ref("");

function onFormSubmitted(): void {
  addFoodspot(nameField.value);
}

function addFoodspot(name: string): void {
  const newId = Math.max(0, ...foodspots.value.map(f => f.id)) + 1;
  foodspots.value.push({ name, id: newId });
}

function removeFoodspot(id: number): void {
  foodspots.value = foodspots.value.filter((f) => f.id !== id);
}

onMounted(() => {
  // Call the real backend
  axios.get(`${import.meta.env.VITE_API_URL}/foodspots`)
  .then(response => {
    foodspots.value = response.data;
  })
  .catch(error => {
    console.error("Failed to fetch foodspots:", error);
  });
});
</script>
