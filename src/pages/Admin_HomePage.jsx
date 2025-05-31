import React from 'react'
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Admin_HomePage = () => {
    const salesData = {
        labels: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی"],
        datasets: [
          {
            label: "عمران خان",
            data: [2, 3, 1, 4, 5, 7, 10],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "حکومت",
            data: [8, 5, 2, 1, 4, 2, 3],
            borderColor: "#FF5733",
            backgroundColor: "rgba(255, 87, 51, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "اپوزیشن",
            data: [3, 5, 1, 6, 1, 2, 9],
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      };
    
      const revenueData = {
        labels: ["عمران خان", "حکومت", "پاکستان"],
        datasets: [
          {
            label: "مشہور رجحانات",
            data: [45, 30, 25],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
    
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

  return (
      <div className="p-4 space-y-6">
          {/* Metrics Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Total Users</CardTitle>
              </CardHeader>
              <CardContent className="text-xl sm:text-2xl font-bold">12,450</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent className="text-xl sm:text-2xl font-bold">$56,400</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent className="text-xl sm:text-2xl font-bold">1,240</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Support Tickets</CardTitle>
              </CardHeader>
              <CardContent className="text-xl sm:text-2xl font-bold">34</CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Sales Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 md:h-80">
                  <Line data={salesData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Top Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 md:h-80">
                  <Doughnut data={revenueData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>🚀 عمران خان نے ایک جلسہ منعقد کیا۔</li>
                  <li>📋 حکومت نے نیا قانون پاس کیا۔</li>
                  <li>💰 اپوزیشن نے بجٹ پر تنقید کی۔</li>
                  <li>📦 ایک نئی سبسکرپشن خریدا گیا۔</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
  )
}

export default Admin_HomePage
