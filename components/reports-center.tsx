"use client"

import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ReportsCenterProps {
  data: any
}

export function ReportsCenter({ data }: ReportsCenterProps) {
  const reports = [
    {
      name: "Profit & Loss Statement",
      description: "Comprehensive P&L for the current financial year",
      type: "financial",
      lastGenerated: "2024-01-28",
      icon: TrendingUp,
      format: ["PDF", "Excel"],
    },
    {
      name: "Balance Sheet",
      description: "Assets, liabilities and equity position",
      type: "financial",
      lastGenerated: "2024-01-28",
      icon: BarChart3,
      format: ["PDF", "Excel"],
    },
    {
      name: "Cash Flow Statement",
      description: "Operating, investing and financing activities",
      type: "financial",
      lastGenerated: "2024-01-28",
      icon: PieChart,
      format: ["PDF", "Excel"],
    },
    {
      name: "GST Reconciliation Report",
      description: "GSTR-1 vs GSTR-3B reconciliation with discrepancies",
      type: "compliance",
      lastGenerated: "2024-01-25",
      icon: FileText,
      format: ["PDF", "Excel"],
    },
    {
      name: "Accounts Receivable Aging",
      description: "Detailed aging analysis with client-wise breakdown",
      type: "operational",
      lastGenerated: "2024-01-29",
      icon: Calendar,
      format: ["PDF", "Excel"],
    },
    {
      name: "Budget vs Actual Analysis",
      description: "Variance analysis against approved budget",
      type: "analytical",
      lastGenerated: "2024-01-27",
      icon: BarChart3,
      format: ["PDF", "Excel"],
    },
  ]

  const quickReports = [
    {
      name: "Monthly Summary",
      description: "Key metrics for the current month",
    },
    {
      name: "Tax Summary",
      description: "GST, TDS and other tax obligations",
    },
    {
      name: "Expense Analysis",
      description: "Category-wise expense breakdown",
    },
    {
      name: "Revenue Trends",
      description: "Revenue analysis by segment and period",
    },
  ]

  const getTypeBadge = (type: string) => {
    const colors = {
      financial: "bg-blue-100 text-blue-800",
      compliance: "bg-red-100 text-red-800",
      operational: "bg-green-100 text-green-800",
      analytical: "bg-purple-100 text-purple-800",
    }

    return (
      <Badge variant="outline" className={`text-xs ${colors[type as keyof typeof colors]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const handleDownload = (reportName: string, format: string) => {
    console.log(`Downloading ${reportName} in ${format} format`)
    // Implement actual download logic here
  }

  const handleGenerateReport = (reportName: string) => {
    console.log(`Generating ${reportName}`)
    // Implement report generation logic here
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Reports & Download Center</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Standard Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Statements & Reports
            </CardTitle>
            <CardDescription>Generate and download comprehensive financial reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => {
                const Icon = report.icon
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{report.name}</h4>
                            {getTypeBadge(report.type)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <p className="text-xs text-gray-500">
                            Last generated: {new Date(report.lastGenerated).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => handleGenerateReport(report.name)}>
                          Generate
                        </Button>
                        <div className="flex gap-1">
                          {report.format.map((format) => (
                            <Button
                              key={format}
                              size="sm"
                              variant="ghost"
                              className="text-xs px-2 py-1 h-6"
                              onClick={() => handleDownload(report.name, format)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Generate instant summary reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickReports.map((report, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">{report.name}</h4>
                  <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="h-3 w-3 mr-2" />
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Export Options</CardTitle>
          <CardDescription>Export multiple reports or data sets at once</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">All Financial Statements</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Compliance Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="text-sm">Management Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
