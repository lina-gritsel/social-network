import { FC, useEffect, useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'
import moment from 'moment'

import { DEFAULT_CITY, TOKEN_ADDRESS } from './constants'
import styles from './Weather.module.scss'

const getUrl = (city: string): string => {
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?`
  return `${weatherUrl}key=${TOKEN_ADDRESS}&q=${city}&aqi=no`
}

const Weather: FC = () => {
  const { t } = useTranslation()

  const [isError, setIsError] = useState<boolean>(false)
  const [city, setCity] = useState<string>(DEFAULT_CITY)
  const [weatherIcon, setWeatherIcon] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [temp, setTemp] = useState<string>('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(getUrl(city))
        const { location, current } = data

        const weatherDescription = current.condition.text
        const weatherIcon = `http:${current.condition.icon}`
        const temperature = current.temp_c

        setDescription(weatherDescription)
        setWeatherIcon(weatherIcon)
        setTemp(temperature)
      } catch {
        setIsError(true)
        setCity(DEFAULT_CITY)
      }
    })()
  }, [city])

  const changeCity = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    if (e.key === 'Enter' && value !== '') {
      setCity(value)
      ;(e.target as HTMLInputElement).value = ''
    }
    setIsError(false)
  }

  const currentTime = moment(moment(), 'YYYY/MM/DD').format('dddd, D MMMM')

  return (
    <div className={styles.weather}>
      <div className={styles.content}>
        <p className={styles.temperature}>{temp}°</p>
        <input
          placeholder="Minsk"
          className={styles.input}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => changeCity(e)}
        />
      </div>
      <div className={styles.mainContent}>
        <p className={styles.date}>{currentTime}</p>
        <div className={styles.mainInfo}>
          <p className={styles.description}>{description}</p>
          <img src={weatherIcon} alt="weather" />
        </div>
      </div>
      {isError && (
        <div className={styles.errMessage}>{t('errMessageWeather')}</div>
      )}
    </div>
  )
}

export default Weather
