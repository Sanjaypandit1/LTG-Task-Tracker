"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Task {
  id: string
  title: string
  description: string
  status: "Pending" | "Completed" | "In Progress"
  priority: "Low" | "Medium" | "High"
  dueDate: string
  createdAt: string
  category: string
  estimatedTime: string
  attachments: number
  comments: number
  isUrgent: boolean
  isFavorite: boolean
}

type TaskStatus = "Pending" | "Completed" | "In Progress"
type TaskPriority = "Low" | "Medium" | "High"

export default function TaskDetailScreen() {
  const [task, setTask] = useState<Task>({
    id: "1",
    title: "Design Project UI",
    description:
      "Create modern and responsive user interface designs for the new project. Focus on user experience and accessibility standards.",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-11-11",
    createdAt: "2025-11-01",
    category: "Design",
    estimatedTime: "8 hours",
    attachments: 3,
    comments: 5,
    isUrgent: true,
    isFavorite: false,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Task>(task)
  const [newComment, setNewComment] = useState("")

  const handleSave = (): void => {
    setTask(editedTask)
    setIsEditing(false)
    Alert.alert("Success", "Task updated successfully!")
  }

  const handleStatusChange = (newStatus: TaskStatus): void => {
    setEditedTask({ ...editedTask, status: newStatus })
  }

  const handlePriorityChange = (newPriority: TaskPriority): void => {
    setEditedTask({ ...editedTask, priority: newPriority })
  }

  const addComment = (): void => {
    if (newComment.trim()) {
      setNewComment("")
      Alert.alert("Comment Added", "Your comment has been posted.")
    }
  }

  const toggleFavorite = (): void => {
    setEditedTask({ ...editedTask, isFavorite: !editedTask.isFavorite })
  }

  const getStatusIcon = (status: TaskStatus): string => {
    switch (status) {
      case "Completed":
        return "checkmark-done-circle"
      case "In Progress":
        return "time"
      case "Pending":
        return "alert-circle"
      default:
        return "ellipse"
    }
  }

  const getPriorityIcon = (priority: TaskPriority): string => {
    switch (priority) {
      case "High":
        return "arrow-up"
      case "Medium":
        return "remove"
      case "Low":
        return "arrow-down"
      default:
        return "flag"
    }
  }

  const markAsComplete = (): void => {
    setTask({ ...task, status: "Completed" })
    setEditedTask({ ...editedTask, status: "Completed" })
    Alert.alert("Task Completed", "Task has been marked as completed!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B7A5A" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => Alert.alert("Back", "Navigate back to previous screen")}
          >
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <Text style={styles.headerSubtitle}>Task Details</Text>
            {isEditing ? (
              <TextInput
                style={styles.titleInput}
                value={editedTask.title}
                onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
                placeholder="Task title"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            ) : (
              <Text style={styles.headerMainTitle}>{task.title}</Text>
            )}
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
              <Icon
                name={editedTask.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={editedTask.isFavorite ? "#FF6B6B" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsEditing(!isEditing)}>
              <Icon name={isEditing ? "close" : "create-outline"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status and Priority Cards */}
        <View style={styles.quickStats}>
          <View style={[styles.statCard, { backgroundColor: statusColors[editedTask.status] }]}>
            <Icon name={getStatusIcon(editedTask.status)} size={20} color="#fff" />
            <Text style={styles.statLabel}>Status</Text>
            {isEditing ? (
              <View style={styles.statusSelector}>
                {(Object.keys(statusColors) as TaskStatus[]).map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[styles.statusOption, editedTask.status === status && styles.statusOptionActive]}
                    onPress={() => handleStatusChange(status)}
                  >
                    <Text
                      style={[styles.statusOptionText, editedTask.status === status && styles.statusOptionTextActive]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.statValue}>{editedTask.status}</Text>
            )}
          </View>

          <View style={[styles.statCard, { backgroundColor: priorityColors[editedTask.priority] }]}>
            <Icon name={getPriorityIcon(editedTask.priority)} size={20} color="#fff" />
            <Text style={styles.statLabel}>Priority</Text>
            {isEditing ? (
              <View style={styles.prioritySelector}>
                {(Object.keys(priorityColors) as TaskPriority[]).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[styles.priorityOption, editedTask.priority === priority && styles.priorityOptionActive]}
                    onPress={() => handlePriorityChange(priority)}
                  >
                    <Text
                      style={[
                        styles.priorityOptionText,
                        editedTask.priority === priority && styles.priorityOptionTextActive,
                      ]}
                    >
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.statValue}>{editedTask.priority}</Text>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="document-text-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.descriptionInput}
              value={editedTask.description}
              onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
              placeholder="Task description"
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={styles.description}>{task.description}</Text>
          )}
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon name="calendar-outline" size={18} color="#2B7A5A" />
            </View>
            <View>
              <Text style={styles.detailLabel}>Due Date</Text>
              <Text style={styles.detailValue}>{task.dueDate}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon name="time-outline" size={18} color="#2B7A5A" />
            </View>
            <View>
              <Text style={styles.detailLabel}>Estimated Time</Text>
              <Text style={styles.detailValue}>{task.estimatedTime}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon name="folder-outline" size={18} color="#2B7A5A" />
            </View>
            <View>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{task.category}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon name="paper-plane-outline" size={18} color="#2B7A5A" />
            </View>
            <View>
              <Text style={styles.detailLabel}>Created</Text>
              <Text style={styles.detailValue}>{task.createdAt}</Text>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Icon name="attach-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{task.attachments} Attachments</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{task.comments} Comments</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="warning-outline" size={20} color={task.isUrgent ? "#E74C3C" : "#666"} />
            <Text style={[styles.infoText, task.isUrgent && styles.urgentText]}>
              {task.isUrgent ? "Urgent" : "Normal Priority"}
            </Text>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="chatbubbles-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Comments ({task.comments})</Text>
          </View>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity style={styles.commentButton} onPress={addComment}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {isEditing ? (
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => {
              setIsEditing(false)
              setEditedTask(task)
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionBar}>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Icon name="share-social-outline" size={20} color="#2B7A5A" />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={markAsComplete}>
            <Icon name="checkmark-done-outline" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const statusColors: Record<TaskStatus, string> = {
  Pending: "#F39C12",
  "In Progress": "#3498DB",
  Completed: "#4CAF50",
}

const priorityColors: Record<TaskPriority, string> = {
  Low: "#27AE60",
  Medium: "#F39C12",
  High: "#E74C3C",
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#2B7A5A",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E8F5E8",
    marginBottom: 4,
  },
  headerMainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
    minWidth: 200,
  },
  headerActions: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  quickStats: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  statusSelector: {
    flexDirection: "row",
    marginTop: 4,
  },
  statusOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  statusOptionActive: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  statusOptionText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  statusOptionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  prioritySelector: {
    flexDirection: "row",
    marginTop: 4,
  },
  priorityOption: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginHorizontal: 1,
  },
  priorityOptionActive: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  priorityOptionText: {
    fontSize: 8,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  priorityOptionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  descriptionInput: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    minHeight: 100,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    minWidth: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F7F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
  },
  additionalInfo: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  urgentText: {
    color: "#E74C3C",
    fontWeight: "600",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    maxHeight: 100,
  },
  commentButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2B7A5A",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBar: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  primaryButton: {
    backgroundColor: "#2B7A5A",
  },
  cancelButton: {
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  saveButton: {
    backgroundColor: "#2B7A5A",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B7A5A",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
