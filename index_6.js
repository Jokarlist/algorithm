class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.queue = [];
    this.comparator = comparator;
  }

  add(...args) {
    this.queue.push(...args);
    this.queue.sort(this.comparator);
    return this.queue;
  }

  poll() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }
}

/**
 * 一个字符串类型的数组 arr1，另一个字符串类型的数组 arr2。
 * arr2 中有哪些字符，是 arr1 中出现的？请打印。
 * arr2 中有哪些字符，是作为 arr1 中某个字符串前缀出现的？请打印。
 * arr2 中有哪些字符，是作为 arr1 中某个字符串前缀出现的？请打印 arr2 中出现次数最大的前缀。
 *
 * 思路：前缀树
 */

class TrieNode {
  constructor() {
    // 通过该节点的路径数
    this.pass = 0;
    // 以该节点的为结尾的路径数
    this.end = 0;
    // 从该节点往下走可选的路的数量
    this.nexts = new Array(26);
  }
}

class TrieTree {
  constructor() {
    this.root = new TrieNode();
  }

  // 往前缀树中加入一个单词 word
  insert(word) {
    if (word === null || word === undefined) {
      return;
    } else if (typeof word !== "string") {
      throw new TypeError("添加的单词必须为字符串形式");
    }

    const chs = word.split("");
    let node = this.root;
    node.pass++;
    let idx = 0;
    for (let i = 0; i < chs.length; i++) {
      idx = chs[i].charCodeAt() - "a".charCodeAt();
      if (!node.nexts[idx]) {
        node.nexts[idx] = new TrieNode();
      }

      node = node.nexts[idx];
      node.pass++;
    }

    node.end++;
  }

  // word 这个单词之前加入过几次
  search(word) {
    if (word === null || word === undefined) {
      return;
    } else if (typeof word !== "string") {
      throw new TypeError("搜索的单词必须为字符串形式");
    }

    const chs = word.split("");
    let node = this.root;
    let idx = 0;
    for (let i = 0; i < chs.length; i++) {
      idx = chs[i].charCodeAt() - "a".charCodeAt();
      if (!node.nexts[idx]) {
        return 0;
      }

      node = node.nexts[idx];
    }

    return node.end;
  }

  // 所有加入的字符串中，有几个是以 pre 这个字符串作为前缀的
  prefixNumber(pre) {
    if (pre === null || pre === undefined) {
      return;
    } else if (typeof pre !== "string") {
      throw new TypeError("查询前缀必须为字符串形式");
    }

    const chs = pre.split("");
    let node = this.root;
    let idx = 0;
    for (let i = 0; i < chs.length; i++) {
      idx = chs[i].charCodeAt() - "a".charCodeAt();
      if (!node.nexts[idx]) {
        return 0;
      }

      node = node.nexts[idx];
    }

    return node.pass;
  }

  delete(word) {
    if (this.search(word) !== 0) {
      const chs = word.split("");
      let node = this.root;
      let idx = 0;
      for (let i = 0; i < chs.length; i++) {
        idx = chs[i].charCodeAt() - "a".charCodeAt();
        if (--node.nexts[idx].pass === 0) {
          node.nexts[idx] = null;
          return;
        }

        node = node.nexts[idx];
      }

      node.end--;
    }
  }
}

// test code
/* const trie = new TrieTree();
console.log(trie.search("zuo"));
trie.insert("zuo");
console.log(trie.search("zuo"));
trie.delete("zuo");
console.log(trie.search("zuo"));
trie.insert("zuo");
trie.insert("zuo");
trie.delete("zuo");
console.log(trie.search("zuo"));
trie.delete("zuo");
console.log(trie.search("zuo"));
trie.insert("zuoa");
trie.insert("zuoac");
trie.insert("zuoab");
trie.insert("zuoad");
trie.delete("zuoa");
console.log(trie.search("zuoa"));
console.log(trie.prefixNumber("zuo")); */

/**
 * 贪心算法
 *
 * 在某一个标准下，优先考虑最满足标准的样本，最后考虑最不满足标准的样本，最终得到一个答案的算法，
 * 也就是说，不从整体最优上加以考虑，所做出的是在某种意义上的局部最优解。局部最优 -?-> 整体最优
 *
 * 贪心算法的在笔试时的解题套路：
 * 1、实现一个不依靠贪心策略的解法 X，可以用最暴力的尝试
 * 2、脑补出贪心策略A、贪心策略B、贪心策略C...
 * 3、用解法 X 和对数器，去验证每一个贪心策略，用实验的方式得知哪个贪心策略正确
 * 4、不要去纠结贪心策略的证明
 *
 * 贪心策略在实现时，经常使用到的技巧：
 * 1、根据某标准建立一个比较器来排序
 * 2、根据某标准建立一个比较器来组成堆
 */

/**
 * 给定一个字符串类型的数组 strs，找到一种拼接方式，使得把所有字符串拼起来之后形成的字符串具有最小的字典序。
 *
 * 策略：strs 按字典序升序排序，最后组合在一起字典序最小
 */
function lowestLexicography(strs) {
  if (!strs || !strs.length) {
    return "";
  }

  strs.sort(lexicographyComparator);
  return strs.join("");
}

