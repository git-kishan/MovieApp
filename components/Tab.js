import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated
   } from 'react-native';

   const {width,height}=Dimensions.get('window');

const Tab=(props)=>{
    return (
        <View style={styles.root}>

            <TouchableOpacity style={styles.button} onPress={()=>{props.scrollToIndex(0)}}>
                <Text style={styles.text}>INFO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>{props.scrollToIndex(1)}}>
                <Text style={styles.text}>CASTS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={()=>{props.scrollToIndex(2)}}>
                <Text style={styles.text}>TRAILERS</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles=StyleSheet.create({
    root : {
        height:50,
        width:'100%',
        backgroundColor:'#0d0d0a',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    button:{
        flex : 1,
    },
    text : {
        color :'white',
        fontWeight:'bold',
        textAlign:'center'
    },
    bar :{
        position:'absolute',
        bottom:0,
        left:0,
        width:width/3,
        height:4,
        backgroundColor:'#b80f0f',
        elevation:5
    },
   
    
})

export default Tab;