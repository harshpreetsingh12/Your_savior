import {React,useLayoutEffect,useEffect, useState} from 'react'
import { Text, View ,StyleSheet,Image,TouchableOpacity,ScrollView,ActivityIndicator,TextInput} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { urlFor } from '../Sanity'
// import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase';
import {ArrowLeftIcon,ArrowPathIcon} from "react-native-heroicons/outline";
import sanityClient from '../Sanity';
import {PaperAirplaneIcon, Bars3BottomLeftIcon, ChatBubbleLeftIcon} from "react-native-heroicons/outline";
import Comment from '../components/Comment'
import { SafeAreaView } from 'react-native-safe-area-context'

const PostScreen =()=> {
    const {params:{
        id,username,imgUrl,title,address,short_description,date, commentTabOpen,
      },} = useRoute();
      const navigation = useNavigation();
      const [comment, setComment]=useState([]);
      const [postcom, setpostCom]=useState([]);
      const [counter, setCounter] = useState(10);
      const [donecom, setDoneCom]=useState(false);
      const [commentsTab, setCommentsTab]=useState(commentTabOpen);
      useLayoutEffect(()=>{
        navigation.setOptions({
          headerShown:false,
        })
      },[])
      const getComment =() =>{
        sanityClient.fetch(`
        *[_type == "comment" && (Userpost._ref=='${id}')]{
          ...,
      }| order(_createdAt desc)`).then((data) =>{
        setComment(data);
        // console.log(data)
      });
      // console.log('getcom')
      }
      useEffect(()=>{
       getComment()
    },[]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
    const postComment = async data => {
      if (postcom.length==0) return alert('Comment should atleast containt one character')
      let now = new Date();
      let nowdate=`${monthNames[now.getMonth()]} ${now.getDate()} at ${now.getHours()}:${now.getMinutes()}`
      let Username =`${auth.currentUser?.displayName}`
      sanityClient.create({_type:"comment", username:`${Username}`,
      comment:`${postcom}`,
      datee:`${nowdate}`,
      Userpost: {
        // _type: 'image',
        _ref:`${id}`,
        _type:'reference'
      },
      //     .commit();
    }
    ).then([setpostCom('')])
    setDoneCom(true)
    // console.log('done')
    setTimeout(function(){
      setDoneCom(false);
      getComment();
 }.bind(this),10000);
    // console.log(donecom,counter)
  }
  const PlaySound=()=>{
    console.log("pla")
  }
    return (
      <SafeAreaView className='flex justify-center items-center'>
      <View className='max-w-[390px] min-w-[390px]'>
       <ScrollView className='flex bg-white' showsVerticalScrollIndicator={false}
       >
        <View className='relative'>
        {(imgUrl == undefined) ?(
              <Image
              source={require('../assets/logosav.png')}
              className='w-full h-56 bg-gray-300 p-4 relative'
              />
          ):(
            <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-300 p-4 relative'
              />
            )}

        {/* <Text className='absolute -bottom-5 right-0 mr-2 text-sm text-black bg-[#f1f1f1] rounded-sm'>{date}</Text> */}
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-10 left-5 p-2 bg-gray-100 rounded-full'>
        <ArrowLeftIcon color='#FF5757' size={24}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{getComment()}} className='absolute top-10 right-5 p-2 bg-gray-100 rounded-full'>
        <ArrowPathIcon color='#FF5757' size={24}/>
        </TouchableOpacity>
        </View>
        <View className='flex flex-row justify-between px-2'>
        <Text className='ml-2 text-sm'>{address}</Text>
        <Text className='mr-2 text-sm text-black rounded-sm'>{date}</Text>
        </View>
        <View>
          <View className='flex justify-center items-center px-2 mt-2'>
        <Text className='text-sm text-center'>{title}</Text>
        {/* <Text className='text-sm'>{username}</Text> */}
        </View>
        <View className='flex justify-between flex-row p-3'>
        <Text className='text-black text-base'>
           <Text className='font-semibold'>{username}</Text>
        </Text>
        <TouchableOpacity className='px-2' onPress={()=>{setCommentsTab(!commentsTab)}} >
        {!commentsTab ?
        <View className='flex flex-row gap-2'>
        <ChatBubbleLeftIcon color='#FF5757' size={24} />
          {/* <Text className='text-black text-sm text-center font-bold'>
          Comments 
          </Text> */}
          </View>
          :
          <View className='flex flex-row gap-2'>
        <Bars3BottomLeftIcon color='#FF5757' size={24}/>
          {/* <Text className='text-black text-sm text-center font-bold'>
          Read
          </Text> */}
        </View>
        }
        </TouchableOpacity>
        </View>
        <View className=''>
          {!commentsTab ?
          <Text className='p-3 text-[16px] leading-6'>{short_description.split('<=>').join('\n')}</Text>
          :
        <View className='flex items-center justify-between '>
        {/* <Text className='text-xl'>Comments</Text> */}
        <View className='flex flex-col w-full items-center relative '>
          <View className='w-[96%] relative my-3'>
        <TextInput className='border-[2px] rounded-full border-gray-300 py-1 my-2w-full px-4 text-md text-black'
             placeholder='Add Comment' 
             keyboardType='default'
             value={postcom}
             onChangeText={text=>setpostCom(text)}
        /> 
            <TouchableOpacity onPress={postComment} className='flex justify-center items-center py-2 absolute -right-3 h-full w-16 mx-3 bg-red-400 rounded-full rounded-l-lg'>
        <Text className='text-white'>Post</Text>
        </TouchableOpacity>
            </View>
    
        {(donecom==true) &&
        <View className='bg-red-400 w-full h-12 my-3 rounded-lg'>
          <Text className='text-white m-1 text-center py-1'>Your Comment is successfully added. It will show up in comment section in 1 to 2 minutes.</Text>
          </View>}
          {(comment.length !=0) ?(

          <View className='w-full p-4 mb-10'>
          <ScrollView  contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
          {comment?.map(ucom=>(
            <Comment
            key={ucom._id} 
            id={ucom._id} 
            username={ucom.username} 
            comment={ucom.comment}
            datee={ucom.datee}
            />
            ))}
            
        </ScrollView>
        </View>
        
          ):(
            <View className='w-full p-4'>
              <Text className='text-base'>
                No comments yet !! Be the First one
              </Text>
              </View>
          )}
          </View>
        </View>
        }
        </View>

        
        </View>
      
       </ScrollView>
       </View>
      </SafeAreaView> 
    )
}
export default PostScreen;
