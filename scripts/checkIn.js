// 根据时间获得分钟
//  比如10:01 转换为10*60+1;

function getMin(time) {
  const arr = time.split(':');
  let hour = arr[0];
  let min = arr[1];
  if (hour.indexOf('0') === 0) {
    hour = hour.substring(1);
  }
  hour = parseInt(hour, 10);
  if (min.indexOf('0') === 0) {
    min = min.substring(1);
  }
  min = parseInt(min, 10);
  return hour * 60 + min;
}

// console.log(getMin('09:57'));


const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('a.txt'),
});

const output = [];
// 姓名  晚于10点次数  不满8小时次数
lineReader.on('line', (line) => {
  // console.log(line);
  const arr = line.split('\t');
  let obj = output[arr[0]];
  if (!obj) {
    obj = {
      l: 0, t: 0, l7: 0, t7: 0, l8: 0, t8: 0, l9: 0, t9: 0,
    };
    output[arr[0]] = obj;
  }
  if (arr[4].length > 0 && arr[5].length > 0) {
    const firstCard = getMin(arr[4]);
    const secCard = getMin(arr[5]);

    let isLater = false;
    let isTime = false;

    const month = arr[2].substring(5, 7);
    console.log(arr[2], month);
    if (firstCard > 600) {
      obj.l += 1;

      if (month === '10') {
        obj.l7 += 1;
      } else if (month === '11') {
        obj.l8 += 1;
      } else if (month === '12') {
        obj.l9 += 1;
      }
      isLater = true;
    }

    if (secCard - firstCard <= 9 * 60) {
      obj.t += 1;
      if (month === '10') {
        obj.t7 += 1;
      } else if (month === '11') {
        obj.t8 += 1;
      } else if (month === '12') {
        obj.t9 += 1;
      }
      isTime = true;
    }
    if (isLater || isTime) {
      console.log(isLater, isTime, line);
    }
  }
});

lineReader.on('close', () => {
  console.log(output);
});
