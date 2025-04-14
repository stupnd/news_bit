import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView,
  RefreshControl,
  Animated
} from 'react-native';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../services/newsService';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const NewsFeed = ({ route }) => {
  const navigation = useNavigation();
  const category = route.params?.category || 'All News';
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = new Animated.Value(0);

  const loadNews = useCallback(async () => {
    try {
      const articles = await fetchNews(category);
      setNewsData(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    loadNews();
  }, [category, loadNews]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#f8f9fa', '#ffffff']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeContainer}>
        <Animated.FlatList
          data={newsData}
          renderItem={({ item, index }) => (
            <NewsCard
              item={item}
              index={index}
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.feedContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0A84FF"
              colors={['#0A84FF']}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  feedContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default NewsFeed;