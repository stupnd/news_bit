// screens/NewsFeed.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Make sure this import is correct
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../services/newsService';

const NewsFeed = ({ route }) => {
  const navigation = useNavigation(); // Correctly using the hook
  const category = route.params && route.params.category ? route.params.category : 'All News';
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={newsData}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            source={item.source?.name || 'Unknown'}
            summary={item.description || 'No description available'}
            image={item.urlToImage}
            onPress={() => {
              // Navigate to ArticleDetail; navigation is defined via the hook
              navigation.navigate('ArticleDetail', { article: item });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.feedContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
  },
  feedContainer: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsFeed;
