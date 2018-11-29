/**
 * 计算利率相关
 */

/**
 * 对计算的数值保留两位小数
 */
function toFixed(num, r) {
  return parseFloat(num.toFixed(r));
}

function formatDate(date, fmt) { // author: meizz
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
}


/**
 * 计算num钱，存放days,在rate的7日年化收益率获得收益
 */
function getRate7DayByYear(num, days, rate) {
  const interest = num * rate / 100; // 1 年获得利息
  const interest7Day = interest / (365 / 7); // 7天获得收益
  const insterest1Day = interest7Day / 7; // 1天获得收益

  console.log(num, days, rate, insterest1Day);
  const result = insterest1Day * days;
  console.log(result);
  return result;
}

/**
 * 计算不同7日年化收益率在一定的金额存放一定的天数后收益间的差值
 */
function getComputerDiff(num, days, rate1, rate2) {
  const interest1 = getRate7DayByYear(num, days, rate1);
  const interest2 = getRate7DayByYear(num, days, rate2);
  console.log(interest1 - interest2);
}

/**
 * 868.73
 * 等额本金计算公式：每月还款金额 = （贷款本金 ÷ 还款月数）+（本金 — 已归还本金累计额）×每月利率
 */
function getHouseRate(num, year, rate, startDate) {
  const monthRate = rate / 12;// toFixed(rate / 12 / 100, 4);// (rate / 12);
  const months = year * 12;
  let hasBack = 0;
  const needBase = toFixed(num / (year * 12), 2);
  const startMonth = new Date(startDate);
  let result = 0;
  let tmpNow = 0;
  for (let i = 1; i <= months; i++) {
    const tmp = toFixed((num - hasBack) * monthRate, 2);
    const needBack = toFixed(needBase + tmp, 2);
    if (i >= 34) {
      console.log(i, formatDate(startMonth, 'yyyy-MM-dd'), needBack, needBase, tmp);
    }
    startMonth.setMonth(startMonth.getMonth() + 1);
    hasBack += needBase;
    if (i >= 34) {
      result += needBack;
      tmpNow = num - needBase * 33;
    }
  }
  console.log(result);
  return { all: result, now: tmpNow };
}

/**
 * 等额本息计算公式：〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
 */
function getHourseRate1(num, startNo, endNo, rate) {
  const monthRate = rate / 12;
  const monthCount = endNo - startNo + 1;
  const tmp = (num * monthRate * ((1 + monthRate) ** monthCount)) / (((1 + monthRate) ** monthCount) - 1);
  console.log(tmp, monthRate, monthCount);
}

/**
 * 自由还款
 */
function getHourseRate3(num, startNo, endNo, rate, everyMonth) {
  const monthRate = rate / 12;
  let needBack = num;// 需要还款的本金
  let hasBack = 0; // 已经归还的累计本金
  const startMonth = new Date('2018-11-21');
  let result = 0;
  for (let i = startNo; i <= endNo; i++) {
    const tmp1 = toFixed(needBack * monthRate, 2);
    const tmp2 = toFixed(everyMonth - tmp1, 2);
    hasBack += tmp2;
    hasBack = toFixed(hasBack, 2);
    console.log(i, formatDate(startMonth, 'yyyy-MM-dd'), needBack, tmp1, tmp2, everyMonth);
    needBack -= tmp2;
    needBack = toFixed(needBack, 2);
    startMonth.setMonth(startMonth.getMonth() + 1);
    result += everyMonth;
    if (needBack <= 0 || i === endNo) {
      result += needBack;
      break;
    }
  }
  return { all: result, now: num };
}

// getRate7DayByYear(250000, 31, 4.169);
// getComputerDiff(250000, 30, 6, 4);
// 商贷计算
const shd = getHouseRate(250000, 30, 4.9 * 0.851 / 100, '2016-02-21');
// 公积金剩余还款额 1,132,091.31
const gjj = getHourseRate3(1132091.31, 34, 360, 3.25 / 100, 5000);
// const gjj = getHourseRate3(1132091.31, 1, 25 * 12, 3.25 / 100, 4643); // Test

console.log('当前贷款需还总额：', shd.now + gjj.now);
console.log('到2046年总共还的金额：', shd.all + gjj.all);
console.log('到2046需要还的利息总额：', shd.all - shd.now + gjj.all - gjj.now);
// console.log(shd, shd.all - shd.now);
// console.log(gjj, gjj.all - gjj.now);
