import React, { useEffect, useState } from 'react'
import './WeatherCard.css'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

const Loader: React.FC<{}> = () => {
  return <Typography variant="body1">Loading...</Typography>
}
const Error: React.FC<{ error: string }> = ({ error }) => {
  return <Typography variant="body1">{error}</Typography>
}

const WeatherCard: React.FC<{
  city: string
  onDelete?: () => void
}> = ({ city, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>({
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 15.5,
      feels_like: 14.5,
      temp_min: 13.0,
      temp_max: 18.0,
      pressure: 1023,
      humidity: 53,
    },
    visibility: 10000,
    wind: {
      speed: 3.6,
      deg: 90,
      gust: 11.8,
    },
    clouds: {
      all: 0,
    },
    dt: 1602969600,
    sys: {
      type: 1,
      id: 1414,
      country: 'GB',
      sunrise: 1602919910,
      sunset: 1602958410,
    },
    timezone: 3600,
    id: 2643743,
    name: 'London',
    cod: 200,
  }) // bir tane obje attim icine sirf return ederken hata vermesin diye yoksa ( && weatherData) istiyor.
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(
    function () {
      async function getCityData() {
        try {
          setIsLoading(true)
          setError('')
          const data = await fetchOpenWeatherData(city)
          setWeatherData(data)
          setError('')
        } catch (error) {
          console.log('ERROR YAKALANDI')
          console.error(error.message)
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      getCityData()
    },
    [city]
  )
  return (
    <WeatherCardContainer onDelete={onDelete}>
      {error && <Error error={error} />}
      {!error && isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <Typography variant="h5">{weatherData?.name}</Typography>
          <Typography variant="body1">
            {Math.round(weatherData?.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main?.feels_like)}
          </Typography>
        </>
      )}
    </WeatherCardContainer>
  )
}

export default WeatherCard
