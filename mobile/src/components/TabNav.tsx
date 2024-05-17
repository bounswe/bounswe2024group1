import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import  HomeStack  from './HomeStack';
const Tab = createBottomTabNavigator()
import Home from "../screens/Home/Home";
import BookmarksScreen from '../screens/Bookmarks/Bookmarks';
import Profile from '../screens/Profile/Profile';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
export default function TabNav(){
    return(
            <Tab.Navigator  screenOptions={{ headerShown: false }}>
                <Tab.Screen name='Home' component={Home}/>
                <Tab.Screen name='Bookmarks' component={BookmarksScreen}/>
                <Tab.Screen name='Notifications' component={NotificationsScreen}/>
                <Tab.Screen name='Profile' component={Profile}/>
                </Tab.Navigator>
    )
}
