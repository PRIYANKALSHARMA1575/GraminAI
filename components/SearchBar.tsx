// SearchBar.tsx
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native' // Import TouchableOpacity
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    onPress: () => void; // This prop will be called when the search bar is pressed
}

const SearchBar = ({ placeholder, onPress }: Props) => {
    return (
        // Wrap the entire search bar in a TouchableOpacity to make it clickable
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
                <Image
                    source={icons.search}
                    className="size-5"
                    resizeMode='contain'
                    tintColor="#ab8bff"
                />
                <TextInput
                    // No direct 'onPress' for TextInput here, as the TouchableOpacity handles the tap for navigation.
                    // Make TextInput non-editable since clicking it navigates away rather than allowing input here.
                    editable={false}
                    placeholder={placeholder} // Assign the placeholder prop received from parent
                    value="" // Value remains empty since it's not meant for live input here
                    placeholderTextColor="#a8b5db"
                    className="flex-1 ml-2 text-white font-semibold"
                />
            </View>
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({}) // No style definitions needed for the provided code