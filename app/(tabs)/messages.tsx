import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account, databaseID, databases, messageCollectionID } from '@/appwriteConfig'
import { ID } from 'react-native-appwrite'

const messages = () => {
    const [userID, setUserID] = useState("")
    useEffect(()=>{
        handleGetUserData()
    },[])
    const handleGetUserData = async() => {
        const user = await account.get()
        setUserID(user.$id)
    }
    const handleMessages = async () => {
           const messageID = ID.unique()
           const newMessage = await databases.createDocument(
                databaseID,
                messageCollectionID, 
                messageID, 
                {
                    chatId: "chatXY",

                    
                }
           )
    }

    
    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder='Enter message'></TextInput>
                <TouchableOpacity onPress={handleMessages}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default messages