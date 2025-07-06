import React from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import Colors from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

type CategoryButtonProps = {
  name: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onPress: () => void;
};

export default function CategoryButton({ name, icon, isSelected = false, onPress }: CategoryButtonProps) {
  return (
    <Pressable 
      style={[styles.button, isSelected && styles.selectedButton]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
        {icon}
      </View>
      <Text style={[styles.text, isSelected && styles.selectedText]}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginRight: screenWidth < 375 ? 12 : 16,
    width: screenWidth < 375 ? 70 : 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.light.categoryBg,
  },
  selectedButton: {
    backgroundColor: Colors.light.primary,
  },
  iconContainer: {
    width: screenWidth < 375 ? 40 : 50,
    height: screenWidth < 375 ? 40 : 50,
    borderRadius: screenWidth < 375 ? 20 : 25,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: Colors.light.card,
  },
  text: {
    fontSize: screenWidth < 375 ? 10 : 12,
    color: Colors.light.text,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  selectedText: {
    color: Colors.light.card,
    fontWeight: '600',
  },
});