// components/NewsCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NewsCard = ({ title, source, summary, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {image && <Image source={{ uri: image }} style={styles.thumbnail} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.source}>{source}</Text>
        <Text style={styles.summary} numberOfLines={3}>
          {summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    overflow: 'hidden',
    // A subtle shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Elevation for Android shadow
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  source: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: '#333',
  },
});

export default NewsCard;
