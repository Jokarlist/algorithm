class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.last = null;
  }
}

const node1 = new Node(2);
node1.next = new Node(3);
node1.next.next = new Node(5);
node1.next.next.next = new Node(6);

const node2 = new Node(1);
node2.next = new Node(2);
node2.next.next = new Node(5);
node2.next.next.next = new Node(7);
node2.next.next.next.next = new Node(8);

const node3 = new DoubleNode(1);
node3.next = new DoubleNode(2);
node3.next.last = node3;
node3.next.next = new DoubleNode(3);
node3.next.next.last = node3.next;
node3.next.next.next = new DoubleNode(4);
node3.next.next.next.last = node3.next.next;

/**
 * 反转单向和双向链表
 *
 * 题目：分别实现反转单向链表和反转双向链表的函数
 * 要求：如果链表长度为 N，时间复杂度要求为 O(N)，额外空间复杂度要求为 O(1)
 */

function reverseList(head) {
  let pre = null;
  let next = null;
  while (head) {
    // 保存下一结点
    next = head.next;
    // 将当前结点的指向改变成指向上一结点
    head.next = pre;
    // pre 右移
    pre = head;
    // head 右移
    head = next;
  }

  // pre 最后指向链表反转后的新头结点
  return pre;
}

function reverseList2(head) {
  let pre = null;
  let next = null;
  while (head) {
    next = head.next;
    // 当前结点的 next 改成指向上一个结点
    head.next = pre;
    // 当前结点的 last 改成指向下一个结点
    head.last = next;
    // pre 右移
    pre = head;
    // head 右移
    head = next;
  }

  // pre 最后指向链表反转后的新头结点
  return pre;
}

// console.log(reverseList(node1));
// console.log(reverseList2(node3));

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

const node4 = new Node(1);
node4.next = new Node(2);
node4.next.next = new Node(3);
node4.next.next.next = new Node(2);
node4.next.next.next.next = new Node(1);

// console.log(isPalindrome(node4));
// console.log(isPalindrome2(node4));
// console.log(isPalindrome3(node4));

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

const node5 = new Node(7);
node5.next = new Node(9);
node5.next.next = new Node(1);
node5.next.next.next = new Node(8);
node5.next.next.next.next = new Node(5);
node5.next.next.next.next.next = new Node(2);
node5.next.next.next.next.next.next = new Node(5);

// console.log(JSON.stringify(listPartition(node5, 4)));
// console.log(JSON.stringify(listPartition2(node5, 5)));

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

const node6 = new randNode(1);
node6.next = new randNode(2);
node6.next.next = new randNode(3);
node6.next.next.next = new randNode(4);
node6.next.next.next.next = new randNode(5);
node6.next.next.next.next.next = new randNode(6);

node6.rand = node6.next.next.next.next.next; // 1 -> 6
node6.next.rand = node6.next.next.next.next.next; // 2 -> 6
node6.next.next.rand = node6.next.next.next.next; // 3 -> 5
node6.next.next.next.rand = node6.next.next; // 4 -> 3
node6.next.next.next.next.rand = null; // 5 -> null
node6.next.next.next.next.next.rand = node6.next.next.next; // 6 -> 4

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
// printRandLinkedList(copyListWithRandom2(head2));

/**
 * 两个单链表相交的一系列问题
 *
 * 题目：给定两个可能有环也可能无环的单链表，头节点 head1 和 head2。请实现一个函数，如果两个链表相交，
 * 请返回相交的第一个节点。如果不相交，返回 null。
 *
 * 要求：如果两个链表长度之和为 N，时间复杂度请达到 O(N)，额外空间复杂度请达到 O(1)。
 */

function findFirstIntersectNode(head1, head2) {
  if (!head1 || !head2) {
    return null;
  }

  const loop1 = getLoopNode(head1);
  const loop2 = getLoopNode(head2);
  // 两个单链表都没有环的情况
  if (!loop1 && !loop2) {
    return noLoop(head1, head2);
  }

  // 两个单链表都有环的情况
  if (loop1 && loop2) {
    return bothLoop(head1, loop1, head2, loop2);
  }

  // 一个有环一个无环时，不可能相交
  return null;
}

