import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

const ChatCollection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [isFocused, setIsFocused] = useState(false);

  const users = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Nguyen' },
    { id: '4', name: 'David Li' },
    { id: '5', name: 'Eva Martinez' },
  ];

  const filteredUsers = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(q));
  }, [debouncedQuery]);


  const handleChatID = async () =>{
    
  }
  return (
    <SafeAreaView>
        <TextInput 
        className='border border-r-2'
        onChangeText={setSearchQuery}
        onFocus={()=>setIsFocused(true)}
        />
        
        {/*Hide list until user types in some text */}
        {(debouncedQuery.length > 0)? 
            <FlatList 
            data={filteredUsers} 
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}        
            />
        : <View></View>
        }


    </SafeAreaView>
  );
};

export default ChatCollection;
