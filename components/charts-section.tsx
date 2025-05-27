"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartsSectionProps {
  data: any
  isLoading: boolean
}

export function ChartsSection({ data, isLoading }: ChartsSectionProps) {
  const revenueData = [
    { month: "Apr", revenue: 850000, profit: 180000 },
    { month: "May", revenue: 920000, profit: 195000 },
    { month: "Jun", revenue: 1100000, profit: 245000 },
    { month: "Jul", revenue: 980000, profit: 210000 },
    { month: "Aug", revenue: 1150000, profit: 260000 },
    { month: "Sep", revenue: 1050000, profit: 225000 },
    { month: "Oct", revenue: 1200000, profit: 280000 },
    { month: "Nov", revenue: 1080000, profit: 240000 },
    { month: "Dec", revenue: 1350000, profit: 320000 },
    { month: "Jan", revenue: 1100000, profit: 250000 },
    { month: "Feb", revenue: 1250000, profit: 290000 },
    { month: "Mar", revenue: 1400000, profit: 340000 },
  ]

  const expenseData = [
    { category: "Salaries", amount: 450000, percentage: 35 },
    { category: "Rent", amount: 180000, percentage: 14 },
    { category: "Marketing", amount: 230000, percentage: 18 },
    { category: "Utilities", amount: 95000, percentage: 7 },
    { category: "Others", amount: 325000, percentage: 26 },
  ]

  const revenueBySegment = [
    { name: "Product Sales", value: 7500000, color: "#3b82f6", percentage: 60 },
    { name: "Services", value: 3200000, color: "#10b981", percentage: 26 },
    { name: "Consulting", value: 1800000, color: "#f59e0b", percentage: 14 },
  ]

  const cashFlowData = [
    { month: "Oct", inflow: 1200000, outflow: 950000, net: 250000 },
    { month: "Nov", inflow: 1080000, outflow: 890000, net: 190000 },
    { month: "Dec", inflow: 1350000, outflow: 1100000, net: 250000 },
    { month: "Jan", inflow: 1100000, outflow: 920000, net: 180000 },
    { month: "Feb", inflow: 1250000, outflow: 980000, net: 270000 },
    { month: "Mar", inflow: 1400000, outflow: 1050000, net: 350000 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Charts & Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Charts & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Profit Trend (Last 12 Months)</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                <Tooltip
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 5 Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Expense Categories</CardTitle>
            <CardDescription>Monthly expense breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, "Amount"]} />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Segment */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Segment</CardTitle>
            <CardDescription>Business segment contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBySegment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueBySegment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Flow Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash Flow Analysis (Last 6 Months)</CardTitle>
            <CardDescription>Monthly cash inflows vs outflows</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, ""]} />
                <Legend />
                <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" />
                <Bar dataKey="net" fill="#3b82f6" name="Net Cash Flow" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
