import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { Hourly } from '../types/DashboardTypes';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  hourly?: Hourly;
}

export default function ChartUI({ loading, error, hourly }: ChartUIProps) {
   if (loading) {
      return <Typography>Cargando datos del gráfico...</Typography>;
   }
   if (error) {
      return <Typography color="error">Error: {error}</Typography>;
   }
   if (!hourly) {
      return <Typography>No hay datos disponibles.</Typography>;
   }

   // Solo mostramos las primeras 7 horas para que el gráfico sea legible
   const arrLabels = hourly.time.slice(0, 7);
   const arrValues1 = hourly.temperature_2m.slice(0, 7);
   const arrValues2 = hourly.wind_speed_10m.slice(0, 7);

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura y Viento (primeras 7 horas)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temp. 2m (°C)'},
               { data: arrValues2, label: 'Viento 10m (km/h)'},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}