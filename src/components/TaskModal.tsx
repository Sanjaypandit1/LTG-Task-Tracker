"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { CalendarPicker } from "./CalenderPicker"

interface Task {
  id: string
  title: string
  description?: string
  status: "Pending" | "Completed" | "In Progress"
  dueDate: string
  priority?: "Low" | "Medium" | "High"
}

interface TaskModalProps {
  visible: boolean
  editingTask: Task | null
  onClose: () => void
  onSave: (formData: Omit<Task, "id">) => void
}

export const TaskModal: React.FC<TaskModalProps> = ({ visible, editingTask, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium" as "Low" | "Medium" | "High",
    status: "Pending" as "Pending" | "In Progress" | "Completed",
  })
  const [showCalendar, setShowCalendar] = useState(false)

  React.useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || "",
        dueDate: editingTask.dueDate,
        priority: editingTask.priority || "Medium",
        status: editingTask.status,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
      })
    }
  }, [editingTask, visible])

  const handleSaveTask = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Task title cannot be empty")
      return
    }
    onSave(formData)
  }

  const handleDateSelect = (date: Date) => {
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    setFormData({ ...formData, dueDate: dateString })
    setShowCalendar(false)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#2D3748" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingTask ? "Edit Task" : "Add New Task"}</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Task Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter task description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline={true}
              numberOfLines={3}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowCalendar(true)}>
              <Icon name="calendar-outline" size={18} color="#2B7A5A" />
              <Text style={[styles.dateText, !formData.dueDate && styles.placeholderText]}>
                {formData.dueDate || "Select a due date"}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <CalendarPicker
                  onDateSelect={handleDateSelect}
                  onClose={() => setShowCalendar(false)}
                  selectedDate={formData.dueDate}
                />
              </View>
            )}

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {(["Low", "Medium", "High"] as const).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[styles.priorityButton, formData.priority === priority && styles.priorityButtonActive]}
                  onPress={() => setFormData({ ...formData, priority })}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      formData.priority === priority && styles.priorityButtonTextActive,
                    ]}
                  >
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              {(["Pending", "In Progress", "Completed"] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    formData.status === status && [
                      styles.statusButtonActive,
                      status === "Completed"
                        ? styles.completed
                        : status === "Pending"
                          ? styles.pending
                          : styles.inProgress,
                    ],
                  ]}
                  onPress={() => setFormData({ ...formData, status })}
                >
                  <Text style={[styles.statusButtonText, formData.status === status && styles.statusButtonTextActive]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
              <Text style={styles.saveButtonText}>{editingTask ? "Update" : "Add"} Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2D3748",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  dateInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#2D3748",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#999",
  },
  calendarContainer: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  priorityButtonActive: {
    backgroundColor: "#2B7A5A",
    borderColor: "#2B7A5A",
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
  },
  priorityButtonTextActive: {
    color: "#fff",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  statusButtonActive: {
    borderColor: "#2B7A5A",
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#2D3748",
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#2B7A5A",
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  completed: { backgroundColor: "#4CAF50" },
  pending: { backgroundColor: "#F39C12" },
  inProgress: { backgroundColor: "#3498DB" },
})
