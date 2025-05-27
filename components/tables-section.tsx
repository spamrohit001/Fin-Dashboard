"use client"

import { useState } from "react"
import { AlertTriangle, Clock, CheckCircle, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TablesSectionProps {
  data: any
  isLoading: boolean
}

export function TablesSection({ data, isLoading }: TablesSectionProps) {
  const [receivablesFilter, setReceivablesFilter] = useState("all")
  const [expenseFilter, setExpenseFilter] = useState("all")

  const receivablesData = [
    {
      client: "ABC Corporation",
      invoiceNo: "INV-2024-001",
      amount: 250000,
      dueDate: "2024-01-15",
      aging: 45,
      status: "overdue",
    },
    {
      client: "XYZ Industries",
      invoiceNo: "INV-2024-002",
      amount: 180000,
      dueDate: "2024-02-01",
      aging: 28,
      status: "due",
    },
    {
      client: "DEF Solutions",
      invoiceNo: "INV-2024-003",
      amount: 320000,
      dueDate: "2024-02-15",
      aging: 14,
      status: "current",
    },
    {
      client: "GHI Enterprises",
      invoiceNo: "INV-2024-004",
      amount: 95000,
      dueDate: "2024-01-30",
      aging: 30,
      status: "due",
    },
  ]

  const expenseData = [
    {
      date: "2024-01-15",
      vendor: "Office Supplies Co",
      category: "Office Expenses",
      amount: 25000,
      gst: 4500,
      status: "paid",
      variance: "normal",
    },
    {
      date: "2024-01-16",
      vendor: "Tech Solutions Ltd",
      category: "IT Services",
      amount: 150000,
      gst: 27000,
      status: "pending",
      variance: "high",
    },
    {
      date: "2024-01-17",
      vendor: "Marketing Agency",
      category: "Marketing",
      amount: 80000,
      gst: 14400,
      status: "paid",
      variance: "normal",
    },
  ]

  const complianceData = [
    {
      type: "GST Return",
      period: "December 2023",
      dueDate: "2024-01-20",
      status: "filed",
      filedDate: "2024-01-18",
    },
    {
      type: "TDS Return",
      period: "Q3 FY24",
      dueDate: "2024-01-31",
      status: "pending",
      filedDate: null,
    },
    {
      type: "Advance Tax",
      period: "Q3 FY24",
      dueDate: "2023-12-15",
      status: "overdue",
      filedDate: null,
    },
    {
      type: "ROC Filing",
      period: "FY 2023-24",
      dueDate: "2024-03-30",
      status: "upcoming",
      filedDate: null,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      case "due":
        return (
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Due
          </Badge>
        )
      case "current":
        return (
          <Badge variant="default" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Current
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="default" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "filed":
        return (
          <Badge variant="default" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Filed
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="text-xs">
            Upcoming
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Detailed Analysis</h2>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Detailed Analysis</h2>

      <div className="grid gap-6">
        {/* Accounts Receivable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Accounts Receivable Aging</CardTitle>
                <CardDescription>Outstanding invoices with aging analysis</CardDescription>
              </div>
              <Select value={receivablesFilter} onValueChange={setReceivablesFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="due">Due Soon</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Aging (Days)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivablesData
                  .filter((item) => receivablesFilter === "all" || item.status === receivablesFilter)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.client}</TableCell>
                      <TableCell>{item.invoiceNo}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{new Date(item.dueDate).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell>
                        <span className={item.aging > 30 ? "text-red-600 font-semibold" : ""}>{item.aging}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Expense transactions with variance analysis</CardDescription>
              </div>
              <Select value={expenseFilter} onValueChange={setExpenseFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Office Expenses">Office Expenses</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseData
                  .filter((item) => expenseFilter === "all" || item.category === expenseFilter)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(item.date).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell className="font-medium">{item.vendor}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{formatCurrency(item.gst)}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.variance === "high" ? (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            High
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Normal
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Compliance Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Filing Tracker</CardTitle>
            <CardDescription>Statutory compliance status and upcoming deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filing Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Filed Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{new Date(item.dueDate).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.filedDate ? new Date(item.filedDate).toLocaleDateString("en-IN") : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
