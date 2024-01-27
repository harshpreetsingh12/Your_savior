import React, {useState,useEffect} from 'react'
import { Text, View ,StyleSheet,TextInput,Button,TouchableOpacity, ScrollView, Platform,Image,
  ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase';
import {useForm, SubmitHandler,Controller} from 'react-hook-form'
import sanityClient from '../Sanity';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ArrowLeftIcon} from "react-native-heroicons/outline";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import {PlusIcon, PhotoIcon} from "react-native-heroicons/outline";

const NewPost =()=> {
  const [send, setSend]=useState(true)
  const navigation = useNavigation();
  const [title,setTitle]=useState('')
  const [locate,setLocation]=useState('')
 const [Datee,setDate]=useState('')
 const [image,setimage]=useState('')
 const [short_description,setDescription]=useState('')
 const [posted,setposted]=useState(false)
 const [loading,setloading]=useState(false)

 useEffect(()=>{
  let now = new Date();
  setDate(`${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`)
},[]);
 const  openImagePickerAsync = async () => {    
   const pickerResult = await ImagePicker.launchImageLibraryAsync();
  //  console.log(pickerResult);
   setimage(pickerResult)
 }
 function countString(str, letter) {
  const re = new RegExp(letter, 'g');
  const count = str.match(re).length;
  return count+1;
}
const onSubmit = async data => {
  if (title.length==0){
     return alert('Set a valid title for your story')
    }
  // if (countString(short_description, ' ')<20){
  //    setloading(false) 
  //    return alert('Your storie must contain 20 words')
  //   }
  
  setloading(true)
  setSend(true)
  const img = await fetch(image.uri);
      const bytes = await img.blob();
      sanityClient.assets.upload('image', bytes, { filename: `${image.uri}` }).then((imageAsset) => {
        const doc = {
          _type: '...',
          name: '....',
        };
  // console.log(imageAsset)
    let Username =`${auth.currentUser?.displayName}`
  if (send==true){
    sanityClient.create({_type:"userpost", Username:`${Username}`,
    title:`${title}`,
    locate:`${locate}`,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref:   imageAsset._id,
      },
    },
    Date:`${Datee}`,
    blockPost:true,
    short_description:`${short_description}`})
    .then(setposted(true),    
    setposted(true),
    setDate(''),
    setDescription(''),
    setLocation(''),
    setimage(''),
    setTitle(''))
    setloading(false);
    //     .commit();
    setTimeout(function(){
      navigation.navigate('Feed')
      setposted(false);
 }.bind(this),8000);
 
      }
    }
)}
    return ( 
      <SafeAreaView className='flex justify-center items-center'>
      <View className='max-w-[390px]'>
       <ScrollView >
        <View className='flex h-full w-full items-center'>
        {posted &&
        <View className='bg-[#FF5757] w-96 rounded-lg h-32 flex justify-center items-center'>
          <Text className='text-white text-center p-2 '>Congratulations {'\n'}
            Your Post has been successfully added, it will be on the feed wall once it is approved by
            </Text>
          <Text className='text-white text-lg'>
          Your savior's
            </Text>
        </View>
         } 
         <View className='flex-row p-3 w-full justify-between items-center'>
          <View className='flex-row justify-center items-center'>
        <TouchableOpacity onPress={navigation.goBack} className='p-2 bg-gray-200 rounded-full'>
        <ArrowLeftIcon color='#FF5757' size={24}/>
        </TouchableOpacity>
        <Text className='text-base text-black mx-2'>New Post</Text>
          </View>
        <TouchableOpacity className='bg-[#FF5757] w-24 p-2 m-3 mt-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' title='Submit' onPress={onSubmit}>
               <Text className='text-center text-white text-base font-bold'>Post</Text>
               </TouchableOpacity>
         </View>
        {loading!=true ?( 
          <View className='w-full items-center'>
          {/* <Text className='text-lg mb-4'>Post your own storie to Your Savior</Text> */}
          <TouchableOpacity 
             onPress={openImagePickerAsync}
            //  onPress={() => captureImage('photo')}
             >
            <View className='flex justify-center items-center w-96 my-3'>
            {(image==='' || image.cancelled==true)?(
              <View className='flex justify-center items-center h-44 w-96 p-2 rounded-lg bg-red-200'>
                <View className=' rounded-full'>
            <PhotoIcon color='red' size={34}/>
            </View>
              </View>
            ):(
              <View className='flex justify-center items-center w-96 px-4'>
            <Image
        source={{
          uri: `${image.uri}`,
        }}
          className='w-full h-52 rounded-lg'
        />
        </View>
        )}

             </View>
             </TouchableOpacity>
            <View className=' border-b-2 border-gray-300 rounded-lg w-96'>
            {/* <Text className='text-black px-1 mx-2 text-lg font-bold'>
              Title
            </Text> */}
        <TextInput className='rounded-lg text-semibold w-96 px-4 my-2 h-14 text-lg text-black'
              placeholder='Title' 
              onChangeText={value => setTitle(value)}
              value={title}
              multiline = {true}
              // numberOfLines = {2}
             /> 
             </View>
             
             <View className='border-b-2 border-gray-300 w-96 rounded-sm '>
        <TextInput className='rounded-lg w-96 px-4 my-2 text-lg text-black'
             placeholder='Post Description' 
             onChangeText={value => setDescription(value)}
             value={short_description}
             multiline = {true}
             numberOfLines = {8}
             style={{textAlignVertical: 'top',}}
             /> 
          </View>

          <View className='border-b-2 border-gray-300 w-96 rounded-sm'>
        <TextInput className='rounded-lg h-14 w-96 px-4 my-2 text-lg text-black'
             placeholder='Location' 
             onChangeText={value => setLocation(value)}
             value={locate}
             multiline = {true}

             />
             </View>

             <View className='border-b-2 border-gray-300 w-96 rounded-sm '>
        {/* <TextInput className='rounded-lg  w-96 px-4 m-2 text-lg text-black h-14'
             placeholder='eg-20-09-2022' 
             onChangeText={value => setDate(value)}
             value={Datee}
             multiline = {true}
            //  numberOfLines = {2}
             />  */}
             <Text className='rounded-lg  w-96 px-4 my-2 text-lg text-black py-4'>{Datee}</Text>
             </View>

             <View >
             </View>

            </View>
        ):(
          <View className='flex h-96 justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
        )}
            </View>
      </ScrollView> 
            </View>
        </SafeAreaView>
    )
}
export default NewPost;
