// import { ItemsTreeCtx } from '../model';
// // import { ItemsTreeModel } from './items-tree-model';
// import { TreeNode } from 'primeng/api';
// import { CommonFunc } from './common-func';
// import { TranslateService } from '@ngx-translate/core';

// const buildDataAcqTree = (shModel: any, ctx: ItemsTreeCtx): ItemsTreeModel => {
//   //console.log('sheet model', shModel);

//   let wbContent = ctx.wbContent;

//   let wbCalcs = [...wbContent.calculations];
//   let wbFilters = [...wbContent.conditions];

//   let dataAcqTree = new ItemsTreeModel();
//   if (ctx.nonNumAggs || ctx.numAggs) {
//     dataAcqTree.nonNumAggs = [...ctx.nonNumAggs];
//     dataAcqTree.numAggs = [...ctx.numAggs];
//     dataAcqTree.hasAggNodes = true;
//   }

//   dataAcqTree.addFolders(shModel.folders);
//   dataAcqTree.addFolders(shModel.customFolders);
//   let items: any[] = Object.values(shModel.itemsMap);
//   dataAcqTree.addItems(items);

//   let caIds = shModel.calculations;
//   let calcs = [];
//   for (let caId of caIds) {
//     let ca = wbCalcs.find(elm => {
//       return elm.boId === caId;
//     });
//     if (ca !== undefined) {
//       calcs.push(ca);
//     }
//   }
//   dataAcqTree.addItems(calcs);

//   let filIds = shModel.conditions;
//   let filters: any[] = [];
//   for (let filId of filIds) {
//     let fil = wbFilters.find(elm => {
//       return elm.boId === filId;
//     });
//     if (fil !== undefined) {
//       filters.push(fil);
//     }
//   }
//   dataAcqTree.addFilters(filters);
//   dataAcqTree.addJoins(shModel.joins);

//   let lovs = shModel.customLovs;
//   dataAcqTree.addLovs(lovs);

//   transLabels(dataAcqTree, ctx.trans);

//   return dataAcqTree;
// };

// const getWidgets = (sh: any): any[] => {
//   let objs = Object.values(sh.sheetModel.widgets);
//   return [...objs];
// };

// const transLabels = (tree: ItemsTreeModel, trans: TranslateService) => {
//   if (trans) {
//     let nodes: TreeNode[] = [tree.getCalculationsNode(), tree.getFiltersNode(), tree.getLovsNode()];
//     nodes
//       .filter(n => !CommonFunc.isEmpty(n))
//       .forEach(n => {
//         trans.get(n.label).subscribe(val => {
//           n.label = val;
//         });
//       });
//   }
// };

// const SheetUtil = {
//   buildDataAcqTree,
//   getWidgets,
//   transLabels
// };

// export { SheetUtil };
