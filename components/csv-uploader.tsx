"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CSVUploaderProps {
  onDataUpdate: (data: any) => void
}

export function CSVUploader({ onDataUpdate }: CSVUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const csvContent = `Date,Transaction_Type,Amount,GST_Rate,GST_Amount,Category,Vendor_Client,Description,Invoice_Number,Payment_Status
2024-01-15,Revenue,100000,18,18000,Product_Sales,ABC Corp,Product Sale Invoice,INV-001,Paid
2024-01-16,Expense,25000,18,4500,Office_Rent,XYZ Properties,Monthly Rent,RENT-001,Paid
2024-01-17,Revenue,75000,12,9000,Service_Income,DEF Ltd,Consulting Services,INV-002,Pending
2024-01-18,Expense,15000,0,0,Salary,Employee,Monthly Salary,SAL-001,Paid
2024-01-19,Expense,8000,18,1440,Marketing,Google Ads,Digital Marketing,MKT-001,Paid`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "financial_data_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus("uploading")
    setUploadMessage("Processing your financial data...")

    try {
      const text = await file.text()
      const lines = text.split("\n")
      const headers = lines[0].split(",")

      // Validate CSV format
      const requiredHeaders = ["Date", "Transaction_Type", "Amount", "Category"]
      const hasRequiredHeaders = requiredHeaders.every((header) =>
        headers.some((h) => h.trim().toLowerCase().includes(header.toLowerCase())),
      )

      if (!hasRequiredHeaders) {
        throw new Error("CSV format invalid. Please use the provided template.")
      }

      // Parse CSV data
      const data = lines
        .slice(1)
        .map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || ""
            return obj
          }, {} as any)
        })
        .filter((row) => row.Date) // Filter out empty rows

      // Process and analyze data
      const processedData = analyzeFinancialData(data)
      onDataUpdate(processedData)

      setUploadStatus("success")
      setUploadMessage(`Successfully processed ${data.length} transactions`)
    } catch (error) {
      setUploadStatus("error")
      setUploadMessage(error instanceof Error ? error.message : "Failed to process file")
    }
  }

  const analyzeFinancialData = (rawData: any[]) => {
    // This would contain the actual analysis logic
    // For now, returning mock processed data
    return {
      totalRevenue: rawData
        .filter((row) => row.Transaction_Type === "Revenue")
        .reduce((sum, row) => sum + Number.parseFloat(row.Amount || 0), 0),
      totalExpenses: rawData
        .filter((row) => row.Transaction_Type === "Expense")
        .reduce((sum, row) => sum + Number.parseFloat(row.Amount || 0), 0),
      transactions: rawData,
      lastUpdated: new Date().toISOString(),
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Data Management
        </CardTitle>
        <CardDescription>Upload your financial data or download the template to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleDownloadTemplate} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadStatus === "uploading"}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploadStatus === "uploading" ? "Processing..." : "Upload Financial Data"}
          </Button>

          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
        </div>

        {uploadStatus !== "idle" && (
          <Alert className={uploadStatus === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            {uploadStatus === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : uploadStatus === "error" ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <Upload className="h-4 w-4 text-blue-600" />
            )}
            <AlertDescription className={uploadStatus === "error" ? "text-red-700" : "text-green-700"}>
              {uploadMessage}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
