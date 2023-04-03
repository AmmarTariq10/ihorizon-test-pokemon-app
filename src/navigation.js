import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./screens/Home/HomeScreen";
import { primaryColor } from "./utils/colors";
import PokemonDetailsScreen from "./screens/PokemonDetails/PokemonDetailsScreen";
const Root = createStackNavigator()
const RootStack = () => {
    return (
        <Root.Navigator>
            <Root.Screen
                component={HomeScreen}
                name='HomeScreen'
                options={{
                        title:'Home',
                        headerStyle:{
                            backgroundColor:primaryColor,
                        },
                        headerTitleAlign:'center',
                        headerTintColor:'white'
                        
                }}
            />
             <Root.Screen
                component={PokemonDetailsScreen}
                name='PokemonDetailsScreen'
                options={{
                        headerStyle:{
                            backgroundColor:primaryColor,
                        },
                        headerTitleAlign:'center',
                        headerTintColor:'white'
                        
                }}
            />
            
            {/* <Root.Screen component={HomeScreen}/> */}
        </Root.Navigator>
    )
}
export default RootStack