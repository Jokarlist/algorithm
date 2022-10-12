class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/* class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.last = null;
  }
} */

const node1 = new Node(2);
node1.next = new Node(3);
node1.next.next = new Node(5);
node1.next.next.next = new Node(6);

const node2 = new Node(1);
node2.next = new Node(2);
node2.next.next = new Node(5);
node2.next.next.next = new Node(7);
node2.next.next.next.next = new Node(8);

/**
 * 反转单向和双向链表
 *
 * 题目：分别实现反转单向链表和反转双向链表的函数
 * 要求：如果链表长度为 N，时间复杂度要求为 O(N)，额外空间复杂度要求为 O(1)
 */

function reveseList() {}

/**
 * 打印两个有序链表的公共部分
 *
 * 题目：给定两个有序链表的头指针 head1 和 head2，打印两个链表的公共部分
 * 要求：如果两个链表的长度之和为 N，时间复杂度要求为 O(N)，额外空间复杂度要求为 O(1)
 */

function printCommonPart(head1, head2) {
  let res = "Common Part: ";
  while (head1 && head2) {
    if (head1.value < head2.value) {
      head1 = head1.next;
    } else if (head1.value > head2.value) {
      head2 = head2.next;
    } else {
      res += head1.value + " ";
      head1 = head1.next;
      head2 = head2.next;
    }
  }

  console.log(res);
}

// printCommonPart(node1, node2);

/**
 * 判断一个链表是否是回文结构
 *
 * 题目：给定一个单链表的头节点head,请判断该链表是否为回文结构
 * 例子：1->2->1，返回true；1->2->2->1，返回true；15->6->15，返回true；1->2->3，返回false
 * 要求：如果链表长度为 N，时间复杂度达到 O(N)，额外空间复杂度达到 O(1)
 */

// 需要 n 额外的空间
function isPalindrome(head) {
  if (!head || !head.next) {
    return true;
  }

  const stack = [];
  let cur = head;
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }

  while (head) {
    if (head.value !== stack.pop().value) {
      return false;
    }

    head = head.next;
  }

  return true;
}

// 需要 n/2 额外的空间
function isPalindrome2(head) {
  if (!head || !head.next) {
    return true;
  }

  let right = head.next;
  let cur = head;
  while (cur.next && cur.next.next) {
    // 最终 right -> mid.next，奇数时 mid 直接为中点位置，偶数时对称轴下一个结点为 mid
    right = right.next;
    // 最终 cur -> end，奇数时 end 为最后一个结点，偶数时 end 为倒数第一个结点
    cur = cur.next.next;
  }

  const stack = [];
  while (right) {
    stack.push(right);
    right = right.next;
  }

  while (stack.length) {
    if (head.value !== stack.pop().value) {
      return false;
    }

    head = head.next;
  }

  return true;
}

