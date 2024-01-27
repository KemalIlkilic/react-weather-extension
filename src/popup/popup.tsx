import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import WeatherCard from './WeatherCard'
import 'fontsource-roboto'
import { keys } from '@material-ui/core/styles/createBreakpoints'
import { Box, InputBase, IconButton, Paper } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid' // Grid version 1

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(['Toronto', 'Balikesir'])
  const [cityInput, setCityInput] = useState<string>('')
  function handleAddCity() {
    if (cityInput === '') return
    setCities([...cities, cityInput])
    setCityInput('')
  }

  function handleDeleteCity(id: number) {
    setCities((cities) => cities.filter((city, index) => index !== id))
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleAddCity}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          onDelete={() => handleDeleteCity(index)}
          city={city}
          key={index}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
