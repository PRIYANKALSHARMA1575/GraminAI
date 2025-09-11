// Index.tsx
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";


// For example, if Index.tsx is 'app/index.tsx' and SearchBar.tsx is 'components/SearchBar.tsx'.
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import React from "react";

export default function Index() {
    // These are hooks which expose extra functionalities
    const router = useRouter();

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image source={icons.logo} className="w-14 h-12 mt-20 mb-5 mx-auto" />

                <View className="flex-1 mt-5">
                    <SearchBar
                        onPress={() => router.push("/search")}
                        placeholder="Search for Schemes from Sarkar!"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

// import { Text, View } from 'react-native';

// export default function Index() {
//   return (
//     <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
//       <Text>Hello from Index.tsx!</Text>
//     </View>
//   );
// }
