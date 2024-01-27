import React,{useEffect,useState} from 'react'
import { Text, View ,StyleSheet,Image,TouchableOpacity, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from "react-native-heroicons/outline";
const FullArticleScreen =()=> {
  const [loading, setloading]=useState(false)
    const navigation = useNavigation();

    const {params:{
    title,Article
    },} = useRoute();
    return (
      <SafeAreaView className='flex justify-center items-center'>
      <View className='max-w-[390px]'>
        <ScrollView>
        <View className='flex justify-center items-center py-3 relative'>
          <TouchableOpacity onPress={navigation.goBack} className='p-2 bg-gray-300 rounded-full absolute  left-4 top-4'>
        <ArrowLeftIcon color='#FF5757' size={24}/>
        </TouchableOpacity>
        <View className='relative flex justify-center items-center w-40 h-40 bg-gray-200 rounded-full'>
                <View className='flex absolute bottom-4 right-4 rounded-full bg-[#FF5757] z-10'>
          </View>
            <Image
          source={require('../assets/icon.png')}
          className='w-40 h-40 rounded-full'
          />
          </View>
      <View>
      <Text className='font-semibold text-center py-3 text-lg'>{title}</Text>
      <Text className='text-base px-3 py-2 text-left'>{Article.split('<=>').join('\n')}</Text>
      </View>
          </View>
          </ScrollView>
          </View>
      </SafeAreaView>
    )
}
export default FullArticleScreen;
