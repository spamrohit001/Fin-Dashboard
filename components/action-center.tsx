"use client"

import { AlertTriangle, TrendingUp, Clock, FileText, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ActionCenterProps {
  data: any
}

export function ActionCenter({ data }: ActionCenterProps) {
  const redFlags = [
    {
      type: "critical",
      title: "High Debtor Days",
      description: "Average collection period is 45 days, 15 days above industry standard",
      impact: "₹8.5L locked in receivables",
      action: "Implement stricter credit terms and follow-up procedures",
    },
    {
      type: "warning",
      title: "Cash Flow Concern",
      description: "Cash outflow exceeded inflow by ₹2.1L in the last month",
      impact: "Potential liquidity issues",
      action: "Review expense commitments and accelerate collections",
    },
    {
      type: "compliance",
      title: "TDS Return Overdue",
      description: "Q3 TDS return filing is pending, due date was 31st Jan",
      impact: "Penalty of ₹200 per day",
      action: "File immediately to avoid further penalties",
    },
  ]

  const suggestedActions = [
    {
      priority: "high",
      title: "Follow up on ABC Corporation",
      description: "₹2.5L invoice overdue by 45 days",
      category: "Collections",
    },
    {
      priority: "medium",
      title: "Review Marketing Spend",
      description: "Marketing expenses increased by 35% this quarter",
      category: "Cost Control",
    },
    {
      priority: "low",
      title: "Optimize Inventory Levels",
      description: "Inventory turnover ratio below industry average",
      category: "Operations",
    },
  ]

  const insights = [
    {
      title: "Revenue Growth Opportunity",
      description: "Service segment showing 25% growth - consider expanding service offerings",
      type: "opportunity",
    },
    {
      title: "Cost Optimization",
      description: "Office rent constitutes 14% of revenue - explore cost-effective alternatives",
      type: "efficiency",
    },
    {
      title: "Working Capital Management",
      description: "Current ratio of 2.4 indicates good liquidity but excess cash could be invested",
      type: "optimization",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {priority}
          </Badge>
        )
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "compliance":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Action Center & Insights</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Red Flags & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Red Flags & Alerts
            </CardTitle>
            <CardDescription>Critical issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {redFlags.map((flag, index) => (
              <Alert key={index} className="border-l-4 border-l-red-500">
                <div className="flex items-start gap-3">
                  {getTypeIcon(flag.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{flag.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-red-600 font-medium">Impact: {flag.impact}</p>
                      <p className="text-xs text-blue-600">Action: {flag.action}</p>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Suggested Actions
            </CardTitle>
            <CardDescription>Recommended actions to improve financial health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedActions.map((action, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{action.title}</h4>
                  {getPriorityBadge(action.priority)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {action.category}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Financial Consultant Insights
            </CardTitle>
            <CardDescription>Professional insights and recommendations from your virtual CFO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(insight.type)}
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">Add Consultant Notes</h4>
              <Textarea
                placeholder="Add your professional insights and recommendations for the client..."
                className="min-h-20"
              />
              <Button className="mt-2" size="sm">
                Save Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
