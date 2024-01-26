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
  const [cities, setCities] = useState<string[]>([
    'Toronto',
    'Balikesir',
    'dasdas',
  ])
  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <InputBase placeholder="Add a city name" />
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {cities.map((city, index) => (
          <WeatherCard city={city} key={index} />
        ))}
      </Grid>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
