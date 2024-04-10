import { Ionicons, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import globalStateStore from "@/store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, useColorScheme } from "react-native";

const PropertyListingSearch = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState("");
  const store = globalStateStore();

  return (
    <View
      style={{
        gap: 4,
        padding: 12,
        borderRadius: 100,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      lightColor={Colors.common.gray["100"]}
      darkColor={Colors.common.gray["800"]}
    >
      <View
        style={[
          defaultStyles.removedBackground,
          {
            gap: 4,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={{ borderTopLeftRadius: 24 }}
          activeOpacity={0.8}
        >
          <Ionicons
            name="search-outline"
            size={24}
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.common.gray["500"]}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            fontFamily: "Montserrat",
            fontSize: 14,
            width: "100%",
            color:
              colorScheme === "light" ? Colors.light.text : Colors.dark.text,
          }}
          placeholder="Search property..."
          value={search}
          onChange={(e) => setSearch(e.nativeEvent.text)}
          onSubmitEditing={() => {
            store.updateFilters({ search });
          }}
        />
      </View>
      <View
        style={[
          defaultStyles.removedBackground,
          {
            gap: 4,
            flexDirection: "row",
          },
        ]}
      >
        <View
          style={{
            borderRightWidth: 1,
            borderColor:
              colorScheme === "light"
                ? Colors.common.gray["200"]
                : Colors.common.gray["600"],
          }}
        />
        <TouchableOpacity
          style={{ borderTopRightRadius: 24 }}
          activeOpacity={0.8}
          onPress={() => router.push("/(modals)/property-listing-filter")}
        >
          <Ionicons
            name="options-outline"
            size={24}
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.common.gray["500"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyListingSearch;
