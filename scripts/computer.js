let pow16 = Math.pow(2, 16);
let powerArr = [24, 52, 113, 244, 496, 912, 1474, 2032, 2286, 2000, 1236, 488, 116, 16, 1];
// powerArr = [2286, 2032, 2000, 1474, 1236, 912, 496, 488, 244, 116, 113, 52, 24, 16, 1];
for (let i = 0; i < powerArr.length; i++) {
  let tmp = powerArr[i];
  for (let j = i + 1; j < powerArr.length; j++) {
    tmp += powerArr[j];
  }
  powerArr[i] = tmp;
}
console.log(powerArr);
/**
 * 计算c(16,count)
 * @param {*} count 
 * 16!/(count!)(16-count)!
 */
function getGroupCount(max, count) {
  let maxJie = 1;
  for (let i = max; i >= 1; i--) {
    maxJie *= i;
  }

  let countJie = 1;
  for (let i = count; i >= 1; i--) {
    countJie *= i;
  }
  let tmpJie = 1;
  for (let i = max - count; i >= 1; i--) {
    tmpJie *= i;
  }
  return maxJie / (countJie * tmpJie);
}

/**
 * 计算指定数字出现指定次数的概率，并根据概率计算权值
 * @param {*} num 
 * @param {*} count 
 * @param {*} maxScore 
 */
function getGroup(num, count, max, maxScore) {
  //计算c(max,count)/pow(2,max)*maxscore
  let score = parseInt((count / max) * maxScore);
  // let c = getGroupCount(max, count);
  let c = powerArr[count - 2];// / Math.pow(2, count - 2);
  console.log("合成需要" + count + "个" + (num - 1) + ",出现的组合个数：c(16," + count + ")" + c + "|得分：" + score);

  return [c, score];
}

/**
 * 计算每一个数字出现概率的均值
 * @param {*} num 指定次数
 * @param {*} max 最大出现次数
 */
function avgNum(num, max, score) {
  console.log("最多由" + max + "个" + (num - 1) + "合成|得分：" + score);
  let avg = new Array();
  for (let i = 2; i <= max; i++) {
    // 计算4*4矩阵出现i个num的概率，比如一个2最多16分
    avg[i - 2] = getGroup(num, i, max, score);
  }

  let sum = 0;
  for (let i = 0; i < avg.length; i++) {
    sum += avg[i][0];
  }

  let result = 0;
  let ratioSum = 0;
  for (let i = 0; i < avg.length; i++) {
    let ratio = avg[i][0] / sum;
    result += ratio * avg[i][1];
    ratioSum += ratio;
    console.log(avg[i][0] + "|" + avg[i][1] + "|" + ratio + "|" + result + "|" + ratioSum);
  }
  console.log("数值：" + num + "|加权分值：" + parseInt(result));
  return parseInt(result);
}

/**
 * 随机掉落的数字分值为1分
 * 计算每合成一个数值需要加的分值
 * 比如合成一个2需要8分，一个2需要60分
 * 目的是能够根据分值区分出数值
 */
function main() {
  // 合成一个指定数值能够获取的分数
  let std = new Array(19);
  // 合成一个指定数值需要的最大可能的上个数值的个数
  let maxCount = new Array(19);

  // 默认数字1为1分，
  maxCount[0] = 1;
  std[0] = 1;

  // 数字2最多由16个1组成，
  // 1个2最多是16分
  // 1个2最少为1分
  maxCount[1] = 16;
  std[1] = maxCount[1] * std[0];

  // 数字3最多由16个2组成
  // 1个3最多是16*【2的分值】
  // 1个3最少为1分
  maxCount[2] = 16;
  std[2] = maxCount[2] * std[1];

  // 1个4最多由15个3组成
  // 1个4最多是15*【3的分值】
  // 1个4最少为1分
  maxCount[3] = 15;
  std[3] = maxCount[3] * std[2];

  // 从5开始数字最大可能出现个数一次递减
  for (let i = 4; i < 19; i++) {
    maxCount[i] = 19 - i;
    maxCount[i] = parseInt(maxCount[i] * 0.5);
    std[i] = maxCount[i] * std[i - 1];
  }

  for (let i = 1; i < std.length; i++) {
    console.log('=========计算数字' + (i + 1) + '==========');
    console.log("优化前合成分值：" + std[i] + "|前一个数字优化后合成分值：" + std[i - 1]);
    std[i] = parseInt(maxCount[i] * std[i - 1]);
    console.log('使用前一个数值优化后计算合成分值：' + std[i]);
    std[i] = avgNum(i + 1, maxCount[i], std[i]);
    console.log('===================');
  }

  console.log(std.toString());
}


//查找某元素是否存在数组中,存在返回true,不存在返回false  
function checkExist(myarr, e) {
  for (var i = 0; i < myarr.length; i++) {
    if (e == myarr[i]) return true;
  }
  return false;
}

