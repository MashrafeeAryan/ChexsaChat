import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { account } from '@/appwriteConfig';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = () => {
    const route = useRouter()
    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            route.replace("/(auth)/login");
            console.log("Logged out successfully!");
        } catch (error) {
            console.log("Logout Failed");
        }
        };
  return (
    <SafeAreaView>
        <View>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
   
  )
}

export default profile