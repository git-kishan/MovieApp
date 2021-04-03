import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const DetailCard = ({item, navigation,interpolate}) => {
  return (
    <Animated.View  style={{transform:[{scale:interpolate}]}} >
      <TouchableOpacity
        onPress={() => navigation.navigate('Info', {id: item.id})}>
        <View style={styles.root}>
          <Image
            source={{uri: item?.foregroundImage}}
            style={styles.posterImage}
            resizeMode="cover"
          />

          <View style={styles.container}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item?.title}
            </Text>

            <Text style={styles.year}>{item?.year?.substring(0, 4)}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 2,
                paddingBottom: 2,
              }}>
              <Image
                source={require('../images/star.png')}
                style={styles.star}
              />
              <Text style={styles.rating}>{item?.rating}</Text>
            </View>

            <Text
              style={[styles.year, {paddingRight: 8}]}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item?.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: windowHeight * 0.22,
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 8,
  },
  posterImage: {
    flex: 3,
    height: '100%',
  },
  container: {
    flex: 7,
    marginLeft: 8,
    marginTop: 12,
  },
  star: {
    height: 12,
    width: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  year: {
    color: 'rgba(0,0,0,0.7)',
  },
  rating: {
    marginLeft: 4,
    color: 'rgba(0,0,0,0.7)',
  },
});

export default DetailCard;
