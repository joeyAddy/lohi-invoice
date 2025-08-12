import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  snapPoints = ["75%"],
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Calculate snap point heights
  const snapPointHeights = snapPoints.map((point) => {
    if (point.includes("%")) {
      return SCREEN_HEIGHT * (parseInt(point) / 100);
    }
    return parseInt(point);
  });

  const maxHeight = Math.max(...snapPointHeights);

  useEffect(() => {
    if (isVisible) {
      // Animate to the snap point when opening
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT - maxHeight,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      // Animate out when closing
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [isVisible, maxHeight, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(
          SCREEN_HEIGHT - maxHeight,
          SCREEN_HEIGHT - maxHeight + gestureState.dy
        );
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;
        
        // If dragging down with significant velocity or distance, close
        if (enablePanDownToClose && (vy > 0.5 || dy > 100)) {
          onClose();
        } else {
          // Snap back to original position
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT - maxHeight,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: `rgba(0,0,0,${backdropOpacity})` }}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Bottom Sheet Container */}
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: maxHeight,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [{ translateY }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
          }}
          {...panResponder.panHandlers}
        >
          {/* Handle */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#E5E5E5",
              borderRadius: 2,
              alignSelf: "center",
              marginTop: 12,
              marginBottom: 8,
            }}
          />
          
          {/* Content */}
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheet;
