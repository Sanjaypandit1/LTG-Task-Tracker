"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Task } from "../db/taskDatabase"
import { TaskCard } from "../components/TaskCard"
import { TaskModal } from "../components/TaskModal"
import { tasksDb } from "../db/taskDatabase"

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>(tasksDb.getAllTasks())
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isViewAllVisible, setIsViewAllVisible] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleSaveTask = (formData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      const updated = tasksDb.updateTask(editingTask.id, formData)
      if (updated) {
        setTasks(tasksDb.getAllTasks())
      }
    } else {
      tasksDb.addTask(formData)
      setTasks(tasksDb.getAllTasks())
    }
    resetForm()
    setIsModalVisible(false)
  }

  const handleDeleteTask = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Delete",
        onPress: () => {
          tasksDb.deleteTask(id)
          setTasks(tasksDb.getAllTasks())
        },
        style: "destructive",
      },
    ])
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsModalVisible(true)
  }

  const resetForm = () => {
    setEditingTask(null)
  }

  const pendingTasks = tasks.filter((t) => t.status === "Pending").length
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length
  const completedTasks = tasks.filter((t) => t.status === "Completed").length

  const displayedTasks = isViewAllVisible ? tasks : tasks.slice(0, 3)

  // Function to add sample tasks
  const addSampleTasks = () => {
    const sampleTasks: Omit<Task, "id" | "createdAt" | "updatedAt">[] = [
      {
        title: "Plan weekly schedule",
        description: "Create and prioritize tasks for the upcoming week",
        status: "Pending",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        priority: "High",
      },
      {
        title: "Complete project proposal",
        description: "Finish writing and reviewing the client proposal",
        status: "In Progress",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        priority: "High",
      },
      {
        title: "Team meeting preparation",
        description: "Prepare agenda and materials for team meeting",
        status: "Completed",
        dueDate: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        priority: "Medium",
      },
    ]

    sampleTasks.forEach(task => tasksDb.addTask(task))
    setTasks(tasksDb.getAllTasks())
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B7A5A" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>Sanjay</Text>
            </View>
            <Text style={styles.subtitle}>Here's your today's overview</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => Alert.alert("Notifications", "You have 3 new notifications")}
          >
            <Icon name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.pendingCard]}>
            <View style={styles.summaryIconContainer}>
              <Icon name="time-outline" size={24} color="#F39C12" />
            </View>
            <Text style={styles.summaryNumber}>{pendingTasks}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>

          <View style={[styles.summaryCard, styles.inProgressCard]}>
            <View style={styles.summaryIconContainer}>
              <Icon name="hammer-outline" size={24} color="#3498DB" />
            </View>
            <Text style={styles.summaryNumber}>{inProgressTasks}</Text>
            <Text style={styles.summaryLabel}>In Progress</Text>
          </View>

          <View style={[styles.summaryCard, styles.completedCard]}>
            <View style={styles.summaryIconContainer}>
              <Icon name="checkmark-done-outline" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.summaryNumber}>{completedTasks}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* Task List Section */}
        <View style={styles.taskSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Tasks</Text>
            {!isViewAllVisible && tasks.length > 3 && (
              <TouchableOpacity style={styles.seeAllButton} onPress={() => setIsViewAllVisible(true)}>
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="chevron-forward" size={16} color="#2B7A5A" />
              </TouchableOpacity>
            )}
            {isViewAllVisible && tasks.length > 0 && (
              <TouchableOpacity style={styles.seeAllButton} onPress={() => setIsViewAllVisible(false)}>
                <Text style={styles.seeAllText}>Collapse</Text>
                <Icon name="chevron-back" size={16} color="#2B7A5A" />
              </TouchableOpacity>
            )}
          </View>

          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Icon name="calendar-outline" size={48} color="#CBD5E0" />
              </View>
              <Text style={styles.emptyTitle}>No tasks scheduled yet</Text>
              <Text style={styles.emptyDescription}>
                Add your work and schedule to stay organized and productive
              </Text>
              <TouchableOpacity 
                style={styles.addSampleButton} 
                 onPress={() => {
          resetForm()
          setIsModalVisible(true)
        }}
              >
                <Icon name="rocket-outline" size={20} color="#fff" />
                <Text style={styles.addSampleButtonText}>Add Sample Schedule</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={displayedTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard 
                  item={item} 
                  onPress={handleEditTask} 
                  onDelete={handleDeleteTask} 
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={styles.taskList}
            />
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TaskModal
        visible={isModalVisible}
        editingTask={editingTask}
        onClose={() => {
          resetForm()
          setIsModalVisible(false)
        }}
        onSave={handleSaveTask}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm()
          setIsModalVisible(true)
        }}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#E8F5E8",
    fontWeight: "500",
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#B8E6B8",
    fontWeight: "400",
  },
  notificationButton: {
    padding: 8,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF6B6B",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  pendingCard: {
    borderTopWidth: 4,
    borderTopColor: "#F39C12",
  },
  inProgressCard: {
    borderTopWidth: 4,
    borderTopColor: "#3498DB",
  },
  completedCard: {
    borderTopWidth: 4,
    borderTopColor: "#4CAF50",
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "500",
  },
  taskSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: "#2B7A5A",
    fontWeight: "600",
    marginRight: 2,
  },
  taskList: {
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: "#2B7A5A",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 24,
    shadowColor: "#2B7A5A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  // Empty State Styles
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f7f7f7",
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#EDF2F7",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  addSampleButton: {
    backgroundColor: "#2B7A5A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#2B7A5A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addSampleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})