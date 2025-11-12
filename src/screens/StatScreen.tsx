"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface ChartDataPoint {
  label: string
  value: number
  percentage: number
}

interface MetricCard {
  title: string
  value: string
  change: string
  icon: string
  color: string
  bgColor: string
}

const { width } = Dimensions.get("window")

export default function StatScreen() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  const metrics: MetricCard[] = [
    {
      title: "Productivity Score",
      value: "87%",
      change: "+5% from last month",
      icon: "trending-up",
      color: "#4CAF50",
      bgColor: "#F1F8F4",
    },
    {
      title: "Tasks Completed",
      value: "47",
      change: "+12% from last month",
      icon: "checkmark-done-circle",
      color: "#3498DB",
      bgColor: "#F0F6FB",
    },
    {
      title: "Avg. Time/Task",
      value: "3.3h",
      change: "-0.5h from last month",
      icon: "hourglass",
      color: "#F39C12",
      bgColor: "#FEF5E7",
    },
    {
      title: "On-Time Rate",
      value: "94%",
      change: "+3% from last month",
      icon: "time",
      color: "#9B59B6",
      bgColor: "#F5F0FB",
    },
  ]

  const taskDistribution: ChartDataPoint[] = [
    { label: "Design", value: 28, percentage: 35 },
    { label: "Development", value: 32, percentage: 40 },
    { label: "Testing", value: 12, percentage: 15 },
    { label: "Deployment", value: 8, percentage: 10 },
  ]

  const categoryStats = [
    { category: "High Priority", completed: 18, pending: 4, color: "#E74C3C" },
    { category: "Medium Priority", completed: 22, pending: 5, color: "#F39C12" },
    { category: "Low Priority", completed: 7, pending: 3, color: "#3498DB" },
  ]

  const SimpleBar = ({ percentage, color }: { percentage: number; color: string }) => (
    <View style={styles.barContainer}>
      <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B7A5A" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerSubtitle}>Statistics</Text>
            <Text style={styles.headerTitle}>Your Performance</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Time Range Filter */}
        <View style={styles.timeRangeContainer}>
          {(["week", "month", "year"] as const).map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.timeRangeButton, timeRange === range && styles.timeRangeButtonActive]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[styles.timeRangeText, timeRange === range && styles.timeRangeTextActive]}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Metrics Grid */}
        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.bgColor }]}>
                  <Icon name={metric.icon} size={24} color={metric.color} />
                </View>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricChange}>{metric.change}</Text>
            </View>
          ))}
        </View>

        {/* Task Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="pie-chart-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Tasks by Category</Text>
          </View>

          <View style={styles.distributionList}>
            {taskDistribution.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
                <View style={styles.distributionLeft}>
                  <View
                    style={[
                      styles.colorIndicator,
                      {
                        backgroundColor: ["#E74C3C", "#3498DB", "#F39C12", "#4CAF50"][index],
                      },
                    ]}
                  />
                  <View>
                    <Text style={styles.distributionLabel}>{item.label}</Text>
                    <Text style={styles.distributionCount}>{item.value} tasks</Text>
                  </View>
                </View>
                <Text style={styles.distributionPercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>

          {/* Simple Percentage Bars */}
          <View style={styles.barsContainer}>
            {taskDistribution.map((item, index) => (
              <View key={index} style={styles.barItem}>
                <View style={styles.barLabel}>
                  <Text style={styles.barLabelText}>{item.label}</Text>
                  <Text style={styles.barValue}>{item.percentage}%</Text>
                </View>
                <SimpleBar percentage={item.percentage} color={["#E74C3C", "#3498DB", "#F39C12", "#4CAF50"][index]} />
              </View>
            ))}
          </View>
        </View>

        {/* Category Performance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="layers-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Priority Breakdown</Text>
          </View>

          <View style={styles.categoryList}>
            {categoryStats.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryLeft}>
                    <View style={[styles.categoryIndicator, { backgroundColor: item.color }]} />
                    <Text style={styles.categoryName}>{item.category}</Text>
                  </View>
                  <Text style={styles.categoryTotal}>{item.completed + item.pending} tasks</Text>
                </View>

                <View style={styles.categoryStats}>
                  <View style={styles.categoryStatItem}>
                    <Icon name="checkmark" size={16} color="#4CAF50" />
                    <Text style={styles.categoryStatLabel}>{item.completed} done</Text>
                  </View>
                  <View style={styles.categoryStatItem}>
                    <Icon name="hourglass" size={16} color="#F39C12" />
                    <Text style={styles.categoryStatLabel}>{item.pending} pending</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="calendar-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Weekly Activity</Text>
          </View>

          <View style={styles.weeklyActivity}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const heights = [60, 75, 65, 85, 90, 45, 30]
              return (
                <View key={index} style={styles.dayColumn}>
                  <View style={styles.dayBarContainer}>
                    <View
                      style={[
                        styles.dayBar,
                        {
                          height: `${heights[index]}%`,
                          backgroundColor: "#2B7A5A",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* Export Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.exportButton}>
            <Icon name="download-outline" size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#2B7A5A",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E8F5E8",
    fontWeight: "500",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Time Range
  timeRangeContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 24,
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  timeRangeButtonActive: {
    backgroundColor: "#2B7A5A",
    borderColor: "#2B7A5A",
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#718096",
  },
  timeRangeTextActive: {
    color: "#fff",
  },

  // Metrics Grid
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
    flex: 1,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 11,
    color: "#718096",
    fontWeight: "500",
  },

  // Section
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginLeft: 8,
  },

  // Distribution
  distributionList: {
    marginBottom: 20,
  },
  distributionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  distributionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  distributionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 2,
  },
  distributionCount: {
    fontSize: 12,
    color: "#718096",
  },
  distributionPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B7A5A",
  },

  // Bars
  barsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  barItem: {
    marginBottom: 16,
  },
  barLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  barLabelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
  },
  barValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2B7A5A",
  },
  barContainer: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },

  // Category
  categoryList: {
    gap: 16,
  },
  categoryItem: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3498DB",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
  },
  categoryTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#718096",
  },
  categoryStats: {
    flexDirection: "row",
    gap: 16,
  },
  categoryStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryStatLabel: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "500",
  },

  // Weekly Activity
  weeklyActivity: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 140,
    paddingVertical: 16,
  },
  dayColumn: {
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  dayBarContainer: {
    height: "80%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  dayBar: {
    width: 24,
    borderRadius: 6,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
  },

  // Export Button
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B7A5A",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
