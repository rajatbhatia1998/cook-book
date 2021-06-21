import React,{useEffect,useRef, useState} from 'react'
import {Easing,Dimensions,Image,View,Animated,TouchableHighlight,Text,StyleSheet, ScrollView,TouchableWithoutFeedback} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import topMeals from '../constants/topMeals.json'
import { SharedElement } from 'react-native-shared-element';





const {width:WIDTH,height:HEIGHT} = Dimensions.get('screen')
const ITEMWIDTH = WIDTH * 0.5
const ITEMHEIGHT = HEIGHT * 0.5





export default function TopMeals(props) {
    const navigation = props.navigation
    const slideValue = useRef(new Animated.Value(WIDTH)).current
    const [currentMeal,setCurrentMeal] = useState({})
    useEffect(()=>{
        Animated.spring(slideValue,{
            toValue:0,
            useNativeDriver:false
        }).start()
    },[])
    const getItemDetails = (mealId)=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res=>res.json())
        .then(data=>{
           // console.log("rsonse",data)
            setCurrentMeal(data.meals[0])
        })
    }
    useEffect(()=>{
        //console.log('mealSelected',currentMeal)
        if(currentMeal.idMeal){
                        navigation.navigate('Meal Details',{
                            item:currentMeal
                         })
        }
    },[currentMeal])
    return (
        <Animated.ScrollView 
        horizontal
        style={{left:slideValue}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{height:ITEMHEIGHT * 0.7}}
        >
            
            {topMeals.map(item=>{
                    return <TouchableWithoutFeedback
                
                    activeOpacity={1}
                    underlayColor="#e5e5e5"
                    onPress={()=>{
                       
                        //console.log("Item clicked",item)
                        getItemDetails(item.idMeal)
                    }}
                    >
                        <View  style={styles.card}>
                        <SharedElement id={`item.${item.idMeal}.photo`} >
                            <Image source={{uri:item.strMealThumb}}
                            style={{
                            width:ITEMWIDTH,
                            height:ITEMHEIGHT*0.4,
                            borderTopLeftRadius:30,
                            borderTopRightRadius:30,
                            resizeMode:'stretch'}}
                            />
                            </SharedElement>
                            <Text style={styles.text} adjustsFontSizeToFit>{item.strMeal}</Text>
                        </View>
                    </TouchableWithoutFeedback>
            })}
        </Animated.ScrollView>
        )
}
const styles = StyleSheet.create({
    card:{
        // flex:1,
        backgroundColor:"white",
        elevation:6,
        flexDirection:'column',
        marginHorizontal:10,
        width:ITEMWIDTH,
        height:ITEMHEIGHT*0.65,
        borderRadius:30,

    },
    text:{
        fontFamily:'open-sans',
        fontSize:20,
        margin:10,
        textAlign:'center',
        
    }
})
