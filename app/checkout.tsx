import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, MapPin, Truck, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { useCartStore } from '@/stores/cartStore';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const paymentMethods = [
  { id: 1, name: 'Credit Card', icon: 'credit-card' },
  { id: 2, name: 'PayPal', icon: 'paypal' },
  { id: 3, name: 'Apple Pay', icon: 'apple-pay' },
];

const deliveryOptions = [
  { id: 1, name: 'Standard Delivery', price: 5.99, days: '3-5 days' },
  { id: 2, name: 'Express Delivery', price: 9.99, days: '1-2 days' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const deliveryPrice = deliveryOptions.find(option => option.id === selectedDelivery)?.price || 5.99;
  const totalPrice = getTotalPrice() + deliveryPrice;

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Add some items to your cart before checkout.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      Alert.alert(
        'Order Placed Successfully',
        'Your order has been placed and will be processed soon.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              clearCart();
              router.push('/');
            }
          },
        ]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <MapPin size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>John Doe</Text>
            <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
            <Text style={styles.addressText}>New York, NY 10001</Text>
            <Text style={styles.addressText}>United States</Text>
            <Text style={styles.addressPhone}>+1 (555) 123-4567</Text>
            
            <Pressable style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <CreditCard size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {paymentMethods.map((method) => (
              <Pressable
                key={method.id}
                style={[
                  styles.optionCard,
                  selectedPayment === method.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <Text style={styles.optionText}>{method.name}</Text>
                {selectedPayment === method.id && (
                  <View style={styles.checkmark}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Truck size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Delivery Options</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {deliveryOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedDelivery === option.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedDelivery(option.id)}
              >
                <View style={styles.deliveryOption}>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <Text style={styles.deliveryDays}>{option.days}</Text>
                </View>
                <View style={styles.deliveryPrice}>
                  <Text style={styles.priceText}>${option.price.toFixed(2)}</Text>
                  {selectedDelivery === option.id && (
                    <View style={styles.checkmark}>
                      <Check size={16} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({items.length})</Text>
              <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${deliveryPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={`Place Order • $${totalPrice.toFixed(2)}`}
          onPress={handlePlaceOrder}
          loading={isLoading}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  addressCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginTop: 4,
  },
  changeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: Colors.light.primary,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryOption: {
    flex: 1,
  },
  deliveryDays: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginTop: 4,
  },
  deliveryPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 12,
  },
  summaryContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  footer: {
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});