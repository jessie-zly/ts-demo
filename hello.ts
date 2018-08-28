
// 变量
let isDone: boolean = true; // boolean 类型
let NaNNumber: number = NaN; // number 类型 ==> x进制, NaN
let myName: string = 'jessie'; // string 类型
let something: any; // 任意类型 --> 等价于 let something;

// 类型推论
let charCode = 'abs'; // 等价于 ==> let charCode: string = 'abs';

// 联合类型
let myFavoriteNumber: string | number; // 使用 | 来分割
function getSomething(something: string | number) {
	return something.toString(); // 只能访问共有的属性和方法
}

// 接口 interface
// 接口是对行为的抽象，而具体如何行动需要由类（class）去实现（implements）
// 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
interface Person {
	readonly id: number; // 只读属性
	name: string; // 确定属性
	age?: number; // 可选属性
	[propName: string]: any; // 任意属性
}
let tom: Person = { // 限定 tom 为 Person 类型
	id: 123123,
	name: 'Tom',
	age: 25,
	gender: 'male'
};
// 接口可以继承接口,也可以继承类
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};

// 数组 propName: type[]
let fibonacci: number[] = [ 1, 1, 2, 3, 5 ]; // number
let fibonacci2: (string | number)[] = [ 1, '1', '2', '3' ]; // 联合类型
// 数组泛型
let fibonacci3: Array<number> = [ 1, 1, 2, 3, 5 ];
// 接口表示数组
interface arr{
  // [index: number]: number
  [index: number]: string
}
let arr: arr = ['1','2','3']
// 数组 any 类型
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];


// 函数
// 声明式
// 无返回值 --> void
function alertName(): void {
	alert(`I'm jessie.`);
}
// 有返回值
// 参数要保持一致
// 可选参数后面不允许再出现必须参数了
// TypeScript 会将添加了默认值的参数识别为可选参数,此时就不受「可选参数必须接在必需参数后面」的限制
// function 函数名([参数名: 输入参数类型]): 输出类型 {
//   return xxx;
// }
function sum(x: number,z: number = 1, y: number, a?: number): number {
  return x + y + z;
}
// 函数表达式
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
// 接口定义
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 剩余参数
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
      array.push(item);
  });
}
// 重载 => 多个同名函数
// TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
  }
}

// 类型断言（Type Assertion） => 可以用来手动指定一个值的类型
// <类型>值 | 值 as 类型 => tsx 中使用后面一种
// 类型断言不是类型转换!
function getLength(something: string | number): number {
  if ((<string>something).length) { // 此次断言
      return (<string>something).length;
  } else {
      return something.toString().length;
  }
}

// 第三方文件声明
declare var jQuery: (selector: string) => any;
declare var $: (selector: string) => any;
$('#app') | jQuery('#app')
// 在使用到的文件的开头，用「三斜线指令」表示引用了声明文件
/// <reference path="filePath" />

// 内置对象
// es 内置对象 => Boolean、Error、Date、RegExp 等
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
// DOM 和 BOM 的内置对象 => Document、HTMLElement、Event、NodeList 等
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});

// 类型别名
// 用来给一个类型起个新名字
// 使用 type 进行定义
type Name = string; // string 别名为 Name
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

// 字符串字面量类型
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个
// 使用 type 进行定义
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// 元祖 Tuple
// 合并了不同类型的对象
// 类似数组,可以通过下标访问 | 赋值
let tupleJessie: [string, number] = ['jessie', 25];
tupleJessie[0] // -> 'jessie'
tupleJessie[1] // -> 25
tupleJessie.push(true) // ->报错 元祖越界,添加的值限制为元组中每个类型的联合类型
// 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
let tupleJessie1: [string, number]  = ['jessie']// -> 报错,缺少值

// 枚举 Enum
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 自动赋值
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
Days["Sun"] === 0 // true
Days[0] === "Sun" // true
// 手动赋值
// 未手动赋值的枚举项会接着上一个枚举项递增
enum Days {Sun1 = 7, Mon1 = 1, Tue1, Wed1, Thu1, Fri1, Sat1};
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）
enum Color {Red, Green, Blue = "blue".length};
// 常数枚举  -> const enum 定义
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
  Up, // -> 0
  Down, // -> 1
  Left, // -> 2
  Right // -> 3
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 外部枚举  -> declare enum 定义
declare enum Directions2 {
  Up,
  Down,
  Left,
  Right
}
let directions2 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 类 class
// 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
// 对象（Object）：类的实例，通过 new 生成
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
// 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
// 存取器（getter & setter）：用以改变属性的读取和赋值行为
// 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
// 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
// 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
class Animal {
  name: string;
  constructor(name: string) {
      this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}
let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
// 三种访问修饰符（Access Modifiers），分别是 public、private 和 protected
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问,在子类中也是不允许访问的
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
// 抽象类
// 抽象类是不允许被实例化的
// 抽象类中的抽象方法必须被子类实现

// 类与接口 -> 单继承多实现
// 不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现

// 泛型 Generics
// 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性




