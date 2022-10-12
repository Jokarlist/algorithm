function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function getRandomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 产生长度随机、元素值随机的数组
 * @param {number} maxSize 数组最大长度
 * @param {number} maxValue 数组元素最大值
 */
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * maxSize));
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      Math.floor(Math.random() * (maxValue + 1)) -
      Math.floor(Math.random() * maxValue);
  }

  return arr;
}

/**
 * 浅比较只含数字的数组
 * @param {array} arr1
 * @param {array} arr2
 */
function isArrayEqual(arr1, arr2) {
  if ((!arr1 && !!arr2) || (!arr2 && !!arr1)) {
    return false;
  }

  if (!arr1 && !arr2) {
    return true;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * 测试专用对数器
 * @param {array} sortFn 排序函数
 */
function comparator(sortFn) {
  const testTime = 500000;
  const maxSize = 100;
  const maxValue = 100;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = [...arr1];
    sortFn(arr1);
    arr2.sort((a, b) => a - b);
    if (!isArrayEqual(arr1, arr2)) {
      succeed = false;
      console.log(arr1, arr2);
      break;
    }
  }

  console.log(succeed ? "Nice!" : "Fucking fucked!");
}

module.exports = {
  swap,
  comparator,
};
