<script setup lang="ts">
import TheWeather from './components/the_weather.vue'
import countries from './resources/mock_country'
</script>

<template>
  <Suspense>
    <template #default>
      <TheWeather :countries="countries" />
    </template>
    <template #fallback>
      <div>Loading weather data...</div>
    </template>
  </Suspense>
</template>
