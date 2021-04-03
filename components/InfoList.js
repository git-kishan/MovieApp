import React ,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Dimensions} from 'react-native';

const {width,height}=Dimensions.get('window');
const axios = require('axios');


const InfoList=({movieId})=>{
    
    const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US`;

    const [overview,setOverview]=useState("")
    const [releaseDate,setReleaseDate]=useState("");
    const [budget,setBudget]=useState("")
    const [runtime,setRuntime]=useState("");
  
    useEffect(() => {
        axios.get(movieDetailUrl).then(response => {
          const fetchedData = response?.data;
          setOverview(fetchedData?.overview);
          setReleaseDate(fetchedData?.release_date);
          setBudget(fetchedData?.budget);
          setRuntime(fetchedData?.runtime)
        }).catch((eroor)=>console.log(eroor))
      }, []);
    
    return (
        <View style={styles.root}>
            <Text style={styles.overview}>Overview</Text>
            <Text style={styles.overviewText}>{overview}</Text>
            <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.key} >Release Date</Text>
                <Text style={styles.value}>{releaseDate}</Text>
            </View>
            <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.key} >Budget</Text>
                <Text style={styles.value}>$ {budget}</Text>
            </View>
            <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.key} >Length</Text>
                <Text style={styles.value}>{runtime} min</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    root : {
        width,
        backgroundColor:'black',
    },
    overview:{
        fontSize:20,
        fontWeight:'bold',
        color : 'white',
        margin : 12
    },
    overviewText:{
        color : 'white',
        marginLeft:12,
        marginRight:8,
        fontSize:15,
        overflow:'hidden'
    },
    key : {
        color:'white',
        fontSize:18,
        fontWeight:'800',
        marginLeft:12
    },
    value : {
        color:'white',
        marginRight:12,
        fontWeight:'bold'
    }
})

export default InfoList;