import { AdConstant, BUSINESS_OBJECT_TYPE } from './ad-constant';

const anyMatch = (subList: any[], list: any[]): boolean => {
  for (let item of subList) {
    let index = findIndex(item, list);
    if (index != -1) {
      return true;
    }
  }
  return false;
};

const composeItems = (set1: any[], set2: any[]) => {
  let res: any[] = [];
  for (let it of set1) {
    if (findIndex(it, res) < 0) {
      res.push(it);
    }
  }
  for (let it of set2) {
    if (findIndex(it, res) < 0) {
      res.push(it);
    }
  }
  return res;
};

const excludeItems = (items: any[], excItems: any[]) => {
  let res: any[] = [];
  for (let it of items) {
    if (findIndex(it, excItems) < 0) {
      res.push(it);
    }
  }
  return res;
};

const findIndex = (item: any, list: any[]) => {
  let index = -1;
  index = list.findIndex(ele => {
    if (item === null) {
      return ele === null;
    }
    if (ele === null) {
      return false;
    }
    return ele.boId == item.boId && ele.aggregateFunction == item.aggregateFunction;
  });
  return index;
};

const isCalculatedItem = (item: any): boolean => {
  return item && item.expType && item.expType === AdConstant.EXPT_CALCULATED_ITEM;
};

const isCalculation = (item: any): boolean => {
  return item && item.expType && item.expType === AdConstant.EXPT_CALCULATION;
};

const isColumnItem = (item: any): boolean => {
  return item && item.expType && item.expType === AdConstant.EXPT_COLUMN_ITEM;
};

const isDateItem = (item: any): boolean => {
  return item && item.expDataType && item.expDataType === AdConstant.DATATYPE_DATETIME;
};

const isFolderFO = (fd: any): boolean => {
  return fd && fd.businessObjectType && fd.businessObjectType === BUSINESS_OBJECT_TYPE.FOLDER_FO;
};

const isItemFO = (item: any): boolean => {
  return item && item.businessObjectType && item.businessObjectType == BUSINESS_OBJECT_TYPE.ITEM_FO;
};

const isNumericItem = (item: any): boolean => {
  return item && item.expDataType && item.expDataType === AdConstant.DATATYPE_NUMBER;
};

const isStringItem = (item: any): boolean => {
  return item && item.expDataType && item.expDataType === AdConstant.DATATYPE_VARCHAR;
};

const itemKey = (item: any) => {
  let res = {
    __class__: 'codix.report.bo.ItemIdFuncKey',
    itemId: item.boId,
    funcId: item.aggregateFunction
  };
  return res;
};

const itemKeyStr = (it: any) => {
  let k = it.itemKey;
  if (k === undefined || k === null) {
    return '';
  }
  let itId = k.itemId ? k.itemId : null;
  let fnId = k.funcId ? k.funcId : null;
  return `${itId}_${fnId}`;
};

const remove = (item: any, list: any[]) => {
  let index = findIndex(item, list);
  if (index != -1) {
    list.splice(index, 1);
  }
};

const removeList = (subList: any[], list: any[]) => {
  for (let item of subList) {
    remove(item, list);
  }
};

const retainItems = (items: any[], inItems: any[]): any[] => {
  let res: any[] = [];
  for (let it of items) {
    if (findIndex(it, inItems) > -1) {
      res.push(it);
    }
  }
  return res;
};

const ItemUtil = {
  anyMatch,
  composeItems,
  excludeItems,
  findIndex,
  isCalculatedItem,
  isCalculation,
  isColumnItem,
  isDateItem,
  isFolderFO,
  isItemFO,
  isNumericItem,
  isStringItem,
  itemKey,
  itemKeyStr,
  remove,
  removeList,
  retainItems
};

export { ItemUtil };
