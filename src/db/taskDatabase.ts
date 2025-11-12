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

class TasksDatabase {
  private tasks: Task[] = [
  ]

  getAllTasks(): Task[] {
    return this.tasks
  }

  addTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.tasks.unshift(newTask)
    return newTask
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) return null

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.tasks[taskIndex]
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length
    this.tasks = this.tasks.filter((t) => t.id !== id)
    return this.tasks.length < initialLength
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) || null
  }

  getTasksByStatus(status: "Pending" | "Completed" | "In Progress"): Task[] {
    return this.tasks.filter((t) => t.status === status)
  }
}

export const tasksDb = new TasksDatabase()
export type { Task }
