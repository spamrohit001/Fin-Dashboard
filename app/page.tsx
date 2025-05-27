"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewCards } from "@/components/overview-cards"
import { ChartsSection } from "@/components/charts-section"
import { TablesSection } from "@/components/tables-section"
import { ActionCenter } from "@/components/action-center"
import { ReportsCenter } from "@/components/reports-center"
import { useFinancialData } from "@/hooks/use-financial-data"

export default function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState("FY2024")
  const { data, updateData, isLoading } = useFinancialData()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Section */}
        <OverviewCards data={data} isLoading={isLoading} />

        {/* Charts & Visualizations */}
        <ChartsSection data={data} isLoading={isLoading} />

        {/* Tables & Drill-downs */}
        <TablesSection data={data} isLoading={isLoading} />

        {/* Action Center */}
        <ActionCenter data={data} />

        {/* Reports Center */}
        <ReportsCenter data={data} />
      </main>
    </div>
  )
}
