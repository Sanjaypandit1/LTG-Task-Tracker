import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from './src/screens/DashboardScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StatScreen from './src/screens/StatScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Dashboard') iconName = 'home-outline';
             else if (route.name === 'Categories') iconName = 'grid-outline';
             else if (route.name === 'Stats') iconName = 'stats-chart-outline';
             else if (route.name === 'Profile') iconName = 'person-outline';


            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#0f0f10ff',
          tabBarStyle: {
            backgroundColor: '#2B7A5A',
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabel: () => null, // hides label, icons only
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Categories" component={TaskDetailScreen} />
        <Tab.Screen name='Stats' component={StatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