//从数组myarr(n)中任选m个元素的所有组合(m>=1 && m<=n)。  
function getComb(myarr, n, m, rs, result) {
  if (rs == null) {
    rs = new Array();
  }

  for (var i = n; i >= m; i--) {
    rs[m - 1] = myarr[i - 1];      //取出第n个元素作为组合的第一个元素  
    if (m > 1) {
      getComb(myarr, i - 1, m - 1, rs, result);  //递归，在n-1个元素中取m-1个元素,直到取出最后一个元素  
    }
    var comb = rs.sort(function sortNumber(a, b) {
      return a - b
    }).join(',');     //获得一个组合  
    if (!checkExist(result, comb)) {
      result.push(comb);
    }
  }
}

function getAllComb(myarr) {
  var len = myarr.length;
  let sumArr = [];
  for (var i = 2; i <= 16; i++) {
    var result = new Array();  //保存所有组合的数组  
    getComb(myarr, len, i, null, result);
    console.log("c(16," + i + "):" + getGroupCount(16, i));
    // console.log("数组(" + myarr.join(",") + ")的所有的组合(共" + result.length + "种)如下：")
    // console.log(result.join("\t"));
    let sum = 0;
    result.forEach(element => {
      if (checkLinkStr(element, 4, 4)) {
        sum = sum + 1;
      }
    });
    console.log("联通个数为：" + sum);
    sumArr.push(sum);
  }
  console.log(sumArr.sort(function sortNumber(a, b) {
    return b - a
  }));
}

/**
 * 
 * @param {检测给的的数值是否联通} arr 
 * @param {*} col 
 * @param {*} row 
 */
function checkLinkStr(str, col, row) {
  let arr = str.split(',');
  let result = checkLinkArr(arr, col, row);
  if (result) {
    // console.log(arr + "|" + result);
  }
  return result;
}

function checkLinkArr(arr, col, row) {
  let tmpArr = new Array(col * row);
  for (let i = 0; i < tmpArr.length; i++) {
    tmpArr[i] = 1;
  }

  for (let i = 0; i < arr.length; i++) {
    tmpArr[arr[i] - 1] = 2;
  }
  let connArrs = getConnectIndexArr(tmpArr, 4, 4);
  for (let i = 0; i < connArrs.length; i++) {
    let connArr = connArrs[i];
    if (connArr.length == arr.length) {
      let result = true;
      for (let j = 0; j < connArr.length; j++) {
        if ((connArr[j] + 1) != arr[j]) {
          // console.log(connArr[j] + "|" + arr[j]);
          result = false;
          break;
        }
      }
      // console.log(connArrs);
      // console.log(arr);

      if (result) {
        return true;
      }
    }
  }
  // 如果不存在则不连通
  return false;

}

/**
   * @private
   * 获取index上边元素的索引，失败返回-1
   */
function getUp(index, col) {
  return index >= col ? index - col : -1;
}

/**
 * @private
 * 获取index左边的索引，失败返回-1
 */
function getLeft(index, col) {
  return (index % col) > 0 ? index - 1 : -1;
}

/**
   * 获取所有的联通区域
   * 根据给定的一维数组计算得一个二维数组
   * [[2,3,4], [3,6], [7,8,9,18]]
   * i:连通区域计数下标
   * j：方格的一维数组的下标
   */
function getConnectIndexArr(blockValueArr, col, row) {
  let connect = new Array(col * row);
  let cmap = {};
  let up = -1;
  let left = -1;

  for (let i = 0; i < blockValueArr.length; i++) {
    up = getUp(i, col);
    left = getLeft(i, col);
    if (up >= 0 && left >= 0 && blockValueArr[i] > 0 &&
      blockValueArr[i] === blockValueArr[up] &&
      blockValueArr[i] === blockValueArr[left]) {
      const leftConnIndex = connect[left];
      const upConnIndex = connect[up];
      connect[i] = connect[up];
      cmap[upConnIndex].push(i);
      if (upConnIndex !== leftConnIndex) {
        for (let k = 0, clen = cmap[leftConnIndex].length; k < clen; k++) {
          connect[cmap[leftConnIndex][k]] = connect[up];
          cmap[upConnIndex].push(cmap[leftConnIndex][k]);
        }
        delete cmap[leftConnIndex];
      }
    } else if (up >= 0 && blockValueArr[i] > 0 && blockValueArr[i] === blockValueArr[up]) {
      connect[i] = connect[up];
      cmap[connect[up]].push(i);
    } else if (left >= 0 && blockValueArr[i] > 0 && blockValueArr[i] === blockValueArr[left]) {
      connect[i] = connect[left];
      cmap[connect[left]].push(i);
    } else {
      connect[i] = i;
      if (!cmap[i]) {
        cmap[i] = [];
        cmap[i].push(i);
      }
    }
  }
  let connArea = [];
  Object.keys(cmap).forEach(k => {
    connArea.push(cmap[k].sort(function sortNumber(a, b) {
      return a - b
    }));
  });
  return connArea;
}

main();
//测试  
// var arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
// getAllComb(arr);

//测试给的arr数组下标，确定在4*4的二维数组里是否联通
// var subarr = [2, 3, 6, 4, 5];
// let result = checkLinkArr(subarr, 4, 4);
// console.log(result);

// let sum = 10000000000;
// let max = 20;
// for (let i = 19; i > 4; i--) {
//     max = 20 - i;
//     sum = sum / max;
//     console.log(i + "|" + sum);
// }