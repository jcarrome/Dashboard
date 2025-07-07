import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
    >
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }} ><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Temperatura (2m)' description='XX°C' />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Temperatura aparente' description='YY°C' />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Velocidad del viento' description='ZZkm/h' />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Humedad relativa' description='NN%' />
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }} >Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }} >Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;
