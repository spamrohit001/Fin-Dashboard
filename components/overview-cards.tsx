"use client"

import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OverviewCardsProps {
  data: any
  isLoading: boolean
}

export function OverviewCards({ data, isLoading }: OverviewCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatLakhs = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return formatCurrency(amount)
  }

  const overviewData = [
    {
      title: "Total Revenue",
      value: formatLakhs(data?.totalRevenue || 12500000),
      change: "+12.5%",
      trend: "up",
      description: "YTD vs Last Year",
      icon: DollarSign,
    },
    {
      title: "Net Profit",
      value: formatLakhs(data?.netProfit || 2800000),
      change: "+8.2%",
      trend: "up",
      description: "22.4% Margin",
      icon: TrendingUp,
    },
    {
      title: "Cash Balance",
      value: formatLakhs(data?.cashBalance || 4200000),
      change: "-5.1%",
      trend: "down",
      description: "Available Funds",
      icon: PiggyBank,
    },
    {
      title: "Current Ratio",
      value: "2.4",
      change: "+0.3",
      trend: "up",
      description: "Healthy Liquidity",
      icon: CheckCircle,
    },
  ]

  const complianceStatus = [
    { name: "GST Filing", status: "current", dueDate: "20th Jan" },
    { name: "TDS Return", status: "due", dueDate: "31st Jan" },
    { name: "ROC Filing", status: "current", dueDate: "30th Mar" },
    { name: "Advance Tax", status: "overdue", dueDate: "15th Dec" },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewData.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                    {item.title}
                    <Icon className="h-4 w-4 text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.trend === "up" ? "default" : "destructive"} className="text-xs">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {item.change}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Compliance Status */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Compliance Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceStatus.map((item, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <Badge
                    variant={
                      item.status === "current" ? "default" : item.status === "due" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {item.status === "current" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
