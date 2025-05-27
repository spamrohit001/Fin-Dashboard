"use client"

import { Building2, Download, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface DashboardHeaderProps {
  timeRange: string
  setTimeRange: (range: string) => void
}

export function DashboardHeader({ timeRange, setTimeRange }: DashboardHeaderProps) {
  const timeRanges = [
    { value: "FY2024", label: "FY 2024-25" },
    { value: "FY2023", label: "FY 2023-24" },
    { value: "Q4", label: "Q4 FY24" },
    { value: "monthly", label: "Last 12 Months" },
  ]

  const handleExportPDF = () => {
    // PDF export logic
    console.log("Exporting to PDF...")
  }

  const handleExportExcel = () => {
    // Excel export logic
    console.log("Exporting to Excel...")
  }

  return (
    <Card className="border-0 rounded-none bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
              <p className="text-sm text-gray-600">Virtual CFO Insights & Analytics</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
