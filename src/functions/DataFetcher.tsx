import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const cityCoords: Record<string, { lat: number, lon: number }> = {
    guayaquil: { lat: -2.1962, lon: -79.8862 },
    quito: { lat: -0.1807, lon: -78.4678 },
    manta: { lat: -0.9677, lon: -80.7089 },
    cuenca: { lat: -2.9006, lon: -79.0045 },
};

export default function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const coords = cityCoords[city] || cityCoords.guayaquil;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=America/Chicago&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&hourly=temperature_2m,wind_speed_10m`;

        const storageKey = `weather_${city}`;
        const CACHE_MINUTES = 30;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // 1. Intentar leer de localStorage
            const cached = localStorage.getItem(storageKey);
            if (cached) {
                try {
                    const { data: cachedData, timestamp } = JSON.parse(cached);
                    const age = (Date.now() - timestamp) / 60000; // minutos
                    if (age < CACHE_MINUTES) {
                        setData(cachedData);
                        setLoading(false);
                        return;
                    }
                } catch {
                    // Si hay error en el parseo, ignorar el caché
                }
            }

            // 2. Si no hay caché válido, llamar a la API
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                // Guardar en localStorage
                localStorage.setItem(storageKey, JSON.stringify({
                    data: result,
                    timestamp: Date.now()
                }));
            } catch (err: any) {
                // 3. Si falla la API, intentar usar caché aunque esté vencido
                if (cached) {
                    try {
                        const { data: cachedData } = JSON.parse(cached);
                        setData(cachedData);
                        setError("Mostrando datos almacenados por error en la conexión.");
                    } catch {
                        setError("Ocurrió un error desconocido al obtener los datos.");
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
}