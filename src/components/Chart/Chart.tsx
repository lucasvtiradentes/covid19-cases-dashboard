import { useState, useEffect } from 'react'
import { fetchDailyData } from '../../utils/api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartPropsTypes {
  data: any;
  country: string;
}

const AllCountriesLineChart = (dailyData: any[]) => {

  if (dailyData.length === 0) { return null }

  return (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: 'Infected',
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: "#3333ff",
          },
          {
            label: 'Deaths',
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          }
        ]
      }}
    />
  );
}

const CountryBarChart = (data: any) => {

  if (!data.confirmed) { return null }

  return (
    <Bar
      data={{
        labels: ['confirmed', 'deaths'],
        datasets: [{
          label: 'people',
          backgroundColor: [
            'rgba(0, 0, 255, 0.5)',
            'rgba(255, 0, 0, 0.5)'
          ],
          data: [data.confirmed.value, data.deaths.value]
        }]
      }}
    />
  )
}

const AppChart = ({ data, country }: ChartPropsTypes) => {

  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    if (country === '') {
      fetchDailyData().then(apiData => setDailyData(apiData))
    }
  }, [])

  return (
    <div className={styles.container}>
      {country === '' ? (
        AllCountriesLineChart(dailyData)
        ) : (
        CountryBarChart(data)
      )}
    </div>
  )
}

export default AppChart