// 获取单链表的入环结点，无环则返回 null
function getLoopNode(head) {
  // 至少要三个结点才能形成环
  if (!head || !head.next || !head.next.next) {
    return null;
  }

  // 慢指针 n1
  let n1 = head.next;
  // 快指针 n2
  let n2 = head.next.next;
  while (n1 !== n2) {
    // n2 走到头都没遇到 n1，则无环
    if (!n2.next || !n2.next.next) {
      return null;
    }

    n1 = n1.next;
    n2 = n2.next.next;
  }

  n2 = head;
  while (n1 !== n2) {
    n1 = n1.next;
    n2 = n2.next;
  }

  return n1;
}

function noLoop(head1, head2) {
  if (!head1 || !head2) {
    return null;
  }

  let cur1 = head1;
  let cur2 = head2;
  let n = 0;
  while (cur1.next) {
    n++;
    cur1 = cur1.next;
  }

  while (cur2.next) {
    n--;
    cur2 = cur2.next;
  }

  // cur1 指向长链表的头结点
  cur1 = n > 0 ? head1 : head2;
  // cur2 指向短链表的头结点
  cur2 = cur1 === head1 ? head2 : head1;
  n = Math.abs(n);
  while (n > 0) {
    n--;
    cur1 = cur1.next;
  }

  while (cur1 !== cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }

  return cur1;
}

function bothLoop(head1, loop1, head2, loop2) {
  let cur1 = null;
  let cur2 = null;
  // 两个有环单链表的入环结点为同一个，此时求第一个相交结点，和俩无环单链表的情况一致
  if (loop1 === loop2) {
    cur1 = head1;
    cur2 = head2;
    let n = 0;
    while (cur1 !== loop1) {
      n++;
      cur1 = cur1.next;
    }

    while (cur2 !== loop1) {
      n--;
      cur2 = cur2.next;
    }

    cur1 = n > 0 ? head1 : head2;
    cur2 = cur1 === head1 ? head2 : head1;
    n = Math.abs(n);
    while (n > 0) {
      n--;
      cur1 = cur1.next;
    }

    while (cur1 !== cur2) {
      cur1 = cur1.next;
      cur2 = cur2.next;
    }

    return cur1;
  } else {
    // 入环结点不为同一个，此时有两种情况，相交（两个初始相交结点）或不相交
    cur1 = loop1.next;
    // 让 loop1 沿着环转一圈，中途中遇到 loop2 则代表俩链表相交，此时返回 loop1 或 loop2 任一即可
    // 否则不相交，返回 null;
    while (cur1 !== loop1) {
      if (cur1 === loop2) {
        return loop1;
      }

      cur1 = cur1.next;
    }

    return null;
  }
}

// 1->2->3->4->5->6->7->null
let head1 = new Node(1);
head1.next = new Node(2);
head1.next.next = new Node(3);
head1.next.next.next = new Node(4);
head1.next.next.next.next = new Node(5);
head1.next.next.next.next.next = new Node(6);
head1.next.next.next.next.next.next = new Node(7);

// 0->9->8->6->7->null
let head2 = new Node(0);
head2.next = new Node(9);
head2.next.next = new Node(8);
head2.next.next.next = head1.next.next.next.next.next; // 8->6
console.log(findFirstIntersectNode(head1, head2).value);

// 1->2->3->4->5->6->7->4...
head1 = new Node(1);
head1.next = new Node(2);
head1.next.next = new Node(3);
head1.next.next.next = new Node(4);
head1.next.next.next.next = new Node(5);
head1.next.next.next.next.next = new Node(6);
head1.next.next.next.next.next.next = new Node(7);
head1.next.next.next.next.next.next = head1.next.next.next; // 7->4

// 0->9->8->2...
head2 = new Node(0);
head2.next = new Node(9);
head2.next.next = new Node(8);
head2.next.next.next = head1.next; // 8->2
console.log(findFirstIntersectNode(head1, head2).value);

// 0->9->8->6->4->5->6..
head2 = new Node(0);
head2.next = new Node(9);
head2.next.next = new Node(8);
head2.next.next.next = head1.next.next.next.next.next; // 8->6
console.log(findFirstIntersectNode(head1, head2).value);
