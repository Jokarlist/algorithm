/**
 * 汉诺塔问题
 * 打印n层汉诺塔从最左边移动到最右边的全部过程
 */
function hanoi(n) {
  if (n > 0) {
    proc(n, "左", "中", "右");
  }
}

function proc(i, start, end, other) {
  if (i === 1) {
    console.log(`Move 1 from ${start} to ${end}`);
  } else {
    // 将 1~i-1 层汉诺塔先移动到 other 上
    proc(i - 1, start, other, end);
    // 移动第 i 层汉诺塔到 end 上
    console.log(`Move ${i} from ${start} to ${end}`);
    // 再将 1~i-1 层汉诺塔移动 end 上
    proc(i - 1, other, end, start);
  }
}

hanoi(3);

/**
 * 打印一个字符串的全部子序列，包括空字符串
 */
function printAllSubsequences(str) {
  const chs = str.split("");
  const res = [];
  proc1(chs, 0, res);
  console.log(res);
}

function proc1(chs, i, res) {
  if (i === chs.length) {
    res.push(chs.join(""));
    return;
  }

  proc1(chs, i + 1, res);
  const temp = chs[i];
  chs[i] = "";
  proc1(chs, i + 1, res);
  chs[i] = temp;
}

// printAllSubsequences("aabbcc");

/**
 * 打印一个字符串的全部排列，要求不要出现重复的排列
 */
function printAllPermutations(str) {
  const chs = str.split("");
  const res = [];
  proc2(chs, 0, res);
  console.log(res);
}

