import { Dispatch, SetStateAction } from 'react';
import zecoConfig from '../../config/zeco-config';
import { InpBlock } from '../components/checkbox-control';
import {
  CompanyAllDataTableData,
  GetFilteredTableData,
} from '../components/company-all-data-panel';

/**
 * Singleton which stores settings of what columns and rows to show.
 */
const useCompanyAllDataPanelShowSettings = (() => {
  const _settings = zecoConfig.getItem(['showInCompanyAllDataPanel']).table;
  const { currYearQuarters, quarters, years } = _settings.cols;
  const _inpBlocks: InpBlock[] = [
    {
      name: 'cols',
      inputs: [
        { name: 'currYearQuarters', value: currYearQuarters },
        { name: 'quarters', value: quarters },
      ].concat(years.map((y: string) => ({ name: y, value: true }))),
    },
    {
      name: 'rows',
      inputs: _settings.rows.map((y: string) => ({ name: y, value: true })),
    },
  ];

  // const _extractInputValues = (inpBlocks?: InpBlock[]) => {
  //   const inpValues: boolean[] = [];
  //   const blocks = inpBlocks || _inpBlocks;
  //   blocks.forEach((bl, blIdx) => {
  //     bl.inputs.forEach((inp: InpSpec, i: number) => {
  //       _inpBlocks[blIdx].inputs[i].value = inp.value;
  //       inpValues.push(inp.value);
  //     });
  //   });
  //   return inpValues;
  // };

  const _updateSettings = (inpBlocks: InpBlock[]) => {
    const colsSpecs = inpBlocks[0].inputs;
    _settings.cols.currYearQuarters = colsSpecs[0].value;
    _settings.cols.quarters = colsSpecs[1].value;
    _settings.cols.years = colsSpecs.slice(2).reduce((acc: string[], spec) => {
      if (spec.value) acc.push(spec.name);
      return acc;
    }, []);

    const rowsSpecs = inpBlocks[1].inputs;
    _settings.rows = rowsSpecs.reduce((acc: string[], spec) => {
      if (spec.value) acc.push(spec.name);
      return acc;
    }, []);
  };

  // collection of CompanyAllDataPanels' updaters, each is obj with 2 updaters:
  //   {
  //     id: string,
  //     setStateFunc: useState's updating state func,
  //     getFilteredTableData: func to filter data after _updateSettings' job
  //   }
  const _subscribers: Subscriber[] = [];

  const api = {
    subscribe: (updaters: Subscriber) => {
      if (!_subscribers.includes(updaters)) _subscribers.push(updaters);
    },
    unsubscribe: (updaters: Subscriber) => {
      let idx = -1;
      void _subscribers.some((s, i) =>
        s === updaters ? ((idx = i), true) : false
      );
      if (idx > -1) _subscribers.splice(idx, 1);
    },
    invokeUpdaters: (inpBlocks: InpBlock[]) => {
      _updateSettings(inpBlocks);
      _subscribers.forEach(s => {
        s.setStateFunc(() => s.getFilteredTableData(s.id, _settings));
      });
    },
    // getInpValues: () => _extractInputValues(),
  };

  return {
    settings: _settings,
    inpBlocks: _inpBlocks,
    ...api,
  };
})();

// Subscriber includes two updaters
interface Subscriber {
  id: string;
  setStateFunc: SetStateFunc;
  getFilteredTableData: GetFilteredTableData;
}

type SetStateFunc = Dispatch<SetStateAction<CompanyAllDataTableData>>;

export default useCompanyAllDataPanelShowSettings;
