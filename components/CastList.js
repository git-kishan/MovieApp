import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet, Dimensions, FlatList,Image} from 'react-native';

const {width,height}=Dimensions.get('window');
const axios = require('axios');
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

const ListItem=({imageUrl,name,characterName})=>{
    return<View style={{width,height:100,flexDirection:'row',alignItems:'center'}}>
        <Image 
           source={{uri : imageUrl}} 
           style={{height:'80%',width : 0.8 * 100,borderRadius:50,marginLeft:16}}
        />
        <View>
            <Text
              style={{color : 'white',marginLeft:20,fontSize:18,fontWeight:'bold'}}
            >{name}</Text>
            <Text
             style={{color:'#e6e7e8',marginLeft:20,fontSize:15,marginTop:4}}
            >as {characterName}</Text>
        </View>
    </View>
}

const CastList=({movieId})=>{

    const castUrl=`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US`;
    const [data,setData]=useState([]);

    useEffect(async ()=>{
        await axios.get(castUrl).then(response=>{
            const fetchedData=response?.data?.cast;
           const list = [];
            for(let i=0;i<fetchedData.length;i++){
                const profileUrl=baseImageUrl+fetchedData[i].profile_path;
                const name=fetchedData[i].name;
                const character=fetchedData[i].character;
                list.push({profileUrl,name,character});
            }
            setData(list);
        }).catch((error)=>console.log(error))
    },[]);

    return (
        <View style={styles.root}>
            <FlatList
              data={data}
              bounces={false}
              keyExtractor={(item,index)=>item.profileUrl+item.character+index}
              renderItem={({item,index})=><ListItem 
                                            imageUrl={item.profileUrl} 
                                            name={item.name} 
                                            characterName={item.character} />}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    root : {
        width,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default CastList;