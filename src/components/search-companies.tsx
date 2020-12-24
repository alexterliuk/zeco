import React, { useState } from 'react';
import Search, { SearchItem, SearchOnClick } from './search';
import companies, { companiesIds } from '../data/companies';
import translations, {
  languages,
  CompanyId,
} from '../translations/translations';
import { translateCommon } from '../translations/translate';
import useLangContext from '../hooks/use-lang-context';

const getSearchComponent = (
  data: SearchItem[],
  onClick: SearchOnClick,
  qtyOfFoundItemsToShow?: number
) => (
  typeof Search === 'string'
    ? () => {}
    : <Search
        data={data}
        labelName={translateCommon('enterCompanyNameOrUsreou')}
        onClick={onClick}
        border={false}
        qtyOfFoundItemsToShow={qtyOfFoundItemsToShow}
      />
);

const composeDataForSearch = () =>
  companiesIds.reduce(
    (acc, id) => {
      const _id = id as CompanyId;
      const usreou = companies[id].usreou;
      void languages.map(lang => {
        acc[lang].push({
          id,
          text: `${usreou} - ${translations.companies[_id].name[lang]}`,
        });
      });
      return acc;
    },
    // composed as { ua: [], en: [] }
    languages.reduce(
      (acc: { [k: string]: SearchItem[] }, lang) => ((acc[lang] = []), acc),
      {}
    )
  );
const dataOnLang = composeDataForSearch();

let prevLang = useLangContext.getLang();

const SearchCompanies = ({
  onClick,
  qtyOfFoundItemsToShow,
}: {
  onClick: SearchOnClick;
  qtyOfFoundItemsToShow?: number;
}) => {
  const lang = useLangContext.getLang();
  const translatedData = dataOnLang[lang];
  const [dataTuple, refreshDataTuple] = useState([null, translatedData]);

  if (prevLang !== lang) {
    prevLang = lang;
    refreshDataTuple(() =>
      dataTuple[0] ? [null, translatedData] : [translatedData, null]
    );
  }

  const searchComponent = getSearchComponent(
    translatedData,
    onClick,
    qtyOfFoundItemsToShow
  );
  // A new Search is returned on lang change. Already shown Search is not reused,
  // because it uses useRefs, so pop-down options are not translated.
  // (NB: dataTuple is also used in CompanyAllDataAndCharts)
  return (
    <>
      {dataTuple[0] ? searchComponent : null}
      {dataTuple[1] ? searchComponent : null}
    </>
  );
};

export default SearchCompanies;
