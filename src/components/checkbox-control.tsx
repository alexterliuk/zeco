import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translateCommon } from '../translations/translate';
import { TranslationsCommonKey } from '../translations/translations';

const CheckboxControlWrapper = styled.div``;
const InputsBlockWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InputsBlockName = styled.h4`
  margin: 0 20px 0 0;
  min-width: ${props => props.theme.minWidth || 'none'};
`;
const Inputs = styled.div``;
const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 5px;
`;
const Input = styled.input``;
const Label = styled.label`
  padding: 5px 0 5px 8px;
`;

const CheckboxControl = ({
  checkboxSettings,
  blockNameMinWidth = 80,
}: CheckboxControlProps) => {
  const { inpBlocks, updateInpBlocks }: CheckboxSettings = checkboxSettings;
  const handleChange = (
    inp: HTMLInputElement,
    idx: number,
    blockIdx: number
  ) => {
    inp.value = inp.checked ? 'on' : 'off';
    inpBlocks[blockIdx].inputs[idx].value = inp.checked;
    updateInpBlocks(inpBlocks);
  };

  return (
    <CheckboxControlWrapper>
      {inpBlocks.map((bl, blIdx) => {
        const blockName = translateCommon(bl.name as TranslationsCommonKey);
        return (
          <InputsBlockWrapper key={`block${blIdx}${bl.name}`}>
            {blockName ? (
              <InputsBlockName theme={{ minWidth: `${blockNameMinWidth}px` }}>
                {blockName}
              </InputsBlockName>
            ) : null}
            <Inputs>
              {bl.inputs.map((inp: InpSpec, i) => {
                const inputName = translateCommon(
                  inp.name as TranslationsCommonKey
                );
                return (
                  <InputWrapper key={inp.name}>
                    <Input
                      type="checkbox"
                      id={inp.name}
                      name={inp.name}
                      defaultChecked={inp.value}
                      onChange={e => {
                        handleChange(e.currentTarget, i, blIdx);
                      }}
                    />
                    <Label htmlFor={inp.name}>{inputName || inp.name}</Label>
                  </InputWrapper>
                );
              })}
            </Inputs>
          </InputsBlockWrapper>
        );
      })}
    </CheckboxControlWrapper>
  );
};

CheckboxControl.propTypes = {
  checkboxSettings: PropTypes.shape({
    inpBlocks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        inputs: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.bool.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    updateInpBlocks: PropTypes.func.isRequired,
  }).isRequired,
  blockNameMinWidth: PropTypes.number,
};

interface CheckboxControlProps {
  checkboxSettings: CheckboxSettings;
  blockNameMinWidth?: number;
}

interface CheckboxSettings {
  inpBlocks: InpBlock[];
  updateInpBlocks: (inpBlocks: InpBlock[]) => void;
}

export interface InpBlock {
  name: string;
  inputs: InpSpec[];
}

export interface InpSpec {
  name: string;
  value: boolean;
}

export default CheckboxControl;
