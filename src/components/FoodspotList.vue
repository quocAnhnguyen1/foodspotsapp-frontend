<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { fetchFoodspots, createFoodspot, deleteFoodspot } from "@/api/foodspots";

defineProps<{ title: string }>();

type Foodspot = { id: number; name: string };

const foodspots: Ref<Foodspot[]> = ref([]);
const nameField = ref("");

async function onFormSubmitted(): Promise<void> {
  const name = nameField.value.trim();
  if (!name) return;

  const created = await createFoodspot(name); // <- kommt mit id vom Backend zurück
  foodspots.value.push(created);

  nameField.value = "";
}

async function removeFoodspot(id: number): Promise<void> {
  await deleteFoodspot(id); // <- wirklich im Backend löschen
  foodspots.value = foodspots.value.filter((f) => f.id !== id);
}

onMounted(async () => {
  foodspots.value = await fetchFoodspots();
});
</script>

<template>
  <h2>{{ title }}</h2>

  <form @submit.prevent="onFormSubmitted">
    <input type="text" placeholder="Name" v-model="nameField" />
    <button>Add foodspot</button>
  </form>

  <hr />

  <table>
    <thead>
    <tr>
      <th>Delete</th>
      <th>Name</th>
      <th>Id</th>
    </tr>
    </thead>

    <tbody>
    <tr v-if="!foodspots.length">
      <td colspan="3">No foodspots yet</td>
    </tr>

    <tr v-for="foodspot in foodspots" :key="foodspot.id">
      <td>
        <button type="button" @click="removeFoodspot(foodspot.id)">delete</button>
      </td>
      <td>{{ foodspot.name }}</td>
      <td>{{ foodspot.id }}</td>
    </tr>
    </tbody>
  </table>
</template>
