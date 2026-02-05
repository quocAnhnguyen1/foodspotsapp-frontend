<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { fetchFoodspots, createFoodspot, deleteFoodspot } from '@/api/foodspots'

defineProps<{ title: string }>()

type Foodspot = { id: number; name: string }

const foodspots: Ref<Foodspot[]> = ref([])
const nameField = ref('')

// Loading and error states
const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')

async function onFormSubmitted(): Promise<void> {
  const name = nameField.value.trim()
  if (!name) {
    error.value = 'Please enter a foodspot name'
    return
  }

  isSubmitting.value = true
  error.value = ''
  successMessage.value = ''

  try {
    const created = await createFoodspot(name)
    foodspots.value.push(created)
    nameField.value = ''
    successMessage.value = 'Foodspot added successfully!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create foodspot'
  } finally {
    isSubmitting.value = false
  }
}

async function removeFoodspot(id: number): Promise<void> {
  error.value = ''
  successMessage.value = ''

  try {
    await deleteFoodspot(id)
    foodspots.value = foodspots.value.filter((f) => f.id !== id)
    successMessage.value = 'Foodspot deleted successfully!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete foodspot'
  }
}

async function loadFoodspots(): Promise<void> {
  isLoading.value = true
  error.value = ''

  try {
    foodspots.value = await fetchFoodspots()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load foodspots'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadFoodspots()
})
</script>

<template>
  <h2>{{ title }}</h2>

  <!-- Error and Success Messages -->
  <div v-if="error" style="color: red; margin: 10px 0; padding: 10px; background: #fee">
    {{ error }}
  </div>
  <div
    v-if="successMessage"
    style="color: green; margin: 10px 0; padding: 10px; background: #efe"
  >
    {{ successMessage }}
  </div>

  <form @submit.prevent="onFormSubmitted">
    <input
      type="text"
      placeholder="Name"
      v-model="nameField"
      :disabled="isSubmitting"
      required
    />
    <button :disabled="isSubmitting">
      {{ isSubmitting ? 'Adding...' : 'Add foodspot' }}
    </button>
  </form>

  <hr />

  <!-- Loading State -->
  <div v-if="isLoading" style="text-align: center; padding: 20px">Loading foodspots...</div>

  <!-- Data Table -->
  <table v-else>
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
