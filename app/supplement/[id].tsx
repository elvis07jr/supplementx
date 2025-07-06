import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, FlatList, Share, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Star, Minus, Plus, ShoppingBag, Heart, Share2, ChevronDown, ChevronUp, Truck, RotateCcw, Shield, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { supplements } from '@/constants/supplements';
import { useCartStore } from '@/stores/cartStore';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: 'Alex M.',
    rating: 5,
    date: '2025-06-28',
    title: 'Excellent quality!',
    comment: 'This protein powder mixes well and tastes great. Noticed significant improvement in my recovery time.',
    verified: true,
  },
  {
    id: 2,
    user: 'Sarah K.',
    rating: 4,
    date: '2025-06-25',
    title: 'Good value for money',
    comment: 'Great product overall. The chocolate flavor is my favorite. Fast shipping too!',
    verified: true,
  },
  {
    id: 3,
    user: 'Mike R.',
    rating: 5,
    date: '2025-06-20',
    title: 'Highly recommend',
    comment: 'Been using this for 3 months now. Quality is consistent and results are visible.',
    verified: false,
  },
];

// Mock related products
const getRelatedProducts = (currentId: number, category: number) => {
  return supplements.filter(item => item.id !== currentId && item.category === category).slice(0, 4);
};

export default function SupplementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    specifications: false,
    shipping: false,
    reviews: false,
  });
  const addItem = useCartStore((state) => state.addItem);
  const flatListRef = useRef<FlatList>(null);

  const supplement = supplements.find((item) => item.id === Number(id));
  const relatedProducts = supplement ? getRelatedProducts(supplement.id, supplement.category) : [];
  
  // Mock multiple images for gallery
  const productImages = supplement ? [
    supplement.image,
    supplement.image.replace('1350', '1200'), // Slight variation
    supplement.image.replace('q=80', 'q=90'), // Another variation
  ] : [];

  if (!supplement) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Button title="Go Back" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: supplement.id,
        name: supplement.name,
        brand: supplement.brand,
        price: supplement.price,
        image: supplement.image,
      });
    }
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    router.push('/cart');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${supplement.name} by ${supplement.brand} - ${supplement.price.toFixed(2)}`,
        url: supplement.image,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderImageGallery = () => {
    return (
      <View style={styles.imageGalleryContainer}>
        <FlatList
          ref={flatListRef}
          data={productImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentImageIndex(index);
          }}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.galleryImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
        {/* Image indicators */}
        <View style={styles.imageIndicators}>
          {productImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentImageIndex === index && styles.activeIndicator
              ]}
            />
          ))}
        </View>
        
        {/* Action buttons */}
        <View style={styles.imageActions}>
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color={Colors.light.text} />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={toggleFavorite}>
            <Heart 
              size={20} 
              color={isFavorite ? Colors.light.error : Colors.light.text} 
              fill={isFavorite ? Colors.light.error : 'transparent'} 
            />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderExpandableSection = (title: string, content: React.ReactNode, sectionKey: keyof typeof expandedSections) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <View style={styles.expandableSection}>
        <Pressable 
          style={styles.sectionHeader} 
          onPress={() => toggleSection(sectionKey)}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
          {isExpanded ? 
            <ChevronUp size={20} color={Colors.light.subtext} /> : 
            <ChevronDown size={20} color={Colors.light.subtext} />
          }
        </Pressable>
        {isExpanded && (
          <View style={styles.sectionContent}>
            {content}
          </View>
        )}
      </View>
    );
  };

  const renderReviewCard = ({ item }: { item: typeof mockReviews[0] }) => {
    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View>
            <Text style={styles.reviewUser}>{item.user}</Text>
            <View style={styles.reviewRating}>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  color={index < item.rating ? Colors.light.accent : Colors.light.border}
                  fill={index < item.rating ? Colors.light.accent : 'transparent'}
                />
              ))}
              <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
          </View>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Shield size={12} color={Colors.light.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
        <Text style={styles.reviewTitle}>{item.title}</Text>
        <Text style={styles.reviewComment}>{item.comment}</Text>
      </View>
    );
  };

  const renderRelatedProduct = ({ item }: { item: typeof supplements[0] }) => {
    return (
      <Pressable 
        style={styles.relatedProductCard}
        onPress={() => router.push(`/supplement/${item.id}`)}
      >
        <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
        <Text style={styles.relatedProductName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.relatedProductBrand}>{item.brand}</Text>
        <Text style={styles.relatedProductPrice}>${item.price.toFixed(2)}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: supplement.name,
          headerTitleStyle: { fontSize: 16 },
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Media Gallery */}
        {renderImageGallery()}
        
        <View style={styles.content}>
          {/* Product Core Information */}
          <View style={styles.productInfo}>
            <Text style={styles.brand}>{supplement.brand}</Text>
            <Text style={styles.name}>{supplement.name}</Text>
            
            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    color={index < Math.floor(supplement.rating) ? Colors.light.accent : Colors.light.border}
                    fill={index < Math.floor(supplement.rating) ? Colors.light.accent : 'transparent'}
                  />
                ))}
                <Text style={styles.rating}>{supplement.rating.toFixed(1)}</Text>
                <Text style={styles.reviewCount}>({mockReviews.length} reviews)</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>${supplement.price.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${(supplement.price * 1.2).toFixed(2)}</Text>
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>
                  {supplement.inStock ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Product Options & Quantity */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Size Options</Text>
            <View style={styles.sizeOptions}>
              <Pressable style={[styles.sizeOption, styles.selectedSize]}>
                <Text style={[styles.sizeText, styles.selectedSizeText]}>{supplement.size}</Text>
              </Pressable>
              <Pressable style={styles.sizeOption}>
                <Text style={styles.sizeText}>5 lbs</Text>
              </Pressable>
            </View>
          </View>
          
          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.quickInfo}>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoLabel}>Servings</Text>
                <Text style={styles.quickInfoValue}>{supplement.servings}</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoLabel}>Category</Text>
                <Text style={styles.quickInfoValue}>
                  {supplement.category === 1 ? 'Protein' : 
                   supplement.category === 2 ? 'Pre-Workout' : 
                   supplement.category === 3 ? 'Vitamins' : 
                   supplement.category === 4 ? 'Amino Acids' : 
                   supplement.category === 5 ? 'Weight Gainers' : 'Recovery'}
                </Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoLabel}>Rating</Text>
                <Text style={styles.quickInfoValue}>{supplement.rating}/5</Text>
              </View>
            </View>
          </View>
          
          {/* Expandable Sections */}
          {renderExpandableSection(
            'Product Description',
            <Text style={styles.expandedText}>{supplement.description}</Text>,
            'description'
          )}
          
          {renderExpandableSection(
            'Specifications',
            <View>
              <Text style={styles.specItem}>• Protein per serving: 25g</Text>
              <Text style={styles.specItem}>• Calories per serving: 120</Text>
              <Text style={styles.specItem}>• Carbohydrates: 2g</Text>
              <Text style={styles.specItem}>• Fat: 1g</Text>
              <Text style={styles.specItem}>• Sodium: 50mg</Text>
            </View>,
            'specifications'
          )}
          
          {renderExpandableSection(
            'Shipping & Returns',
            <View>
              <View style={styles.shippingItem}>
                <Truck size={16} color={Colors.light.success} />
                <Text style={styles.shippingText}>Free shipping on orders over $50</Text>
              </View>
              <View style={styles.shippingItem}>
                <RotateCcw size={16} color={Colors.light.primary} />
                <Text style={styles.shippingText}>30-day return policy</Text>
              </View>
              <Text style={styles.deliveryEstimate}>Estimated delivery: 2-3 business days</Text>
            </View>,
            'shipping'
          )}
          
          {/* Customer Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <Pressable style={styles.writeReviewButton}>
                <MessageCircle size={16} color={Colors.light.primary} />
                <Text style={styles.writeReviewText}>Write Review</Text>
              </Pressable>
            </View>
            
            <View style={styles.ratingDistribution}>
              <Text style={styles.overallRating}>{supplement.rating.toFixed(1)}</Text>
              <View style={styles.ratingBars}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <View key={star} style={styles.ratingBar}>
                    <Text style={styles.starLabel}>{star}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.bar, 
                          { width: `${star >= 4 ? 80 : star >= 3 ? 15 : 5}%` }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
            
            <FlatList
              data={mockReviews}
              renderItem={renderReviewCard}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
            />
          </View>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.sectionTitle}>You might also like</Text>
              <FlatList
                data={relatedProducts}
                renderItem={renderRelatedProduct}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                contentContainerStyle={styles.relatedProductsList}
              />
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Sticky Bottom CTA */}
      <View style={styles.stickyFooter}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <Pressable 
              style={[
                styles.quantityButton,
                quantity <= 1 && { opacity: 0.5 }
              ]} 
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus size={18} color={quantity <= 1 ? Colors.light.inactive : Colors.light.text} />
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable 
              style={styles.quantityButton} 
              onPress={handleIncrement}
            >
              <Plus size={18} color={Colors.light.text} />
            </Pressable>
          </View>
        </View>
        
        <View style={styles.ctaButtons}>
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            icon={<ShoppingBag size={18} color="#FFFFFF" />}
            disabled={!supplement.inStock}
            style={styles.addToCartButton}
          />
          <Button
            title="Buy Now"
            onPress={() => {
              handleAddToCart();
              router.push('/checkout');
            }}
            variant="secondary"
            disabled={!supplement.inStock}
            style={styles.buyNowButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  
  // Image Gallery Styles
  imageGalleryContainer: {
    position: 'relative',
  },
  galleryImage: {
    width: screenWidth,
    height: screenWidth < 375 ? 280 : screenWidth < 768 ? 320 : 380,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.light.primary,
    width: 20,
  },
  imageActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Content Styles
  content: {
    padding: screenWidth < 375 ? 16 : 20,
  },
  
  // Product Info Styles
  productInfo: {
    marginBottom: 24,
  },
  brand: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
    fontWeight: '500',
  },
  name: {
    fontSize: screenWidth < 375 ? 22 : 26,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
    lineHeight: screenWidth < 375 ? 26 : 32,
  },
  ratingRow: {
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 6,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.primary,
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.light.subtext,
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  availabilityBadge: {
    backgroundColor: Colors.light.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    color: Colors.light.success,
    fontWeight: '600',
  },
  
  // Options Styles
  optionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginRight: 12,
  },
  selectedSize: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  sizeText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  
  // Details Styles
  detailsContainer: {
    marginBottom: 24,
  },
  quickInfo: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickInfoLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginBottom: 4,
    fontWeight: '500',
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  
  // Expandable Section Styles
  expandableSection: {
    marginBottom: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  expandedText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.subtext,
  },
  specItem: {
    fontSize: 15,
    color: Colors.light.subtext,
    marginBottom: 8,
    lineHeight: 20,
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shippingText: {
    fontSize: 15,
    color: Colors.light.text,
    marginLeft: 8,
  },
  deliveryEstimate: {
    fontSize: 14,
    color: Colors.light.subtext,
    fontStyle: 'italic',
    marginTop: 8,
  },
  
  // Reviews Styles
  reviewsSection: {
    marginBottom: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.light.primary + '10',
  },
  writeReviewText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  ratingDistribution: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overallRating: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.light.text,
    marginRight: 20,
  },
  ratingBars: {
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    width: 12,
    marginRight: 8,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.light.border,
    borderRadius: 3,
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.light.accent,
    borderRadius: 3,
  },
  reviewCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginLeft: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.success + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 10,
    color: Colors.light.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.subtext,
  },
  reviewSeparator: {
    height: 12,
  },
  
  // Related Products Styles
  relatedSection: {
    marginBottom: 24,
  },
  relatedProductsList: {
    paddingHorizontal: 4,
  },
  relatedProductCard: {
    width: 140,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 12,
  },
  relatedProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    lineHeight: 18,
  },
  relatedProductBrand: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginBottom: 6,
  },
  relatedProductPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  
  // Sticky Footer Styles
  stickyFooter: {
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  quantitySection: {
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 8,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
    color: Colors.light.text,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
  },
  buyNowButton: {
    flex: 1,
  },
  
  // Not Found Styles
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
    fontWeight: '400',
  },
});