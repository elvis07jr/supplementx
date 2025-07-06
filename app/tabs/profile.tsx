import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Settings, ShoppingBag, CreditCard, Bell, HelpCircle, Heart, MapPin, Store, Truck } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: <ShoppingBag size={20} color={Colors.light.primary} />, title: 'My Orders', screen: '/orders' },
    { icon: <Heart size={20} color={Colors.light.primary} />, title: 'Saved Items', screen: '/saved' },
    { icon: <MapPin size={20} color={Colors.light.primary} />, title: 'Addresses', screen: '/addresses' },
    { icon: <CreditCard size={20} color={Colors.light.primary} />, title: 'Payment Methods', screen: '/payment' },
    { icon: <Bell size={20} color={Colors.light.primary} />, title: 'Notifications', screen: '/notifications' },
    { icon: <HelpCircle size={20} color={Colors.light.primary} />, title: 'Help & Support', screen: '/support' },
    { icon: <Settings size={20} color={Colors.light.primary} />, title: 'Settings', screen: '/settings' },
  ];

  const businessMenuItems = [
    { icon: <Store size={20} color={Colors.light.primary} />, title: 'Pharmacy Login', screen: '/pharmacy-login' },
    { icon: <Truck size={20} color={Colors.light.secondary} />, title: 'Courier Login', screen: '/courier-login' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <Button
          title="Edit Profile"
          onPress={() => {}}
          variant="outline"
          size="small"
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.screen)}
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <View style={styles.menuArrow}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.businessSection}>
        <Text style={styles.businessTitle}>Business Access</Text>
        <View style={styles.menuContainer}>
          {businessMenuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.screen)}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <View style={styles.menuArrow}>
                <Text style={styles.arrowIcon}>›</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable style={styles.logoutButton}>
        <LogOut size={20} color={Colors.light.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.light.border,
  },
  menuContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 8,
  },
  businessSection: {
    marginBottom: 24,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  menuArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: Colors.light.subtext,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: `${Colors.light.error}15`,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.error,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  version: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
});