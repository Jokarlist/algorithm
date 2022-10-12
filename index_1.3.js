/* 1、一个数组中有一种数出现了奇数次，其它数都出现了偶数次，怎么找到这一个数 */
const arr1 = [3, 3, 2, 3, 1, 1, 1, 3, 1, 1, 1];

const getOddTimesNum1 = function (arr) {
  let eor = 0;
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i];
  }

  return eor;
};

// console.log(getOddTimesNum1(arr1));

/* 2、一个数组中有两种数出现了奇数次，其它数都出现了偶数次，怎么找到这两个数 */
const arr2 = [4, 3, 4, 2, 2, 2, 4, 1, 1, 1, 3, 3, 1, 1, 1, 4, 2, 2];
const getOddTimesNum2 = function (arr) {
  // 该情况下getOddTimesNum1返回的eor = a ^ b，因为a和b为两种数，则eor≠0即eor至少存在一位的值为1
  // 则a和b在该位上的值不相等（一个为1另一个为0）
  let eor = getOddTimesNum1(arr2);
  // 获得一个数，除了与eor的值为1的最右边位相同的位置的值为1外，其余位的值都为0
  const notSameBit = eor & (~eor + 1);
  let onlyOne = 0;
  // 将数组里的数分为两部分，对应上面a和b某位不相同的位来分，将onlyOne与其中任一部分的数相与
  // 则偶数次的数相与为0，奇数次的数就剩下其本身，则最后相与的结果为a或者b其中的一个
  for (let i = 0; i < arr.length; i++) {
    // 将onlyOne与该位为1的数相与
    if (arr[i] & (notSameBit === 1)) {
      onlyOne ^= arr[i];
    }
  }
  // onlyOne为求出的奇数次的数之一，将其与eor相与可得另一奇数次的数
  return [onlyOne, onlyOne ^ eor];
};

// console.log(getOddTimesNum2(arr2));

module.exports = {
  getOddTimesNum1,
  getOddTimesNum2,
};
