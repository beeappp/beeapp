import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Easing, ImageStyle } from 'react-native';

interface AnimatedImageProps {
  initialImage: any;
  finalImage: any;
  style?: ImageStyle;
  time: number;
}

export const AnimatedImage: FC<AnimatedImageProps> = ({
  initialImage,
  finalImage,
  style,
  time,
  ...rest
}) => {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const animation = useRef(new Animated.Value(initialImage ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: 1,
      useNativeDriver: true,
      duration: time,
      easing: Easing.linear,
    }).start(() => {
      setCurrentImage(finalImage);
      Animated.timing(animation.current, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
        easing: Easing.linear,
      }).start();
    });
  }, [finalImage, time]);

  return (
    <Animated.Image
      {...rest}
      source={currentImage === null ? currentImage : currentImage}
      style={[
        style,
        {
          opacity: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}
    />
  );
};
