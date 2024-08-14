import { useEffect, useState } from "react";

export default function WeatherCard({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div>
      {weather && (
        <div>
          <p>Temperature: {weather.current.temperature_2m}°C</p>
          <p>Wind Speed: {weather.current.wind_speed_10m}m/s</p>
        </div>
      )}
    </div>
  );
}
