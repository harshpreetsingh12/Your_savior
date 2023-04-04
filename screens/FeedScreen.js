import {React, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View ,StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SafeViewAndroid from "./SafeViewAndroid";
import sanityClient from '../Sanity';
import FeedCard from '../components/FeedCard'
import {PlusIcon, ArrowPathIcon} from "react-native-heroicons/outline";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'
// import Loader from '../components/Loader'
const FeedScreen =()=> {
  const [isPressed, setIsPressed]=useState(true)
  const [usern, setusern]=useState(false)
  const navigation = useNavigation();
  const [feeds, setFeeds]= useState([]);
  const [Refresh, setRefresh]= useState(false);
  const [UserFeeds, setUserFeeds]= useState([]);
  const getFeeds = async () => {
    const feedss = await AsyncStorage.getItem('Feeds')
    // console.log(feedss)
    if(feedss!=null) {
      // console.log('1')
     setFeeds(JSON.parse(feedss))
    }
    else{
      // console.log('2')
      const feed = await sanityClient.fetch(`
      *[_type == "post"]{
        ...,
        }| order(_createdAt desc)`)
        
      const feedsdata = JSON.stringify(feed)
      await AsyncStorage.setItem('Feeds', feedsdata)
        setFeeds(JSON.parse(feedsdata))
    }
  }
  const getUserFeeds = async () => {
    const Ufeedss = await AsyncStorage.getItem('UserFeeds')
    // console.log(Ufeedss)
    if(Ufeedss!=null) {
      // console.log('1')
      setUserFeeds(JSON.parse(Ufeedss))
    }
    else{
      // console.log('2')
      const Ufeed = await sanityClient.fetch(`
      *[_type == "userpost"]{
        ...,
        }| order(_createdAt desc)`)
        
      const Ufeedsdata = JSON.stringify(Ufeed)
      await AsyncStorage.setItem('UserFeeds', Ufeedsdata)
        setUserFeeds(JSON.parse(Ufeedsdata))
    }
  }
  const reloadContent = async () => {
    if (usern){
      // console.log('1')
      const Ufeed = await sanityClient.fetch(`
        *[_type == "userpost"]{
          ...,
          }| order(_createdAt desc)`)
          
        const Ufeedsdata = JSON.stringify(Ufeed)
        await AsyncStorage.setItem('UserFeeds', Ufeedsdata).then(
          setUserFeeds(JSON.parse(Ufeedsdata)
          ))
      // console.log('Userfeeds')
    }
    if(isPressed){
      const feed = await sanityClient.fetch(`
      *[_type == "post"]{
        ...,
        }| order(_createdAt desc)`)
        
      const feedsdata = JSON.stringify(feed)
      await AsyncStorage.setItem('Feeds', feedsdata).then(
        setFeeds(JSON.parse(feedsdata))
      )
      // console.log('feeds')
    }
  }
  useEffect(()=>{
    getFeeds()
    getUserFeeds()

  },[]);
  // useEffect(()=>{
  //   sanityClient.fetch(`
  //   *[_type == "userpost"]{
  //     ...,
  //     }| order(_createdAt desc)`).then((data) =>{
  //       setUserFeeds(data);
  //   });
  // },[]);
  if ((feeds.length===0 || UserFeeds.length===0)) return <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
  // console.log(feeds.length)
  // console.log(UserFeeds)
  // console.log(Refresh)

    return (
    <>
      <SafeAreaView className='relative'>
        {usern &&
        <TouchableOpacity onPress={()=>{navigation.navigate('Newpost')}} className='z-50 absolute bottom-20 right-5 p-2 bg-[#FF5757] rounded-full'>
        <PlusIcon color='white' size={34}/>
        </TouchableOpacity>
        }
        <View className='flex-row w-full justify-between items-center p-5 pb-1 border-gray-300 border-b-2'>

        <TouchableOpacity onPress={()=>{setIsPressed(true), setusern(false)}} className='flex justify-center items-center m-0 px-3 py-1 rounded-md'
        //  style={{backgroundColor:isPressed===true? "transparent":"#d1d0d0" }}
         ><Text className='text-lg' style={{ color: isPressed === true ? '#FF5757' : 'black'}}>Savior Feed</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{setRefresh(!Refresh),reloadContent()}}  
        // style={{transform:Refresh===true? "rotate(0deg)":"rotate(180deg)" }}
         className='m-0 px-3 py-1 rounded-md transition-all'>
          <ArrowPathIcon color='#FF5757' size={26} />
          </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{setIsPressed(false),setusern(true)}} className='flex justify-center items-center m-0 px-3 py-1 rounded-md'
        //  style={{backgroundColor:usern===true? "transparent":"#d1d0d0" }}
         ><Text className='text-lg'  style={{ color: usern === true ? '#FF5757' : 'black' }}>User Feed</Text></TouchableOpacity>
        </View>
        {!isPressed && (
          <ScrollView
          
          showsVerticalScrollIndicator={false}>
            <View className='mb-16 mt-5'>
          {/* <Text> I Am Feed Screen </Text> */}
          {UserFeeds?.map(ufeeds=>(
            <View key={ufeeds._id}>
            {(ufeeds.blockPost) && (
            <FeedCard
            key={ufeeds._id} 
            id={ufeeds._id} 
            blockPost={ufeeds.blockPost}
            username={'Victim'} 
            imgUrl={ufeeds.image} 
            title={ufeeds.title} 
            address={ufeeds.locate} 
            short_description={ufeeds.short_description} 
            date={ufeeds.Date} 
            />
            )}
            </View>
            ))}
            {/* <Loader/> */}
            </View>
        </ScrollView>
        )}

        {!usern &&(
      <ScrollView showsVerticalScrollIndicator={false}
      >
        {/* <Text> I Am Feed Screen </Text> */}
        
        <View className='mb-16 mt-5'
        //  onTouchStart={e=> this.touchX = e.nativeEvent.pageX}
        //  onTouchEnd={e => {
        //    if (this.touchX - e.nativeEvent.pageX > 20)
        //    console.log('right')
        //    setIsPressed(true)
        //    setusern(false)
        //  }}
         >
        {feeds?.map(feeds=>(
          <FeedCard
          key={feeds._id} 
          id={feeds._id} 
          username='Savior News' 
          imgUrl={feeds.image} 
          title={feeds.title} 
          address={feeds.locate} 
          short_description={feeds.short_description} 
          date={feeds.Date} 
          />
          ))}
          {/* <Loader/> */}
          </View>
      </ScrollView>
        )}
      </SafeAreaView>
      </>
    )
}
export default FeedScreen;
