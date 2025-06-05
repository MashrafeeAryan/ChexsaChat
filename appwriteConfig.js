import { Client, Account, Databases, Storage } from 'react-native-appwrite';
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('683fd02b0026c54dde63')
    .setPlatform('com.chexsa.chat');


export const account = new Account(client)
export const usersCollectionID = "683fdcf80009e195a25a"
export const messageCollectionID = "683ff66a001554c99001"
export const chatCollectionID = "683ff4c4002083a240f2"
export const databaseID = "683fdcd30001e5f219e5"
export const databases = new Databases(client)