// 需要 O(1) 额外的空间
function isPalindrome3(head) {
  if (!head || !head.next) {
    return true;
  }

  let n1 = head;
  let n2 = head;
  // 找到中点
  while (n2.next && n2.next.next) {
    // 最终 n1 -> mid
    n1 = n1.next;
    // 最终 n2 -> end
    n2 = n2.next.next;
  }

  // 保存链表右侧部分的第一个结点
  n2 = n1.next;
  // mid.next -> null
  n1.next = null;
  let n3 = null;
  // 链表右侧部分逆序
  while (n2) {
    // 保存当前结点下一个结点
    n3 = n2.next;
    // 当前结点向上一个结点（逆序）
    n2.next = n1;
    // n1 右移
    n1 = n2;
    // n2 右移
    n2 = n3;
  }

  // 保存最后一个结点
  n3 = n1;
  // 左侧部分第一个结点
  n2 = head;
  let res = true;
  // 检查是否回文
  while (n1 && n2) {
    if (n1.value !== n2.value) {
      res = false;
      break;
    }

    // n1 从左往右
    n1 = n1.next;
    // n2 从右往左
    n2 = n2.next;
  }

  n1 = n3.next;
  n3.next = null;
  // 恢复链表右侧顺序
  while (n2) {
    // 保存当前结点前一个结点
    n2 = n1.next;
    // 当前结点指向下一个结点
    n1.next = n3;
    // n3 左移
    n3 = n1;
    // n1 左移
    n1 = n2;
  }

  return res;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(2);
head.next.next.next.next = new Node(1);

// console.log(isPalindrome(head));
// console.log(isPalindrome2(head));
// console.log(isPalindrome3(head));

/**
 * 将单向链表按某值划分成左边小、中间相等、右边大的形式
 *
 * 题目：给定一个单链表的头节点 head ，节点的值类型是整型，再给定一个整数 pivot 。实现一个调整链表
 * 的函数，将链表调整为左部分都是值小于 pivot 的节点，中间部分都是值等于 pivot 的节点，右部分都是值
 * 大于 pivot 的节点。
 *
 * 进阶：在实现原问题功能的基础上增加如下的要求
 * 要求：调整后所有小于 pivot 的节点之间的相对顺序和调整前一样
 * 要求：调整后所有等于 pivot 的节点之间的相对顺序和调整前一样
 * 要求：调整后所有大于 pivot 的节点之间的相对顺序和调整前一样
 * 要求：时间复杂度请达到 O(N)，额外空间复杂度请达到 O(1)。
 */

function listPartition(head, pivot) {
  if (!head) {
    return head;
  }

  const nodeArr = [];
  let cur = head;
  while (cur) {
    nodeArr.push(cur);
    cur = cur.next;
  }

  arrPartition(nodeArr, pivot);
  // console.log(nodeArr.map(item => item.value));
  for (let i = 1; i < nodeArr.length; i++) {
    nodeArr[i - 1].next = nodeArr[i];
  }

  nodeArr[nodeArr.length - 1].next = null;
  return nodeArr[0];
}

function arrPartition(nodeArr, pivot) {
  let small = -1;
  let big = nodeArr.length;
  let i = 0;
  while (i !== big) {
    if (nodeArr[i].value < pivot) {
      swap(nodeArr, ++small, i++);
    } else if (nodeArr[i].value > pivot) {
      swap(nodeArr, --big, i);
    } else {
      i++;
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function listPartition2(head, pivot) {
  if (!head) {
    return head;
  }

  // small head
  let sH = null;
  // small tail
  let sT = null;
  // equal head
  let eH = null;
  // equal tail
  let eT = null;
  // big head
  let bH = null;
  // big tail
  let bT = null;
  // 保存下一个结点
  let next = null;
  // 将每一个结点分成三部分链表
  while (head) {
    next = head.next;
    head.next = null;
    if (head.value < pivot) {
      if (!sH) {
        sH = head;
        sT = head;
      } else {
        sT.next = head;
        sT = head;
      }
    } else if (head.value === pivot) {
      if (!eH) {
        eH = head;
        eT = head;
      } else {
        eT.next = head;
        eT = head;
      }
    } else {
      if (!bH) {
        bH = head;
        bT = head;
      } else {
        bT.next = head;
        bT = head;
      }
    }

    head = next;
  }

  if (bT) {
    bT.next = null;
  }

  // small 链表和 equal 链表连接
  if (sH) {
    sT.next = eH;
    eT = !eT ? sT : eT;
  }

  // 所有部分连接
  if (eT) {
    eT.next = bH;
  }

  return !!sH ? sH : !!eH ? eH : bH;
}

const head1 = new Node(7);
head1.next = new Node(9);
head1.next.next = new Node(1);
head1.next.next.next = new Node(8);
head1.next.next.next.next = new Node(5);
head1.next.next.next.next.next = new Node(2);
head1.next.next.next.next.next.next = new Node(5);

// console.log(JSON.stringify(listPartition(head1, 4)));
// console.log(JSON.stringify(listPartition2(head1, 5)));

/**
 * 复制含有随机指针节点的链表
 *
 * 题目：一种特殊的单链表结点类描述如下
 * rand指针是单链表节点结构中新增的指针，rand 可能指向链表中的任意一个节点，也可能指向 null
 * 给定一个由 Node节点类型组成的无环单链表的头节点 head，请实现一个函数完成这个链表的复制
 * 并返回复制的新链表的头节点
 *
 * 要求：时间复杂度 O(N)，额外空间复杂度 O(1)
 */

class randNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.rand = null;
  }
}

function copyListWithRandom(head) {
  const map = new Map();
  let cur = head;
  while (cur) {
    map.set(cur, new randNode(cur.value));
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    map.get(cur).next = map.get(cur.next) || null;
    map.get(cur).rand = map.get(cur.rand) || null;
    cur = cur.next;
  }

  return map.get(head);
}

function copyListWithRandom2(head) {
  if (!head) {
    return null;
  }

  let cur = head;
  let next = null;
  // 给每一个结点创建对应克隆结点，且连接在相应结点后面
  while (cur) {
    next = cur.next;
    cur.next = new randNode(cur.value);
    cur.next.next = next;
    cur = next;
  }

  cur = head;
  let curCopy = null;
  // 设置每一个克隆结点的 rand 指向
  while (cur) {
    next = cur.next.next;
    curCopy = cur.next;
    curCopy.rand = cur.rand ? cur.rand.next : null;
    cur = next;
  }

  let res = head.next;
  cur = head;
  // 分离源链表和克隆链表
  while (cur) {
    next = cur.next.next;
    curCopy = cur.next;
    // 分离源链表
    cur.next = next;
    // 分离克隆链表
    curCopy.next = next ? next.next : null;
    cur = next;
  }

  return res;
}

const head2 = new randNode(1);
head2.next = new randNode(2);
head2.next.next = new randNode(3);
head2.next.next.next = new randNode(4);
head2.next.next.next.next = new randNode(5);
head2.next.next.next.next.next = new randNode(6);

head2.rand = head2.next.next.next.next.next; // 1 -> 6
head2.next.rand = head2.next.next.next.next.next; // 2 -> 6
head2.next.next.rand = head2.next.next.next.next; // 3 -> 5
head2.next.next.next.rand = head2.next.next; // 4 -> 3
head2.next.next.next.next.rand = null; // 5 -> null
head2.next.next.next.next.next.rand = head2.next.next.next; // 6 -> 4

function printRandLinkedList(head) {
  let cur = head;
  let order = "";
  let rand = "";
  while (cur) {
    order += cur.value + " ";
    rand += !cur.rand ? "- " : cur.rand.value + " ";
    cur = cur.next;
  }

  console.log(order);
  console.log(rand);
}

// printRandLinkedList(copyListWithRandom(head2));
printRandLinkedList(copyListWithRandom2(head2));
