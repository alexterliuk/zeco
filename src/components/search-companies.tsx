import React from 'react';
import zecoConfig from '../../config/zeco-config';
import Search, { SearchItem, SearchOnClick } from './search';
import companies, { companiesIds } from '../data/companies';
import translations, {
  languages,
  CompanyId,
} from '../translations/translations';
import { translateCommon } from '../translations/translate';

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
    // composed as { uk: [], en: [] }
    languages.reduce(
      (acc: { [k: string]: SearchItem[] }, lang) => ((acc[lang] = []), acc),
      {}
    )
  );
const dataOnLang = composeDataForSearch();

const SearchCompanies = ({
  onClick,
  qtyOfFoundItemsToShow,
}: {
  onClick: SearchOnClick;
  qtyOfFoundItemsToShow?: number;
}) => {
  return (
    <Search
      data={dataOnLang[zecoConfig.getItem(['lang'])]}
      labelName={translateCommon('enterCompanyNameOrUsreou')}
      onClick={onClick}
      border={false}
      qtyOfFoundItemsToShow={qtyOfFoundItemsToShow}
    />
  );
};

export default SearchCompanies;
