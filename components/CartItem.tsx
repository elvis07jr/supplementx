import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

type CartItemProps = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export default function CartItem({
  name,
  brand,
  price,
  image,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.content}>
        <View>
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.actions}>
          {quantity === 1 ? (
            <Pressable style={styles.removeButton} onPress={onRemove}>
              <Trash2 size={18} color={Colors.light.error} />
            </Pressable>
          ) : (
            <Pressable style={styles.quantityButton} onPress={onDecrement}>
              <Minus size={16} color={Colors.light.text} />
            </Pressable>
          )}
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <Pressable style={styles.quantityButton} onPress={onIncrement}>
            <Plus size={16} color={Colors.light.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.light.error}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
});