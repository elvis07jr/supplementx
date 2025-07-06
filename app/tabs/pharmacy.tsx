import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { pharmacies } from '@/constants/supplements';
import SearchBar from '@/components/SearchBar';
import PharmacyCard from '@/components/PharmacyCard';
import Colors from '@/constants/colors';

export default function PharmacyScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search pharmacies..."
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {searchQuery ? 'Search Results' : 'Nearby Pharmacies'}
        </Text>

        <FlatList
          data={filteredPharmacies}
          renderItem={({ item }) => (
            <PharmacyCard
              id={item.id}
              name={item.name}
              address={item.address}
              rating={item.rating}
              image={item.image}
              products={item.products}
              orders={item.orders}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No pharmacies found</Text>
            </View>
          }
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
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.light.text,
  },
  list: {
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
});