import React, { useState,useEffect } from 'react'
import { Text, View ,Image,StyleSheet, TextInput,Button,TouchableOpacity, ScrollView,ActivityIndicator,SafeAreaView} from 'react-native'
import useAuth from '../hooks/useAuth';
import SafeViewAndroid from "./SafeViewAndroid";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-hook-form';
import sanityClient from '../Sanity';
import * as ImagePicker from 'expo-image-picker';
import {PlusIcon,PhoneIcon, UserIcon, InboxStackIcon,AtSymbolIcon ,LockClosedIcon,EyeIcon, EyeSlashIcon} from "react-native-heroicons/outline";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen =()=> {
// const { user } = useAuth();
const navigation=useNavigation()
const [sign, setSign]=useState('Log')
const [email, setEmail]=useState('')
const [image,setimage]=useState('')
const [bgroup,setbgroup]=useState('')
const [emergency,setemergency]=useState('')
const [password, setPassword]=useState('')
const [username, setUsername]=useState('')
const [emergencynum, setEmergencynum]=useState()
const [signup, setsignup]=useState(false)
const [loading, setloading]=useState(false)
const [showpass, setshowpass]=useState(true)
const [send, setSend]=useState(true)
// useEffect(()=>{
//   const unsub=auth.onAuthStateChanged(user=>{
//     if (user){
//       navigation.navigate('home')
//     }
//     // console.log(email.toLowerCase())
// })
//   return unsub;
// },[])
// useEffect(()=>{
//   const det =  AsyncStorage.getItem('SUserFeeds')
//   const Udet =  AsyncStorage.getItem('UserFeeds')
//   const Udett =  AsyncStorage.getItem('Feeds')
//   console.log(det)
//   console.log(Udet)
//   console.log(Udett)
// },[])
const  openImagePickerAsync = async () => {    
  const pickerResult = await ImagePicker.launchImageLibraryAsync();
 //  console.log(pickerResult);
  setimage(pickerResult)
}
function getCountOfDigits(str) {
  return str.replace(/[^0-9]/g, '').length;
}
function getCountOfCharacters(str) {
  return str.replace(/[^a-z]/g, '').length;
}
function getCountOfSpecialCharacters(str) {
 let num=str.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
  if (num==null){
return 0;
}
 return num.length;
}
function getBloodType(str) {
 const bg=['A+','A-', 'B+', 'B-', 'AB+', 'AB-','O+','O-']
 let ur=bg.includes(str)
 return ur;
}
function getPhoneValid(str) {
 const bg=['A+','A-', 'B+', 'B-', 'AB+', 'AB-','O+','O-']
 let ur=bg.includes(str)
 return ur;
}
const handleSignUp= async ()=>{
  console.log(typeof(parseInt(emergencynum)))
  if (image==='' || image.cancelled==true) return alert('You must upload a profile picture as it is ')
  if (getCountOfCharacters(username) <1 || getCountOfDigits(username)<1 || username.length<6) return alert('Your username must contain lenght of minimum 6 characters, 1 digit and 1 character')
  if (getCountOfDigits(password) <1 || password.length<8 || getCountOfSpecialCharacters(password) <1) return alert('Your pass must have: \n 1:Lenght of minimum 8 characters \n 2:Contain atleast 1 speacial character and a digit')
  if (emergency.length !=10 || getCountOfCharacters(emergency) !=0) return alert('Please provide a valid phone number')
  if (getBloodType(bgroup)!=true || 2>bgroup.length>3) return alert('Give a valid blood type Or try inserting in capital letters \neg: B+')

  
  setloading(true)
  setSend(true)
  const img = await fetch(image.uri);
  const bytes = await img.blob();
  sanityClient.assets.upload('image', bytes, { filename: `${image.uri}` }).then((imageAsset) => {
    const doc = {
      _type: '...',
      name: '....',
    };
  createUserWithEmailAndPassword(auth,email,password)
  .then(userCredentials=>{
    userCredentials.user.updateProfile({
      displayName:username,
      phoneNumber:"8630228697"
    })
    // AsyncStorage.removeItem('SUserFeeds');
    // AsyncStorage.removeItem('UserDetail');
    // AsyncStorage.removeItem('Userinfo');
  })
  .catch(error => {alert(error.message),setloading(false),setSend(false)})
  if(send==true){
  sanityClient.create({_type:"Userinfo", email:`${email.toLowerCase()}`,
  Emergency:`${emergency}`,
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref:   imageAsset._id,
    },
  },
  BloodGroup:`${bgroup}`,})}
})}

