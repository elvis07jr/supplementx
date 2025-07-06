import React from 'react';
import { StyleSheet, TextInput, View, Pressable, Dimensions } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search supplements...',
  onClear,
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };

  return (
    <View style={styles.container}>
      <Search size={screenWidth < 375 ? 16 : 20} color={Colors.light.subtext} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.subtext}
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <X size={screenWidth < 375 ? 14 : 18} color={Colors.light.subtext} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: screenWidth < 375 ? 40 : screenWidth < 768 ? 48 : 52,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: screenWidth < 375 ? 14 : 16,
    color: Colors.light.text,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
  },
});