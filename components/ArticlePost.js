import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import { urlFor } from '../Sanity';
import { useNavigation } from '@react-navigation/native';
import { MapPinIcon } from "react-native-heroicons/outline";
import {FaMapMarkerAlt} from 'react-icons/fa'

const FeedCard =({
 title,Article
})=> {
  const navigation = useNavigation();

    return (
        <View className='bg-white m-2 rounded-2xl p-3 my-4 flex flex-col justify-center '>
        <Text className='py-1 font-semibold text-lg'>{title}</Text>
        <View className='border-b-2 my-2 border-gray-200 w-full'></View>
        <Text className='py-2 text-base'>{Article.slice(0,250)}...</Text>
        <TouchableOpacity   onPress={() => navigation.navigate('FullArticle',{ title,Article})} className='bg-[#FF5757] w-full py-2 my-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' title='Submit'>
              <Text className='text-center text-white text-base font-bold'>Read more</Text>
        </TouchableOpacity>
        </View>
    )
}
export default FeedCard;
