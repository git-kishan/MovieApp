import React from 'react';
import {
     View,
     Text,
     StyleSheet,
     Image,
     ImageBackground, 
     TouchableOpacity,
     Dimensions
    }from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const MovieCarouselCard=({data,navigation})=>{
    
    return (
        <ImageBackground style={[styles.imageBackground]} source= {{uri : data.foregroundImage}}>
            
            <View style={{flex : 1 ,height:'100%',flexDirection:'row' ,alignItems:'center' , elevation:5}}  backgroundColor='rgba(0,0,0,0.8)'>
                <View style={{height:'75%',width:'43%'}}>
                    <Image
                        source={{uri : data.backgroundImage}}
                        style={{flex  :1 , marginLeft:12,marginRight:12,borderRadius:3,resizeMode:'center'}}
                        />
                </View>

                <View style={{height:'70%',width:'57%',flexDirection:'column'}}>

                    <Text style={styles.movieName} numberOfLines={2}>{data.title}</Text>

                    <Text style={styles.movieGenre}>Action</Text>

                    <View style={styles.starContainer}>
                        <Image source={require('../images/star.png')}  style={styles.star}/>
                        <Text style={styles.rating}>{data.rating}</Text>
                    </View>

                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.imageDescription}>
                        {data.description}
                    </Text>

                    <TouchableOpacity onPress={()=>navigation.navigate('Info',{id  :data.id})}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>View Details</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles=StyleSheet.create({
    imageBackground: {
        flexDirection:'row',
        width:windowWidth,
        height:windowHeight*0.35,
        justifyContent: "center",
        alignItems:'center',

      },
      container :{
          flex : 1,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
      },
      movieName:{
          color : 'white',
          fontSize:24,
          fontWeight:'bold'
      },
      movieGenre:{
          color : 'white',
          fontSize:14,
      },
      starContainer : {
          height:30,
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'center'
      },
      star :{
          width:13,
          height:13
      },
      rating : {
          color:'white',
          marginLeft:4
      },
      imageDescription:{
          color:'white',
          paddingBottom:4,
          paddingRight:8
      },
      button:{
          backgroundColor:'#d11521',
          height:30,
          width:100,
          borderRadius:3,
          justifyContent:'center',
          alignItems:'center',
          marginTop:4
      },
      buttonTitle : {
          color : 'white',
          textAlign:'center'
      }

})

export default MovieCarouselCard;