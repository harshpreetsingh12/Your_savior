import { useNavigation } from '@react-navigation/native'
import React, { useState,useEffect } from 'react'
import { Text, View ,StyleSheet, Button, SafeAreaView,ScrollView, TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import SosButtons from '../components/SosButtons';
import SafeViewAndroid from "./SafeViewAndroid";
// import {ChatBubbleLeftRightIcon} from "react-native-heroicons/outline";
// import {auth} from '../firebase'
// import useAuth from '../hooks/useAuth';
// import NavBar from '../components/NavBar';
// import sanityClient from '../Sanity';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute } from '@react-navigation/native'
// import AsyncStorage from '@react-native-community/async-storage';
// import * as Location from 'expo-location';

const HomeScreen =()=> {
  const navigation = useNavigation();
  // const {user} = useAuth();
  // const [location, setLocation] = useState([]);
  const [number, setNumber] = useState([]);
  // const [cuser, setCuser] = useState([]);
  // const getLocation=()=>{
  //   (async () => {
  //         let { status } = await Location.requestForegroundPermissionsAsync();
  //         if (status !== 'granted') {
  //           setErrorMsg('Permission to access location was denied');
  //           return;
  //         }
  //         let location = await Location.getCurrentPositionAsync({});
  //         setLocation(location);
  //       })();
  // }
//   const GetNumber = async () => {
//     if (auth.currentUser?.email.length!=0){
//     const Unum = await AsyncStorage.getItem('Userinfo')
//     if(Unum!=null) {
//       // console.log('1')
//       setNumber(JSON.parse(Unum))
//     }
//     else{
//       // console.log('2')
//       const Uinfo = await sanityClient.fetch(`
//       *[_type == "Userinfo" && email =='${auth.currentUser?.email}']{
//         ...,
//       }`)
//       const Unumber = JSON.stringify(Uinfo)
//       await AsyncStorage.setItem('Userinfo', Unumber)
//         setNumber(JSON.parse(Unumber))
//   }
// }
//   }
  // const getUser = async()=>{
  //   const data = await AsyncStorage.getItem('CurrentUser')
  //   console.log('come',data)
  //   if(data!=null) {
  //     setCuser(JSON.parse(data))
  //     console.log('1')
  //   }
  // }
// console.log(user)
  useEffect(()=>{
    // setTimeout(() => {   
      // console.log('auth user',auth.currentUser?.email.toLowerCase())
      // }, 2000);
      // getUser().then(
        // )
        // GetNumber()
      // if (cuser.length!=0){
      //   console.log('done',cuser)
      // }
        
    },[]);
    // if (number.length==0 ) return <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
    // console.log('Home',cuser)
    // max-w-xl m-auto
    return (
      <>
      <SafeAreaView className='flex justify-center items-center' style={SafeViewAndroid.AndroidSafeArea}>
        <View className='max-w-[390px]'>
        <ScrollView>
      <View className='flex relative justify-center items-center py-4 '
      // onTouchStart={e=> this.touchX = e.nativeEvent.pageX}
      // onTouchEnd={e => {
      //   if (this.touchX - e.nativeEvent.pageX > 20)
      //     console.log('Swiped right')
      //     navigation.navigate('Feed')
      // }}
      >
        <Image
          source={require('../assets/logosav.png')}
          className='w-full h-20 mt-3'
        />
        <View className=' flex m-3 justify-center items-center'>
        <Text className='text-lg font-semibold'>Click the button to call</Text>
        <Text className='text-lg font-semibold'>Your Saviors</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('Timer'
        // ,{alert:"SOS",emer:number[0].Emergency,
        // longitude:`${location.coords.longitude}`,
        // latitude:`${location.coords.latitude}`
      // }
        )}}
         className='mb-4 rounded-full h-44 w-44 bg-[#f67f7f69] flex justify-center items-center shadow-2xl relative'>
          <View className=' flex items-center shadow shadow-[#FF5757] justify-center rounded-full bg-[#FF5757] h-40 w-40 ' >
          {/* <TouchableOpacity className='bg-[#FF5757] absolute -top-9 -right-9 w-10  h-10 p-4 m-3 mt-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center' onPress={() => {navigation.navigate('Chat')}} >
          <ChatBubbleLeftRightIcon color='white' size={24}/>
               </TouchableOpacity> */}
            <Image
          source={require('../assets/img/notification.png')}
          className='w-1/3 h-1/3'
          /></View>
        </TouchableOpacity>

        <View className=' flex my-3 justify-center items-center'>
        <Text className='text-lg font-semibold'>Not sure what to do?</Text>
        <Text className='text- font-semibold text-gray-400'>Pick the right option</Text>
        </View>
        <SosButtons/>
      
      </View>
      </ScrollView>
      </View>
      </SafeAreaView>
      </>
    )
}

export default HomeScreen;
