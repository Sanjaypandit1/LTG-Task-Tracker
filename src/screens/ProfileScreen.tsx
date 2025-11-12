"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Achievement {
  id: string
  title: string
  icon: string
  color: string
}

interface StatItem {
  label: string
  value: string
  icon: string
}

export default function ProfileScreen() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const achievements: Achievement[] = [
    { id: "1", title: "Task Master", icon: "trophy-outline", color: "#F39C12" },
    { id: "2", title: "On Time", icon: "time-outline", color: "#3498DB" },
    { id: "3", title: "100% Complete", icon: "checkmark-circle-outline", color: "#4CAF50" },
    { id: "4", title: "Collaborator", icon: "people-outline", color: "#9B59B6" },
  ]

  const stats: StatItem[] = [
    { label: "Tasks Completed", value: "47", icon: "checkmark-done" },
    { label: "In Progress", value: "12", icon: "time" },
    { label: "Total Hours", value: "156", icon: "hourglass" },
  ]

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => {} },
    ])
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2B7A5A" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SK</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Sanjay Kumar</Text>
            <Text style={styles.userRole}>Product Manager</Text>
            <Text style={styles.userEmail}>sanjay.kumar@email.com</Text>
          </View>

          <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavorite(!isFavorite)}>
            <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#FF6B6B" : "#2B7A5A"} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Icon name={stat.icon} size={24} color="#2B7A5A" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="medal-outline" size={20} color="#2B7A5A" />
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{achievements.length}</Text>
            </View>
          </View>

          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                  <Icon name={achievement.icon} size={24} color={achievement.color} />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings & Preferences</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="notifications-outline" size={20} color="#2B7A5A" />
              <View>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Email and push notifications</Text>
              </View>
            </View>
            <Icon name={notificationsEnabled ? "toggle" : "toggle-outline"} size={28} color="#2B7A5A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="moon-outline" size={20} color="#2B7A5A" />
              <View>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSubtitle}>System preference</Text>
              </View>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="lock-closed-outline" size={20} color="#2B7A5A" />
              <View>
                <Text style={styles.settingTitle}>Privacy & Security</Text>
                <Text style={styles.settingSubtitle}>Manage your data</Text>
              </View>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="help-circle-outline" size={20} color="#2B7A5A" />
              <View>
                <Text style={styles.settingTitle}>Help & Support</Text>
                <Text style={styles.settingSubtitle}>FAQs and contact us</Text>
              </View>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEditProfile}>
            <Icon name="create-outline" size={20} color="#2B7A5A" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <Icon name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
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
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Profile Card
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2B7A5A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3498DB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B7A5A",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: "#718096",
  },
  favoriteButton: {
    padding: 8,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#718096",
    fontWeight: "500",
    textAlign: "center",
  },

  // Section Styles
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginLeft: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: "#2B7A5A",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Achievements
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    minWidth: "48%",
    alignItems: "center",
    paddingVertical: 12,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3748",
    textAlign: "center",
  },

  // Settings Items
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginLeft: 12,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#718096",
    marginLeft: 12,
  },

  // Action Buttons
  actionButtons: {
    marginTop: 24,
    marginBottom: 30,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: "#F0F7F4",
    borderWidth: 1.5,
    borderColor: "#2B7A5A",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B7A5A",
  },
  logoutButton: {
    backgroundColor: "#2B7A5A",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
