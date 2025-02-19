import { CheckboxIcon, CheckboxLabel, View } from '@gluestack-ui/themed';
import { Checkbox, CheckboxIndicator } from '@gluestack-ui/themed';
import React, { FC, useState } from 'react';

import { CheckIcon } from '@gluestack-ui/themed';
import { palette } from '../../theme/palette';

interface CheckboxProps {
  selected: boolean;
  onSelect: (newSelected: boolean) => void;
}

const CustomCheckbox: FC<CheckboxProps> = ({ selected, onSelect }) => {
  return (
    <View>
      <Checkbox
        size="lg"
        alignSelf="center"
        isChecked={selected}
        bg={palette.white}
        value={''}
        // aria-label={`${t('agreement')}`}
        onChange={() => onSelect(!selected)}
      >
        <CheckboxIndicator
          borderRadius={8}
          borderWidth={1.5}
          borderColor={palette.blue}
          bgColor={selected ? palette.blue : palette.white}
        >
          <CheckboxIcon size="xs" color={palette.white} as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
    </View>
  );
};

export default CustomCheckbox;
