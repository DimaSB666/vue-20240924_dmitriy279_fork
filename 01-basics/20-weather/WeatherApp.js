import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const localitiesWeather = getWeatherData()

    function getCelsius(localitiWeather) {
      return (localitiWeather.current.temp - 273.15).toFixed(1)
    }

    function getWhaterIcon(localitiWeather) {
      return WeatherConditionIcons[localitiWeather.current.weather.id]
    }

    return {
      localitiesWeather,
      WeatherConditionIcons,
      getCelsius,
      getWhaterIcon,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="localitiWeather in localitiesWeather" class="weather-card weather-card--night">
          <div v-if="localitiWeather.alert !== null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">
              {{ localitiWeather.alert.sender_name + ' : ' + localitiWeather.alert. description}}
            </span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ localitiWeather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ localitiWeather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="localitiWeather.current.weather.description">{{ getWhaterIcon(localitiWeather) }}</div>
            <div class="weather-conditions__temp">{{ getCelsius(localitiWeather) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(localitiWeather.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ localitiWeather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ localitiWeather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ localitiWeather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
