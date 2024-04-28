// import { TreeNode } from 'primeng/api';
// import { NodeCons } from '../../constant';
// import { CommonFunc } from './common-func';
// import { ItemUtil } from './item-util';
// import { AdConstant } from './ad-constant';
// const compareNodes = (a: TreeNode, b: TreeNode): number => {
//   let dataA = a.data;
//   let dataB = b.data;
//   if (dataA.type === dataB.type) {
//     return a.label.localeCompare(b.label);
//   }
//   let types = [
//     NodeCons.FOLDER,
//     NodeCons.FOLDERFO,
//     NodeCons.COMPUTATION_FOLDER,
//     NodeCons.FILTER_FOLDER,
//     NodeCons.LOV_FOLDER,
//     NodeCons.ITEM,
//     NodeCons.FILTER,
//     NodeCons.JOIN,
//     NodeCons.LOVFO
//   ];

//   let idxA = types.indexOf(dataA.type);
//   let idxB = types.indexOf(dataB.type);
//   return idxA - idxB;
// };

// const getFilters = (nodes: TreeNode[]): any[] => {
//   if (nodes === undefined || nodes === null) {
//     return [];
//   }
//   let filters = [];
//   nodes.forEach(node => {
//     if (CommonFunc.isEmpty(node) || CommonFunc.isEmpty(node.data)) {
//       return;
//     }
//     let data = node.data;
//     if (data.type === NodeCons.FILTER) {
//       filters.push(data.value);
//       return;
//     }
//     if (data.type === NodeCons.FILTER_FOLDER) {
//       filters = [...filters, ...getFilters(node.children)];
//     }
//   });
//   return filters;
// };

// const getItems = (nodes: TreeNode[]): any[] => {
//   if (nodes === undefined || nodes === null) {
//     return [];
//   }
//   let items: any[] = [];
//   nodes.forEach(node => {
//     if (CommonFunc.isEmpty(node) || CommonFunc.isEmpty(node.data)) {
//       return;
//     }
//     let data = node.data;
//     if (data.type === NodeCons.ITEM) {
//       items.push(data.value);
//       return;
//     }
//     if (data.type === NodeCons.COMPUTATION_FOLDER || data.type === NodeCons.FOLDER || data.type === NodeCons.FOLDERFO) {
//       items = [...items, ...getItems(node.children)];
//     }
//   });
//   return items;
// };

// const getJoins = (nodes: TreeNode[]): any[] => {
//   if (nodes === undefined || nodes === null) {
//     return [];
//   }
//   let jps: any[] = [];
//   nodes.forEach(node => {
//     if (CommonFunc.isEmpty(node) || CommonFunc.isEmpty(node.data)) {
//       return;
//     }
//     let data = node.data;
//     if (data.type === NodeCons.JOIN) {
//       jps.push(data.value);
//       return;
//     }
//     if (data.type === NodeCons.FOLDER) {
//       jps = [...jps, ...getJoins(node.children)];
//     }
//   });
//   return jps;
// };

// const TreeUtil = { getFilters, getItems, getJoins };
// export { TreeUtil };

// export class ItemsTreeModel {
//   numAggs: any[] = [];
//   nonNumAggs: any[] = [];
//   isSortNodes: boolean = true;
//   private mTreeNodes: TreeNode[] = [];
//   private mSelNode: TreeNode;
//   private mSelNodes: TreeNode[] = [];
//   private mFolders: any[] = [];
//   private mFdItemsMap: any = {};
//   private mJoins: any[] = [];
//   private mFilters: any[] = [];
//   private mCalcs: any[] = [];
//   private mWidgets: any[] = [];
//   private mHasAggNodes: boolean = false;

//   get treeNodes() {
//     return this.mTreeNodes;
//   }

//   get hasAggNodes(): boolean {
//     return this.mHasAggNodes;
//   }

//   set hasAggNodes(val: boolean) {
//     this.mHasAggNodes = val;
//     //console.log('set has agg nodes', val);
//   }