function proc2(chs, i, res) {
  if (i === chs.length) {
    res.push(chs.join(""));
    return;
  }

  const visit = new Map();
  for (let j = i; j < chs.length; j++) {
    if (!visit.has(chs[j])) {
      visit.set(chs[j], true);
      swap(chs, i, j);
      proc2(chs, i + 1, res);
      swap(chs, i, j);
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// printAllPermutations("abcd");

/**
 * 规定1和A对应、2和B对应、3和C对应，那么一个数字字符串比如"111"，就可以转化为"AAA"、"KA"和"AK"
 * 给定一个只有数字字符组成的字符串str,返回有多少种转化结果。
 */
function convertToLetterString(str) {
  const chs = str.split("");
  console.log(proc3(chs, 0));
}

function proc3(chs, i) {
  if (i === chs.length) {
    return 1;
  }

  if (chs[i] === "0") {
    return 0;
  }

  if (chs[i] === "1") {
    let res = proc3(chs, i + 1);
    if (i + 1 < chs.length) {
      res += proc3(chs, i + 2);
    }

    return res;
  }

  if (chs[i] === "2") {
    let res = proc3(chs, i + 1);
    if (i + 1 < chs.length && chs[i + 1] >= "0" && chs[i + 1] <= "6") {
      res += proc3(chs, i + 2);
    }

    return res;
  }

  return proc3(chs, i + 1);
}

// convertToLetterString("1234");

/**
 * 给定一个整型数组arr，代表数值不同的纸牌排成一条线。玩家A和玩家B依次拿走每张纸牌，规定玩家A先拿，
 * 玩家B后拿，但是每个玩家每次只能拿走最左或最右的纸牌，玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。
 * arr = [1,2,100,4]，A获胜，返回101
 * arr = [1,100,2]，B获胜，返回100
 */
function win(arr) {
  if (!arr || !arr.length) {
    return 0;
  }

  console.log(Math.max(f(arr, 0, arr.length - 1), s(arr, 0, arr.length - 1)));
}

function f(arr, i, j) {
  if (i === j) {
    return arr[i];
  }

  return Math.max(arr[i] + s(arr, i + 1, j), arr[j] + s(arr, i, j - 1));
}

function s(arr, i, j) {
  if (i === j) {
    return 0;
  }

  return Math.min(f(arr, i + 1, j), f(arr, i, j - 1));
}

// win([1, 2, 100, 4]);

/**
 * 给定两个长度都为N的数组weights和values，weights[i]和values[i]分别代表i号物品的重量和价值。
 * 给定一个正数bag，表示一个载重bag的袋子，你装的物品不能超过这个重量。返回你能装下最多的价值是多少？
 */
function knapsack(weights, values, bag) {
  return proc4(weights, values, 0, 0, bag);
}

function proc4(weights, values, i, alreadyWeight, bag) {
  if (alreadyWeight > bag) {
    return -values[i - 1];
  }

  if (i === weights.length) {
    return 0;
  }

  return Math.max(
    proc4(weights, values, i + 1, alreadyWeight, bag),
    values[i] + proc4(weights, values, i + 1, alreadyWeight + weights[i], bag)
  );
}

/**
 * N皇后问题是指在N*N的棋盘上要摆N个皇后，要求任何两个皇后不同行、不同列，也不在同一条斜线上。
 * 给定一个整数n,返回n皇后的摆法有多少种。
 * 例如：n=1，返回1。n=2或3，2皇后和3皇后问题无论怎么摆都不行，返回0。n=8，返回92。
 */
function nQueens(n) {
  if (n < 1) return 0;
  const record = new Array(n);
  console.log(proc5(0, record, n));
}

function proc5(i, record, n) {
  if (i === n) {
    return 1;
  }

  let res = 0;
  for (let j = 0; j < n; j++) {
    // 第 i 行的皇后放在 j 列，有 n 种放法，开辟 n 条道路
    // 需要判断是否和 0~i-1 行的皇后共列共行，或是共斜线
    if (isValid(record, i, j)) {
      record[i] = j;
      res += proc5(i + 1, record, n);
    }
  }

  return res;
}

function isValid(record, i, j) {
  // 跟 0~i-1 行的皇后去比较，i 行及之后的还没放不用比
  for (let k = 0; k < i; k++) {
    // 共列或者共斜线（斜率为 1）
    if (j === record[k] || Math.abs(record[k] - j) === Math.abs(k - i)) {
      return false;
    }
  }

  return true;
}

// nQueens(8);

function nQueens2(n) {
  // 因为 Number 是有符号双精度浮点数（64位），所以不要超过 64 皇后
  if (n < 1 || n > 64) {
    return 0;
  }

  // 几皇后问题，limit 就从低位往高位数有几个 1，64 位时为 -1，补码表示负数
  // 则 64 位全为 1，否则就 1 左移 n 位再减 1，得到前 n 位为 1，其它位为 0
  const limit = n === 64 ? -1 : (1 << n) - 1;
  console.log(proc6(limit, 0, 0, 0));
}

// colLim 列的限制，1 的位置不能放皇后，0 的位置可以
// leftDiaLim 左斜线的限制，1 的位置不能放皇后，0 的位置可以
// rightDiaLim 右斜线的限制，1 的位置不能放皇后，0 的位置可以
function proc6(limit, colLim, leftDiaLim, rightDiaLim) {
  // 皇后全放完了
  if (colLim === limit) {
    return 1;
  }

  let pos = 0;
  let mostRightOne = 0;
  // colLim | leftDiaLim | rightDiaLim 得到总限制，取反再与 limit 后得到
  // 低 n 位表示能放的位置（1 能放 0 不能放），高位全为 0 的 pos
  pos = limit & ~(colLim | leftDiaLim | rightDiaLim);
  let res = 0;
  while (pos !== 0) {
    // 获得 pos 最右位的 1
    mostRightOne = pos & (~pos + 1);
    // 表示将皇后放在最右位上
    pos = pos - mostRightOne;
    res += proc6(
      limit,
      colLim | mostRightOne,
      (leftDiaLim | mostRightOne) << 1,
      (rightDiaLim | mostRightOne) >> 1
    );
  }

  return res;
}

// nQueens2(8);
