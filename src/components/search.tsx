import React, {
  useRef,
  useState,
  ReactElement,
  FunctionComponentElement,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonAsRow } from './styled-elements';

const padding = 5;
const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  margin: 10px;
  padding: ${padding}px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  font-family: serif;
  padding: 1px 2px;
`;

const FoundItems = styled.div`
  font-family: serif;
  background: #f9f9f9;
  overflow-y: auto;
`;

// data consists of pop-down options, for each a button (ButtonAsRow) is created;
// on a button's click, option.onClick is called (if exists), or Search's onClick
// (if exists), or noop
const Search = ({
  data,
  onClick,
  labelName,
  maxWidth = 0,
}: SearchProps) => {
  const inputRef = useRef(null);

  const dataAndButtonsRef = useRef(
    data.map(
      (item, i): DataAndButtons => ({
        ...item,
        button: (
          <ButtonAsRow
            key={item.text}
            onClick={() => {
              resetInputState();
              (item.onClick || onClick || (() => void 0))(item.id, item);
            }}
          >
            {item.text}
          </ButtonAsRow>
        ),
      })
    )
  );

  const [filteredData, filterData] = useState(dataAndButtonsRef);
  const [pristine, setPristine] = useState(true);

  const resetInputState = () => {
    const inputEl: unknown = inputRef.current;
    if (inputEl instanceof HTMLInputElement) {
      inputEl.value = '';
      setPristine(true);
    }
  };

  const handleBlur = (
    elCurrent: HTMLElement,
    elRelated: EventTarget | null
  ) => {
    if (!elCurrent.contains(elRelated as Node)) {
      resetInputState();
    }
  };

  const handleChange = (v: string) => {
    if (pristine) setPristine(false);
    const curr = dataAndButtonsRef.current;
    filterData({
      current: !v ? [] : curr.filter(item => item.text.includes(v)),
    });
  };

  const mw = maxWidth > 0 && maxWidth;

  return (
    <Container
      style={{ maxWidth: mw || '' }}
      onBlur={e => handleBlur(e.currentTarget, e.relatedTarget)}
    >
      {labelName ? <Label htmlFor="foundItem">{`${labelName}:`}</Label> : null}
      <Input
        type="text"
        name="foundItem"
        ref={inputRef}
        style={{ width: mw ? `${mw - padding * 2}px` : '' }}
        onChange={e => handleChange(e.currentTarget.value)}
      />
      <FoundItems>
        {pristine ? [] : filteredData.current.map(item => item.button)}
      </FoundItems>
    </Container>
  );
};

Search.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  onClick: PropTypes.func,
  labelName: PropTypes.string,
  maxWidth: PropTypes.number,
};

interface SearchProps {
  data: SearchItem[];
  onClick?: SearchOnClick;
  labelName?: string;
  maxWidth?: number;
}

interface SearchItem {
  id: string | number;
  text: string;
  onClick?: SearchOnClick;
}

type SearchOnClick = (id: string | number, item?: SearchItem) => unknown;

interface DataAndButtons extends SearchItem {
  button: FunctionComponentElement<ReactElement>;
}

export default Search;
