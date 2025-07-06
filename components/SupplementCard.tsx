import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');
const getCardWidth = () => {
  if (screenWidth < 375) return (screenWidth - 48) / 2; // Small phones: 2 columns
  if (screenWidth < 768) return (screenWidth - 48) / 2; // Regular phones: 2 columns
  return (screenWidth - 64) / 3; // Tablets: 3 columns
};

type SupplementCardProps = {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
};

export default function SupplementCard({ id, name, brand, price, rating, image, inStock }: SupplementCardProps) {
  const router = useRouter();
  const cardWidth = getCardWidth();

  const handlePress = () => {
    router.push(`/supplement/${id}`);
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && { opacity: 0.8 }
      ]} 
      onPress={handlePress}
      android_ripple={{ color: Colors.light.primary + '20' }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={12} color={Colors.light.accent} fill={Colors.light.accent} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {!inStock && <Text style={styles.outOfStock}>Out of stock</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: screenWidth < 375 ? 120 : 140,
    resizeMode: 'cover',
  },
  content: {
    padding: screenWidth < 375 ? 8 : 12,
  },
  brand: {
    fontSize: screenWidth < 375 ? 10 : 12,
    color: Colors.light.subtext,
    marginBottom: 2,
    fontFamily: 'Inter',
    fontWeight: '300',
  },
  name: {
    fontSize: screenWidth < 375 ? 14 : 16,
    fontWeight: '400',
    color: Colors.light.text,
    marginBottom: 4,
    lineHeight: screenWidth < 375 ? 18 : 24,
    fontFamily: 'Inter',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: screenWidth < 375 ? 10 : 12,
    color: Colors.light.subtext,
    marginLeft: 4,
    fontFamily: 'Inter',
    fontWeight: '300',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: screenWidth < 375 ? 14 : 16,
    fontWeight: '700',
    color: Colors.light.text,
    fontFamily: 'Inter',
  },
  outOfStock: {
    fontSize: screenWidth < 375 ? 10 : 12,
    color: Colors.light.error,
    fontFamily: 'Inter',
    fontWeight: '300',
  },
});