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

// TODO: move backgroundColorInSearchFoundItems to zecoConfig
const backgroundColorInSearchFoundItems = 'lightblue';
const padding = 5;
const margin = 5;

const Container = styled.div`
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  outline: none;
  padding: ${padding}px;
`;

const ContainerNoBorder = styled.div`
  position: relative;
  outline: none;
  padding: ${padding}px;
`;

const Label = styled.label`
  display: inline-block;
  margin: ${margin}px;
`;

const Input = styled.input`
  font-family: serif;
  padding: 1px 2px;
  margin: ${margin}px;
`;

const FoundItems = styled.div`
  width: 99%;
  position: absolute;
  margin-top: 15px;
  box-shadow: 0px 0px 10px 1px #d4d9dc;
  font-family: serif;
  background: #f9f9f9;
  overflow-y: auto;
`;

// data consists of pop-down options, for each a button (ButtonAsRow) is created;
// on a button's click, option.onClick is called (if exists), or Search's onClick
// (if exists), or noop
const Search = (inBrowser => !inBrowser ? '' : ({
  data,
  onClick,
  labelName,
  maxWidth = 0,
  qtyOfFoundItemsToShow = 4,
  border = true,
}: SearchProps) => {
  const inputRef = useRef(null);
  const foundItemsRef = useRef(null);
  const selItemIdxRef = useRef(-1);
  const mouseMovedRef = useRef(false);
  // enter from outside, or when handleChange replaces array with new filtered one
  const mouseEnterFromOutsideFoundItemsRef = useRef(true);

  const buttonsRefs = data.reduce(
    (acc: { [k: string]: MutableRefObject<null> }, _, i) => (
      (acc[i] = useRef(null)), acc
    ),
    {}
  );
  const dataAndButtonsRef = useRef(
    data.map(
      (item, i): DataAndButton => ({
        ...item,
        button: (
          <ButtonAsRow
            key={item.text}
            ref={buttonsRefs[i]}
            theme={{ background: 'inherit' /* remove color on :hover */ }}
            onClick={() => {
              resetSearchState();
              (item.onClick || onClick || (() => void 0))(item.id, item);
            }}
            onMouseEnter={e =>
              handleHover('enter', e.currentTarget, e.relatedTarget)
            }
            onMouseLeave={e =>
              handleHover('leave', e.currentTarget, e.relatedTarget)
            }
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
        },
      })
    )
  );

  const buttonHeight = useMemo(
    () => {
      const items: Pick<DataAndButton, 'ref'>[] = dataAndButtonsRef.current;
      const button: unknown = items[0].ref;
      if (button instanceof HTMLElement) {
        return button.getBoundingClientRect().height;
      }
      return 26; // expected value as a fallback
    },
    // since buttons styles are changed, watch last one, because
    // it is less likely to be hovered over or pressed than first one
    [dataAndButtonsRef.current[dataAndButtonsRef.current.length - 1]]
  );

  const [pristine, setPristine] = useState(true);
  const [NOT_USED, filterData] = useState(dataAndButtonsRef.current);
  const filteredDataRef = useRef(dataAndButtonsRef.current);

  // Why useRef over useState is chosen for implementation:
  // Many of useRefs above might have been replaced with useState and Search
  // would work well except for 'switch control between hover and keyboard'
  // functionality. A user may navigate between pop-down buttons by keyboard, and
  // then take mouse, and continue selecting from the same place, or conversely.
  // But as the buttons created once in dataAndButtonsRef (pop-down buttons are
  // filtered from dataAndButtonsRef), they always have in scope the initial state
  // of data, and updates in useState are not visible to onMouseEnter/Leave event
  // listeners. All other listeners which are sitting in Search's return work well
  // with useState. To enable live updates visible to both parts of the component,
  // useRefs were chosen. useState's filterData serves as a trigger for updates,
  // but the result of filtering and other mutable data are used from useRefs.

  const resetSearchState = () => {
    const inputEl: unknown = inputRef.current;
    if (inputEl instanceof HTMLInputElement) {
      inputEl.value = '';
      selItemIdxRef.current = -1;
      setPristine(true);
      unselectItem();
      filteredDataRef.current = [];
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
    // reset idx, so if up/down arrow key pressed,
    // it will select last/first item from new found items set,
    // or if mouse hovers over some button, it will select corresponding item
    mouseEnterFromOutsideFoundItemsRef.current = true;
    // some button might be selected, unselect it
    unselectItem();
    const curr = dataAndButtonsRef.current;
    const _filteredData = !v
      ? []
      : curr.filter(item => {
          const uppCased = `${v[0].toUpperCase()}${v.slice(1)}`;
          const lowCased = `${v[0].toLowerCase()}${v.slice(1)}`;
          return item.text.includes(uppCased || lowCased);
        });
    // this is used for up/down arrow key navigation and for hovering
    filteredDataRef.current = _filteredData;
    // this triggers updating Search, stored value is not used (thus NOT_USED)
    filterData(_filteredData);
  };

  const handleMouseMove = () => {
    mouseMovedRef.current = true;
  };

  const handleHover = (
    type: 'enter' | 'leave',
    elCurrent: EventTarget & HTMLButtonElement,
    elRelated: EventTarget | null
  ) => {
    const enterFromOutside = mouseEnterFromOutsideFoundItemsRef.current;
    const mouseMoved = mouseMovedRef.current;
    // prevent cursor interfering when items are navigated by ArrowUp/ArrowDown
    // i.e. mouse not moved, do nothing
    if (!enterFromOutside && !mouseMoved) return;

    if (enterFromOutside) mouseEnterFromOutsideFoundItemsRef.current = false;

    const elCurr = elCurrent instanceof HTMLButtonElement && elCurrent;
    const elRel = elRelated instanceof HTMLButtonElement && elRelated;
    if (type === 'enter') {
      // currBtn - elCurr, prevBtn - elRel
      switchButton('enter', elCurr, elRel);
    } else {
      // currBtn - elRel, prevBtn - elCurr
      switchButton('leave', elRel, elCurr);
    }
  };

  const handleKeyDown = (key: string) => {
    const input: unknown = inputRef.current;
    if (input instanceof HTMLInputElement && !input.value) return;

    mouseMovedRef.current = false;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const DOWN = key === 'ArrowDown';
      const filtData = filteredDataRef.current;
      const selIdx = selItemIdxRef.current;
      let idx: number;
      if (DOWN) {
        idx = selIdx === filtData.length - 1 ? 0 : selIdx + 1;
      } else {
        idx = selIdx < 1 ? filtData.length - 1 : selIdx - 1;
      }
      const foundItem = filtData[idx];
      if (!foundItem) return;
      const firstFoundItem = !idx;
      const lastFoundItem = idx === filtData.length - 1;

      void dataAndButtonsRef.current.map(dnb => {
        const btn: unknown = dnb.ref.current;
        if (btn instanceof HTMLElement) {
          if (dnb.text === foundItem.text) {
            btn.style.background = backgroundColorInSearchFoundItems;
            foundItem.selected = true;
            selItemIdxRef.current = idx;

            const fis: unknown = foundItemsRef.current;
            if (fis instanceof HTMLElement) {
              const fisTop = fis.getBoundingClientRect().top;
              const btnTop = btn.getBoundingClientRect().top;
              if (DOWN) {
                if (firstFoundItem) {
                  // scroll to first item
                  fis.scrollBy(0, 0 - filtData.length * buttonHeight);
                } else if (
                  // scroll if button is one to last (penultimate);
                  // if need to scroll at last, remove: - 1
                  btnTop - fisTop >= buttonHeight * (qtyOfFoundItemsToShow - 1)
                ) {
                  fis.scrollBy(0, buttonHeight);
                }
              } else {
                // UP
                if (lastFoundItem) {
                  // scroll to last item
                  fis.scrollBy(0, filtData.length * buttonHeight);
                } else if (
                  // scroll if button is one to last (penultimate);
                  // if need to scroll at last, make: btnTop < fisTop
                  btnTop < fisTop + buttonHeight
                ) {
                  fis.scrollBy(0, 0 - buttonHeight);
                }
              }
            }
          } else {
            dnb.selected = false;
            btn.style.background = '';
          }
        }
      });
    }

    if (key === 'Enter') {
      const item = filteredDataRef.current.filter(obj => obj.selected)[0];
      if (item) item.onClick();
      resetSearchState();
    }

    if (key === 'Escape') {
      resetSearchState();
    }
  };

  // ================= handleHover's helper functions =================

  function switchButton(
    type: 'enter' | 'leave',
    currBtn: false | HTMLButtonElement,
    prevBtn: false | HTMLButtonElement
  ) {
    if (currBtn) currBtn.style.background = backgroundColorInSearchFoundItems;
    if (prevBtn) prevBtn.style.background = '';
    let selItem = findSelItem();
    if (!selItem && currBtn) {
      // nothing is selected (neither up/down key pressed, nor hover occurred before)
      selectCurrItem(currBtn);
    } else if (type === 'enter' && selItem && currBtn) {
      // some button is selected, unselect it and select one being hovered over
      selectCurrItemAndStyleBtn(currBtn, selItem);
    } else if (type === 'leave' && selItem && !currBtn) {
      // cursor left FoundItems area, thus currBtn is false
      // some button is selected, unselect it
      unselectItem(selItem);
    }
  }

  function selectCurrItem(hovBtn: HTMLButtonElement) {
    const [hovItem, hovItemIdx] = findHovItem(hovBtn);
    if (typeof hovItem === 'object' && typeof hovItemIdx === 'number') {
      hovItem.selected = true;
      selItemIdxRef.current = hovItemIdx;
    }
  }

  function selectCurrItemAndStyleBtn(
    hovBtn: HTMLButtonElement,
    selItem: DataAndButton
  ) {
    if (hovBtn) {
      const [hovItem, hovItemIdx] = findHovItem(hovBtn);
      if (typeof hovItem === 'object' && typeof hovItemIdx === 'number') {
        const selBtn: unknown = selItem.ref.current;
        // check for sameness is needed because after handleChange's job, buttons
        // might happen to be the same if the cursor was left in FoundItems area
        if (selBtn !== hovBtn) {
          if (selBtn instanceof HTMLButtonElement) {
            selBtn.style.background = '';
            selItem.selected = false;
            hovItem.selected = true;
            selItemIdxRef.current = hovItemIdx;
          }
        }
      }
    }
  }

  function findHovItem(hovBtn: HTMLButtonElement) {
    const text = hovBtn.textContent;
    const filtData = filteredDataRef.current;
    let i = 0;
    while (i < filtData.length) {
      if (filtData[i].text === text) {
        return [filtData[i], i];
      }
      i++;
    }
    return [];
  }

  function findSelItem() {
    let selItem = dataAndButtonsRef.current.filter(item => item.selected)[0];
    if (selItem) return selItem;
  }

  // also is used in handleChange and resetSearchState
  function unselectItem(selItem?: DataAndButton) {
    const _selItem = selItem || findSelItem();
    if (_selItem) {
      _selItem.selected = false;
      const selBtn: unknown = _selItem.ref.current;
      if (selBtn instanceof HTMLButtonElement) {
        selBtn.style.background = '';
      }
      selItemIdxRef.current = -1;
    }
  }

  // ================= return block =================

  const mw = maxWidth > 0 && maxWidth;
  const tabIndex = -1;
  const style = { maxWidth: mw || '' };
  const onBlur = (e: any) => handleBlur(e.currentTarget, e.relatedTarget);
  const props = { tabIndex, style, onBlur };

  const children = (
    <>
      {labelName ? <Label htmlFor="foundItem">{`${labelName}:`}</Label> : null}
      <Input
        type="text"
        name="foundItem"
        ref={inputRef}
        style={{ width: mw ? `${mw - padding * 2 - margin * 2}px` : '' }}
        onChange={e => handleChange(e.currentTarget.value)}
        onKeyDown={e => handleKeyDown(e.key)}
      />
      <FoundItems
        ref={foundItemsRef}
        style={{ maxHeight: qtyOfFoundItemsToShow * buttonHeight }}
        onMouseMove={() => handleMouseMove()}
      >
        {pristine ? [] : filteredDataRef.current.map(item => item.button)}
      </FoundItems>
    </>
  );

  return border ? (
    <Container {...props}>{children}</Container>
  ) : (
    <ContainerNoBorder {...props}>{children}</ContainerNoBorder>
  );
})(typeof window !== 'undefined');

if (Search) {
  // @ts-ignore
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
    qtyOfFoundItemsToShow: PropTypes.number,
    border: PropTypes.bool,
  };
}

interface SearchProps {
  data: SearchItem[];
  onClick?: SearchOnClick;
  labelName?: string;
  maxWidth?: number;
  qtyOfFoundItemsToShow?: number;
  border?: boolean;
}

export interface SearchItem {
  id: string | number;
  text: string;
  onClick?: SearchOnClick;
}

export type SearchOnClick = (id: string | number, item?: SearchItem) => unknown;

interface DataAndButton extends SearchItem {
  button: FunctionComponentElement<ReactElement>;
  ref: MutableRefObject<null>;
  selected: boolean;
  onClick: () => void;
}

export default Search;
