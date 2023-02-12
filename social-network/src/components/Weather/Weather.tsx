import { FC, useEffect, useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'
import moment from 'moment'

import styles from './Weather.module.scss'
import { DEFAULT_CITY, TOKEN_ADDRESS } from './constants'
import classNames from 'classnames'

const getUrl = (city: string) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=`
  return `${weatherUrl}${city}&lang=en&appid=${TOKEN_ADDRESS}&units=metric`
}
const getSrc = (weatherIcon: string) => {
  return `http://openweathermap.org/img/w/${weatherIcon}.png`
}

const Weather: FC = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [city, setCity] = useState('Minsk')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [temp, setTemp] = useState('')
  const [description, setDescription] = useState('')
  const [humidity, setHumidity] = useState('')

  const numberTemp = parseFloat(temp)

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(getUrl(city))
        setWeatherIcon(res.data.weather[0].icon)
        setDescription(res.data.weather[0].description)
        setTemp(res.data.main.temp)
        setHumidity(res.data.main.humidity)
      } catch {
        setIsError(true)
        setCity(DEFAULT_CITY)
      }
    })()
  }, [city])

  const changeCity = (e) => {
    const value = (e.target as HTMLInputElement).value
    if (e.key === 'Enter' && value !== '') {
      setCity(value)
      e.target.value = ''
    }
    setIsError(false)
  }

  const currentTime = moment(moment(), 'YYYY/MM/DD').format('dddd, D MMMM')

  const { t } = useTranslation()

  const getColorByTemp = (numberTemp) => {
    if (numberTemp <= 0) return styles.cold
    if (numberTemp <= 20) return styles.warm
    if (numberTemp > 20) return styles.hot
  }

  return (
    <div className={styles.weather}>
      <div className={classNames(styles.content, getColorByTemp(numberTemp))}>
        <input
          placeholder={t('enterCity')}
          className={styles.input}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => changeCity(e)}
        />
        <div className={styles.temperature}>{temp}°</div>
        <div className={styles.city}>
          {city[0].toUpperCase() + city.slice(1)}
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.date}>{currentTime}</div>
        <div className={styles.mainInfo}>
          <p className={styles.description}>{description}</p>
          <img src={getSrc(weatherIcon)} alt="weather" />
        </div>
        <div className={styles.description}>humidity: {humidity}%</div>

        {isError && (
          <div className={styles.errMessage}>{t('errMessageWeather')}</div>
        )}
      </div>
    </div>
  )
}

export default Weather
