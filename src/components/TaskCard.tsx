import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Task {
  id: string
  title: string
  description?: string
  status: "Pending" | "Completed" | "In Progress"
  dueDate: string
  priority?: "Low" | "Medium" | "High"
  createdAt: string
  updatedAt: string
}

interface TaskCardProps {
  item: Task
  onPress: (task: Task) => void
  onDelete: (id: string) => void
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return "checkmark-circle"
    case "In Progress":
      return "time"
    case "Pending":
      return "alert-circle"
    default:
      return "ellipse"
  }
}

export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "High":
      return "#E74C3C"
    case "Medium":
      return "#F39C12"
    case "Low":
      return "#27AE60"
    default:
      return "#95A5A6"
  }
}

export const TaskCard: React.FC<TaskCardProps> = ({ item, onPress, onDelete }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return styles.completed
      case "Pending":
        return styles.pending
      case "In Progress":
        return styles.inProgress
      default:
        return styles.pending
    }
  }

  return (
    <TouchableOpacity style={styles.taskCard} onPress={() => onPress(item)}>
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <View style={[styles.statusIndicator, getStatusStyles(item.status)]}>
            <Icon name={getStatusIcon(item.status)} size={16} color="#fff" />
          </View>
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.description && (
              <Text style={styles.taskDescription} numberOfLines={1}>
                {item.description}
              </Text>
            )}
            <View style={styles.dueDateContainer}>
              <Icon name="calendar-outline" size={12} color="#666" />
              <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
              {item.priority && (
                <>
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: getPriorityColor(item.priority),
                      marginLeft: 12,
                      marginRight: 8,
                    }}
                  />
                  <Text style={[styles.dueDate, { color: getPriorityColor(item.priority) }]}>{item.priority}</Text>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
          <Icon name="trash-outline" size={18} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f7f7f7",
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 12,
    color: "#95A5A6",
    marginBottom: 4,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dueDate: {
    fontSize: 12,
    color: "#718096",
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },
  completed: { backgroundColor: "#4CAF50" },
  pending: { backgroundColor: "#F39C12" },
  inProgress: { backgroundColor: "#3498DB" },
})
