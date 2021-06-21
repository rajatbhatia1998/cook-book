import React,{useEffect,useState} from 'react'
import {View,
    Text,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    RefreshControl,
    FlatList,
    Animated
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import FavMeal from '../components/FavMeal'
import {useSelector} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FavoritesScreen(props) {
    
    //const ids = useSelector(state=>state.meals)
    const [ids,setIds] = useState([])
    useEffect(()=>{
        getIdsAsync()
       
    },[])
    const getIdsAsync = ()=>{
        AsyncStorage.getItem('Favorites',(err,result)=>{
            console.log(result)
           setIds(JSON.parse(result))
           setRefreshing(false)
        })
    }
    console.log(ids)
    const renderMeal=(itemData)=>{
        const item = itemData.item
        const navigation = props.navigation
        return(
           
            <FavMeal navigation={navigation} id={item}/>
        )
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getIdsAsync()
    }, [])
    return (
        <View style={styles.container}>
        {ids.length>=1?  <Text style={styles.title}>Your Favorites ({ids.length})</Text>:null}
          
            {ids.length>=1?
        //         <Carousel 
        //     data={ids}
            
        //     renderItem={renderMeal}
        //     layout={'stack'}
        //     layoutCardOffset={18}
        //     itemWidth={Dimensions.get('screen').width+1}
        //     sliderWidth={Dimensions.get('screen').width}
           
        //     sliderHeight={200}
        //     slideStyle={{flex:4,height:300,padding:10}}
        //   />
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
           
            keyExtractor={(item,index)=>item}
            data={ids}
            renderItem={renderMeal}
            />
        :
        <View>
                <Text style={styles.title}>No Meals to Display</Text>
                <Text style={styles.titleSmall}>Scroll Down to Refresh !</Text>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <MaterialCommunityIcons color='black' size={100}  name="arrow-down-bold"/>
                </View>
               
                <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{marginVertical:10}}
                keyExtractor={(item,index)=>item.idMeal}
                data={ids}
                renderItem={renderMeal}
                numColumns={2}
                />
                
            </View>
                    }
            
            </View>
       
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:24
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,marginBottom:10
    },
    titleSmall:{
        fontFamily:'open-sans',
        fontSize:16,
        textAlign:'center',
        marginTop:5
    }
})
