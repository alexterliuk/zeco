import React, { useState } from 'react';
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
`;

const FoundItems = styled.div`
  font-family: serif;
  background: #f9f9f9;
`;

const Search = ({ data, onClick, labelName, maxWidth = 0 }: SearchProps) => {
  const [filteredData, filterData] = useState(data);
  const [pristine, setPristine] = useState(true);

  const handleChange = (v: string): void => {
    if (pristine) setPristine(false);
    filterData(data.filter(item => v && item.text.includes(v)));
  };

  const handleClick = (id: string | number, item: SearchItem) => {
    (item.onClick || onClick || (() => void 0))(id, item);
  };

  const mw = maxWidth > 0 && maxWidth;

  return (
    <Container style={{ maxWidth: mw || '' }}>
      {labelName ? <Label htmlFor="foundItem">{`${labelName}:`}</Label> : null}
      <Input
        type="text"
        name="foundItem"
        style={{ width: mw ? `${mw - padding * 2}px` : '' }}
        onChange={e => handleChange(e.currentTarget.value)}
      />
      <FoundItems>
        {(pristine ? [] : filteredData).map(item => (
          <ButtonAsRow
            tabIndex={0}
            key={item.text}
            onClick={() => handleClick(item.id, item)}
          >
            {item.text}
          </ButtonAsRow>
        ))}
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

export default Search;
