import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Task {
  id: string;
  title: string;
  status: 'Pending' | 'Completed' | 'In Progress';
  dueDate: string;
}

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design Project UI', status: 'In Progress', dueDate: 'Nov 11, 2025' },
    { id: '2', title: 'Fix Firebase Auth Bug', status: 'Pending', dueDate: 'Nov 12, 2025' },
    { id: '3', title: 'Deploy Beta Version', status: 'Completed', dueDate: 'Nov 10, 2025' },
    { id: '4', title: 'User Testing Session', status: 'Pending', dueDate: 'Nov 15, 2025' },
  ]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return 'checkmark-circle';
      case 'In Progress': return 'time';
      case 'Pending': return 'alert-circle';
      default: return 'ellipse';
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <View style={[styles.statusIndicator, 
            item.status === 'Completed' 
              ? styles.completed 
              : item.status === 'Pending' 
              ? styles.pending 
              : styles.inProgress
          ]}>
            <Icon 
              name={getStatusIcon(item.status)} 
              size={16} 
              color="#fff" 
            />
          </View>
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.dueDateContainer}>
              <Icon name="calendar-outline" size={12} color="#666" />
              <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, 
          item.status === 'Completed' 
            ? styles.completed 
            : item.status === 'Pending' 
            ? styles.pending 
            : styles.inProgress
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B7A5A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Sanjay 👋</Text>
          </View>
          <Text style={styles.subtitle}>Here's your today's overview</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
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
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Icon name="chevron-forward" size={16} color="#2B7A5A" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.taskList}
        />
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Header Styles
  header: {
    backgroundColor: '#2B7A5A',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
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
    color: '#E8F5E8', 
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#B8E6B8',
    fontWeight: '400',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Summary Section
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pendingCard: {
    borderTopWidth: 4,
    borderTopColor: '#F39C12',
  },
  inProgressCard: {
    borderTopWidth: 4,
    borderTopColor: '#3498DB',
  },
  completedCard: {
    borderTopWidth: 4,
    borderTopColor: '#4CAF50',
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryNumber: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2D3748',
    marginBottom: 4,
  },
  summaryLabel: { 
    fontSize: 12, 
    color: '#718096', 
    fontWeight: '500',
  },

  // Task Section
  taskSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2B7A5A',
    fontWeight: '600',
    marginRight: 2,
  },

  // Task List
  taskList: {
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f7f7f7',
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2D3748',
    marginBottom: 4,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: { 
    fontSize: 12, 
    color: '#718096', 
    marginLeft: 4,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Status Colors
  completed: { backgroundColor: '#4CAF50' },
  pending: { backgroundColor: '#F39C12' },
  inProgress: { backgroundColor: '#3498DB' },

  // Add Button
  addButton: {
    backgroundColor: '#2B7A5A',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 24,
    shadowColor: '#2B7A5A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});