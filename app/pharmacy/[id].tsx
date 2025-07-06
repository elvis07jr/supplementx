import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, MapPin, Clock, Phone } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { pharmacies, supplements } from '@/constants/supplements';
import SupplementCard from '@/components/SupplementCard';
import SearchBar from '@/components/SearchBar';

export default function PharmacyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const pharmacy = pharmacies.find((item) => item.id === Number(id));

  if (!pharmacy) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Pharmacy not found</Text>
        <Button title="Go Back" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  // Filter supplements to show only those from this pharmacy
  // In a real app, you'd have a relationship between supplements and pharmacies
  const pharmacySupplements = supplements.filter((_, index) => 
    pharmacy.id === 1 ? index % 2 === 0 : index % 2 === 1
  );

  const filteredSupplements = pharmacySupplements.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: pharmacy.image }} style={styles.coverImage} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{pharmacy.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.light.warning} fill={Colors.light.warning} />
              <Text style={styles.rating}>{pharmacy.rating.toFixed(1)}</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MapPin size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>{pharmacy.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>Open: 9:00 AM - 9:00 PM</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>+1 (555) 123-4567</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{pharmacy.products}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{pharmacy.orders}</Text>
              <Text style={styles.statLabel}>Orders Today</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search products..."
            />
          </View>
          
          <Text style={styles.sectionTitle}>Available Products</Text>
          
          <View style={styles.productsGrid}>
            {filteredSupplements.map((item) => (
              <View key={item.id} style={styles.productItem}>
                <SupplementCard
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  inStock={item.inStock}
                />
              </View>
            ))}
          </View>
          
          {filteredSupplements.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No products found</Text>
              <Button 
                title="Clear Search" 
                onPress={() => setSearchQuery('')}
                variant="outline"
                size="small"
              />
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Contact Pharmacy"
          onPress={() => {}}
          variant="outline"
          style={styles.contactButton}
        />
        <Button
          title="View on Map"
          onPress={() => {}}
          style={styles.mapButton}
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
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 4,
  },
  infoContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.light.border,
  },
  searchContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.subtext,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
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
  contactButton: {
    flex: 1,
    marginRight: 8,
  },
  mapButton: {
    flex: 1,
    marginLeft: 8,
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