import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewsCard = ({ item, onPress }) => {
  const scaleValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.cardContainer}>
          {item.urlToImage && (
            <Image 
              source={{ uri: item.urlToImage }} 
              style={styles.cardImage}
              resizeMode="cover"
            />
          )}
          {/* Text Container Below the Image */}
          <View style={styles.textContainer}>
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceText}>{item.source?.name || 'Unknown'}</Text>
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={14} color="#2c3e50" />
                <Text style={styles.timeText}>
                  {new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
            <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
            <Text style={styles.summary} numberOfLines={2}>
              {item.description || 'No description available'}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.date}>
                {new Date(item.publishedAt).toLocaleDateString()}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#2c3e50" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16, // Space between cards
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#fff', // Background for text area for readability
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceText: {
    color: '#2c3e50',
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#2c3e50',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  title: {
    color: '#2c3e50',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  summary: {
    color: '#2c3e50',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#2c3e50',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default NewsCard;
