import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Smartphone, 
  Download, 
  Trash2, 
  ChevronRight,
  Volume2,
  Vibrate,
  Eye,
  Lock
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sms: true,
      orderUpdates: true,
      promotions: false,
      sound: true,
      vibration: true,
    },
    privacy: {
      dataCollection: false,
      analytics: true,
      locationTracking: true,
    },
    app: {
      darkMode: false,
      language: 'English',
      autoDownload: false,
      cacheSize: '45 MB',
    },
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear 45 MB of cached data. The app may take longer to load initially.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            updateSetting('app', 'cacheSize', '0 MB');
            Alert.alert('Success', 'Cache cleared successfully');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          },
        },
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Change Language',
      'Select your preferred language',
      [
        { text: 'English', onPress: () => updateSetting('app', 'language', 'English') },
        { text: 'Swahili', onPress: () => updateSetting('app', 'language', 'Swahili') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color={Colors.light.primary} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={settings.notifications.push}
                onValueChange={(value) => updateSetting('notifications', 'push', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.notifications.push ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Switch
                value={settings.notifications.email}
                onValueChange={(value) => updateSetting('notifications', 'email', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.notifications.email ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>SMS Updates</Text>
              <Switch
                value={settings.notifications.sms}
                onValueChange={(value) => updateSetting('notifications', 'sms', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.notifications.sms ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Volume2 size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Sound</Text>
              </View>
              <Switch
                value={settings.notifications.sound}
                onValueChange={(value) => updateSetting('notifications', 'sound', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.notifications.sound ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Vibrate size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Vibration</Text>
              </View>
              <Switch
                value={settings.notifications.vibration}
                onValueChange={(value) => updateSetting('notifications', 'vibration', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.notifications.vibration ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color={Colors.light.primary} />
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
          </View>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Eye size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Data Collection</Text>
              </View>
              <Switch
                value={settings.privacy.dataCollection}
                onValueChange={(value) => updateSetting('privacy', 'dataCollection', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.privacy.dataCollection ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Analytics</Text>
              <Switch
                value={settings.privacy.analytics}
                onValueChange={(value) => updateSetting('privacy', 'analytics', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.privacy.analytics ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Lock size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Change Password</Text>
              </View>
              <ChevronRight size={16} color={Colors.light.subtext} />
            </Pressable>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smartphone size={20} color={Colors.light.primary} />
            <Text style={styles.sectionTitle}>App Preferences</Text>
          </View>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Moon size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={settings.app.darkMode}
                onValueChange={(value) => updateSetting('app', 'darkMode', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.app.darkMode ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            <Pressable style={styles.settingItem} onPress={handleLanguageChange}>
              <View style={styles.settingWithIcon}>
                <Globe size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Language</Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.valueText}>{settings.app.language}</Text>
                <ChevronRight size={16} color={Colors.light.subtext} />
              </View>
            </Pressable>

            <View style={styles.settingItem}>
              <View style={styles.settingWithIcon}>
                <Download size={16} color={Colors.light.subtext} />
                <Text style={styles.settingLabel}>Auto-download Updates</Text>
              </View>
              <Switch
                value={settings.app.autoDownload}
                onValueChange={(value) => updateSetting('app', 'autoDownload', value)}
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={settings.app.autoDownload ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
        </View>

        {/* Storage */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Storage</Text>
          </View>
          
          <View style={styles.settingsList}>
            <Pressable style={styles.settingItem} onPress={handleClearCache}>
              <Text style={styles.settingLabel}>Clear Cache</Text>
              <View style={styles.settingValue}>
                <Text style={styles.valueText}>{settings.app.cacheSize}</Text>
                <ChevronRight size={16} color={Colors.light.subtext} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            icon={<Trash2 size={16} color={Colors.light.error} />}
            style={styles.deleteButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>SupplementX v1.0.0</Text>
          <Text style={styles.build}>Build 2024.1.1</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 8,
  },
  settingsList: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  settingWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  dangerSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.error,
    marginBottom: 16,
  },
  deleteButton: {
    borderColor: Colors.light.error,
    backgroundColor: `${Colors.light.error}10`,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  version: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  build: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
});