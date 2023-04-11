import {
  getGoodsList
} from './goods';

/**
 * @param {number} sort
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {string} keyword
 */

export function getSearchHistory() {
  return {
    historyWords: [
      '打印机',
      '电脑',
      '3d打印机',
      '示波器',
      '显微镜',

    ],
  };
}


export function getSearchResult() {
  return {
    pageNum: 1,
    pageSize: 30,
    totalCount: 1,
    spuList: getGoodsList(7),
  };
}