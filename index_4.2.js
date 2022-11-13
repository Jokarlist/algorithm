class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * 判断一棵树是否是二叉搜索树
 *
 * 二叉搜索树：
 * 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 * 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 * 它的左、右子树也分别为二叉搜索树
 */

// 递归的方式
function isBST(head) {
  if (!head) {
    return true;
  }

  const inOrderList = [];
  proc(head, inOrderList);
  // let preVal = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < inOrderList.length; i++) {
    if (inOrderList[i - 1].value > inOrderList[i].value) {
      return false;
    }
    /* if (preVal > inOrderList[i].value) {
      return false;
    } else {
      preVal = inOrderList[i].value;
    } */
  }

  return true;
}

function proc(node, inOrderList) {
  if (!node) {
    return;
  }

  proc(node.left, inOrderList);
  inOrderList.push(node);
  proc(node.right, inOrderList);
}

const head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

// console.log(isBST(head));

// 非递归的方式
function inOrderUnRecur(head) {
  if (head) {
    let preVal = Number.MIN_SAFE_INTEGER;
    const stack = [];
    while (stack.length > 0 || head) {
      if (head) {
        stack.push(head);
        head = head.left;
      } else {
        head = stack.pop();
        if (head.value < preVal) {
          return false;
        } else {
          preVal = head.value;
        }

        head = head.right;
      }
    }
  }

  return true;
}

// console.log(inOrderUnRecur(head));

/**
 * 判断一棵树是否为完全二叉树
 *
 * 完全二叉树：
 * 要么某一层是满的，若不满的只可能是最后一层，即使不满这一层的结构也是从左到右依次变慢的样子
 *
 * 思路：
 * 完全二叉树满足以下两种条件：
 * 1、任一节点，只有右孩子没有左孩子则不是完全二叉树
 * 2、在条件 1 不违规下，若遇到第一个左右孩子不双全的节点，其接下来所有节点都必须为叶节点
 * 用 BFS 来解
 */
function isCBT(head) {
  if (!head) {
    return true;
  }

  const queue = [head];
  // 是否遇到左右两孩子不双全的节点
  let flag = false;
  let l = null;
  let r = null;
  while (queue.length > 0) {
    head = queue.pop();
    l = head.left;
    r = head.right;
    // 任一节点只有右孩子没有左孩子返回 false
    // 第一个左右孩子不双全节点后面，发现有孩子的节点，返回 false
    if ((!l && r) || (flag && (l || r))) {
      return false;
    }

    if (!l || !r) {
      flag = true;
    }

    l && queue.unshift(l);
    r && queue.unshift(r);
  }

  return true;
}

// console.log(isCBT(head));

/**
 * 树型 DP 题
 * 例如：判断二叉搜索树、判断满二叉树、判断平衡二叉树
 *
 * 解题套路：
 * 左子树给一些信息，右子树给一些信息，根将这些信息取并集向上返回
 */

/**
 * 判断平衡二叉树
 *
 * 思路：
 * 某一棵树是平衡二叉树满足以下条件：
 * 1、左子树是平衡的
 * 2、右子树是平衡的
 * 3、左右子树的高度差不超过 1
 */
function isBalancedTree(head) {
  return proc2(head).isBalanced;
}

function proc2(head) {
  if (!head) {
    return {
      isBalanced: true,
      height: 0,
    };
  }

  const leftData = proc2(head.left);
  const rightData = proc2(head.right);

  return {
    isBalanced:
      leftData.isBalanced &&
      rightData.isBalanced &&
      Math.abs(leftData.height - rightData.height) < 2,

    height: Math.max(leftData.height, rightData.height) + 1,
  };
}

const head2 = new Node(1);
head2.left = new Node(2);
head2.left.left = new Node(3);

// console.log(isBalancedTree(head2));

/**
 * 判断二叉搜索树
 *
 * 思路：
 * 某一棵树是二叉搜索树满足以下条件：
 * 1、左子树是二叉搜索树
 * 2、右子树是二叉搜索树
 * 3、左子树的最大值小于根节点
 * 4、右子树的最小值大于根节点
 */
function isBST2(head) {
  return proc3(head).isBST;
}

function proc3(head) {
  if (!head) {
    return null;
  }

  const leftData = proc3(head.left);
  const rightData = proc3(head.right);
  let min = head.value;
  let max = head.value;
  if (leftData) {
    // min = Math.min(min, leftData.min);
    max = Math.max(max, leftData.max);
  }

  if (rightData) {
    min = Math.min(min, rightData.min);
    // max = Math.max(max, rightData.max);
  }

  let isBST = true;
  if (leftData && (!leftData.isBST || leftData.max > head.value)) {
    isBST = false;
  }

  if (rightData && (!rightData.isBST || rightData.min < head.value)) {
    isBST = false;
  }

  return { isBST, min, max };
}

