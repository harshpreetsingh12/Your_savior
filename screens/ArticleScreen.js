import React,{useState,useEffect} from 'react'
import { Text, View ,StyleSheet,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticlePost from '../components/ArticlePost'
import { SafeAreaView } from 'react-native-safe-area-context'
import sanityClient from '../Sanity';
// import Geolocation from 'react-native-geolocation-service';
const ArticleScreen =()=> {
  const [articles, setArticles]= useState([]);
  const navigation = useNavigation();
  const getArticle = async () => {
    const Arc = await AsyncStorage.getItem('Articles')
    // console.log(Arc)
    if(Arc!=null) {
      // console.log('1')
      setArticles(JSON.parse(Arc))
    }
    else{
      // console.log('2')
      const UArc = await sanityClient.fetch(`
      *[_type == "Articles"]{
        ...,
        }| order(_createdAt desc)`)
      const SavArc = JSON.stringify(UArc)
      await AsyncStorage.setItem('Articles', SavArc)
        setArticles(JSON.parse(SavArc))
    }
  }
  useEffect(()=>{
  getArticle()
  },[]);
  if (articles.length===0) return <View className='flex h-full justify-center items-center'><ActivityIndicator size="large" color="#FF5757" /></View>
  // console.log(articles)
//   AsyncStorage.getItem("myKey").then((value) => {
//     this.setState({"myKey": value});
// }).done();
  return (
    <SafeAreaView className='bg-white flex justify-center items-center'>
    <View className='max-w-[390px]'>
        <View className='flex-col items-center justify-centerw-full h-full'>
               <Text className='text-lg py-3 w-full text-center border-b-2 border-gray-200'>Savior Rights</Text>
               {/* <Text className='text-lg py-1 w-full text-center border-b-2 border-gray-200'>These are your rights as a citizen of</Text> */}
               <ScrollView  showsVerticalScrollIndicator={false} className='bg-gray-200'>
                  {articles?.map(art=>(
               <ArticlePost
               key={art._id} 
               title={art.title} 
               Article={art.Article} 
               />
            ))}
            </ScrollView>
           </View>
           </View>
      </SafeAreaView>
    )
}
export default ArticleScreen;
