class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * 树型 DP 套路
 *
 * 使用前提：
 * 如果题目求解目标是 S 规则，则求解流程可以定成以每一个节点为头节点的子树在 S 规则下的每一个答案，
 * 并且最终答案一定在其中
 *
 * 步骤：
 * 1、以某个节点 X 为头节点的子树中，分析答案有哪些可能性，并且这种分析是以 X 的左子树、X 的右子树
 * 和 X 整棵树的角度来考虑可能性的；
 * 2、根据第一步的可能性分析，列出所有需要的信息；
 * 3、合并第二步的信息，对左树和右树提出同样的要求，并写出信息结构；
 * 4、设计递归函数，递归函数是处理以 X 为头节点的情况下的答案。包括设计递归的 basecase，默认直接
 * 得到左树和右树的所有信息，以及把可能性做整合，并且要返回第三步的信息结构这四个小步骤。
 */

/**
 * 叉树节点间的最大距离问题：
 * 从二叉树的节点 a 出发，可以向上或者向下走，但沿途的节点只能经过一次，到达节点 b 时路径上的节点个数叫作 a 到 b 的距离，那么二叉树任何两个节点之间都有距离，求整棵树上的最大距离。
 *
 * 题解：
 * 整棵树的最大距离来自：
 * 1、x 不参与
 * 左子树上的最大距离 maxL
 * 右子树上的最大距离 maxR
 * 2、x 参与
 * 左子树的高度 + 1 + 右子树的高度 max
 * 最终：
 * maxL、maxR、max 取最大值
 */
function maxDistance(head) {
  return proc(head).maxDis;
}

function proc(head) {
  if (!head) {
    return { maxDis: 0, height: 0 };
  }

  const { maxDis: maxL, height: heightL } = proc(head.left);
  const { maxDis: maxR, height: heightR } = proc(head.right);
  const height = Math.max(heightL, heightR) + 1;
  const maxDis = Math.max(maxL, maxR, heightL + heightR + 1);

  return { maxDis, height };
}

/* const head1 = new Node(1);
head1.left = new Node(2);
head1.right = new Node(3);
head1.left.left = new Node(4);
head1.left.right = new Node(5);
head1.right.left = new Node(6);
head1.right.right = new Node(7);
head1.left.left.left = new Node(8);
head1.right.left.right = new Node(9);
console.log(maxDistance(head1)); */

/**
 * 派对的最大快乐值
 *
 * 员工信息的定义如下 Employee 类所示
 *
 * 公司的每个员工都符合 Employee 类的描述。整个公司的人员结构可以看作是一棵标准的、没有环的多叉
 * 树。树的头节点是公司唯一的老板。除老板之外的每个员工都有唯一的直接上级。叶节点是没有任何下属的基
 * 层员工（subordinates列表为空），除基层员工外，每个员工都有一个或多个直接下级。
 *
 * 这个公司现在要办 party，你可以决定哪些员工来，哪些员工不来。但是要遵循如下规则。
 * 1、如果某个员工来了，那么这个员工的所有直接下级都不能来；
 * 2、派对的整体快乐值是所有到场员工快乐值的累加；
 * 3、你的目标是让派对的整体快乐值尽量大。
 *
 * 给定一棵多叉树的头节点 boss，请返回派对的最大快乐值。
 *
 * 题解：
 * 整棵树的最大快乐值：
 * 1、x 参与
 * x 的快乐值 + 对 x 所有直接下级 y 关于（y 不来时整棵树的最大快乐值）求和
 * 2、x 不参与
 * 0 + 对 x 所有直接下级 y 关于（max{y 来时整棵树的最大快乐值，y 不来时整颗树的最大快乐值}）求和
 * 最终：
 * x 参与和 x 不参与时的两个快乐值的最大值
 */
class Employee {
  constructor(happy) {
    this.happy = happy;
    this.subordinates = [];
  }
}

function maxHappy(boss) {
  const headInfo = proc2(boss);
  return Math.max(headInfo.yesMaxHappy, headInfo.noMaxHappy);
}

function proc2(head) {
  if (!head.subordinates.length) {
    return { yesMaxHappy: head.happy, noMaxHappy: 0 };
  }

  let yesMaxHappy = head.happy;
  let noMaxHappy = 0;
  for (let i = 0; i < head.subordinates.length; i++) {
    const info = proc2(head.subordinates[i]);
    yesMaxHappy += info.noMaxHappy;
    noMaxHappy += Math.max(info.yesMaxHappy, info.noMaxHappy);
  }

  return { yesMaxHappy, noMaxHappy };
}
