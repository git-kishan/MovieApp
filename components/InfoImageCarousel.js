import React from 'react';
import {View,StyleSheet, Dimensions,Image} from 'react-native';

const {width,height}=Dimensions.get('window');
const baseImageUrl="https://image.tmdb.org/t/p/w500";


const InfoImageCarousel=({imagePath})=>{
    
    const url=baseImageUrl+imagePath;
    
    return (
        <View>
            <Image
               source={{uri : url}}
               resizeMode="cover"
               style={styles.image}
            />
            <View style={styles.overlay}>
            </View>
        </View>
    )
}




const styles=StyleSheet.create({
    image : {
        height:height/3,
        width:width
    },
    overlay : {
        height:height/3,
        width:width,
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.2)'
    }
})

export default InfoImageCarousel;