//   constructor() {
//     this.isSortNodes = true;
//   }

//   addFilter(filter: any, pNode: TreeNode = null) {
//     if (pNode == null) {
//       pNode = this.getFiltersNode(true);
//     }
//     let node: TreeNode = {
//       label: filter.name,
//       data: { type: NodeCons.FILTER, value: filter, prior: 1 },
//       expandedIcon: 'cdi cdi-filter',
//       collapsedIcon: 'cdi cdi-filter'
//     };
//     let childNodes = pNode.children !== undefined ? [...pNode.children, node] : [node];
//     pNode.children = childNodes;
//     this.reIndex(pNode);
//   }

//   addFilters(filters: any[], pNode: TreeNode = null) {
//     for (let ft of filters) {
//       this.addFilter(ft, pNode);
//     }
//   }

//   addFolders(fds: any[], all: boolean = false) {
//     for (let fd of fds) {
//       this.addFolder(fd, all);
//     }
//   }

//   addFolder(fd: any, all: boolean = false) {
//     let node: TreeNode = this.getFolderNode(fd);
//     if (node !== null) {
//       //Folder alread exists
//       return;
//     }
//     let fdNode: TreeNode;
//     if (ItemUtil.isFolderFO(fd)) {
//       fdNode = {
//         label: fd.name,
//         data: { type: NodeCons.FOLDERFO, value: fd, prior: 2 },
//         expandedIcon: 'cdi cdi-cus-folder-o',
//         collapsedIcon: 'cdi cdi-cus-folder'
//       };
//     } else {
//       fdNode = {
//         label: fd.name,
//         data: { type: NodeCons.FOLDER, value: fd, prior: 1 },
//         expandedIcon: 'cdi cdi-folder-o',
//         collapsedIcon: 'cdi cdi-folder'
//       };
//     }
//     fdNode.children = [];
//     this.mTreeNodes.push(fdNode);
//     if (all) {
//       if (fd.items) {
//         this.addItems(fd.items, fdNode);
//       }
//       if (fd.joins) {
//         this.addJoins(fd.joins, fdNode);
//       }
//       if (fd.conditions) {
//         this.addFilters(fd.conditions, fdNode);
//       }
//     }
//     this.reIndex();
//   }

//   addItem(item: any, pNode: TreeNode = null) {
//     if (pNode == null) {
//       //check if calculation
//       if (item.folder === undefined) {
//         pNode = this.getCalculationsNode(true);
//       } else {
//         if (ItemUtil.isItemFO(item)) {
//           pNode = this.getFolderNode(item.folder);
//         } else if (ItemUtil.isCalculation(item)) {
//           pNode = this.getCalculationsNode(true);
//         }
//         pNode = this.getFolderNode(item.folder);
//       }
//       if (pNode == null) {
//         console.log('Failed to get parent node to insert item', item);
//         return;
//       }
//     }
//     let itNode = this.getItemNode(item, pNode);
//     if (itNode !== null) {
//       console.log('Item already exists in the tree', itNode);
//       return;
//     }
//     itNode = this.buildItemNode(item);
//     let nodes = pNode.children !== undefined ? [...pNode.children, itNode] : [itNode];
//     if (this.isSortNodes) {
//       nodes.sort(compareNodes);
//     }
//     pNode.children = nodes;
//     this.reIndex(pNode);
//   }

//   addParam(param: any, pNode: TreeNode = null) {
//     if (pNode == null) {
//       pNode = this.getParamsNode(true);
//     }
//     let node: TreeNode = {
//       label: param.name,
//       data: { type: NodeCons.PARAM, value: param, prior: 1 },
//       expandedIcon: 'cdi cdi-filter',
//       collapsedIcon: 'cdi cdi-filter'
//     };
//     let childNodes = pNode.children !== undefined ? [...pNode.children, node] : [node];
//     pNode.children = childNodes;
//     this.reIndex(pNode);
//   }

