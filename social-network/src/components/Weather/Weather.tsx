import { TextField } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'

import styles from './Weather.module.scss'

const getUrl = (city: string) => {
  const token = `a3af42ebefd88cd481454f659190bc54`
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=`
  return `${weatherUrl}${city}&lang=en&appid=${token}&units=metric`
}
const getSrc = (weatherIcon: string) => {
  return `http://openweathermap.org/img/w/${weatherIcon}.png`
}

const Weather: FC = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [city, setCity] = useState('Minsk')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [wind, setWind] = useState('')
  const [temp, setTemp] = useState('')
  const [description, setDescription] = useState('')
  const [humidity, setHumidity] = useState('')

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await Axios.get(getUrl(city))
        setWeatherIcon(res.data.weather[0].icon)
        setDescription(res.data.weather[0].description)
        setWind(res.data.wind.speed)
        setTemp(res.data.main.temp)
        setHumidity(res.data.main.humidity)
      } catch {
        setIsError(true)
        setCity('Minsk')
      }
    }
    getWeather()
  }, [city])

  const changeCity = (e) => {
    const value = (e.target as HTMLInputElement).value
    if (e.key === 'Enter' && value !== '') {
      setCity(value)
    }
    setIsError(false)
  }

  const { t } = useTranslation()

  return (
    <div className={styles.weather}>
      <div>{t('weather')}</div>
      <div className={styles.content}>
        <TextField
          id="outlined-basic"
          label={t('enterCity')}
          variant="standard"
          className={styles.input}
          onKeyPress={(e) => changeCity(e)}
        />
        <div className={styles.city}>{city[0].toUpperCase() + city.slice(1)}</div>
        <div className={styles.mainIfo}>
          <img src={getSrc(weatherIcon)} alt="weather" />
          <div>
            <div>{temp}°C</div>
            <div>{description}</div>
          </div>
        </div>
        <div>Wind speed: {wind} m/s</div>
        <div>Humidity: {humidity}%</div>
        {isError && <div className={styles.errMessage}>{t('errMessageWeather')}</div>}
      </div>
    </div>
  )
}

export default Weather