const head3 = new Node(9);
head3.left = new Node(7);
head3.right = new Node(11);
head3.left.left = new Node(6);
head3.left.right = new Node(8);
head3.right.left = new Node(10);
head3.right.right = new Node(11);

// console.log(isBST2(head3));

/**
 * 判断满二叉树
 *
 * 思路：
 * 某一棵树是满二叉树满足以下条件：
 * 整棵树的节点数 = 2 ^ 整棵树的高度 - 1
 */
function isFull(head) {
  if (!head) {
    return true;
  }

  const { height, nodes } = proc4(head);
  return nodes === 2 ** height - 1;
}

function proc4(head) {
  if (!head) {
    return {
      height: 0,
      nodes: 0,
    };
  }

  const leftData = proc4(head.left);
  const rightData = proc4(head.right);
  const height = Math.max(leftData.height, rightData.height) + 1;
  const nodes = leftData.nodes + rightData.nodes + 1;

  return { height, nodes };
}

// console.log(isFull(head3));

/**
 * 给定两个二叉树的节点 node1 和 node2，找到他们的最低公共祖先节点（LCA）
 */

// o1 和 o2 一定属于 head 为头的树
// 返回 o1 和 o2 的最低公共祖先
function lowestCommonAncestor(head, o1, o2) {
  const fatherMap = new Map();
  fatherMap.set(head, head);
  proc5(head, fatherMap);
  let set = new Set();
  let cur = o1;
  while (cur !== fatherMap.get(cur)) {
    set.add(cur);
    cur = fatherMap.get(cur);
  }

  set.add(head);
  cur = o2;
  while (cur !== fatherMap.get(cur)) {
    if (set.has(cur)) {
      return cur;
    }

    cur = fatherMap.get(cur);
  }

  return head;
}

function proc5(head, fatherMap) {
  if (!head) {
    return;
  }

  fatherMap.set(head.left, head);
  fatherMap.set(head.right, head);
  proc5(head.left, fatherMap);
  proc5(head.right, fatherMap);
}

/**
 * 两种情况：
 * 1、o1 是 o2 的 LCA，返回 o1，或 o2 是 o1 的 LCA，返回 o2
 * 2、o1 和 o2 不互为 LCA，向上汇聚才能找到 LCA
 */
function lca(head, o1, o2) {
  // head 为 null，直接返回 null
  // 或 o1 是 o2 的 LCA，直接返回 o1
  // 或 o2 是 o1 的 LCA，直接返回 o2
  if (!head || head === o1 || head === o2) {
    return head;
  }

  const left = lca(head.left, o1, o2);
  const right = lca(head.right, o1, o2);
  // 从 head 左右两边获得的都不为 null，此时父 head 就是 LCA，直接返回 head，向上汇聚
  if (left && right) {
    return head;
  }

  // 返回从 head 左右两边获得的不为 null 的那个，向上汇聚
  return left ? left : right;
}

const head4 = new Node(1);
head4.left = new Node(2);
head4.right = new Node(3);
head4.left.left = new Node(4);
head4.left.right = new Node(5);
head4.right.left = new Node(6);
head4.right.right = new Node(7);
head4.right.right.left = new Node(8);
const o1 = head.left.right;
const o2 = head.right.left;

// console.log(o1.value, o2.value);
// console.log(lowestCommonAncestor(head4, o1, o2).value);
// console.log(lca(head, o1, o2).value);

class PNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

/**
 * 在二叉树中找到一个节点的后继节点
 *
 * 上述结构比普通二叉树节点结构多了一个指向父节点的 parent 指针。假设有一棵 Node 类型的
 * 节点组成的二叉树，树中每个节点的 parent 指针都正确地指向自己的父节点，头节点的 parent
 * 指向 null。
 * 只给一个在二叉树中的某个节点 node，请实现返回 node 的后继节点的函数。
 * 在二叉树的中序遍历的序列中，node 的下一个节点叫作 node 的后继节点。
 */
function successorNode(node) {
  if (!node) {
    return node;
  }

  // 有右子树时，后继节点是右子树的最左节点
  if (node.right) {
    return getMostLeft(node.right);
  } else {
    // 没有右子树时，后继节点是当前节点往上走，当其为其父节点的左节点时
    // 该父节点即为后继节点
    let parent = node.parent;
    // parent 为 null 且 node 还不是其 parent 的左节点时，只有一种情况，就是该
    // node 为整棵树的最右节点
    while (parent && node !== parent.left) {
      node = parent;
      parent = node.parent;
    }

    return parent;
  }
}

