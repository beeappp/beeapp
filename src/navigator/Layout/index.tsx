import { Box } from '@gluestack-ui/themed';
import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '../../theme/palette';

type LayoutProps = {
  top?: boolean;
  bottom?: boolean;
  padding?: boolean;
  bg?: boolean;
} & PropsWithChildren;
export const Layout: FC<LayoutProps> = ({
  children,
  top,
  bottom,
  padding,
  bg,
}) => {
  const { top: up, bottom: down } = useSafeAreaInsets();
  return (
    <Box
      style={[
        styles.container,
        top && { paddingTop: up },
        bottom && { paddingBottom: down },
        padding && { paddingHorizontal: 21 },
        bg && { backgroundColor: palette.white },
      ]}
    >
      {children}
    </Box>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
