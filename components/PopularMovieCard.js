import React from 'react';
import {View,Text,StyleSheet, Dimensions,Image, TouchableOpacity} from 'react-native';

const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;


const PopularMovieCard=({data,navigation})=>{
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('Info',{id:data.id})}}>
              <View style={styles.rootView}>
                <Image
                    source={{uri : data.backgroundImage}}
                    resizeMode='cover'
                    style={{height:'78%',width:'100%'}}
                />
                <View style={styles.title}>
                    <Text style={styles.titleText} numberOfLines={2} ellipsizeMode='tail'>{data.title}</Text>
                </View>
           </View>
        </TouchableOpacity>
    )
      
}


const styles=StyleSheet.create({
    rootView : {
        width:windowWidth*0.33,
        height:windowHeight*0.28,
        marginRight:12,
        borderRadius:4,
        overflow:'hidden',
    },
    title :{
        height:'22%',
        width:'100%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        padding:4,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default PopularMovieCard;