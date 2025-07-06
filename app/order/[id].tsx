import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { orders } from '@/constants/supplements';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Order not found</Text>
        <Button title="Go Back" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  const getStatusColor = () => {
    switch (order.status) {
      case 'Delivered':
        return Colors.light.success;
      case 'In Transit':
        return Colors.light.primary;
      case 'Processing':
        return Colors.light.warning;
      default:
        return Colors.light.subtext;
    }
  };

  const getStatusIcon = () => {
    switch (order.status) {
      case 'Delivered':
        return <CheckCircle size={20} color={Colors.light.success} />;
      case 'In Transit':
        return <Truck size={20} color={Colors.light.primary} />;
      case 'Processing':
        return <Package size={20} color={Colors.light.warning} />;
      default:
        return <AlertCircle size={20} color={Colors.light.subtext} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
            <View style={styles.statusIcon}>{getStatusIcon()}</View>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Package size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Order Items</Text>
          </View>
          
          <View style={styles.itemsContainer}>
            {order.items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Image 
                  source={{ 
                    uri: `https://images.unsplash.com/photo-${1590005024862 + index * 100}-c5fccb4878a${index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80` 
                  }} 
                  style={styles.itemImage} 
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <MapPin size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{order.customer}</Text>
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Clock size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.sectionTitle}>Order Timeline</Text>
          </View>
          
          <View style={styles.timelineContainer}>
            <View style={[styles.timelineItem, styles.timelineItemCompleted]}>
              <View style={[styles.timelineDot, styles.timelineDotCompleted]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Order Placed</Text>
                <Text style={styles.timelineDate}>{order.date}</Text>
              </View>
            </View>
            
            <View style={[
              styles.timelineItem, 
              (order.status === 'Processing' || order.status === 'In Transit' || order.status === 'Delivered') ? 
                styles.timelineItemCompleted : {}
            ]}>
              <View style={[
                styles.timelineDot, 
                (order.status === 'Processing' || order.status === 'In Transit' || order.status === 'Delivered') ? 
                  styles.timelineDotCompleted : {}
              ]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Processing</Text>
                <Text style={styles.timelineDate}>
                  {(order.status === 'Processing' || order.status === 'In Transit' || order.status === 'Delivered') ? 
                    order.date : 'Pending'}
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.timelineItem, 
              (order.status === 'In Transit' || order.status === 'Delivered') ? 
                styles.timelineItemCompleted : {}
            ]}>
              <View style={[
                styles.timelineDot, 
                (order.status === 'In Transit' || order.status === 'Delivered') ? 
                  styles.timelineDotCompleted : {}
              ]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>In Transit</Text>
                <Text style={styles.timelineDate}>
                  {(order.status === 'In Transit' || order.status === 'Delivered') ? 
                    order.date : 'Pending'}
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.timelineItem, 
              order.status === 'Delivered' ? styles.timelineItemCompleted : {}
            ]}>
              <View style={[
                styles.timelineDot, 
                order.status === 'Delivered' ? styles.timelineDotCompleted : {}
              ]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Delivered</Text>
                <Text style={styles.timelineDate}>
                  {order.status === 'Delivered' ? order.date : 'Pending'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${order.total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>$5.99</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${(order.total + 5.99).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Contact Support"
          onPress={() => {}}
          variant="outline"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
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
  itemsContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  orderItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
  },
  addressCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
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
  },
  timelineContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineItemCompleted: {
    opacity: 1,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.card,
    borderWidth: 2,
    borderColor: Colors.light.border,
    marginRight: 12,
    marginTop: 4,
  },
  timelineDotCompleted: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
    color: Colors.light.subtext,
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.light.subtext,
    marginBottom: 16,
  },
});