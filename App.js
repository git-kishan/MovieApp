import React from 'react';
import { NavigationContainer  ,DarkTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Home from './screens/Home';
import Detail from './screens/Detail';
import {StatusBar ,SafeAreaView} from 'react-native';
import Info from './screens/Info';

const Stack = createStackNavigator();

const App=()=>{
  return (
        <NavigationContainer theme={DarkTheme}>
          <StatusBar backgroundColor="#000000"/>

            <Stack.Navigator initialRouteName="Home" header={null}>

               <Stack.Screen 
                  name="Home" 
                  component={Home}  
                  options={{
                    title:Platform.OS=='ios'?null : 'Movies',
                    headerStyle:{ backgroundColor:'#000000',height:35},
                    headerTitleStyle:{
                      fontWeight:'bold'
                    },
                    }}
                  />
                <Stack.Screen 
                  name="Detail" 
                  component={Detail}  
                  options={{
                   ...TransitionPresets.RevealFromBottomAndroid,
                   headerStyle:{ backgroundColor:'#000000'},
                  headerTitleStyle:{
                    fontWeight:'bold'
                  }
                  }}
                />
                <Stack.Screen 
                  name="Info" 
                  component={Info}  
                  options={{
                   ...TransitionPresets.RevealFromBottomAndroid,
                   headerShown:false
                  }}
                  />
            </Stack.Navigator>
        </NavigationContainer>
  )
}



export default App;