//   addParams(params: any[], pNode: TreeNode = null) {
//     for (let p of params) {
//       this.addParam(p, pNode);
//     }
//   }
//   private isNumFunc(func) {
//     return func && func.dataType == AdConstant.DATATYPE_NUMBER;
//   }

//   private buildItemNode(item: any): TreeNode {
//     let res: TreeNode = {
//       label: item.aggName,
//       data: { type: NodeCons.ITEM, value: item, prior: 1 },
//       icon: ItemUtil.isNumericItem(item) || item.aggregateFunction != 110 ? 'cdi cdi-item-numeric' : 'cdi cdi-item'
//     };
//     //if (!this.mHasAggNodes) {
//     //return res;
//     //}
//     let aggs = [...this.nonNumAggs];
//     if (ItemUtil.isNumericItem(item)) {
//       aggs = [...this.numAggs];
//     }
//     let aggNodes: TreeNode[] = [];
//     for (let agg of aggs) {
//       let aggNode: TreeNode = {
//         label: agg.name,
//         icon: 'cdi cdi-function',
//         data: {
//           type: NodeCons.FUNCTION,
//           value: agg
//         }
//       };
//       aggNodes.push(aggNode);
//     }
//     res.children = [...aggNodes];
//     return res;
//   }

//   addItems(items: any[], pNode: TreeNode = null) {
//     for (let it of items) {
//       this.addItem(it, pNode);
//     }
//   }

//   addJoin(joinp: any) {
//     let join = joinp.join;

//     let masNode = this.getFolderNode(join.masterFolder);
//     if (masNode !== null) {
//       let curNode = this.getJpNode(joinp, masNode);
//       if (curNode !== null) {
//         console.log('joinp node master side exist, do not insert', joinp);
//       } else {
//         let icon = 'cdi-join-master';
//         let joinNode: TreeNode = {
//           label: join.name,
//           data: { type: NodeCons.JOIN, value: joinp, prior: 2 },
//           expandedIcon: 'cdi ' + icon,
//           collapsedIcon: 'cdi ' + icon
//         };
//         let cNodes = masNode.children != undefined ? [...masNode.children, joinNode] : [joinNode];
//         if (this.isSortNodes) {
//           cNodes.sort(compareNodes);
//         }
//         masNode.children = cNodes;
//         this.reIndex(masNode);
//       }
//     }

//     let detNode = this.getFolderNode(join.detailFolder);
//     if (detNode !== null) {
//       let curNode = this.getJpNode(joinp, detNode);
//       if (curNode !== null) {
//         console.log('joinp node detail side exist, do not insert', joinp);
//       } else {
//         let icon = 'cdi-join-detail';
//         let joinNode: TreeNode = {
//           label: join.name,
//           data: { type: NodeCons.JOIN, value: joinp, prior: 2 },
//           expandedIcon: 'cdi ' + icon,
//           collapsedIcon: 'cdi ' + icon
//         };
//         let cNodes = detNode.children != undefined ? [...detNode.children, joinNode] : [joinNode];
//         if (this.isSortNodes) {
//           cNodes.sort(compareNodes);
//         }
//         detNode.children = cNodes;
//         this.reIndex(detNode);
//       }
//     }
//   }

//   addJoins(joinps: any[], pNode: TreeNode = null) {
//     for (let jp of joinps) {
//       this.addJoin(jp);
//     }
//   }

//   addLov(lov: any, pNode: TreeNode = null) {
//     console.log('adding lov', lov);
//     if (pNode === null) {
//       pNode = this.getLovsNode(true);
//     }
//     let lovNode: TreeNode = {
//       label: lov.name,
//       data: {
//         type: NodeCons.LOVFO,
//         value: lov
//       },
//       expandedIcon: 'cdi cdi-cus-lov',
//       collapsedIcon: 'cdi cdi-cus-lov'
//     };
//     let cNodes = pNode.children !== undefined ? [...pNode.children, lovNode] : [lovNode];
//     if (this.isSortNodes) {
//       cNodes.sort(compareNodes);
//     }
//     pNode.children = cNodes;
//     this.reIndex(pNode);
//   }

