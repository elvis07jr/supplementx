import React from "react";
import { Tabs } from "expo-router";
import { ShoppingBag, Store, Truck, User } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useCartStore } from "@/stores/cartStore";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

function TabBarIcon(props: {
  name: React.ReactNode;
  color: string;
  badge?: number;
}) {
  return (
    <View style={styles.iconContainer}>
      {props.name}
      {props.badge && props.badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{props.badge > 9 ? '9+' : props.badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function TabLayout() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.inactive,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.border,
          height: screenWidth < 375 ? 75 : screenWidth < 768 ? 85 : 90,
          paddingBottom: screenWidth < 375 ? 12 : screenWidth < 768 ? 18 : 20,
          paddingTop: 8,
          paddingHorizontal: 8,
        },
        tabBarLabelStyle: {
          fontSize: screenWidth < 375 ? 10 : screenWidth < 768 ? 12 : 14,
          fontWeight: '500',
          marginTop: 4,
          fontFamily: 'Inter',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '700',
          color: Colors.light.text,
          fontSize: screenWidth < 375 ? 16 : screenWidth < 768 ? 18 : 20,
          fontFamily: 'Inter',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name={<ShoppingBag size={screenWidth < 375 ? 20 : screenWidth < 768 ? 24 : 28} color={color} />} 
              color={color} 
              badge={cartItemCount} 
            />
          ),
          headerTitle: "Chaning eCommerce",
        }}
      />
      <Tabs.Screen
        name="pharmacy"
        options={{
          title: "Pharmacy",
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name={<Store size={screenWidth < 375 ? 20 : screenWidth < 768 ? 24 : 28} color={color} />} 
              color={color} 
            />
          ),
          headerTitle: "Pharmacies",
        }}
      />
      <Tabs.Screen
        name="courier"
        options={{
          title: "Delivery",
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name={<Truck size={screenWidth < 375 ? 20 : screenWidth < 768 ? 24 : 28} color={color} />} 
              color={color} 
            />
          ),
          headerTitle: "Deliveries",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name={<User size={screenWidth < 375 ? 20 : screenWidth < 768 ? 24 : 28} color={color} />} 
              color={color} 
            />
          ),
          headerTitle: "My Profile",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: Colors.light.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});