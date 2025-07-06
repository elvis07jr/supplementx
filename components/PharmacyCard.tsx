import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Star, Package } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';

type PharmacyCardProps = {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
  products: number;
  orders: number;
};

export default function PharmacyCard({ id, name, address, rating, image, products, orders }: PharmacyCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/pharmacy/${id}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Star size={14} color={Colors.light.warning} fill={Colors.light.warning} />
            <Text style={styles.statText}>{rating.toFixed(1)}</Text>
          </View>
          <View style={styles.statItem}>
            <Package size={14} color={Colors.light.primary} />
            <Text style={styles.statText}>{products} products</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{orders} orders today</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: `${Colors.light.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});