<script setup lang="ts">
import type { Country } from '@/services/weather/payloads'
import { weatherApi } from '@/services/weather/weatherApi'
import { formatteDate, formatteTime } from '@/utils/date_time'
import { ref } from 'vue'
const props = defineProps({
  countries: {
    type: Array<Country>,
    required: true
  }
})

const setCountry = ref('')

const country = ref('')

const capital = ref('')

// Format the date as "DD/MM/YYYY"
const formattedDate = ref('')

const formattedTime = ref('')

const degrees = ref('')

const weather = ref('')

const icon = ref('')

const showInfos = ref(false)

const fetchWeather = async () => {
  if (setCountry.value) {
    try {
      const response = await weatherApi(setCountry.value)
      country.value = response.data.location.country
      capital.value = response.data.location.name
      formattedDate.value = formatteDate(response.data.current.last_updated)
      formattedTime.value = formatteTime(response.data.current.last_updated)
      degrees.value = response.data.current.temp_c
      weather.value = response.data.current.condition.text
      icon.value = response.data.current.condition.icon

      showInfos.value = true
    } catch (error) {
      console.log('Error featching weather data:', error)
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="weather_contianer">
      <div class="title_container">
        <h2>How's Weather?</h2>
      </div>
      <label>Select the country</label>
      <div class="set_weather_container">
        <q-select
          filled
          bottom-slots
          v-model="setCountry"
          :options="props.countries"
          label="Select the country"
          class="select_country"
        >
          <template v-slot:prepend>
            <q-icon name="place" @click.stop.prevent />
          </template>
        </q-select>
        <q-btn class="glossy btn_search" color="teal" label="Search" @click="fetchWeather()" />
      </div>
    </div>
    <div class="weather_contianer_info" v-if="showInfos">
      <div class="header_info">
        <span class="title">Country: {{ country }} | Capital: {{ capital }}</span>
        <span class="sub"> Day {{ formattedDate }} | Hour {{ formattedTime }}</span>
      </div>
      <div class="content_info">
        <div class="content_weather">
          <span class="temperature">{{ degrees }}°</span>
          <span class="weather">{{ weather }}</span>
        </div>
        <div class="content_img">
          <img :src="icon" alt="Weather image" class="img_Weather" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.weather_contianer {
  width: 900px;
  height: auto;
  padding: 20px;
  background-color: #3fa8c4;
  margin-top: 5%;
  border: 1px solid transparent;
  border-radius: 20px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
}

.title_container {
  display: flex;
  justify-content: center;
}

h2 {
  color: white;
  text-decoration: underline;
}

label {
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 8px;
  color: white;
}

.set_weather_container {
  display: flex;
  justify-content: space-between;
}

.select_country {
  width: 80%;
}

.btn_search {
  height: 55px;
  width: 150px;
}

.weather_contianer_info {
  width: 900px;
  height: auto;
  background-image: url(https://s.w-x.co/WeatherImages_Web/WeatherImage_PartlyCloudy-day_3.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70);
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: initial;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  border-radius: 20px;
}

.header_info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 10px 16px;
  border-radius: 20px 20px 0 0;
}
.content_info {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
}
.title {
  margin: unset;
  color: white;
  font-size: 1.25rem;
  display: contents;
  line-height: unset;
}
.sub {
  color: white;
  font-size: 1.125rem;
}

.content_weather {
  display: flex;
  flex-direction: column;
}

.temperature {
  font-size: 6rem;
  color: white;
}

.weather {
  font-size: 1.5rem;
  color: white;
}

.sensation {
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
}

.content_img {
  display: flex;
  align-items: center;
}

.img_Weather {
  width: 130px;
  height: 130px;
  object-fit: cover;
}
</style>