//   addLovs(lovs: any[], pNode: TreeNode = null) {
//     for (let lov of lovs) {
//       this.addLov(lov, pNode);
//     }
//   }

//   addRoot(rNode: TreeNode) {
//     this.mTreeNodes.push(rNode);
//     this.reIndex();
//   }

//   addTotal(total: any, pNode: TreeNode = null) {
//     //console.log('add total', total);
//     if (pNode === null) {
//       pNode = this.getTotalsNode(true);
//     }
//     let totalNode: TreeNode = {
//       label: total.name,
//       data: {
//         type: NodeCons.TOTAL,
//         value: total
//       },
//       expandedIcon: 'cdi cdi-total',
//       collapsedIcon: 'cdi cdi-total'
//     };
//     let cNodes = pNode.children !== undefined ? [...pNode.children, totalNode] : [totalNode];
//     //console.log('new cnodes', cNodes);
//     if (this.isSortNodes) {
//       cNodes.sort(compareNodes);
//     }
//     pNode.children = cNodes;
//     this.reIndex(pNode);
//   }

//   addTotals(totals: any[], pNode: TreeNode = null) {
//     for (let total of totals) {
//       this.addTotal(total, pNode);
//     }
//   }

//   getCalculationsNode(create: boolean = false): TreeNode {
//     for (let node of this.mTreeNodes) {
//       if (node.data.type === NodeCons.COMPUTATION_FOLDER) {
//         return node;
//       }
//     }
//     if (!create) {
//       return null;
//     }
//     let caNode: TreeNode = {
//       label: 'tree.calcs',
//       data: { type: NodeCons.COMPUTATION_FOLDER, value: '', prior: 4 },
//       expandedIcon: 'cdi cdi-calcs-folder-o',
//       collapsedIcon: 'cdi cdi-calcs-folder'
//     };
//     this.mTreeNodes.push(caNode);
//     if (this.isSortNodes) {
//       this.mTreeNodes.sort(compareNodes);
//     }
//     this.reIndex();
//     return caNode;
//   }

//   getFiltersNode(create: boolean = false): TreeNode {
//     for (let node of this.mTreeNodes) {
//       if (node.data.type === NodeCons.FILTER_FOLDER) {
//         return node;
//       }
//     }
//     if (!create) {
//       return null;
//     }
//     let filtersNode: TreeNode = {
//       label: 'tree.filters',
//       data: { type: NodeCons.FILTER_FOLDER, value: '', prior: 5 },
//       expandedIcon: 'cdi cdi-filters-folder-o',
//       collapsedIcon: 'cdi cdi-filters-folder'
//     };
//     this.mTreeNodes.push(filtersNode);
//     if (this.isSortNodes) {
//       this.mTreeNodes.sort(compareNodes);
//     }
//     this.reIndex();
//     return filtersNode;
//   }

//   getItems(incCalcs: boolean = false): any[] {
//     let res: any[] = [];
//     let fdNodes = [];
//     for (let node of this.mTreeNodes) {
//       if (node.data.type !== NodeCons.FOLDER && node.data.type !== NodeCons.FOLDERFO) {
//         continue;
//       }
//       let cNodes = node.children;
//       if (cNodes === undefined) {
//         continue;
//       }
//       fdNodes.push(node);
//     }
//     for (let fdNode of fdNodes) {
//       let cNodes = fdNode.children;
//       for (let itNode of cNodes) {
//         if (itNode.data.type == NodeCons.ITEM) {
//           res.push(itNode.data.value);
//         }
//       }
//     }
//     if (incCalcs) {
//       res.push(...this.getCalcs());
//     }
//     return res;
//   }

