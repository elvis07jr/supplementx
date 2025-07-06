import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Plus, Edit, Trash2, Home, Building, Navigation } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

type Address = {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  address: string;
  city: string;
  isDefault: boolean;
};

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      title: 'Home',
      address: '123 Main Street, Apt 4B',
      city: 'Nairobi, Kenya',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      title: 'Office',
      address: '456 Business Ave, Floor 12',
      city: 'Nairobi, Kenya',
      isDefault: false,
    },
  ]);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={20} color={Colors.light.primary} />;
      case 'work':
        return <Building size={20} color={Colors.light.primary} />;
      default:
        return <MapPin size={20} color={Colors.light.primary} />;
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
          },
        },
      ]
    );
  };

  const handleAddAddress = () => {
    Alert.alert('Add Address', 'Address form would open here');
  };

  const handleEditAddress = (id: string) => {
    Alert.alert('Edit Address', `Edit address ${id} form would open here`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Delivery Addresses</Text>
          <Text style={styles.subtitle}>Manage your delivery locations</Text>
        </View>

        <View style={styles.addressList}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressIcon}>
                  {getAddressIcon(address.type)}
                </View>
                <View style={styles.addressInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.addressTitle}>{address.title}</Text>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.addressText}>{address.address}</Text>
                  <Text style={styles.cityText}>{address.city}</Text>
                </View>
              </View>

              <View style={styles.addressActions}>
                {!address.isDefault && (
                  <Button
                    title="Set Default"
                    onPress={() => handleSetDefault(address.id)}
                    variant="outline"
                    size="small"
                    style={styles.actionButton}
                  />
                )}
                <Pressable
                  style={styles.iconButton}
                  onPress={() => handleEditAddress(address.id)}
                >
                  <Edit size={16} color={Colors.light.subtext} />
                </Pressable>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 size={16} color={Colors.light.error} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <Button
          title="Add New Address"
          onPress={handleAddAddress}
          icon={<Plus size={20} color="#FFFFFF" />}
          fullWidth
          style={styles.addButton}
        />

        <View style={styles.locationTip}>
          <Navigation size={20} color={Colors.light.secondary} />
          <Text style={styles.tipText}>
            Enable location services for faster address input and accurate delivery tracking
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
  addressList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  addressCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  addressHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addressText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  cityText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  addressActions: {
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
  addButton: {
    margin: 16,
    marginTop: 24,
  },
  locationTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.light.secondary}10`,
    borderRadius: 8,
    padding: 12,
    margin: 16,
    marginTop: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});