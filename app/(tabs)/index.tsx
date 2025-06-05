import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/(auth)/signUP">SignUp</Link>
      </View>
    </SafeAreaView>
  );
}
