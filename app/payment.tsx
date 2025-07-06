import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, Plus, Edit, Trash2, Smartphone, Building2, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

type PaymentMethod = {
  id: string;
  type: 'card' | 'mpesa' | 'bank';
  title: string;
  details: string;
  isDefault: boolean;
  logo?: string;
};

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'mpesa',
      title: 'M-Pesa',
      details: '+254 712 345 678',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      title: 'Visa Card',
      details: '**** **** **** 1234',
      isDefault: false,
    },
    {
      id: '3',
      type: 'bank',
      title: 'KCB Bank',
      details: 'Account ending in 5678',
      isDefault: false,
    },
  ]);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'mpesa':
        return <Smartphone size={20} color={Colors.light.secondary} />;
      case 'card':
        return <CreditCard size={20} color={Colors.light.primary} />;
      case 'bank':
        return <Building2 size={20} color={Colors.light.primary} />;
      default:
        return <CreditCard size={20} color={Colors.light.primary} />;
    }
  };

  const getPaymentColor = (type: string) => {
    switch (type) {
      case 'mpesa':
        return Colors.light.secondary;
      default:
        return Colors.light.primary;
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({ ...method, isDefault: method.id === id }))
    );
  };

  const handleDeletePayment = (id: string) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const handleAddPayment = (type: string) => {
    Alert.alert('Add Payment Method', `Add ${type} form would open here`);
  };

  const handleEditPayment = (id: string) => {
    Alert.alert('Edit Payment', `Edit payment method ${id} form would open here`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Methods</Text>
          <Text style={styles.subtitle}>Manage your payment options</Text>
        </View>

        <View style={styles.paymentList}>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={[
                  styles.paymentIcon,
                  { backgroundColor: `${getPaymentColor(method.type)}15` }
                ]}>
                  {getPaymentIcon(method.type)}
                </View>
                <View style={styles.paymentInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.paymentTitle}>{method.title}</Text>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Check size={12} color="#FFFFFF" />
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.paymentDetails}>{method.details}</Text>
                </View>
              </View>

              <View style={styles.paymentActions}>
                {!method.isDefault && (
                  <Button
                    title="Set Default"
                    onPress={() => handleSetDefault(method.id)}
                    variant="outline"
                    size="small"
                    style={styles.actionButton}
                  />
                )}
                <Pressable
                  style={styles.iconButton}
                  onPress={() => handleEditPayment(method.id)}
                >
                  <Edit size={16} color={Colors.light.subtext} />
                </Pressable>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => handleDeletePayment(method.id)}
                >
                  <Trash2 size={16} color={Colors.light.error} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.addSection}>
          <Text style={styles.addTitle}>Add New Payment Method</Text>
          
          <View style={styles.addOptions}>
            <Pressable 
              style={styles.addOption}
              onPress={() => handleAddPayment('M-Pesa')}
            >
              <View style={[
                styles.addOptionIcon,
                { backgroundColor: `${Colors.light.secondary}15` }
              ]}>
                <Smartphone size={24} color={Colors.light.secondary} />
              </View>
              <Text style={styles.addOptionTitle}>M-Pesa</Text>
              <Text style={styles.addOptionSubtitle}>Mobile Money</Text>
            </Pressable>

            <Pressable 
              style={styles.addOption}
              onPress={() => handleAddPayment('Card')}
            >
              <View style={[
                styles.addOptionIcon,
                { backgroundColor: `${Colors.light.primary}15` }
              ]}>
                <CreditCard size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.addOptionTitle}>Credit/Debit Card</Text>
              <Text style={styles.addOptionSubtitle}>Visa, Mastercard</Text>
            </Pressable>

            <Pressable 
              style={styles.addOption}
              onPress={() => handleAddPayment('Bank')}
            >
              <View style={[
                styles.addOptionIcon,
                { backgroundColor: `${Colors.light.primary}15` }
              ]}>
                <Building2 size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.addOptionTitle}>Bank Account</Text>
              <Text style={styles.addOptionSubtitle}>Direct Transfer</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityTitle}>🔒 Security</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We never store your full card details.
          </Text>
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
  paymentList: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  paymentCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  paymentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 8,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentDetails: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  paymentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  addTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  addOptions: {
    gap: 12,
  },
  addOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  addOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    flex: 1,
  },
  addOptionSubtitle: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  securityNote: {
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
});