function getMostLeft(node) {
  while (node.left) {
    node = node.left;
  }

  return node;
}

const head5 = new PNode(6);
head5.parent = null;
head5.left = new PNode(3);
head5.left.parent = head5;
head5.left.left = new PNode(1);
head5.left.left.parent = head5.left;
head5.left.left.right = new PNode(2);
head5.left.left.right.parent = head5.left.left;
head5.left.right = new PNode(4);
head5.left.right.parent = head5.left;
head5.left.right.right = new PNode(5);
head5.left.right.right.parent = head5.left.right;
head5.right = new PNode(9);
head5.right.parent = head5;
head5.right.left = new PNode(8);
head5.right.left.parent = head5.right;
head5.right.left.left = new PNode(7);
head5.right.left.left.parent = head5.right.left;
head5.right.right = new PNode(10);
head5.right.right.parent = head5.right;

// let test = head5.left.left;
// console.log(`${test.value} next: ${successorNode(test).value}`);
// test = head5.left.left.right;
// console.log(`${test.value} next: ${successorNode(test).value}`);

/**
 * 二叉树的序列化与反序列化
 * 
 * 就是内存里的一棵树如何变成字符串形式，又如何从字符串形式变成内存里的树
 *
 * 以先序遍历为例，中序、后序、层序思想等同
 */

// 二叉树的序列化 - 先序遍历
function serialByPre(head) {
  if (!head) {
    return "#_";
  }

  let res = head.value + "_";
  res += serialByPre(head.left);
  res += serialByPre(head.right);
  return res;
}

// 二叉树的反序列化 - 先序遍历
function reconByPreStr(preStr) {
  const values = preStr.substring(0, preStr.length - 1).split("_");
  const queue = [];
  for (let i = 0; i < values.length; i++) {
    queue.unshift(values[i]);
  }

  return reconPreOrder(queue);
}

function reconPreOrder(queue) {
  const value = queue.pop();
  if (value === "#") {
    return null;
  }

  const head = new Node(value);
  head.left = reconPreOrder(queue);
  head.right = reconPreOrder(queue);
  return head;
}

// console.log(reconByPreStr("1_#_2_#_#_"));

// 二叉树的序列化 - 层序遍历
function serialByLevel(head) {
  if (!head) {
    return "#_";
  }

  let res = head.value + "_";
  const queue = [head];
  while (queue.length > 0) {
    head = queue.pop();
    if (head.left) {
      res += head.left.value + "_";
      queue.unshift(head.left);
    } else {
      res += "#_";
    }

    if (head.right) {
      res += head.right.value + "_";
      queue.unshift(head.right);
    } else {
      res += "#_";
    }
  }

  return res;
}

// 二叉树的反序列化 - 层序遍历
function reconByLevelStr(levelStr) {
  const values = levelStr.substring(0, levelStr.length - 1).split("_");
  let idx = 0;
  const head = generateNodeByStr(values[idx++]);
  const queue = [];
  if (head) {
    queue.unshift(head);
  }

  let cur = null;
  while (queue.length > 0) {
    cur = queue.pop();
    cur.left = generateNodeByStr(values[idx++]);
    cur.right = generateNodeByStr(values[idx++]);
    if (cur.left) {
      queue.unshift(cur.left);
    }

    if (cur.right) {
      queue.unshift(cur.right);
    }
  }

  return head;
}

function generateNodeByStr(str) {
  if (!str || str === "#") {
    return null;
  }

  return new Node(Number(str));
}

// console.log(reconByLevelStr("1_2_3_4_5_6_7_"));

/**
 * 折纸问题
 * 
 * 请把一段纸条竖着放在桌子上，然后从纸条的下边向上方对折 1 次，压出折痕后展开。
 * 此时折痕是凹下去的，即折痕突起的方向指向纸条的背面。
 * 如果从纸条的下边向上方连续对折2次，压出折痕后展开，此时有三条折痕，从上到下依次是下折痕、下折痕和上折痕。
 * 
 * 给定一个输入参数 N，代表纸条都从下边向上方连续对折 N 次。
 * 请从上到下打印所有折痕的方向。
 * 例如：N=1时，打印 down；N=2时，打印 down down up
 */
function paperFolding(n) {
  proc6(1, n, true);
}

function proc6(i, n, down) {
  if (i > n) {
    return;
  }

  proc6(i + 1, n, true);
  console.log(down ? "凹" : "凸");
  proc6(i + 1, n, false);
}

// paperFolding(3);
