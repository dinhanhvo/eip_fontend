import { TreeNode } from 'primeng/api';

export class NodeUtil {
  public static sort(arr: TreeNode[]) {
    arr.sort(function(a, b) {
      let res: number = 0;
      if (a.data.prior == null) {
        a.data.prior = 1;
      }
      if (b.data.prior == null) {
        b.data.prior = 1;
      }
      res = (a.data.prior + '').localeCompare(b.data.prior + '');
      if (res == 0) {
        res = a.data.type.toLowerCase().localeCompare(b.data.type.toLowerCase());
      }
      if (res == 0 && a.label && b.label) {
        res = a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      }
      return res;
    });
    for (let node of arr) {
      if (node.children != undefined && node.children.length > 0) {
        this.sort(node.children);
      }
    }
  }

  /**remove nodes of trees */
  public static removeSelectedNodes(nodes: TreeNode[], trees: TreeNode[]) {
    for (let node of nodes) {
      if (this.isRootNode(node)) {
        let index = this.findNode(node, trees);
        if (index != -1) {
          trees.splice(index, 1);
        }
      } else {
        this.removeChildNode(node, trees);
      }
    }
  }

  /**
   * fun1 > item 1 > folder 1
   */
  public static removeChildNode(node: TreeNode, trees: TreeNode[]) {
    let allParents = this.getAllParents(node);
    let parent = allParents.pop();
    let nodes = trees;
    let index = -1;
    while (parent != null && parent != undefined) {
      index = this.findNode(parent, nodes);
      if (index != -1) {
        parent = allParents.pop();
        if (parent != null) {
          nodes = nodes[index].children;
        }
      } else {
        break;
      }
    }
    if (index != -1) {
      let rmNode = nodes[index];
      console.log(rmNode);
      nodes.splice(index, 1);
      this.removeEmptyNode(rmNode, trees);
    }
  }

  public static removeEmptyNode(node: TreeNode, trees: TreeNode[]) {
    let parent = node.parent;
    if (parent == null) {
      let index = this.findNode(node, trees);
      if (index != -1) {
        trees.splice(index, 1);
      }
    } else if (parent.children == null || parent.children.length == 0) {
      this.removeEmptyNode(parent, trees);
    }
  }

  public static insertSelectedNodesToTree(nodes: TreeNode[], trees: TreeNode[]) {
    for (let node of nodes) {
      if (this.isContainChildSelected(node, nodes)) continue;
      if (this.isRootNode(node)) {
        let index = this.findNode(node, trees);
        if (index == -1) {
          let cloneNode = this.cloneNode(node);
          trees.push(cloneNode);
        } else {
          for (let child of node.children) {
            this.insertNodeToTree(child, trees);
          }
        }
      } else {
        if (node.data.type == 'function') {
          let itemNode = this.processFuncItem(node);
          this.insertNodeToTree(itemNode, trees);
        } else {
          this.insertNodeToTree(node, trees);
        }
      }
    }
  }

  public static processFuncItem(node: TreeNode): TreeNode {
    let itemNode = node.parent;
    let funcNodes: TreeNode[] = itemNode.children;
    let cloneItemNode = this.cloneNode(itemNode);
    cloneItemNode.parent = itemNode.parent;
    let item = cloneItemNode.data.value;
    item.aggregateFunction = node.data.value.boId;
    funcNodes.forEach(element => {
      if ((item.aggregateFunction = element.data.value.boId)) {
        let index = cloneItemNode.label.lastIndexOf(element.label);
        if (index != -1) {
          cloneItemNode.label = cloneItemNode.label.substr(0, index);
          console.log(cloneItemNode.label);
        }
      }
    });
    if (node.data.value.type == 4) {
      cloneItemNode.icon = 'cdi cdi-item-numeric';
      cloneItemNode.label += ' ' + node.label;
    } else {
      cloneItemNode.icon = 'cdi cdi-item';
    }
    return cloneItemNode;
  }

  public static cloneNode(node: TreeNode): TreeNode {
    let clone: TreeNode = {
      label: node.label,
      data: node.data,
      icon: node.icon,
      type: node.type,
      expandedIcon: node.expandedIcon,
      collapsedIcon: node.collapsedIcon
    };
    if (node.children) {
      let childrens: TreeNode[] = [];
      for (let child of node.children) {
        let cloneChild = this.cloneNode(child);
        childrens.push(cloneChild);
        cloneChild.children = [];
      }
      clone.children = childrens;
    }
    return clone;
  }

  public static insertNodeToTree(node: TreeNode, trees: TreeNode[]) {
    let allParents = this.getAllParents(node);
    let parent: TreeNode = allParents.pop();
    while (parent != null) {
      let index = this.findNode(parent, trees);
      if (index == -1) {
        let cloneParent: TreeNode = {
          label: parent.label,
          data: parent.data,
          icon: parent.icon,
          type: parent.type,
          expandedIcon: parent.expandedIcon,
          collapsedIcon: parent.collapsedIcon
        };
        cloneParent.children = [];
        trees.push(cloneParent);
        index = trees.length - 1;
      }
      parent = allParents.pop();
      trees = trees[index].children;
      if (trees == null) {
        trees = [];
      }
    }
  }

  /**
   * return stack
   * child 1 > parent 1 > root
   */
  public static getAllParents(node: TreeNode) {
    let stack = [];
    stack.push(node);
    let parent = node.parent;
    while (parent != null) {
      stack.push(parent);
      parent = parent.parent;
    }
    return stack;
  }

  public static getRoot(node: TreeNode) {
    return this.getAllParents(node).pop();
  }

  public static isRootNode(node: TreeNode): boolean {
    return node.parent == null;
  }

  /**
   * func1 > item1 > folder1
   * item1 > folder1
   * return true if list2 contains all list 1
   */
  public static contains(list1: TreeNode[], list2: TreeNode[]): boolean {
    let ret = true;
    let max = list1.length;
    if (max > list2.length) {
      ret = false;
      return ret;
    }
    while (max-- > 0) {
      ret = ret && this.isEquals(list1.pop(), list2.pop());
    }
    return ret;
  }
  public static isContainChildSelected(node: TreeNode, selectedNodes: TreeNode[]): boolean {
    let ret = false;
    let parents = this.getAllParents(node);
    for (let element of selectedNodes) {
      let parentsSelected = this.getAllParents(element);
      if (parentsSelected.length <= parents.length) {
        continue;
      }
      if (this.contains(parents, parentsSelected)) {
        ret = true;
        break;
      }
    }
    return ret;
  }

  public static findNode(node: TreeNode, nodes: TreeNode[]) {
    let ret = -1;
    nodes.forEach((element, index) => {
      if (this.isEquals(element, node)) {
        ret = index;
      }
    });
    return ret;
  }

  public static isEquals(node1: TreeNode, node2: TreeNode): boolean {
  //   let ret: boolean = true;
  //   if (node1.label != node2.label) {
  //     ret = false;
  //   }
  //   if (node1.data.type != node2.data.type) {
  //     ret = false;
  //   }
  //   let baseBo1 = node1.data.value as BaseBo;
  //   let baseBo2 = node2.data.value as BaseBo;
  //   if (baseBo1.boId != baseBo2.boId) {
  //     ret = false;
  //   }
  //   if (node1.data.type == 'item' && node1.data.value.aggregateFunction != node2.data.value.aggregateFunction) {
  //     ret = false;
  //   }
  //   return ret;
  return false;
  }
    
}
