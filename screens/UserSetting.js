import React,{useEffect,useState} from 'react'
import { Text, View ,StyleSheet,ScrollView,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase';
// import SafeViewAndroid from "./SafeViewAndroid";
import { useNavigation } from '@react-navigation/native';
// import { MapPinIcon } from "react-native-heroicons/outline";
import FeedCard from '../components/FeedCard'
import sanityClient from '../Sanity';
// import {PlusIcon} from "react-native-heroicons/outline";
// import * as ImagePicker from 'expo-image-picker';
import { urlFor } from '../Sanity'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSetting =()=> {
  const navigation=useNavigation()
  const [UserFeeds, setUserFeeds]= useState([]);
  const [image,setimage]=useState('')
  const [email,setemail]=useState('')
  const [userdet,setUserdet]=useState('')

  const getUserDet = async () => {
    // console.log(auth.currentUser?.email.toLowerCase())
    const Udet = await AsyncStorage.getItem('UserDetail')
    // console.log(Udet)
    if(Udet!=null) {
      // console.log('U1')
      setUserdet(JSON.parse(Udet))
    }
    else{
      // console.log('U2')
      const Udetails = await sanityClient.fetch(`
      *[_type == "Userinfo" && email =='${auth.currentUser?.email.toLowerCase()}']{
        ...,
        }`)
        const userdett = JSON.stringify(Udetails)
        await AsyncStorage.setItem('UserDetail', userdett)
          setUserdet(JSON.parse(userdett))
    }
  }
  const getUserFeeds = async () => {
    const Ufeedss = await AsyncStorage.getItem('SUserFeeds')
    // console.log(Ufeedss)
    if(Ufeedss!=null) {
      // console.log('F1')
      setUserFeeds(JSON.parse(Ufeedss))
    }
    else{
      // console.log('F2')
      const Ufeed = await sanityClient.fetch(`
    *[_type == "userpost" && Username=='${auth.currentUser?.displayName}']{
      ...,
      }| order(_createdAt desc)`)
      const Ufeedsdata = JSON.stringify(Ufeed)
      await AsyncStorage.setItem('SUserFeeds', Ufeedsdata);
      setUserFeeds(JSON.parse(Ufeedsdata))
    }
  }
    useEffect(()=>{
     getUserDet()
     getUserFeeds()
     console.log(userdet)
    },[]);

  // const  openImagePickerAsync = async () => {    
  //  const pickerResult = await ImagePicker.launchImageLibraryAsync();
  //  setimage(pickerResult)
  // const img = await fetch(image.uri);
  //       const bytes = await img.blob();
  //       sanityClient.assets.upload('image', bytes, { filename: `${image.uri}` }).then((imageAsset) => {
  //         const doc = {
  //           _type: '...',
  //           name: '....',
  //         };
        
  //       sanityClient.patch({documentId:`${userdet[0]._id}`,
  //       image: {
  //         _type: 'image',
  //         asset: {
  //           _type: 'reference',
  //           _ref:   imageAsset._id,
  //         },
  // }}).commit().then(console.log('h'))
  //     })}
      //   sanityClient.patch(userdet[0]._id)({
      //   image: {
      //     _type: 'image',
      //     asset: {
      //       _type: 'reference',
      //       _ref:   imageAsset._id,
      //     },
      //   },}).commit()
      //   .then(console.log('h'))
      // })}
  const handleSignOut=()=>{
    AsyncStorage.removeItem('SUserFeeds');
    AsyncStorage.removeItem('UserDetail');
    AsyncStorage.removeItem('Userinfo');
    AsyncStorage.removeItem('Feeds');
    AsyncStorage.removeItem('UserFeeds');
    AsyncStorage.removeItem('Articles');
    // AsyncStorage.removeItem('CurrentUser');
    auth.signOut()
    // .then(()=>{
    // })
    .catch(error=>alert(error.message))
  }

if (userdet.length===0) return <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
// console.log(userdet[0].image,'user',userdet)
    return (
      <SafeAreaView className='flex justify-center items-center'>
      <View className='max-w-[390px]'>
      <ScrollView className='flex h-full' showsVerticalScrollIndicator={false}>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row justify-center items-center'>
          <Image
           source={require('../assets/logosav.png')}
           className='w-12 h-12 m-3'
          />
          <View>
          <Text>Hello {auth.currentUser?.displayName}</Text>
          <TouchableOpacity><Text className='text-red-400'>Complete Profile</Text></TouchableOpacity>
          </View>
        </View>
        <View className='flex'>
        <TouchableOpacity className='mx-3'><Text className='text-red-400'>See Your {'\n'}Location</Text></TouchableOpacity>
        </View>

        </View>

        <View className='flex relative w-full p-3 justify-center items-center'>
          <TouchableOpacity className='absolute top-3 left-3'><Text className='text-red-400' onPress={()=>{navigation.navigate('About')}}>About Savior{'\n'}Usage Information</Text>
          </TouchableOpacity>
          <TouchableOpacity className='absolute top-3 right-3'  onPress={handleSignOut}><Text className='text-red-400'>Sign out</Text></TouchableOpacity>
          <TouchableOpacity className='relative'>
          {/* <View className='flex absolute bottom-4 right-4 rounded-full bg-[#FF5757] z-10'> */}
        {/* <PlusIcon color='white' size={24} /> */}
          {/* </View> */}
          {(userdet[0].image != undefined) ?(
          <View>
            <Image
            source={{
              uri: urlFor(userdet[0].image).url(),
            }}
            className='w-28 h-28 m-3 rounded-full'
            />

          </View>
            ):(
             <Image
             source={require('../assets/logosav.png')}
             className='w-24 h-24 m-3 rounded-full'
             />
            )}
          </TouchableOpacity>
          <Text className='text-black text-xl'>{auth.currentUser?.displayName}</Text>

            <View className='bg-gray-200 my-3 py-3 w-96 flex'
            // key={need._id}
            >
            <View className='flex-col flex w-full'>
              <View className='w-full flex flex-row'>

            <View className='p-4 w-1/2'>
            <Text className='text-black'>Email: </Text>
            <Text className='text-black text-base font-bold'>{auth.currentUser?.email}</Text>
            </View>
            <View className='p-4 w-1/2'>
            <Text className='text-black'>Case Posted: </Text>
            <Text className='text-black text-base font-bold'>{UserFeeds.length}</Text>
            </View>
              </View>
              <View className='w-full flex flex-row'>

            </View>
            <View className='flex-row w-full'>
            <View className='p-4 w-1/2'>
            <Text className='text-black'>Emergency Num: </Text>
            <Text className='text-black text-base font-bold'>{userdet[0].Emergency.split(',').join('\n')}</Text>
            </View>
            <View className='p-4 w-1/2'>
            <Text className='text-black'>Blood Type: </Text>
            <Text className='text-black text-base font-bold'>{userdet[0].BloodGroup}</Text>
            </View>
              </View>
            </View>
          </View>
        
          </View>
          <ScrollView>
          {(UserFeeds.length===0) && <View className='flex h-full justify-center items-center'><Text>No post yet</Text></View>}
          {UserFeeds?.map(ufeeds=>(
            <FeedCard
            key={ufeeds._id} 
            id={ufeeds._id} 
            username={ufeeds.Username} 
            imgUrl={ufeeds.image} 
            title={ufeeds.title} 
            address={ufeeds.locate} 
            short_description={ufeeds.short_description} 
            date={ufeeds.Date} 
            />
            ))}
            {/* <Loader/> */}
        </ScrollView>


        {/* <Text>username-{auth.currentUser?.email}</Text>
        <Text>username-{auth.currentUser?.displayName}</Text> */}
        {/* <TouchableOpacity className='bg-[#FF5757] w-80 p-4 m-3 mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <Text className='text-center text-white text-lg font-bold'>Sign out</Text>
        </TouchableOpacity> */}

      </ScrollView>
      </View>
      </SafeAreaView>
    )
}
export default UserSetting;
