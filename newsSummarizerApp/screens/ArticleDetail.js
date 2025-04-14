import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { summarizeArticle, generateAnalogy } from '../services/summarizationService';
import { Ionicons } from '@expo/vector-icons';

const ArticleDetail = ({ route, navigation }) => {
  const { article } = route.params;
  const [simplifiedSummary, setSimplifiedSummary] = useState('');
  const [analogy, setAnalogy] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingAnalogy, setLoadingAnalogy] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    article: false,
    analogy: false
  });

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
      setExpandedSections({...expandedSections, analogy: true});
    } catch (error) {
      console.error('Analogy Error:', error);
      setAnalogy('Error generating analogy.');
    } finally {
      setLoadingAnalogy(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({...expandedSections, [section]: !expandedSections[section]});
  };

  const handleOpenArticle = () => {
    Linking.openURL(article.url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      
      
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* Article Header */}
        <View style={styles.articleHeader}>
          <Text style={styles.sourceBadge}>{article.source?.name || 'Unknown'}</Text>
          <Text style={styles.title}>{article.title}</Text>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
          )}
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.metaText}>5 min read</Text>
          </View>
        </View>

        {/* Summary Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('summary')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Simplified Summary</Text>
          <Ionicons 
            name={expandedSections.summary ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        {expandedSections.summary && (
          <View style={styles.sectionContent}>
            {loadingSummary ? (
              <ActivityIndicator size="small" color="#0A84FF" />
            ) : (
              <Text style={styles.summaryText}>{simplifiedSummary}</Text>
            )}
          </View>
        )}

        {/* Full Article Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('article')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Full Article</Text>
          <Ionicons 
            name={expandedSections.article ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        {expandedSections.article && (
          <View style={styles.sectionContent}>
            {article.url ? (
              <>
                {Platform.OS === 'web' ? (
                  <TouchableOpacity 
                    style={styles.openInBrowserButton}
                    onPress={handleOpenArticle}
                  >
                    <Text style={styles.openInBrowserText}>Open in Browser</Text>
                    <Ionicons name="open-outline" size={16} color="#0A84FF" />
                  </TouchableOpacity>
                ) : (
                  <View style={{ height: 500 }}>
                    <WebView
                      source={{ uri: article.url }}
                      style={styles.webView}
                      onError={(syntheticEvent) => {
                        console.warn('WebView error: ', syntheticEvent.nativeEvent);
                      }}
                    />
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.emptyText}>No article URL available.</Text>
            )}
          </View>
        )}

        {/* Analogy Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('analogy')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Helpful Analogy</Text>
          <Ionicons 
            name={expandedSections.analogy ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        {expandedSections.analogy && (
          <View style={styles.sectionContent}>
            {analogy === '' ? (
              <TouchableOpacity 
                style={styles.generateButton}
                onPress={handleGenerateAnalogy}
                disabled={loadingAnalogy}
              >
                {loadingAnalogy ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.generateButtonText}>Generate Analogy</Text>
                )}
              </TouchableOpacity>
            ) : (
              <Text style={styles.analogyText}>{analogy}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  scrollContentContainer: {
    paddingBottom: 24,
  },
  articleHeader: {
    padding: 16,
  },
  sourceBadge: {
    backgroundColor: '#E5E7EB',
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  webView: {
    flex: 1,
    borderRadius: 8,
  },
  emptyText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  generateButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  analogyText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  openInBrowserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#0A84FF',
    borderRadius: 8,
  },
  openInBrowserText: {
    color: '#0A84FF',
    fontWeight: '600',
    marginRight: 8,
  },
});

export default ArticleDetail;