function lexicographyComparator(a, b) {
  if (a.length < b.length) {
    a = a.padEnd(b.length, String.fromCharCode("z".charCodeAt() + 1));
  } else if (a.length > b.length) {
    b = b.padEnd(a.length, String.fromCharCode("z".charCodeAt() + 1));
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].charCodeAt() - b[i].charCodeAt() > 0) {
      return 1;
    } else if (a[i].charCodeAt() - b[i].charCodeAt() < 0) {
      return -1;
    }
  }
}

// console.log(lowestLexicography(["jibw", "ji", "jp", "bw", "jibw"]));
// console.log(lowestLexicography(["ba", "b"]));

/**
 * 一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。给你每一个项目开始的时间和结束的时间（给你一个数组，
 * 里面是一个个具体的项目)，你来安排宣讲的日程，要求会议室进行的宣讲的场次最多。返回这个最多的宣讲场次。
 *
 * 策略：每次都安排剩下的会议中，在当前时间点后且结束时间最早的会议
 */
class Program {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function bestArrange(programs, timePoint) {
  programs.sort(arrangeComparator);
  let res = 0;
  for (let i = 0; i < programs.length; i++) {
    if (programs[i].start > timePoint) {
      res++;
      timePoint = programs[i].end;
    }
  }

  return res;
}

function arrangeComparator(p1, p2) {
  return p1.end - p2.end;
}

/**
 * 一块金条切成两半，是需要花费和长度数值一样的铜板的。比如长度为20的金条，不管切成长度多大的两半，都要花费20个铜板。
 * 一群人想整分整块金条，怎么分最省铜板？
 *
 * 例如：
 * 给定数组 {10,20,30}，代表一共三个人，整块金条长度为 10+20+30=60。金条要分成 10,20,30 三个部分。
 * 如果先把长度 60 的金条分成 10 和 50，花费 60；再把长度 50 的金条分成 20 和 30，花费 50；一共花费 110 铜板。
 * 但是如果先把长度 60 的金条分成 30 和 30，花费 60；再把长度 30 金条分成 10 和 20，花费 30；一共花费 90 铜板。
 * 输入一个数组，返回分割的最小代价。
 */
function lessCost(target) {
  const minHeap = new Heap();
  minHeap.add(...target);

  let res = 0;
  let cur = 0;
  while (minHeap.size() > 1) {
    cur = minHeap.poll() + minHeap.poll();
    res += cur;
    minHeap.add(cur);
  }

  return res;
}

// console.log(lessCost([6, 7, 8, 9]));

/**
 * 输入：
 * 正数数组 costs
 * 正数数组 profits
 * 正数 k
 * 正数 m
 *
 * 含义：
 * costs[i] 表示 i 号项目的花费
 * profits[i] 表示 i 号项目在扣除花费之后还能挣到的钱（利润）
 * k 表示你只能串行的最多做 k 个项目
 * m 表示你初始的资金
 *
 * 说明：你每做完一个项目，马上获得的收益，可以支持你去做下一个项目。
 * 输出：你最后获得的最大钱数。
 */
function findMaximizedCapital(k, m, profits, costs) {
  const cases = new Array(profits.length);
  for (let i = 0; i < cases.length; i++) {
    cases.push({ p: profits[i], c: costs[i] });
  }

  const minCostQ = new Heap((o1, o2) => o1.c - o2.c);
  const maxProfitQ = new Heap((o1, o2) => o2.p - o1.p);
  minCostQ.add(...cases);
  for (let i = 0; i < k; i++) {
    while (!minCostQ.isEmpty() && minCostQ.peek().c <= m) {
      maxProfitQ.add(minCostQ.poll());
    }

    if (maxProfitQ.isEmpty()) {
      return m;
    }

    m += maxProfitQ.poll();
  }

  return m;
}

/**
 * 一个数据流中，随时可以取得中位数
 *
 * 与贪心算法无关，考察堆的应用
 */
class MedianHolder {
  constructor() {
    this.minHeap = new Heap();
    this.maxHeap = new Heap((a, b) => b - a);
  }

  addNum(num) {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.add(num);
    } else {
      this.minHeap.add(num);
    }

    this.resizeTwoHeaps();
  }

  resizeTwoHeaps() {
    if (this.maxHeap.size() === this.minHeap.size() + 2) {
      this.minHeap.add(this.maxHeap.poll());
    }

    if (this.minHeap.size() === this.maxHeap.size() + 2) {
      this.maxHeap.add(this.minHeap.poll());
    }
  }

  getMedian() {
    const maxHeapSize = this.maxHeap.size();
    const minHeapSize = this.minHeap.size();
    if (maxHeapSize + minHeapSize === 0) {
      return null;
    }

    const maxHeapPeek = this.maxHeap.peek();
    const minHeapPeek = this.minHeap.peek();
    if ((maxHeapSize + minHeapSize) % 2 === 0) {
      return (maxHeapPeek + minHeapPeek) / 2;
    }

    return maxHeapSize > minHeapSize ? maxHeapPeek : minHeapPeek;
  }
}

const mh = new MedianHolder();
for (let i = 1; i <= 6; i++) {
  mh.addNum(i);
}

console.log(mh);
