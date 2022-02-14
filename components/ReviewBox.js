import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { MaterialIcons } from "@expo/vector-icons";
import Stars from "react-native-stars";

const ReviewBox = ({ review, lines, color }) => {
  return (
    <View
      style={[tw("flex my-2 mx-4  rounded-xl"), { backgroundColor: color }]}
    >
      <View style={tw("flex flex-row items-center")}>
        <Image
          style={[tw("m-2"), { width: 40, height: 40 }]}
          source={{ uri: review.profile_photo_url }}
        />
        <View style={tw("flex items-start mt-2")}>
          <Text style={tw("text-gray-100 font-semibold text-md")}>
            {review.author_name}
          </Text>
          <Text style={tw("text-gray-500 ")}>
            {review.relative_time_description}
          </Text>
          <View style={[tw("mt-2 ")]}>
            <Stars
              display={review.rating}
              half={true}
              spacing={8}
              count={5}
              starSize={20}
              fullStar={<MaterialIcons name="star" size={15} color="yellow" />}
              emptyStar={
                <MaterialIcons name="star-outline" size={15} color="yellow" />
              }
              halfStar={
                <MaterialIcons name="star-half" size={15} color="yellow" />
              }
            />
          </View>
        </View>
      </View>
      <Text numberOfLines={lines} style={tw("p-2 text-white")}>
        {review.text}
      </Text>
    </View>
  );
};

export default ReviewBox;

const styles = StyleSheet.create({});
// freshly;