const handleLogIn=(event)=>{
  setloading(true)
  event.preventDefault();
  signInWithEmailAndPassword(auth, email,password)
  .then(userCredentials=>{
    const user = userCredentials.user
  })
  .catch(error => {alert(error.message),setloading(false)})
}
    return (
      <View className='flex-1 bg-white justify-center items-center' >
      {(sign == 'Log') ?(
        <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <View className='w-full flex justify-center'>
         {(loading) ?(
          <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
         ):(
          <View>
           <Image
          source={require('../assets/logosav.png')}
          className='w-full h-20 mb-3'
          />
            <Text className='text-black p-3 text-3xl font-bold mx-3'>Login</Text>
           <View className='flex-row items-center justify-center my-3 rounded-lg'>
             <AtSymbolIcon color='#FF5757' size={24}/>
             <View className='flex-row border-b-2 border-gray-400 justify-center items-center'>
        <TextInput className='rounded-lg  w-80 bg-white p-2 m-1 text-lg text-black'
             placeholder='Email' 
             value={email}
             onChangeText={text=>setEmail(text)}
             /> 
             </View>
            </View>
        <View className='flex-row items-center justify-center my-3'>
        <LockClosedIcon color='#FF5757' size={24}/>
        <View className='flex-row border-b-2 border-gray-400 rounded-lg justify-center items-center'>
            <TextInput className='rounded-lg w-72 bg-white  p-2 m-1 text-lg text-black'
             placeholder='password' 
             keyboardType='default'
             value={password}
             onChangeText={text=>setPassword(text)}
             secureTextEntry={showpass}
             /> 
             <TouchableOpacity onPress={()=>{setshowpass(!showpass)}}>
             {(showpass) ?(
               <EyeSlashIcon color='#FF5757' size={28}/>
             ):(
        <EyeIcon color='#FF5757' size={28}/>
             )}
             </TouchableOpacity>
        </View>
        </View>
        <View className='flex-col justify-center items-center'>
              <TouchableOpacity className='bg-[#FF5757] w-80 p-4 m-3 mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' onPress={handleLogIn}>
               <Text className='text-center text-white text-lg font-bold'>Log in</Text>
               </TouchableOpacity>
               <View className='border-b-2 h-1 rounded-lg my-5 border-gray-400 relative w-80 justify-center items-center'>
                <Text className='absolute bg-white w-8 m-auto text-center'>OR</Text>
                </View>
                <TouchableOpacity className='bg-gray-100 w-80 p-4 m-3 mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center flex-row'>
                <Image
          source={require('../assets/img/google.png')}
          className='w-8 h-8 mr-5'
          />
               <Text className='text-center ml-2 text-black text-lg'>Login with Google</Text>
               </TouchableOpacity>
                <View className='flex-row'>
               <Text className='text-black mx-1 text-lg'>New to Savior? </Text>
               <TouchableOpacity className='px-1' onPress={()=>{setSign('Sign')}}>
                 <Text className='text-[#FF5757] text-lg'>Sign Up</Text></TouchableOpacity>
               </View>
               </View>
               </View>
               )}
            </View>
            </ScrollView>
            ):(
    
              <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}>
              <View className='flex justify-center mt-4'>
              {(loading) ?(
          <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
         ):(
          <View>
              {/* <Image
          source={require('../assets/logosav.png')}
          className='w-full h-20 mb-3'
          /> */}
              <Text className='text-black p-3 text-4xl font-bold w-96'>Sign in</Text>

               <TouchableOpacity className='w-96 flex justify-center items-center' onPress={openImagePickerAsync}>

           {(image==='' || image.cancelled==true)?(
              <View className='relative flex justify-center items-center h-40 w-40 p-2 rounded-full bg-gray-200'>
              <View className='bg-gray-200 rounded-full'>
          <UserIcon color='black' size={34}/>
          </View>
          <View className='flex absolute bottom-4 right-4 rounded-full bg-[#FF5757] z-10'>
        <PlusIcon color='white' size={24} />
          </View>
            </View>
            ):(
              <View className='relative flex justify-center items-center w-40 h-40 bg-gray-200 rounded-full'>
                <View className='flex absolute bottom-4 right-4 rounded-full bg-[#FF5757] z-10'>
        <PlusIcon color='white' size={24} />
          </View>
            <Image
            source={{
              uri: `${image.uri}`,
              }}
              className='w-40 h-40 rounded-full'
              />
              </View>
              )}
          </TouchableOpacity>

        <View className='flex-row items-center justify-center my-3 w-full'>
             <AtSymbolIcon color='#FF5757' size={24}/>
        <TextInput className='rounded-lg  w-80 bg-white p-2 m-1 border-b-2 border-gray-400 text-lg text-black'
             placeholder='Email' 
             value={email}
             onChangeText={text=>setEmail(text)}
             /> 
            </View>
            <View className='flex-row items-center justify-center my-3 w-96'>
        <LockClosedIcon color='#FF5757' size={24}/>
        <View className='flex-row border-b-2 border-gray-400 rounded-lg justify-center items-center'>
            <TextInput className='rounded-lg  w-72 bg-whitep-2 m-1 px-1 text-lg text-black'
             placeholder='password' 
             keyboardType='default'
             value={password}
             onChangeText={text=>setPassword(text)}
             secureTextEntry={showpass}
             /> 
             <TouchableOpacity onPress={()=>{setshowpass(!showpass)}}>
             {(showpass) ?(
               <EyeSlashIcon color='#FF5757' size={28}/>
             ):(
        <EyeIcon color='#FF5757' size={28}/>
             )}
             </TouchableOpacity>
             </View>
             </View>
       
        <View className='flex-row items-center justify-center my-3 w-96'>
        <UserIcon color='#FF5757' size={24}/>
            <TextInput className='rounded-lg  w-80 bg-white border-b-2 border-gray-400 p-2 m-1 text-lg text-black'
             placeholder='username' 
             value={username}
             onChangeText={text=>setUsername(text)}
             /> 
        </View>
        <View className='flex-row items-center justify-center my-3 w-96'>
        <PhoneIcon color='#FF5757' size={24}/>
            <TextInput className='rounded-lg  w-80 bg-white border-b-2 border-gray-400 p-2 m-1 text-lg text-black'
             placeholder='Phone Number' 
             value={emergency}
             onChangeText={text=>setemergency(text)}
             /> 
        </View>
        <View className='flex-row items-center justify-center my-3 w-96'>
        <InboxStackIcon color='#FF5757' size={24}/>
            <TextInput className='rounded-lg  w-80 bg-white border-b-2 border-gray-400 p-2 m-1 text-lg text-black'
          placeholder='Blood group ' 
          value={bgroup}
          onChangeText={text=>setbgroup(text)}
             /> 
        </View>
        <View className='flex-row items-center justify-center my-3 w-96'>
        <PhoneIcon color='#FF5757' size={24}/>
            <TextInput className='rounded-lg  w-80 bg-white border-b-2 border-gray-400 p-2 m-1 text-lg text-black'
          placeholder='SOS Numbers [Max 2]' 
          value={emergencynum}
          onChangeText={text=>setEmergencynum(text)}
             /> 
        </View>

             <View className='flex-col items-center'>
               <TouchableOpacity className='bg-[#FF5757] w-80 p-4 m-1 mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' onPress={handleSignUp}>
                <Text className='text-center text-white text-lg font-bold'>Sign up</Text>
                </TouchableOpacity>
                <View className='flex-row'>
               <Text className='text-black mx-1 text-lg'>Joined us before? </Text>
               <TouchableOpacity className='px-1' onPress={()=>{setSign('Log')}}>
                 <Text className='text-[#FF5757] text-lg'>Login</Text></TouchableOpacity>
               </View>
              </View>
         </View>
         )}
              </View>
              </ScrollView>
          )}
    
      </View>
    )
    }
export default LoginScreen;
