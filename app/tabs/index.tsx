import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart, Dumbbell, Zap, Pill, Activity, TrendingUp, RefreshCw } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { supplements, categories } from '@/constants/supplements';
import SearchBar from '@/components/SearchBar';
import SupplementCard from '@/components/SupplementCard';
import CategoryButton from '@/components/CategoryButton';
import Button from '@/components/Button';
import { useCartStore } from '@/stores/cartStore';

const { width: screenWidth } = Dimensions.get('window');

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  const getCategoryIcon = (id: number) => {
    const iconSize = screenWidth < 375 ? 20 : 24;
    const iconColor = selectedCategory === id ? Colors.light.card : Colors.light.primary;
    
    switch (id) {
      case 1:
        return <Dumbbell size={iconSize} color={iconColor} />;
      case 2:
        return <Zap size={iconSize} color={iconColor} />;
      case 3:
        return <Pill size={iconSize} color={iconColor} />;
      case 4:
        return <Activity size={iconSize} color={iconColor} />;
      case 5:
        return <TrendingUp size={iconSize} color={iconColor} />;
      case 6:
        return <RefreshCw size={iconSize} color={iconColor} />;
      default:
        return <Dumbbell size={iconSize} color={iconColor} />;
    }
  };

  const filteredSupplements = supplements.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const featuredSupplements = supplements.filter(item => item.featured);

  const handleCategoryPress = (id: number) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  };

  const navigateToCart = () => {
    router.push('/cart');
  };

  const renderCategoryItem = useCallback(({ item }: { item: typeof categories[0] }) => (
    <CategoryButton
      name={item.name}
      icon={getCategoryIcon(item.id)}
      isSelected={selectedCategory === item.id}
      onPress={() => handleCategoryPress(item.id)}
    />
  ), [selectedCategory]);

  const renderSupplementItem = useCallback(({ item }: { item: typeof supplements[0] }) => (
    <SupplementCard
      id={item.id}
      name={item.name}
      brand={item.brand}
      price={item.price}
      rating={item.rating}
      image={item.image}
      inStock={item.inStock}
    />
  ), []);

  const getProductColumns = () => {
    if (screenWidth < 375) return 2; // Small phones
    if (screenWidth < 768) return 2; // Regular phones
    return 3; // Tablets
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search supplements..."
          />
        </View>
        <Pressable style={styles.cartButton} onPress={navigateToCart}>
          <ShoppingCart size={screenWidth < 375 ? 20 : 24} color={Colors.light.text} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {!selectedCategory && !searchQuery && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FlatList
              data={featuredSupplements}
              renderItem={renderSupplementItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name + " Products"
              : searchQuery 
                ? "Search Results" 
                : "All Products"}
          </Text>
          
          <View style={styles.productsGrid}>
            {filteredSupplements.map((item) => (
              <SupplementCard
                key={item.id}
                id={item.id}
                name={item.name}
                brand={item.brand}
                price={item.price}
                rating={item.rating}
                image={item.image}
                inStock={item.inStock}
              />
            ))}
          </View>
          
          {filteredSupplements.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No products found</Text>
              <Button 
                title="Clear Filters" 
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                variant="outline"
                size="small"
              />
            </View>
          )}
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    marginRight: 12,
  },
  cartButton: {
    width: screenWidth < 375 ? 40 : 48,
    height: screenWidth < 375 ? 40 : 48,
    borderRadius: screenWidth < 375 ? 20 : 24,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  featuredSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: screenWidth < 375 ? 18 : 24,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 16,
    color: Colors.light.text,
    fontFamily: 'Inter',
    lineHeight: screenWidth < 375 ? 22 : 29,
  },
  featuredList: {
    paddingLeft: 16,
  },
  productsSection: {
    marginTop: 24,
    paddingBottom: 24,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
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
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 24,
  },
});