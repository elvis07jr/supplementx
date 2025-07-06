import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Package, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';

type OrderCardProps = {
  id: string;
  customer: string;
  total: number;
  status: string;
  date: string;
  pharmacy: string;
};

export default function OrderCard({ id, customer, total, status, date, pharmacy }: OrderCardProps) {
  const router = useRouter();

  const getStatusColor = () => {
    switch (status) {
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

  const handlePress = () => {
    router.push(`/order/${id}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Package size={20} color={Colors.light.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.orderId}>{id}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.value}>{customer}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pharmacy:</Text>
          <Text style={styles.value}>{pharmacy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.price}>${total.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>{status}</Text>
        </View>
        <ChevronRight size={20} color={Colors.light.subtext} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  headerText: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  date: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  content: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  value: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});