//   getCalcs(): any[] {
//     let res: any[] = [];
//     let calcsNode = this.getCalculationsNode();
//     if (calcsNode == null || calcsNode.children == undefined) {
//       return res;
//     }
//     for (let itNode of calcsNode.children) {
//       if (itNode.data.type == NodeCons.ITEM) {
//         res.push(itNode.data.value);
//       }
//     }
//     return res;
//   }

//   getLovsNode(create: boolean = false): TreeNode {
//     for (let node of this.mTreeNodes) {
//       if (node.data.type === NodeCons.LOV_FOLDER) {
//         return node;
//       }
//     }
//     if (!create) {
//       return null;
//     }
//     let filtersNode: TreeNode = {
//       label: 'tree.lovs',
//       data: { type: NodeCons.LOV_FOLDER, value: '', prior: 5 },
//       expandedIcon: 'cdi cdi-lovs-folder-o',
//       collapsedIcon: 'cdi cdi-lovs-folder'
//     };
//     this.mTreeNodes.push(filtersNode);
//     if (this.isSortNodes) {
//       this.mTreeNodes.sort(compareNodes);
//     }
//     this.reIndex();
//     return filtersNode;
//   }

//   getFilterNode(fil: any, pNode: TreeNode = null): TreeNode {
//     if (pNode === null) {
//       if (fil.conditionFolder) {
//         pNode = this.getFolderNode(fil.conditionFolder);
//       } else {
//         pNode = this.getFiltersNode(true);
//       }
//       if (pNode === null) {
//         console.log('Folder node of filter not found', fil);
//         return null;
//       }
//       return this.getFilterNode(fil, pNode);
//     }
//     let cNodes = pNode.children;
//     if (cNodes !== undefined) {
//       for (let cn of cNodes) {
//         let data = cn.data;
//         if (data.type == NodeCons.FILTER && data.value.boId == fil.boId) {
//           return cn;
//         }
//       }
//     }
//     return null;
//   }

//   getFilters(): any[] {
//     let res = [];
//     let node: TreeNode = this.getFiltersNode();
//     if (node === null) {
//       return res;
//     }
//     let cNodes = node.children;
//     if (cNodes !== undefined) {
//       for (let cn of cNodes) {
//         let data = cn.data;
//         if (data.type === NodeCons.FILTER) {
//           res.push(data.value);
//         }
//       }
//     }

//     for (let mNode of this.mTreeNodes) {
//       let data = mNode.data;
//       if (data.type !== NodeCons.FOLDER) {
//         continue;
//       }
//       let cNodes = mNode.children;
//       if (cNodes === undefined) {
//         continue;
//       }
//       for (let cn of cNodes) {
//         let data2 = cn.data;
//         if (data2.type === NodeCons.FILTER) {
//           res.push(cn);
//         }
//       }
//     }
//     return res;
//   }

//   getFolders(): any[] {
//     let nodes = this.mTreeNodes.filter(node => {
//       let type = node.data.type;
//       return type === NodeCons.FOLDER || type === NodeCons.FOLDERFO;
//     });
//     let res: any[] = nodes.map(node => {
//       return node.data.value;
//     });
//     return res;
//   }

//   getFolderNode(fd: any): TreeNode {
//     if (!fd) {
//       return null;
//     }
//     let fdId = CommonFunc.isNumber(fd) ? fd : fd.id;
//     let ind: number = 0;
//     for (let node of this.mTreeNodes) {
//       let data = node.data;
//       let type = data.type;
//       if (type !== NodeCons.FOLDER && type !== NodeCons.FOLDERFO) {
//         continue;
//       }
//       let valObj = data.value;
//       if (valObj && valObj.id === fdId) {
//         data.index = ind;
//         return node;
//       }
//       ind++;
//     }
//     return null;
//   }

