import React,{useState,useEffect} from 'react'
import { Text, View,Image ,StyleSheet,ScrollView,TextInput,ActivityIndicator,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SafeViewAndroid from "./SafeViewAndroid";
// import MapView,{Marker} from "react-native-maps";
import {UserIcon,MapPinIcon} from "react-native-heroicons/outline";
// import Geolocation from 'react-native-geolocation-service';
import {PlusIcon, GlobeAsiaAustraliaIcon} from "react-native-heroicons/outline";
import * as Location from 'expo-location';
// import { LatLng, LeafletView } from 'react-native-leaflet-view';

const MapScreen =()=> {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  // const getLocation=()=>{
  //   (async () => {
  //         let { status } = await Location.requestForegroundPermissionsAsync();
  //         if (status !== 'granted') {
  //           setErrorMsg('Permission to access location was denied');
  //           return;
  //         }
  //         let location = await Location.getCurrentPositionAsync({});
  //         setLocation(location);
  //         setLongitude(location.coords.latitude);
  //         setLatitude(location.coords.longitude);
  //       })();
  // }
  // useEffect(() => {
  //  
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  // if (!location) return <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
  // const longitude=parseFloat(location.coords.longitude);
  // const latitude=parseFloat(location.coords.latitude)
  // console.log(longitude , latitude)


  return (
    <SafeAreaView className='flex justify-center items-center relative'>

    <View className='max-w-[390px] min-w-[390px]'>
        <View className='flex-col items-center justify-center space-x-1 w-full p-2 pb-2'>
        <TouchableOpacity className='z-50 absolute -bottom-14 right-5 p-2 bg-[#FF5757] rounded-full'>
        <GlobeAsiaAustraliaIcon color='white' size={34}/>
        </TouchableOpacity>
          <Text className='text-lg mb-2'>Savior Maps</Text>
            <View className='bg-gray-200 flex-row w-[96%] rounded-xl space-x-2 p-2 md:w-80'>
              <MapPinIcon color='gray' size={25}/>
               <TextInput className=''
             placeholder='Search Locations' 
              keyboardType='default'/>
            </View>
           </View>
           {/* {!location && 
           } */}
           {/* {latitude.length!=0 && */}
      {/* // } */}
      <View>
      <Image
           source={require('../assets/mapbg.png')}
           className='w-full h-full'
          />
      </View>
      {/* {(location !=null) ?(
        <MapView
        initialRegion={{
          latitude:{latitude},
          longitude:{longitude},
          latitudeDelta:0.005,
          longitudeDelta:0.005,
      }}
      className='flex-1 justify-center items-center h-full w-full'
        >
  <Marker coordinate = {{latitude:{latitude},longitude:{longitude}}}
         pinColor = {"red"} // any color
         title={"Your Location"}
         description={""}/>
        </MapView>
      ):(
        <MapView
           initialRegion={{
        latitude:30.3048857,
        longitude:78.0186468,
        latitudeDelta:0.005,
        longitudeDelta:0.005,
    }}
    className='flex-1 justify-center items-center h-full w-full'
    >
      <Marker coordinate = {{latitude:30.3048857,longitude:78.0186468}}
         pinColor = {"red"} // any color
         title={"Your Location"}
         description={""}/>
    </MapView>
 )} */}
 </View>
      </SafeAreaView>
    )
}
export default MapScreen;
