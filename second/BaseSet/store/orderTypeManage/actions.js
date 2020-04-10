import { batchQuery, warehouseQueryAll } from '../../api/orderTypeManage';
import * as types from './mutation-types';

const objectCodes = [
  'note_type',
  'business_type',
  'operation_type',
];

export function getBaseInfo({ commit }) {
  return new Promise((resolve, reject) =>
    Promise.all([batchQuery({ objectCodes }), warehouseQueryAll()])
      .then((resArr) => {
        const [dict, areaList] = resArr;
        const toCamel = e => e.replace(/_(\w)/g, ($0, $1) => $1.toUpperCase());
        // 字典
        const dictRet = {};
        Object.keys(dict.data).forEach((e) => {
          dictRet[toCamel(e)] = dict.data[e].details;
        });
        commit(types.SET_DICT, dictRet);
        // 仓库
        commit(types.SET_WAREHOUES_QUERY_ALL, areaList.data);
        resolve();
      })
      .catch((err) => {
        reject(err);
      }),
  );
}

export function setDict() {}
