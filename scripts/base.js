/**
 * javascript语言基本知识点
 */

/**
 * 变量命名可以使用字母、下划线、数字以及$符号
 * 必须以字母开头
 * 也可以以_、$开头
 * 大小写敏感
 * 保留字是不可以作为变量名的
 */
const $ = '$';
console.log($);

const _ = '_';
console.log(_);

const a = 'a';
console.log(a);

const A = 'A';
console.log(A);

/**
 * 声明与赋值
 */
let _firstVar;
console.log(_firstVar);// undefined;
console.log(typeof _firstVar);// undefined;

_firstVar = null;
console.log(_firstVar);// null;
console.log(typeof _firstVar);// object;

_firstVar = 'hello javascript!';
console.log(typeof _firstVar);// string
console.log(_firstVar);// hello javascript!

console.log(typeof undefined); // undefined
console.log(typeof null); // object

console.log(undefined === null); // false
console.log(undefined == null); // true

const _obj = {};
_obj.a = 'a';

class _CObj extends Object {
  constructor() {
    super();
    this._v = 'v';
  }
}

const _cobj = new _CObj();
console.log(_cobj);

/**
 * 运算类型
 * typeof 返回变量的类型
 * instanceof Returns true if an object is an instance of an object type
 */
/* eslint-disable */
console.log(typeof _obj);
console.log(typeof _cobj);
console.log(_cobj instanceof Object);
console.log(new Number(1), typeof new Number(1)); // object
console.log(new Boolean(false), typeof new Boolean(false)); // object
console.log(new String('123'), typeof new String('123')); // object
console.log([1, 2, 3, 4], typeof [1, 2, 3, 4]);   // object
/* eslint-enable */
/**
 * 运算符
 * + - * / % ** ++ --
 * = += -= *= /= %=
 * == === != !== > < >= <= ?
 * && || !
 * & | ~ ^ << >> >>>
 */

/**
 * 函数
 * 临时变量相关
 */
/* eslint-disable */
let _v1 = 1;
function F1(_v1) {
  _v1 = 3;
}
function F2(_v1) {
  _v1 = 3;
  return _v1;
}
F1(_v1);
console.log('_v1', _v1);// 值没有改变
_v1 = F2(_v1);
console.log('_v1', _v1);// 值改变
/* eslint-enable */

/**
 * String
 */
const str1 = '1234567123';
const str2 = '一二三四五六七一二三';
console.log(str1.length, str2.length);

console.log(str1.indexOf('345'), str2.indexOf('三四五'));

console.log(str1.lastIndexOf('345'), str2.indexOf('三四五'));

console.log(str1.search(/1/));

console.log(str1.slice(-4, -1));// 712

const text1 = 'Hello World!'; // String
const text2 = text1.toUpperCase();
console.log(text1, text2, text1 === text2);

const text3 = text1.concat(text2);
console.log(text1, text3, text1 === text3);

const str3 = '       Hello World!        ';
str3.trim();
console.log(str3);

/**
 * Array
 */
const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits[6] = 'Lemon'; // adds a new element (Lemon) to fruits
console.log(fruits);// [ 'Banana', 'Orange', 'Apple', 'Mango', <2 empty items>, 'Lemon' ]

/**
 * Symbol
 */
const s = Symbol('test');
console.log(s);
console.log(typeof s);
