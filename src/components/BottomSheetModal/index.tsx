import React, { PropsWithChildren, RefObject, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal as BSModal,
} from '@gorhom/bottom-sheet';
import { palette } from '../../theme/palette';

interface IBottomSheetModal {
  modalRef: RefObject<BSModal>;
  onOpen?: () => void;
  onClose?: () => void;
  modalHeight?: number | string;
  bgColor?: string;
  borderRadius?: number;
  noBackDrop?: boolean;
  enablePanDownToClose?: boolean;
}

const BottomSheetModal = ({
  children,
  modalRef,
  onOpen,
  onClose,
  modalHeight = '70%',
  bgColor,
  borderRadius,
  noBackDrop,
  enablePanDownToClose,
}: PropsWithChildren<IBottomSheetModal>) => {
  const snapPoints = useMemo(() => [modalHeight], [modalHeight]);

  const handleModalChange = (index: number) => {
    if (index === 0 && onOpen) {
      onOpen();
    }
    if (index === -1 && onClose) {
      onClose();
    }
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior={noBackDrop ? 'none' : 'close'}
      opacity={noBackDrop ? 0 : 0.5}
    />
  );

  return (
    <BSModal
      ref={modalRef}
      snapPoints={snapPoints}
      onChange={handleModalChange}
      backgroundStyle={{
        backgroundColor: bgColor ? palette.lightDark2 : 'white',
        borderRadius: borderRadius ? borderRadius : 30,
      }}
      handleIndicatorStyle={{ backgroundColor: 'transparent' }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
    >
      {children}
    </BSModal>
  );
};

export default BottomSheetModal;
