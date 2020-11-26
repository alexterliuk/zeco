import React, {
  useRef,
  useState,
  useMemo,
  ReactElement,
  FunctionComponentElement,
  MutableRefObject,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonAsRow } from './styled-elements';

// TODO; move backgroundColorInSearch to zecoConfig
const backgroundColorInSearch = 'lightblue';
const padding = 5;

const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  outline: none;
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

const getButtonHeight = (items: Pick<DataAndButtons, 'ref'>[]) => {
  const button: unknown = items[0].ref;
  if (button instanceof HTMLElement) {
    return button.getBoundingClientRect().height;
  }
  return 26; // expected value as a fallback
};

// mh - maxHeight, bh - buttonHeight, pd - padding
const getContainerMaxHeight = (mh: number, bh: number, pd: number) =>
  mh - (bh + pd);

// 6 is input's padding-top/bottom + border-width
const getMaxItemsInContainer = (mh: number, bh: number, pd: number) =>
  Math.floor((mh - (bh + 6 + pd)) / bh);

// data consists of pop-down options, for each a button (ButtonAsRow) is created;
// on a button's click, option.onClick is called (if exists), or Search's onClick
// (if exists), or noop
const Search = ({
  data,
  onClick,
  labelName,
  maxWidth = 0,
  maxHeight = 135 /* enough for 4 buttons (selectable options) */,
}: SearchProps) => {
  const inputRef = useRef(null);
  const foundItemsRef = useRef(null);
  const buttonsRefs = data.reduce(
    (acc: { [k: string]: MutableRefObject<null> }, _, i) => (
      (acc[i] = useRef(null)), acc
    ),
    {}
  );

  const dataAndButtonsRef = useRef(
    data.map(
      (item, i): DataAndButtons => ({
        ...item,
        button: (
          <ButtonAsRow
            key={item.text}
            ref={buttonsRefs[i]}
            onClick={() => {
              resetSearchState();
              (item.onClick || onClick || (() => void 0))(item.id, item);
            }}
          >
            {item.text}
          </ButtonAsRow>
        ),
        ref: buttonsRefs[i],
        selected: false,
        // declare onClick here to handle Enter keydown
        onClick: () => {
          resetSearchState();
          (item.onClick || onClick || (() => void 0))(item.id, item);
        }
      })
    )
  );

  const buttonHeight = useMemo(
    () => getButtonHeight(dataAndButtonsRef.current),
    [dataAndButtonsRef]
  );
  const foundItemsMaxHeight = useMemo(
    () => getContainerMaxHeight(maxHeight, buttonHeight, padding),
    [maxHeight, buttonHeight, padding]
  );
  const maxItemsInFoundItems = useMemo(
    () => getMaxItemsInContainer(maxHeight, buttonHeight, padding),
    [maxHeight, buttonHeight, padding]
  );

  const [filteredData, filterData] = useState(dataAndButtonsRef);
  const [pristine, setPristine] = useState(true);
  const [selectedItemIdx, setSelectedItemIdx] = useState(-1);

  const resetSearchState = () => {
    const inputEl: unknown = inputRef.current;
    if (inputEl instanceof HTMLInputElement) {
      inputEl.value = '';
      setSelectedItemIdx(-1);
      setPristine(true);
    }
  };

  const handleBlur = (
    elCurrent: HTMLElement,
    elRelated: EventTarget | null
  ) => {
    if (!elCurrent.contains(elRelated as Node)) {
      resetSearchState();
    }
  };

  const handleChange = (v: string) => {
    if (pristine) setPristine(false);
    // reset idx - if up/down arrow key pressed,
    // it'll select last/first item from new found items
    if (selectedItemIdx !== -1) setSelectedItemIdx(-1);
    const curr = dataAndButtonsRef.current;
    filterData({
      current: !v ? [] : curr.filter(item => item.text.includes(v)),
    });
  };

  const handleKeyDown = (key: string) => {
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const DOWN = key === 'ArrowDown';
      const filtData = filteredData.current;
      const selIdx = selectedItemIdx;
      let idx: number;
      if (DOWN) {
        idx = selIdx === filtData.length - 1 ? 0 : selIdx + 1;
      } else {
        idx = selIdx < 1 ? filtData.length - 1 : selIdx - 1;
      }
      const foundItem = filtData[idx];
      const firstFoundItem = !idx;
      const lastFoundItem = idx === filtData.length - 1;

      const el: unknown = foundItem.ref.current;
      if (el instanceof HTMLElement) {
        dataAndButtonsRef.current.map((dnb, i) => {
          if (dnb.text === foundItem.text) {
            const el: unknown = dnb.ref.current;
            if (el instanceof HTMLElement) {
              el.style.background = backgroundColorInSearch;
              foundItem.selected = true;
              setSelectedItemIdx(idx);

              const fi: unknown = foundItemsRef.current;
              if (fi instanceof HTMLElement) {
                if (DOWN) {
                  if (firstFoundItem) {
                    // scroll to first item
                    fi.scrollBy(0, 0 - foundItemsMaxHeight);
                  } else if (i > maxItemsInFoundItems) {
                    fi.scrollBy(0, buttonHeight);
                  }
                } else {
                  // UP
                  if (lastFoundItem) {
                    // scroll to last item
                    fi.scrollBy(0, foundItemsMaxHeight);
                  } else if (i < filtData.length - (maxItemsInFoundItems - 1)) {
                    fi.scrollBy(0, 0 - buttonHeight);
                  }
                }
              }
            }
          } else {
            dnb.selected = false;
            const el: unknown = dnb.ref.current;
            if (el instanceof HTMLElement) {
              el.style.background = '';
            }
          }
        });
      }
    }

    if (key === 'Enter') {
      const item = filteredData.current.filter(obj => obj.selected)[0];
      if (item) item.onClick();
      resetSearchState();
    }

    if (key === 'Escape') {
      resetSearchState();
    }
  };

  const mw = maxWidth > 0 && maxWidth;

  return (
    <Container
      tabIndex={-1}
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
        onKeyDown={e => handleKeyDown(e.key)}
      />
      <FoundItems
        ref={foundItemsRef}
        style={{ maxHeight: foundItemsMaxHeight }}
      >
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
  maxHeight: PropTypes.number,
};

interface SearchProps {
  data: SearchItem[];
  onClick?: SearchOnClick;
  labelName?: string;
  maxWidth?: number;
  maxHeight?: number;
}

interface SearchItem {
  id: string | number;
  text: string;
  onClick?: SearchOnClick;
}

type SearchOnClick = (id: string | number, item?: SearchItem) => unknown;

interface DataAndButtons extends SearchItem {
  button: FunctionComponentElement<ReactElement>;
  ref: MutableRefObject<null>;
  selected: boolean;
  onClick: () => void;
}

export default Search;
