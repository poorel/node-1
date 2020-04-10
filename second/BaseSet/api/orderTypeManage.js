import axios from '@/libs/utils/http';

// 批量查询
export function batchQuery(formData) {
  return axios.post('/beetle/api_v1/dict/batchQuery', formData);
}

// 分页查询接口
export function getTable(params) {
  return axios.get('/beetle/api/v1/baseNoteType/pageQuery', {
    params,
  });
}

// 接口查询-仓库
export function warehouseQueryAll(params) {
  return axios.get('/beetle/api_v1/warehouse/query', {
    params,
  });
}
