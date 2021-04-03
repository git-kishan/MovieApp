import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const InfoHeader=()=>{
    return (
        <View style={styles.root}>
            <Image
              style={styles.image}
              source={require('../images/nolan.jpg')}
            />
            
        </View>
    )
}


const styles=StyleSheet.create({
    root :{
        flexDirection:'row',
        height:200,
        width:100,
        backgroundColor:'white'
    },
    image : {
        resizeMode:'cover',
        borderRadius:4,
        height:200,
        width:100,

    },
    secondView : {
        flex : 7
    }
})




export default InfoHeader;