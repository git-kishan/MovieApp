import React ,{useEffect,useState,useRef}from'react';
import {View,StyleSheet,FlatList, ActivityIndicator,Animated, Dimensions} from 'react-native';
import DetailCard from '../components/DetailCard';

const imagePathUrl="https://image.tmdb.org/t/p/w500";
const axios = require('axios');
const {height}=Dimensions.get('window')
const ITEM_SIZE=0.22 * height;

const Detail=({navigation,route})=>{
    const url=route.params.url;
    const [data,setData]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);
    const scrollY=useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        navigation.setOptions({title : route?.params?.title})
        loadData(1);
    },[]);

    const loadData= async(pageNo)=>{
        if(loading)return ;
        setLoading(true);
        setPage(pageNo);
        let turl=url.concat(pageNo);

        await axios.get(turl).then((response)=>{
            const fetchedData=response.data.results;
            const list=[...data];
            
            for(let i=0;i<fetchedData.length;i++){
                const requiredData={
                    id : fetchedData[i].id,
                    title : fetchedData[i].original_title,
                    rating : fetchedData[i].vote_average,
                    foregroundImage : imagePathUrl+fetchedData[i].backdrop_path,
                    year : fetchedData[i].release_date,
                    description: fetchedData[i].overview,
                }
                list.push(requiredData);
            }
            setData(list);
            setLoading(false);
    })
}

    const footerComponent=()=>{
        return loading?
        <View style={{width:'100%',height:60,justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator style={{flex : 1}} size="large" color="#d11521"/>
        </View>
        :null;
    }

    return (
        <View style={styles.root}>
            <Animated.FlatList
               onScroll={Animated.event(
                   [
                       {
                           nativeEvent : {
                               contentOffset : {
                                   y : scrollY
                               }
                           }
                       }
                   ],
                   {useNativeDriver:true}
               )}
               data={data}
               ListFooterComponent={footerComponent}
               onEndReachedThreshold={0.5}
               onEndReached={()=>loadData(page+1)}
               keyExtractor={(item)=>item.id.toString()}
               renderItem={({item,index})=>{
                   const inputRange  = [ (index-1)*ITEM_SIZE,index*ITEM_SIZE,(index+2)*ITEM_SIZE]

                   const scaleInterpolator=scrollY.interpolate({
                       inputRange,
                       outputRange : [1 , 1, 0]
                   });
                   
               return <DetailCard  interpolate={scaleInterpolator} navigation={navigation} item={item}/>
            }}
            />
        </View>
    )
}


const styles=StyleSheet.create({
    root : {
        flex:1,
    }
})


export default Detail;