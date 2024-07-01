import React, { useEffect, useState } from "react";
import { Pie, Bar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function Dashboard() {
  const [statusData, setStatusData] = useState({});
  const [individualData, setIndividualData] = useState([]);

  useEffect(() => {
    const AdminToken = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // Fetch data for bar chart
        const statusResponse = await axios.get(
          "http://127.0.0.1:8000/api/user/status/count",
          {
            headers: {
              "x-auth-token": AdminToken,
            },
          }
        );
        setStatusData(statusResponse.data);

        // Fetch data for pie and scatter charts
        const individualResponse = await axios.get(
          "http://127.0.0.1:8000/api/student/count/gender-state",
          {
            headers: {
              "x-auth-token": AdminToken,
            },
          }
        );

        // Ensure the data is an array
        if (Array.isArray(individualResponse.data)) {
          setIndividualData(individualResponse.data);
        } else {
          console.error("Fetched individual data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Pie Chart Data
  const pieChartData = {
    labels: Object.keys(statusData),
    datasets: [
      {
        label: "Status Distribution",
        data: Object.values(statusData),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99"],
        hoverOffset: 4,
      },
    ],
  };

  // Pie Chart Options
  const pieChartOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  };

  // Bar Chart Data
  const barChartData = {
    labels: individualData.map((item) => `${item.gender} (${item.state})`),
    datasets: [
      {
        label: "Count of Individuals by Gender and State",
        data: individualData.length
          ? individualData.map((item) => item.count)
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Options
  const barChartOptions = {
    plugins: {
      datalabels: {
        color: "black",
        formatter: (value, context) => value,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Scatter Chart Data
  const scatterChartData = {
    datasets: [
      {
        label: "Individual Counts",
        data: individualData.map((item, index) => ({
          x: index + 1,
          y: item.count,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
      },
    ],
  };

  // Scatter Chart Options
  const scatterOptions = {
    plugins: {
      datalabels: {
        color: "black",
        formatter: (value, context) => {
          return `(${value.x}, ${value.y})`;
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        beginAtZero: true,
        title: {
          display: true,
          text: "Index",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>
      <div style={styles.chartContainer}>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Status Distribution</h3>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>
            Count of Individuals by Gender and State
          </h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Scatter Chart</h3>
          <Scatter data={scatterChartData} options={scatterOptions} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: "#192351",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  title: {
    color: "#E9BF60",
    marginBottom: "20px",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "500",
    fontStyle: "normal",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  chartBox: {
    width: "30%",
    backgroundColor: "#192351",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    border: "1px solid #838797",
  },
  chartTitle: {
    color: "#E9BF60",
    marginBottom: "10px",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "500",
    fontStyle: "normal",
  },
};

export default Dashboard;
