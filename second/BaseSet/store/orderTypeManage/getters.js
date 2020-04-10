import { dictProcessor, dictProcessorWithLang } from '@/libs/utils/dict';

const dropConfig = {
  warehouseList: {
    oKey: 'warehouseCode',
    oValue: 'warehouseName',
  },
};

export const repository = (state) => {
  const dictRes = {};
  const dropRes = {};
  Object.keys(state.dict).forEach((key) => {
    const dictItem = dictProcessorWithLang(state.dict[key]);
    dictRes[key] = dictItem.dict;
    dropRes[key] = dictItem.drop;
  });

  Object.keys(dropConfig).forEach((key) => {
    const dropItem = dictProcessor(
      state[key],
      dropConfig[key].oKey,
      dropConfig[key].oValue,
    );
    dictRes[key] = dropItem.dict;
    dropRes[key] = dropItem.drop;
  });

  return {
    dict: dictRes,
    drop: dropRes,
  };
};

export const dict = (_, getters) => getters.repository.dict;

export const drop = (_, getters) => getters.repository.drop;
