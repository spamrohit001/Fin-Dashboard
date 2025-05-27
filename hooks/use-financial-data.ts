"use client"

import { useState, useEffect } from "react"

export function useFinancialData() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading mock data
    const timer = setTimeout(() => {
      setData({
        totalRevenue: 12500000,
        netProfit: 2800000,
        cashBalance: 4200000,
        currentRatio: 2.4,
        gstCollected: 2250000,
        grossMargin: 45.2,
        ebitda: 3200000,
        debtorDays: 42,
        creditorDays: 28,
        lastUpdated: new Date().toISOString(),
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const updateData = (newData: any) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
      lastUpdated: new Date().toISOString(),
    }))
  }

  return { data, updateData, isLoading }
}
