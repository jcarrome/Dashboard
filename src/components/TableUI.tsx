import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import type { Hourly } from '../types/DashboardTypes';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 150,
   },
   {
      field: 'value1',
      headerName: 'Temp. 2m (°C)',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Viento 10m (km/h)',
      width: 170,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 200,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

interface TableUIProps {
  loading: boolean;
  error: string | null;
  hourly?: Hourly;
}

export default function TableUI({ loading, error, hourly }: TableUIProps) {
   if (loading) {
      return <Typography>Cargando datos de la tabla...</Typography>;
   }
   if (error) {
      return <Typography color="error">Error: {error}</Typography>;
   }
   if (!hourly) {
      return <Typography>No hay datos disponibles.</Typography>;
   }

   // Solo mostramos las primeras 7 filas para que coincida con el ejemplo anterior
   const rows = combineArrays(
      hourly.time.slice(0, 7),
      hourly.temperature_2m.slice(0, 7),
      hourly.wind_speed_10m.slice(0, 7)
   );

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}