//   getItemNode(item: any, pNode: TreeNode = null): TreeNode {
//     if (pNode === null) {
//       return null;
//     }
//     let cNodes = pNode.children;
//     if (cNodes !== undefined) {
//       for (let cn of cNodes) {
//         let data = cn.data;
//         if (
//           data.type == NodeCons.ITEM &&
//           data.value.boId == item.boId &&
//           data.value.aggregateFunction == item.aggregateFunction
//         ) {
//           return cn;
//         }
//       }
//     }
//     return null;
//   }

//   getJpNodes(joinp: any): TreeNode[] {
//     let res: TreeNode[] = [];
//     let join = joinp.join;
//     let mfNode = this.getFolderNode(join.masterFolder);
//     if (mfNode !== null) {
//       let node = this.getJpNode(joinp, mfNode);
//       if (node !== null) {
//         res.push(node);
//       }
//     }
//     let dtNode = this.getFolderNode(join.detailFolder);
//     if (dtNode !== null) {
//       let node = this.getJpNode(joinp, dtNode);
//       if (node !== null) {
//         res.push(node);
//       }
//     }
//     return res;
//   }

//   getJpNode(joinp: any, pNode: TreeNode = null): TreeNode {
//     if (pNode == null) {
//       return null;
//     }
//     let cNodes = pNode.children !== undefined ? [...pNode.children] : [];
//     for (let cn of cNodes) {
//       let data = cn.data;
//       if (data.type === NodeCons.JOIN && data.value.boId === joinp.boId) {
//         return cn;
//       }
//     }
//     return null;
//   }

//   getJoinPs(): any[] {
//     let res: any[] = [];
//     let jps: any = {};
//     for (let mNode of this.mTreeNodes) {
//       let data = mNode.data;
//       if (data.type !== NodeCons.FOLDER) {
//         continue;
//       }
//       let cNodes = mNode.children;
//       if (cNodes === undefined) {
//         continue;
//       }
//       for (let cn of cNodes) {
//         let data2 = cn.data;
//         if (data2.type === NodeCons.JOIN) {
//           jps[data2.value.boId] = data2.value;
//         }
//       }
//     }
//     res = Object.values(jps);
//     return res;
//   }

//   getLovNode(lov: any): TreeNode {
//     if (lov === null || lov === undefined) {
//       return null;
//     }
//     let pNode = this.getLovsNode();
//     if (pNode === null) {
//       return null;
//     }
//     let cNodes = pNode.children !== undefined ? [...pNode.children] : [];
//     for (let cn of cNodes) {
//       let data = cn.data;
//       if (data.type === NodeCons.LOVFO && data.value.boId === lov.boId) {
//         return cn;
//       }
//     }
//     return null;
//   }

//   getParamsNode(create: boolean = false): TreeNode {
//     for (let node of this.mTreeNodes) {
//       if (node.data.type === NodeCons.PARAM_FOLDER) {
//         return node;
//       }
//     }
//     if (!create) {
//       return null;
//     }
//     let paramsNode: TreeNode = {
//       label: 'Parameters',
//       data: { type: NodeCons.PARAM_FOLDER, value: '', prior: 5 },
//       expandedIcon: 'cdi cdi-filters-folder-o',
//       collapsedIcon: 'cdi cdi-filters-folder'
//     };
//     this.mTreeNodes.push(paramsNode);
//     if (this.isSortNodes) {
//       this.mTreeNodes.sort(compareNodes);
//     }
//     this.reIndex();
//     return paramsNode;
//   }

//   getTotals(): any[] {
//     let totals = [];
//     let totalNode: TreeNode = this.getTotalsNode();
//     if (totalNode === null) {
//       return totals;
//     }
//     let cNodes: TreeNode[] = totalNode.children;
//     if (cNodes !== undefined && cNodes !== null) {
//       for (let node of cNodes) {
//         totals.push(node.data.value);
//       }
//     }
//     return totals;
//   }

