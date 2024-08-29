import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { FaCircle } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../common/Sidebar";
import { FiSearch, FiBell } from "react-icons/fi"; // Import search and notification icons

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('Pending Actions'); // Add state for active tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const result = await axios.get("http://localhost:5000/api/userdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(result.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const brandWiseData = {
    labels: data.tyrePurchases.map((item) => item.brand),
    datasets: [
      {
        label: "New Tyres",
        data: data.tyrePurchases.map((item) => item.newTyres),
        backgroundColor: "rgba(85, 190, 0, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10, // Make corners rounded
        barPercentage: 0.6, // Reduce the width of the bars
      },
    ],
  };

  const monthWiseData = {
    labels: data.monthWise.map((item) => item.month),
    datasets: [
      {
        label: "Purchase",
        data: data.monthWise.map((item) => item.purchased),
        backgroundColor: "rgba(153, 102, 255, 1)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderRadius: 10, // Make corners rounded
        barPercentage: 0.6, // Reduce the width of the bars
        borderWidth: 1,
      },
      {
        label: "Retread",
        data: data.monthWise.map((item) => item.retreaded),
        backgroundColor: "rgba(255, 159, 64, 1)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderRadius: 10, // Make corners rounded
        barPercentage: 0.6, // Reduce the width of the bars
        borderWidth: 1,
      },
      {
        label: "Scrap",
        data: data.monthWise.map((item) => item.scrap),
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderRadius: 10, // Make corners rounded
        barPercentage: 0.6, // Reduce the width of the bars
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        {/* Top Bar with Search and Notification */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-400">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative ">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 bg-gray-300 text-white py-2 rounded-full border border-gray-300"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* Notification Icon */}
            <div className="relative">
              <FiBell className="text-green-400 text-2xl cursor-pointer" />
              {/* You can add a notification badge here if needed */}
            </div>
          </div>
        </div>

        {/* Summary and Alerts Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Summary Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 mt-2">Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.totalVehicles}
                </p>
                <p className="text-sm text-gray-500">Total Vehicles</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.totalTyres}
                </p>
                <p className="text-sm text-gray-500">Total Tyres</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.tyresOnWheel}
                </p>
                <p className="text-sm text-gray-500">Tyres on Wheel</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.availableStock}
                </p>
                <p className="text-sm text-gray-500">Available Stock</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.totalScrap}
                </p>
                <p className="text-sm text-gray-500">Total Scrap</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.cpkTyres}
                </p>
                <p className="text-sm text-gray-500">CPK Tyres</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.sentToRetread}
                </p>
                <p className="text-sm text-gray-500">Sent to Retread</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.retreadedTyres}
                </p>
                <p className="text-sm text-gray-500">Retreaded Tyres</p>
              </div>
              <div className="hover:bg-gray-100 rounded-md pl-3">
                <p className="text-xl font-bold text-green-400">
                  {data.summary.reusableTyres}
                </p>
                <p className="text-sm text-gray-500">Reusable Tyres</p>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Alerts</h2>
            <ul className="space-y-2">
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Unidentified Tyre:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.unidentifiedTyre}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Missing Tyre:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.missingTyre}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Low NSD:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.lowNSD}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute mt-1 left-0" />
                <span className="ml-6">Vehicle Pending:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.vehiclePending}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Pending Alignment:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.pendingAlignment}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Pending Rotation:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.pendingRotation}
                </span>
              </li>
              <li className="relative">
                <FaCircle className="text-red-600 absolute left-0 mt-1" />
                <span className="ml-6">Tyre Defects:</span>
                <span className="absolute right-0 bg-red-300 px-1 rounded-full">
                  {data.alerts.tyreDefects}
                </span>
              </li>
            </ul>
          </div>

          {/* Tyre Inventory Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Tyre Inventory</h2>
              <span className="text-green-500 text-xl font-bold">
                {data.totalTyreInventory}
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 border-b">NSD</th>
                  <th className="py-2 border-b">New</th>
                  <th className="py-2 border-b">Retread</th>
                  <th className="py-2 border-b">Scrap</th>
                  <th className="py-2 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.tyreInventory.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b">{item.type}</td>
                    <td className="py-2 border-b">{item.new}</td>
                    <td className="py-2 border-b">{item.retreaded}</td>
                    <td className="py-2 border-b">{item.scrap}</td>
                    <td className="py-2 border-b">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabbed Section for Actions and Financial Summary */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex space-x-4 mb-4">
            <button
              className={`text-xl font-semibold ${activeTab === 'Pending Actions' ? 'text-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('Pending Actions')}
            >
              Pending Actions
            </button>
            <button
              className={`text-xl font-semibold ${activeTab === 'Completed Actions' ? 'text-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('Completed Actions')}
            >
              Completed Actions
            </button>
            <button
              className={`text-xl font-semibold ${activeTab === 'Financial Summary' ? 'text-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('Financial Summary')}
            >
              Financial Summary
            </button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Action Category</th>
                <th className="py-2">Tyre S.No</th>
                <th className="py-2">Brand</th>
                <th className="py-2">Model</th>
                <th className="py-2">Size</th>
                <th className="py-2">Vehicle No.</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'Pending Actions' && data.pendingActions.map((action, index) => (
                <tr key={index}>
                  <td className="py-2">{action.date}</td>
                  <td className="py-2">{action.category}</td>
                  <td className="py-2">{action.tyreSNo}</td>
                  <td className="py-2">{action.brand}</td>
                  <td className="py-2">{action.model}</td>
                  <td className="py-2">{action.size}</td>
                  <td className="py-2">{action.vehicleNo}</td>
                  <td className="py-2">{action.status}</td>
                </tr>
              ))}
              {activeTab === 'Completed Actions' && data.completedActions.map((action, index) => (
                <tr key={index}>
                  <td className="py-2">{action.date}</td>
                  <td className="py-2">{action.category}</td>
                  <td className="py-2">{action.tyreSNo}</td>
                  <td className="py-2">{action.brand}</td>
                  <td className="py-2">{action.model}</td>
                  <td className="py-2">{action.size}</td>
                  <td className="py-2">{action.vehicleNo}</td>
                  <td className="py-2">{action.status}</td>
                </tr>
              ))}
              {activeTab === 'Financial Summary' && data.financialSummary.map((action, index) => (
                <tr key={index}>
                  <td className="py-2">{action.date}</td>
                  <td className="py-2">{action.category}</td>
                  <td className="py-2">{action.tyreSNo}</td>
                  <td className="py-2">{action.brand}</td>
                  <td className="py-2">{action.model}</td>
                  <td className="py-2">{action.size}</td>
                  <td className="py-2">{action.vehicleNo}</td>
                  <td className="py-2">{action.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tyre Purchases and Month-Wise Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Tyre Purchases</h2>
            <Bar data={brandWiseData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Month Wise</h2>
            <Bar data={monthWiseData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
