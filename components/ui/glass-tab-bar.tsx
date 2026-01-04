import { GlassView } from "@/components/ui/glass-view";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/use-theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GlassTabBarProps extends BottomTabBarProps {
  floatingActionButton?: React.ReactNode;
  showLabels?: boolean;
}

export function GlassTabBar({
  state,
  descriptors,
  navigation,
  floatingActionButton,
  showLabels = false,
}: GlassTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
          paddingHorizontal: 24,
        },
      ]}
    >
      {/* Main Floating Tab Bar */}
      <GlassView
        intensity={30}
        style={[
          styles.tabBarContainer,
          {
            // borderWidth: 1,
            // borderColor: "#ffffff",
            borderRadius: theme.radius.full,
          },
        ]}
      >
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const IconComponent = options.tabBarIcon;

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabItem}
              >
                {IconComponent && (
                  <View style={styles.iconContainer}>
                    {IconComponent({
                      focused: isFocused,
                      color: isFocused
                        ? theme.colors.text
                        : theme.colors.secondaryText,
                      size: 24,
                    })}
                  </View>
                )}
                {showLabels && (
                  <Text
                    variant="caption2"
                    style={[
                      styles.label,
                      {
                        color: isFocused
                          ? theme.colors.tint
                          : theme.colors.tertiaryText,
                      },
                    ]}
                  >
                    {typeof label === "string" ? label : ""}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassView>

      {/* Floating Action Button (Independent) */}
      {floatingActionButton && (
        <View style={styles.fabContainer}>{floatingActionButton}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 12,
  },
  tabBarContainer: {
    flex: 1,
    maxWidth: 280,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: "50%", // Rounded corners for floating effect
    overflow: "hidden",
    width: "auto"
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "500",
  },
  fabContainer: {
    // FAB will be positioned here
  },
});
