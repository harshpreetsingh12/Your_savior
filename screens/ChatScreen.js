import React, { useState,useEffect } from 'react'
import { Text, View ,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {PaperAirplaneIcon} from "react-native-heroicons/outline";

const ChatScreen =()=> {
  const [search, setSearch]=useState('')
  const getsearch = ()=>{
    const data=fetch('http://www.google.com/search?q='+search);
    // console.log(data)
  }
    return (
      <SafeAreaView>
        <Text>ChatScreen</Text>
        <View className='flex items-center h-full mb-10 relative'>
        <View className='flex-row justify-center absolute left-0 bottom-20'>
        <TextInput className='rounded-lg w-80 bg-gray-300 p-3  m-1 text-lg text-black'
             placeholder='Hey there!' 
             keyboardType='default'
             value={search}
             onChangeText={text=>setSearch(text)}
             /> 
        <TouchableOpacity onPress={getsearch} className='p-3 bg-[#FF5757] rounded-full'>
        <PaperAirplaneIcon color='white' size={34}/>
        </TouchableOpacity>
             </View>
        </View>
      </SafeAreaView>
    )
}
export default ChatScreen;
