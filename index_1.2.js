/* 1、在一个有序数组中，寻找某个数是否存在 */
const bsExist = (sortedArr, target) => {
  if (!sortedArr || !sortedArr.length) return false;
  let l = 0;
  let r = sortedArr.length - 1;
  let mid = 0;
  while (l < r) {
    mid = Math.floor(l + ((r - l) >> 1));
    if (sortedArr[mid] === target) {
      return true;
    } else if (sortedArr[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return sortedArr[l] === target;
};

/* 2、在一个有序数组中，寻找大于等于某个数的最左侧的位置 */
const bsNearLeft = (sortedArr, target) => {
  if (!sortedArr || !sortedArr.length) return -1;
  let l = 0;
  let r = sortedArr.length - 1;
  let index = -1;
  let mid = 0;
  while (l < r) {
    mid = Math.floor(l + ((r - l) >> 1));
    if (sortedArr[mid] >= target) {
      index = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return index;
};

const arr = [1, 2, 3, 4, 5, 6];
console.log(bsNearLeft(arr, 3.5));
