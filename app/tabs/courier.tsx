import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { orders } from '@/constants/supplements';
import SearchBar from '@/components/SearchBar';
import OrderCard from '@/components/OrderCard';
import Colors from '@/constants/colors';

export default function CourierScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', 'Pending', 'Processing', 'In Transit', 'Delivered'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search orders..."
        />
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={statuses}
          renderItem={({ item }) => (
            <View 
              style={[
                styles.filterItem, 
                (item === statusFilter || (item === 'All' && !statusFilter)) && styles.activeFilterItem
              ]}
            >
              <Text 
                style={[
                  styles.filterText, 
                  (item === statusFilter || (item === 'All' && !statusFilter)) && styles.activeFilterText
                ]}
                onPress={() => setStatusFilter(item === 'All' ? null : item)}
              >
                {item}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {statusFilter ? `${statusFilter} Orders` : 'All Orders'}
        </Text>

        <FlatList
          data={filteredOrders}
          renderItem={({ item }) => (
            <OrderCard
              id={item.id}
              customer={item.customer}
              total={item.total}
              status={item.status}
              date={item.date}
              pharmacy={item.pharmacy}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No orders found</Text>
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
  filtersContainer: {
    marginBottom: 8,
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.light.card,
  },
  activeFilterItem: {
    backgroundColor: Colors.light.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
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