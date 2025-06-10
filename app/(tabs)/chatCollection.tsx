// Importing necessary components and functions from React Native and React libraries
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native"; // Core UI components from React Native
import React, { useState, useMemo, useEffect } from "react"; // React library to manage state and memoization
import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content stays within the safe display area of the device
import { useDebounce } from "use-debounce"; // A library that slows down how often we react to user typing, for smoother performance
import { useUserStore } from "@/components/userData";

// This is the main functional component named 'ChatCollection'
// Think of it as a reusable screen or section in an app
const ChatCollection = () => {
  //Check Zustand
  const userID = useUserStore((state) => state.user?.id);
  const userName = useUserStore((state) => state.user?.name);
  useEffect(() => {
    console.log("User ID:", userID, userName);
  });

  // ------------------- STATE MANAGEMENT -------------------

  // 'searchQuery' is a piece of memory that stores what the user is typing into the search box
  const [searchQuery, setSearchQuery] = useState("");

  // 'debouncedQuery' waits 300 milliseconds after the user stops typing before updating
  // This avoids the app trying to filter the list too often while the user is still typing
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  // 'isFocused' keeps track of whether the input box is currently selected (focused)
  const [isFocused, setIsFocused] = useState(false);

  // ------------------- LIST OF USERS -------------------

  // This is a hardcoded list of people (users) with names and unique IDs
  const users = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Nguyen" },
    { id: "4", name: "David Li" },
    { id: "5", name: "Eva Martinez" },
  ];

  // ------------------- SEARCH FILTER -------------------

  // 'filteredUsers' is a list of users that matches what the user typed in the search box
  // This part is optimized using 'useMemo' so the list is only recalculated when the query changes
  const filteredUsers = useMemo(() => {
    // Convert the search query to lowercase to make the search case-insensitive (so 'a' matches 'Alice')
    const q = debouncedQuery.toLowerCase();

    // Go through each user in the list and keep only those whose name starts with the search query
    return users.filter((user) => user.name.toLowerCase().startsWith(q));
  }, [debouncedQuery]); // This recalculates only when the debounced query changes

  const handleChatMessageStart = async (id: string) => {
    console.log(id)

  };

  // ------------------- UI RENDERING -------------------

  return (
    <SafeAreaView>
      {/* This is the input box where the user can type a name to search */}
      <TextInput
        className="border border-r-2" // Adds a border to the input for visual styling
        onChangeText={setSearchQuery} // Updates 'searchQuery' whenever the user types something
        onFocus={() => setIsFocused(true)} // Sets 'isFocused' to true when the user taps into the input box
      />

      {/* Show the list of matching users only if the user has typed something */}
      {debouncedQuery.length > 0 ? (
        filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers} // The filtered list of users based on the search input
            keyExtractor={(item) => item.id} // Each user needs a unique key to help React efficiently update the list
            renderItem={({ item }) => (
              // Each user in the list is shown as a touchable item
              <TouchableOpacity onPress={()=> handleChatMessageStart(item.id)}>
                <Text>{item.name}</Text> {/* Display the user's name */}
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>No Results Found</Text>
        )
      ) : (
        // If the search box is empty, show nothing (an empty placeholder View)
        <View></View>
      )}
    </SafeAreaView>
  );
};

// Make this component available to be used elsewhere in the app
export default ChatCollection;
