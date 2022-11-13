class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * 递归式的先序、中序、后序遍历
 * 就是借助递归序会回到自己几次的规律，控制在第几次打印的思想
 */

// 先序遍历（DFS）
function preOrderRecur(head) {
  if (!head) {
    return null;
  }

  console.log(head.value);
  preOrderRecur(head.left);
  preOrderRecur(head.right);
}

// 中序遍历
function inOrderRecur(head) {
  if (!head) {
    return null;
  }

  inOrderRecur(head.left);
  console.log(head.value);
  inOrderRecur(head.right);
}

// 后序遍历
function postOrderRecur(head) {
  if (!head) {
    return null;
  }

  postOrderRecur(head.left);
  postOrderRecur(head.right);
  console.log(head.value);
}

/**
 * 非递归式的先序、中序、后序遍历
 * 就是将递归式时系统的自己压栈，改成自己来控制
 */

/**
 * 先序遍历（DFS）
 * 思路：
 * 1、每次从栈中弹出一个节点 cur
 * 2、打印（处理）cur
 * 3、先把 cur 的右孩子压到栈中（如果有），再把 cur 的左孩子压到栈中（如果有）
 * 4、重复 1-3 步
 */
function preOrderUnRecur(head) {
  if (head) {
    const stack = [];
    stack.push(head);
    while (stack.length > 0) {
      head = stack.pop();
      console.log(head.value);
      head.right && stack.push(head.right);
      head.left && stack.push(head.left);
    }
  }
}

/**
 * 中序遍历
 * 思路：
 * 每颗子树，整棵树左边界进栈，依次弹的过程中，打印（处理），对弹出节点的右子树重复上述操作
 */
function inOrderUnRecur(head) {
  if (head) {
    const stack = [];
    while (stack.length > 0 || head) {
      if (head) {
        stack.push(head);
        head = head.left;
      } else {
        head = stack.pop();
        console.log(head.value);
        head = head.right;
      }
    }
  }
}

/**
 * 后序遍历
 * 思路：
 * 原始栈的入栈为 头-左-右，则收集栈的入栈为 头-右-左，最后出栈为 左-右-头，即中序遍历
 * 1、每次从原始栈中弹出一个节点 cur
 * 2、把当前节点压入收集栈中
 * 3、原始栈先压左孩子再压右孩子
 * 4、重复 1-3 步
 */
function postOrderUnRecur(head) {
  if (head) {
    const s1 = [];
    const s2 = [];
    s1.push(head);
    while (s1.length > 0) {
      head = s1.pop();
      s2.push(head);
      head.left && s1.push(head.left);
      head.right && s1.push(head.right);
    }

    while (s2.length > 0) {
      console.log(s2.pop().value);
    }
  }
}

const head = new Node(5);
head.left = new Node(3);
head.right = new Node(8);
head.left.left = new Node(2);
head.left.right = new Node(4);
head.left.left.left = new Node(1);
head.right.left = new Node(7);
head.right.left.left = new Node(6);
head.right.right = new Node(10);
head.right.right.left = new Node(9);
head.right.right.right = new Node(11);

// postOrderUnRecur(head);

/**
 * 宽度优先遍历（层序遍历）
 * 思路：
 * 使用队列来实现。头节点先入列，出列后打印（处理），其子节点先入左再入右
 */
function bfs(head) {
  if (!head) {
    return null;
  }

  const queue = [];
  queue.push(head);
  while (queue.length > 0) {
    const cur = queue.pop();
    console.log(cur.value);
    cur.left && queue.unshift(cur.left);
    cur.right && queue.unshift(cur.right);
  }
}

const head2 = new Node(1);
head2.left = new Node(2);
head2.right = new Node(3);
head2.left.left = new Node(4);
head2.left.right = new Node(5);
head2.right.left = new Node(6);
head2.right.right = new Node(7);

// bfs(head2);

/**
 * 二叉树BFS的应用
 * 
 * 求一颗二叉树的最大宽度
 */
function getMaxWidth(head) {
  if (!head) {
    return 0;
  }

  const queue = [head];
  // 表示当前层的最后一个节点
  let curEnd = head;
  // 表示当前层的下一层的最后一个节点
  let nextEnd = null;
  // 表示当前层发现的节点数
  let curLevelNode = 0;
  let max = 0;
  while (queue.length > 0) {
    const cur = queue.pop();
    curLevelNode++;
    if (cur.left) {
      queue.unshift(cur.left);
      nextEnd = cur.left;
    }

    if (cur.right) {
      queue.unshift(cur.right);
      nextEnd = cur.right;
    }

    if (cur === curEnd) {
      max = Math.max(max, curLevelNode);
      curLevelNode = 0;
      curEnd = nextEnd;
      nextEnd = null;
    }
  }

  return max;
}

// console.log(getMaxWidth(head2));

/**
 * 打印一颗二叉树的所有最右节点
 * 
 * 思路：宽度优先遍历
 */
function printAllRightNode(head) {
  if (!head) {
    return null;
  }

  let queue = [head];
  let help = [head];
  while (queue.length > 0) {
    console.log(help[help.length - 1].value);
    help = [];
    for (let i = 0; i < queue.length; i++) {
      queue[i].left && help.push(queue[i].left);
      queue[i].right && help.push(queue[i].right);
    }

    queue = [...help];
  }
}

// printAllRightNode(head2);
