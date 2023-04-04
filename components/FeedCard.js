import React,{useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import { urlFor } from '../Sanity';
import { useNavigation } from '@react-navigation/native';
import { MapPinIcon } from "react-native-heroicons/outline";
// import {FaMapMarkerAlt} from 'react-icons/fa'
import {ShareIcon, ArrowPathRoundedSquareIcon ,HandRaisedIcon} from "react-native-heroicons/solid";
import {ChatBubbleBottomCenterIcon, HeartIcon} from "react-native-heroicons/outline";
import sanityClient from '../Sanity';

const FeedCard =({
  id,username,imgUrl,title,address,short_description,date
})=> {
  // console.log(title,blockPost)
  const navigation = useNavigation();
  const [comment, setComment]=useState([]);
  const [liked, setLiked]=useState(false);
  // useEffect(()=>{
  //   sanityClient.fetch(`
  //   *[_type == "Userinfo" && Username=='${auth.currentUser?.displayName}']{
  //     ...,
  //     }| order(_createdAt desc)`).then((data) =>{
  //       setUserFeeds(data);
  //   })
  //  },[]);
  useEffect(()=>{
    sanityClient.fetch(`
    *[_type == "comment" && (Userpost._ref=='${id}')]{
      ...,
  }| order(_createdAt desc)`).then((data) =>{
    setComment(data);
  });
},[]);

// console.log(title)
    return (
      <View
      className='border-[2px] border-gray-300 mr-3 shadow w-full mb-3 p-2 '>
          <View className='px-2 pb-3'>
          <View className='flex-row justify-between'>
          <View className='flex-row'>
          <Image
          source={require('../assets/smalllogo.png')}
    className='h-10 w-10 bg-gray-300 mr-2 my-1 rounded-full'/>
            <View>
              <Text className='font-bold text-ld pt-2'>{username}</Text>
              <Text className='font-bold text-ld pt-1'>{date}</Text>
            </View>
          </View>
          <View className='flex-row justify-center items-center space-x-1'>
          <MapPinIcon color='black' size={20}/>
          <Text className='text-ld pt-2 flex justify-center items-center'>{address}</Text>
          </View>
          </View>
          <View className='flex-row items-center space-x-1'>
                  {/* <Text className='text-xm text-black-500 my-1'>
                      <Text className='text-[black]'>{title.slice(0,30)}...</Text>
                  </Text> */}
              </View>
              <View className='flex space-x-1 py-3 relative'>
                  <Text className='text-sm text-gray-500'>{title.slice(0,50)}...
                  </Text>
                  <TouchableOpacity className='absolute right-0 -bottom-2'
                    onPress={() => navigation.navigate('Post',{id,imgUrl,username,title,address,short_description,date})}
                  ><Text className='text-[#FF5757]'>Read Full</Text></TouchableOpacity>
                  {/* <Text className='text-sm text-gray-500'>{short_description.slice(0,80)}...</Text> */}
              </View>
          </View>
          {(imgUrl == undefined) ?(
            <TouchableOpacity onPress={() => navigation.navigate('Post',{id,imgUrl,username,title,address,short_description,date})}>
              
              <Image
              source={require('../assets/logosav.png')}
              className='h-44 rounded-sm w-full'
              />
              </TouchableOpacity>
          ):(
            <TouchableOpacity onPress={() => navigation.navigate('Post',{id,imgUrl,username,title,address,short_description,date})}>
            <Image
            onPress={() => navigation.navigate('Post',{id,imgUrl,username,title,address,short_description,date})}
            source={{
              uri: urlFor(imgUrl).url(),
            }}
              className='h-44 rounded-sm w-full'
              />
              </TouchableOpacity>
            )}
            <View className='flex flex-row justify-around w-full pt-2 px-1'>

            <TouchableOpacity
              className='flex justify-center items-center'>
                <HeartIcon  color='black' backgroundColor="#FF5757" size={24} onPress={()=>{setLiked(!liked)}}/>
              <Text className='text-sm'>Like</Text>
              </TouchableOpacity>
            <TouchableOpacity
              className='flex justify-center items-center'>
                <ShareIcon  color='black' backgroundColor="#FF5757" size={24}/>
              <Text className='text-sm'>Share</Text>
              </TouchableOpacity>
            <TouchableOpacity
              className='flex justify-center items-center'>
                <ArrowPathRoundedSquareIcon  color='black' backgroundColor="#FF5757" size={24} />
              <Text className='text-sm'>Repost</Text>
              </TouchableOpacity>
            

              <TouchableOpacity
              className='flex justify-center items-center'
               onPress={() => navigation.navigate('Post',{id,imgUrl,username,title,address,short_description,date, commentTabOpen:true})}>
              <ChatBubbleBottomCenterIcon  color='black' size={24}/>
              <Text className='text-sm'>Comment</Text>
              </TouchableOpacity>
            </View>
            {/* <View className='flex flex-row w-full py-2 relative'>
            {(comment.length !=0) ?(
              
          <View className=''>
         <Text className='text-base'>{comment[0].comment}</Text>
        </View>
        
          ):(
            <View className='w-full'>
              <Text className='text-base'>
                No comments yet !!
              </Text>
              </View>
          )}
          <View className='absolute right-0 top-2' >
          <ChatBubbleBottomCenterIcon color='#FF5757' size={24}/>
          </View>
          </View> */}
            
      </View>
    )
}
export default FeedCard;