//   getTotalsNode(create: boolean = false): TreeNode {
//     for (let node of this.mTreeNodes) {
//       if (node.data.type === NodeCons.TOTAL_FOLDER) {
//         return node;
//       }
//     }
//     if (!create) {
//       return null;
//     }
//     let totalsNode: TreeNode = {
//       label: 'Totals',
//       data: { type: NodeCons.TOTAL_FOLDER, value: '', prior: 5 },
//       expandedIcon: 'cdi cdi-totals-folder-o',
//       collapsedIcon: 'cdi cdi-totals-folder'
//     };
//     this.mTreeNodes.push(totalsNode);
//     if (this.isSortNodes) {
//       this.mTreeNodes.sort(compareNodes);
//     }
//     this.reIndex();
//     return totalsNode;
//   }

//   getTotalNode(total: any): TreeNode {
//     if (total === null || total === undefined) {
//       return null;
//     }
//     let pNode = this.getTotalsNode();
//     if (pNode === null) {
//       return null;
//     }
//     let cNodes = pNode.children !== undefined ? [...pNode.children] : [];
//     let res = cNodes.find(n => {
//       return n.data.type === NodeCons.TOTAL && n.data.value.boId === total.boId;
//     });
//     if (res === undefined) {
//       res = null;
//     }
//     return res;
//   }

//   isCalcsNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.COMPUTATION_FOLDER;
//   }

//   isFilterNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.FILTER;
//   }

//   isFiltersNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.FILTER_FOLDER;
//   }

//   isFolderNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.FOLDER || node.data.type === NodeCons.FOLDERFO;
//   }

//   isItemNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.ITEM;
//   }

//   isJoinNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.JOIN;
//   }

//   isLovNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.LOVFO;
//   }

//   isLovsNode(node: TreeNode): boolean {
//     if (node === null || node === undefined) {
//       return false;
//     }
//     return node.data.type === NodeCons.LOV_FOLDER;
//   }

//   reIndex(pNode: TreeNode = null) {
//     if (pNode == null) {
//       let idx = 0;
//       for (let node of this.mTreeNodes) {
//         node.data.index = idx;
//         idx++;
//         this.reIndex(node);
//       }
//       return;
//     }
//     let cNodes = pNode.children;
//     if (cNodes !== undefined) {
//       let idx = 0;
//       for (let node of cNodes) {
//         node.data.index = idx;
//         idx++;
//         this.reIndex(node);
//       }
//     }
//   }

//   removeFiltersNode() {
//     let node = this.getFiltersNode(false);
//     if (node !== null) {
//       this.removeNode(node);
//     }
//   }

//   removeNode(node: TreeNode, inList: TreeNode[] = null): TreeNode[] {
//     if (node === null || node === undefined) {
//       return null;
//     }
//     if (inList !== null) {
//       let nodeIdx = node.data.index;
//       let remNode = inList[nodeIdx];
//       let okRem = node === remNode;
//       if (!okRem) {
//         return inList;
//       }
//       let newNodes: TreeNode[] = [...inList.slice(0, nodeIdx), ...inList.slice(nodeIdx + 1)];
//       let idx = 0;
//       for (let cn of newNodes) {
//         cn.data.index = idx++;
//       }
//       return newNodes;
//     }
//     if (this.isFolderNode(node) || this.isLovsNode(node) || this.isCalcsNode(node) || this.isFiltersNode(node)) {
//       this.mTreeNodes = this.removeNode(node, this.mTreeNodes);
//       return;
//     }

//     let pNodes = [];
//     if (this.isJoinNode(node)) {
//       let jNodes: TreeNode[] = this.getJpNodes(node.data.value);
//       console.log('jp nodes', jNodes);
//       pNodes = jNodes.map(n => n.parent);
//     } else {
//       let pNode = node.parent;
//       if (pNode !== null && pNode !== undefined) {
//         pNodes.push(pNode);
//       }
//     }

//     for (let pNode of pNodes) {
//       let chNodes = pNode.children;
//       if (chNodes !== undefined) {
//         let newNodes = this.removeNode(node, chNodes);
//         pNode.children = newNodes;
//       }
//     }
//   }
// }
