import { useState } from "react";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, useRouter } from "expo-router";
import {account, databaseID, databases, usersCollectionID} from "../../appwriteConfig"
import { ID } from "react-native-appwrite";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message'

export default function signUP() {
  const [passwordVisible, passwordVisibilityChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const route = useRouter()
  const handleSignUp = async() => {
    const userID = ID.unique()
    try{
      await account.create(userID, userEmail, userPassword, userName)
      const user =await databases.createDocument(
        databaseID,
        usersCollectionID,
        userID,
        {name: userName,
         email: userEmail,
         userID: userID
        }
      )

      const session = await account.createEmailPasswordSession(userEmail, userPassword)
      
      console.log("Account Successfully Created", user)
      Toast.show({
        type: 'success',
        text1: 'Account Successfully Created'
      })
      route.replace("/(tabs)")

    } catch(error) {
      console.log("Failed:", error)
      Toast.show({
        type: 'error',
        text1: 'Account creation failed',
        text2: 'Try again sometime later'
      })
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-[#A9D3F4] h-full flex-1">
        <View className="items-center justify-center flex pt-6">
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-[170] h-[170]"
          />

        </View>
        <View
          className="bg-[#EAF6FF] h-3/4 absolute bottom-0 left-0 right-0 mx-2 p-6"
          style={{ borderRadius: 55 }}
        >
          <View className="pt-4">
            <TextInput
              placeholder="Full Name"
              className="border rounded-lg w-full border-[#A9D3F4] px-3 h-[50]"
              onChangeText={setUserName}
            />
          </View>
          <View className="pt-5">
            <TextInput
              placeholder="Email"
              className="border rounded-lg w-full border-[#A9D3F4] px-3 h-[50]"
              onChangeText={setUserEmail}
            />
          </View>
                <View className="pt-5">
            <View className="flex-row items-center border rounded-lg border-[#A9D3F4] px-3 h-[50]">
              <TextInput
                secureTextEntry={!passwordVisible}
                placeholder="Password"
                className="flex-1"
                onChangeText={setUserPassword}
              />
              {passwordVisible ? (
                <TouchableOpacity
                  onPress={() => {
                    passwordVisibilityChange(false);
                  }}
                >
                  <Ionicons name="eye" size={20} color="gray" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    passwordVisibilityChange(true);
                  }}
                >
                  <Ionicons name="eye-off" size={20} color="gray" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="pt-5 items-center justify-center">
            <TouchableOpacity className="w-full rounded-full bg-[#8CB8E2] h-[50px] items-center justify-center flex" onPress={handleSignUp}>
              <Text className="text-white font-bold text-xl font-sans">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="pt-5 items-center justify-center">
            <Text className="font-bold ">OR</Text>
          </View>

          <View className="items-center justify-center pt-5 flex-row">
            <View className="w-1/2">
              <Image
                source={require("../../assets/images/GoogleIcon.png")}
                className="w-[80] h-[80]"
              />
            </View>
            <View>
              <Image
                source={require("../../assets/images/AppleLogo.png")}
                className="w-[70] h-[70]"
              />
            </View>
          </View>
          <View className="pt-5 items-center justify-center">
            <Text className="text-[#8CB8E2] text-sm">
              Already have an account?{" "}
              <Link href="/(auth)/login" className="font-bold underline">
                Login Here!
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}
