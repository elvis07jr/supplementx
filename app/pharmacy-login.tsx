import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Store, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

export default function PharmacyLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Pharmacy login successful!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link will be sent to your email.');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Store size={48} color={Colors.light.primary} />
          </View>
          <Text style={styles.title}>Pharmacy Portal</Text>
          <Text style={styles.subtitle}>Access your pharmacy dashboard</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Pharmacy Email"
              placeholderTextColor={Colors.light.subtext}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.light.subtext}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <Button
              title=""
              onPress={() => setShowPassword(!showPassword)}
              variant="outline"
              size="small"
              icon={showPassword ? <EyeOff size={16} color={Colors.light.subtext} /> : <Eye size={16} color={Colors.light.subtext} />}
              style={styles.eyeButton}
            />
          </View>

          <Button
            title="Forgot Password?"
            onPress={handleForgotPassword}
            variant="outline"
            size="small"
            style={styles.forgotButton}
          />

          <Button
            title="Login to Dashboard"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Pharmacy Dashboard Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Inventory Management</Text>
            <Text style={styles.featureItem}>• Order Processing</Text>
            <Text style={styles.featureItem}>• Sales Analytics</Text>
            <Text style={styles.featureItem}>• Customer Management</Text>
            <Text style={styles.featureItem}>• Regulatory Compliance</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Need help? Contact support</Text>
          <Text style={styles.supportEmail}>pharmacy-support@supplementx.com</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: 'center',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  eyeButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  loginButton: {
    marginTop: 8,
  },
  features: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: Colors.light.subtext,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  supportEmail: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
});