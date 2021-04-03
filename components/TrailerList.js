import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const axios = require('axios');

const TrailerList = ({movieId}) => {
  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US`;

  const [data, setData] = useState([]);

  useEffect(async () => {
    await axios
      .get(trailerUrl)
      .then(response => {
        const fetchedData = response?.data?.results;
        setData(fetchedData);
      }).catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        bounces={false}
        contentContainerStyle={{paddingBottom:50}}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 120,
                width,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 8,
                marginRight: 8,
              }}>
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${item.key}/sddefault.jpg`,
                }}
                style={{height: '90%', width: 0.3 * width}}
              />
              <Text
                style={{
                  color: 'white',
                  flexWrap: 'wrap',
                  width: 0.6 * width,
                  marginLeft: 16,
                  marginRight:16,
                  fontSize:17,
                  fontWeight:'900'
                }}>
                {item.name}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    backgroundColor: 'black',
  },
});

export default TrailerList;
