import {transform} from '@babel/core';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import CastList from '../components/CastList';
import InfoImageCarousel from '../components/InfoImageCarousel';
import InfoList from '../components/InfoList';
import Tab from '../components/Tab';
import TrailerList from '../components/TrailerList';

const {width} = Dimensions.get('window');
const axios = require('axios');

const Info = ({route, navigation}) => {
  const movieId = route.params.id;

  const movieImageUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US&include_image_language=null`;
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US`;
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  const imageListRef = useRef();
  const scrollRef = useRef();
  const currentX = useRef(0);

  const [imageList, setImageList] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [genres, setMovieGenres] = useState('');
  const [tagline, setTagline] = useState('');
  const [rating, setRating] = useState(null);
  const [carouselAutoHandled, setCarouselAutoHandled] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const loadData = () => {
    axios
      .get(movieImageUrl)
      .then(response => {
        const fetchedData = response?.data;
        const list = [...imageList];
        for (let i = 0; i < fetchedData?.backdrops?.length; i++) {
          const requiredData = {
            id: fetchedData.id + '' + i,
            imagePath: fetchedData.backdrops[i].file_path,
          };
          list.push(requiredData);
        }
        setImageList(list);
      })
      .catch(error => console.log(error));
  };
  useEffect(async () => {
    await loadData();
    handleImageCarouselScroll();
  }, []);

  useEffect(() => {
    axios
      .get(movieDetailUrl)
      .then(response => {
        const fetchedData = response?.data;
        const movieName = fetchedData.original_title;
        let genre = '';
        for (let i = 0; i < fetchedData.genres.length; i++) {
          genre = genre + ' ' + fetchedData.genres[i].name;
        }
        const tagline = fetchedData.tagline;
        const rating = fetchedData.vote_average;

        setMovieName(movieName);
        setMovieGenres(genre);
        setTagline(tagline);
        setRating(rating);
      })
      .catch(eroor => console.log(eroor));
  }, []);

  const handleImageCarouselScroll = () => {
    if (carouselAutoHandled) return;
    setCarouselAutoHandled(true);
    setInterval(() => {
      if (imageListRef?.current) {
        const index = Math.floor(currentX.current / width);
        if (imageListRef?.current) {
          imageListRef?.current?.scrollToOffset({
            offset: (index + 1) * width,
            animated: true,
          });
          currentX.current = (index + 1) * width;
        }
      }
    }, 3000);
  };

  const tabIndicatorInterpolate = scrollX.interpolate({
    inputRange: [0, 3 * width],
    outputRange: [0, width],
  });

  return (
    <ScrollView>
      <View style={styles.firstHalfView}>
        <Animated.FlatList
          ref={imageListRef}
          onScroll={ev => {
            currentX.current = ev.nativeEvent.contentOffset.x;
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.8}
          onEndReached={() => loadData()}
          data={imageList}
          keyExtractor={(item, index) => String(item.id) + index}
          renderItem={({item}) => (
            <InfoImageCarousel imagePath={item.imagePath} />
          )}
        />
        <View style={{height:150}}/>
        <View style={styles.root}>
          <View style={styles.absoluteView}>
            <Image
              source={{
                uri:
                  imageList?.length > 0
                    ? baseImageUrl + imageList[0].imagePath
                    : null,
              }}
              style={styles.smallImagePoster}
            />
            <View style={styles.contentView}>
              {!movieName ? null : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '800',
                    padding: 3,
                  }}>
                  {movieName}
                </Text>
              )}

              {!tagline ? null : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{color: 'white', fontSize: 18, padding: 3}}>
                  {tagline}
                </Text>
              )}

              {!genres ? null : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{color: 'white', fontSize: 14}}>
                  {genres}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 4,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../images/star.png')}
                  style={{height: 12, width: 12}}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{color: 'white', fontSize: 14, marginLeft: 8}}>
                  {rating}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.secondHalfView}>
          <View>
            <Tab
              scrollToIndex={index => {
                scrollRef?.current?.scrollTo({
                  x: width * index,
                  animated: true,
                });
              }}
            />

            <Animated.View
              style={[
                styles.bar,
                {transform: [{translateX: tabIndicatorInterpolate}]},
              ]}
            />
          </View>

          <Animated.ScrollView
            ref={scrollRef}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            scrollEventThrottle={16}
            nestedScrollEnabled
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.1}>
            <InfoList movieId={movieId} />
            <CastList movieId={movieId} />
            <TrailerList movieId={movieId} />
          </Animated.ScrollView>
        </View>

        <TouchableOpacity
          style={styles.downImage}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.backbutton}
            source={require('../images/arrow.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  firstHalfView: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    elevation: 5,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallImagePoster: {
    height: '80%',
    width: 0.32 * width,
    marginLeft: 16,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  contentView: {
    marginLeft: 8,
    paddingTop: 8,
    width: 0.58 * width,
    overflow: 'hidden',
    zIndex: 100,
    elevation: 100,
  },
  infoHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 100,
  },
  secondHalfView: {
    flex: 1,
  },

  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width / 3,
    height: 4,
    backgroundColor: '#b80f0f',
    elevation: 5,
  },
  downImage: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: 20,
    right: 8,
    elevation: 5,
  },
  backbutton: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 100,
    top: 20,
    right: 20,
  },
});

export default Info;
