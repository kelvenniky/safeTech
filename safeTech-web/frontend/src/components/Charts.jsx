import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import moment from 'moment';
import SummaryApi from '../common';

const MyBarChart = () => {
  const [allEmergencies, setAllEmergencies] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchAllEmergencies = async () => {
    const response = await fetch(SummaryApi.AllEmergencies.url);
    const dataResponse = await response.json();
    setAllEmergencies(dataResponse?.data || []);
  };

  const prepareChartData = (emergencies) => {
    const monthsCount = {};

    emergencies.forEach((emerg) => {
      const month = moment(emerg.createdAt).format('MMMM YYYY');
      monthsCount[month] = (monthsCount[month] || 0) + 1;
    });

    const data = Object.entries(monthsCount).map(([month, count]) => ({
      month,
      count,
    }));

    setChartData(data);
  };

  useEffect(() => {
    fetchAllEmergencies();
  }, []);

  useEffect(() => {
    if (allEmergencies.length) {
      prepareChartData(allEmergencies);
    }
  }, [allEmergencies]);

  return (
    <BarChart width={360} height={290} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
    </BarChart>
  );
};

export default MyBarChart;