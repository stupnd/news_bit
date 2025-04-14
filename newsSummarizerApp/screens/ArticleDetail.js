import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { summarizeArticle, generateAnalogy } from '../services/summarizationService';

const ArticleDetail = ({ route }) => {
  const { article } = route.params;
  const [simplifiedSummary, setSimplifiedSummary] = useState('');
  const [analogy, setAnalogy] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingAnalogy, setLoadingAnalogy] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const textToSummarize = article.content || article.description || article.title;
        const summary = await summarizeArticle(textToSummarize);
        setSimplifiedSummary(summary);
      } catch (error) {
        console.error('Summary Error:', error);
        setSimplifiedSummary('Error generating summary.');
      } finally {
        setLoadingSummary(false);
      }
    };
    fetchSummary();
  }, [article]);

  const handleGenerateAnalogy = async () => {
    setLoadingAnalogy(true);
    try {
      const textToSummarize = article.content || article.description || article.title;
      const analogyResult = await generateAnalogy(textToSummarize);
      setAnalogy(analogyResult);
    } catch (error) {
      console.error('Analogy Error:', error);
      setAnalogy('Error generating analogy.');
    } finally {
      setLoadingAnalogy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* Article Header Card */}
        <View style={styles.card}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.source}>
              Source: {article.source?.name || 'Unknown'}
            </Text>
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.card}>
          {loadingSummary ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <>
              <Text style={styles.summaryLabel}>Simplified Summary:</Text>
              <Text style={styles.summaryText}>{simplifiedSummary}</Text>
            </>
          )}
        </View>

        {/* WebView Card for Full Article */}
        <View style={styles.card}>
          <Text style={styles.webViewLabel}>Full Article Preview:</Text>
          {article.url ? (
            <View style={{ height: 500, marginTop: 10 }}>
              <WebView
                source={{ uri: article.url }}
                style={styles.webView}
                onError={(syntheticEvent) => {
                  console.warn('WebView error: ', syntheticEvent.nativeEvent);
                }}
              />
            </View>
          ) : (
            <Text>No article URL available.</Text>
          )}
        </View>

        {/* Analogy Card */}
        <View style={styles.card}>
          <Button title="Show Analogy" onPress={handleGenerateAnalogy} />
          {loadingAnalogy && <ActivityIndicator size="large" color="#333" style={{ marginTop: 10 }} />}
          {analogy !== '' && (
            <>
              <Text style={styles.analogyLabel}>Analogy:</Text>
              <Text style={styles.analogyText}>{analogy}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContentContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 3.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#111827',
  },
  source: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  webViewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  webView: {
    flex: 1,
    borderRadius: 8,
  },
  analogyLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },
  analogyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
