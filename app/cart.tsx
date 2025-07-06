import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';
import { useCartStore } from '@/stores/cartStore';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function CartScreen() {
  const router = useRouter();
  const { 
    items, 
    removeItem, 
    incrementItem, 
    decrementItem, 
    clearCart,
    getTotalPrice 
  } = useCartStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Add some items to your cart before checkout.');
      return;
    }
    
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            clearCart();
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                brand={item.brand}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onIncrement={() => {
                  incrementItem(item.id);
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                onDecrement={() => {
                  decrementItem(item.id);
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                onRemove={() => {
                  removeItem(item.id);
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                }}
              />
            ))}
            
            <View style={styles.clearButtonContainer}>
              <Button
                title="Clear Cart"
                onPress={handleClearCart}
                variant="outline"
                size="small"
              />
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>$5.99</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${(getTotalPrice() + 5.99).toFixed(2)}</Text>
              </View>
            </View>
            
            <Button
              title="Proceed to Checkout"
              onPress={handleCheckout}
              fullWidth
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <ShoppingBag size={64} color={Colors.light.primary} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Looks like you haven't added any supplements to your cart yet.
          </Text>
          <Button
            title="Start Shopping"
            onPress={() => router.push('/')}
            style={styles.shopButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  clearButtonContainer: {
    alignItems: 'center',
    marginVertical: 16,
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
  summaryContainer: {
    marginBottom: 24,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '80%',
  },
  shopButton: {
    width: 200,
  },
});