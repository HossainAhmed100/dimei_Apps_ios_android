import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image, Switch } from "react-native";
import { images, icons, COLORS, SIZES } from '../constants';
import { Feather } from "@expo/vector-icons";

const Setting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
        <Pressable
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/profile.jpg")}
              style={{
                resizeMode: "cover",
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 16 }} numberOfLines={2}>
               Hossain Ahmed
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>
                880 1850 563 626
              </Text>
            </View>
            <Image
              source={require("../assets/icons/edit.png")}
              style={{ tintColor: "#B0B0B0", width: 24, height: 24 }}
            />
          </View>
        </Pressable>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.chip}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  All Devices
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                 source={icons.usersGroup}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Reference
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.reset}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Reset Password
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.cart}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Token Purchase History
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.share}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Share this app
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.star}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>Rate us</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                 source={icons.moon}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                style={{ height: 30 }}
                trackColor={{ true: "#20E86C" }}
                thumbColor={isDarkMode ? "#0F6831" : "#fff"}
                onValueChange={toggleTheme}
                value={isDarkMode}
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.reportFlag}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Help and Support
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.chart}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Report Problem
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 13,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.document}
                  style={{ tintColor: "#5C5C5C", width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "#5C5C5C" }}>
                  Terms & Conditions
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Setting;
