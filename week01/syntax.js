/**
 * javascript基础语法
 */
"use strict"   						//建议使用严格模式，不规范会报错

//变量定义，变量可不用定义直接使用，为了方便代码阅读，建议定义后再使用
//-----------------null和undefind类型------------------------------------------------
var value1;					//未初始化,undefind类型
var value2 = null;			//空类型

console.log("value1:",value1);	//结果：undefind
console.log("value2:",value2);  //结果：null



//-----------------Number类型--------------------------------------------------------
var num1 = 100;				//Number类型，表示整数和浮点
var num2 = 10.11; 


//-----------------String类型--------------------------------------------------------
var str1 = "Hello1";		//字符串类型，单双引号都可
var str2 = 'Hello2';
var str3 = "000011";
var str4 = "000011.11";

console.log("str1:",str1);

console.log("str1 length:",str1.length); //计算字符串长度



//-----------------Boolean类型--------------------------------------------------------
var boolean_num_t = Boolean(100);
var boolean_num_f = Boolean(0);
var boolean_str_t = Boolean("Hello");
var boolean_str_f = Boolean("");

console.log("100 --> Boolean:",boolean_num_t);		//数值型， 非0为真， 0为假
console.log("0 --> Boolean:",boolean_num_f);
console.log("Hello --> Boolean:",boolean_str_t);	//字符串型，非空位真，空串为假
console.log("  --> Boolean:",boolean_str_f);

//---------------- 数值转为字符串类型 --------------------------------------------------

//方法一：toString, 未初始化和null的值，不能使用该方法转换
console.log("num1 toString:",num1.toString());  //普通值转为字符串类型
console.log("num1 toString type:",typeof(num1.toString()));

//未初始化和null的值，不能使用该方法转换

//undefind转为字符串类型,出错提示为,TypeError: Cannot read property 'toString' of undefined
//console.log("value1 toString:",value1.toString()); 	
//console.log("value1 toString type:",typeof(value1.toString()));

//null转为字符串类型,出错提示为,TypeError: Cannot read property 'toString' of null 
//console.log("value2 toString:",value2.toString()); 	//null值转为字符串
//console.log("value2 toString type:",typeof(value2.toString()));

//方法二：string(num) , 所有类型都可用该方法
console.log("String(num1):",String(num1)); 	   //普通值转为字符串类型
console.log("String(num1) type:",typeof(String(num1)));

console.log("String(value1):",String(value1)); //undefind转为字符串类型
console.log("String(value1) type:",typeof(String(value1)));

console.log("String(value2):",String(value2)); //null转为字符串类型
console.log("String(value2) type:",typeof(String(value2)));


//---------------- 非数值转为数值类型 --------------------------------------------------
console.log("str3:",str3); 
console.log("Number(str3):",Number(str3)); 	       //字符串转为数值型 , "0011" --> 11

console.log("str4:",str4); 
console.log("Number(str4):",Number(str4)); 		   //字符串转为数值型 , "0011.11" --> 11.11

console.log("num2:",num2); 
console.log("parseInt(num2):",parseInt(num2)); 		//浮点转为整型 ， 10.11 --> 10

console.log("str4:",str4); 
console.log("parseInt(str4):",parseInt(str4)); 		//字符串转为数值型 , "0011.11" --> 11

console.log("str4:",str4); 
console.log("parseFloat(str4):",parseFloat(str4)); 	//字符串转为浮点型 , "0011.11" --> 11.11


//---------------- 区别：  == 、 != 、 ===  、 !== ------------------------------------
console.log(value1 == value2);		//判断 值 是否相等，规定null和undefind类型的值是相等的
console.log(value1 != value2);		//判断 值 是否不相等
console.log(value1 === value2);		//判断 值 和 类型 是否 都相等
console.log(value1 !== value2);		//判断 值 和 类型 是否 都不相等

//-----------------判断变量类型--------------------------------------------------------
console.log("value1 type:",typeof(value1));  
console.log("value2 type:",typeof(value2));	 //结果：object

console.log("str1 isNaN:",isNaN(str1));		//判断是否是 非数值， NaN表示非数值
console.log("num1 isNaN:",isNaN(num1));

//-----------------for/in 语句循环遍历对象的属性-----------------------------------------
var person={fname:"John",lname:"Doe",age:25};
var x;
console.log("---------for/in 语句循环遍历对象的所有属性------------"); 
for (x in person) {
	console.log("person:",person[x]); 
}


//----------------- 函数  ---------------------------------------------------------
console.log("-------------------函数----------------------------"); 
//函数定义, 需要调用才生效
function add (name , city){//不用定义返回值类型
	console.log("正在调用add函数..."); 
	var student = [];
	student[0] = name;
	student[1] = city;
	return student;
}

var name = "yang";
var city = "Beijing";

//调用匿名函数
add(name,city);

//调用函数，并获取返回值
var student = add(name,city);
console.log("add()的返回值:",student); 

//----------------- 匿名函数  ---------------------------------------------------------
console.log("-------------------匿名函数--------------------------"); 
//定义匿名函数
var hide = function(name,city){
	console.log("正在调用匿名函数..."); 
	var student = [];
	student[0] = name;
	student[1] = city;
	return student;
}
//调用匿名函数
hide(name,city);

//调用匿名函数，并获取返回值
var student = hide(name,city);
console.log("匿名函数的返回值student:",student); 

//----------------- 回调函数  ---------------------------------------------------------

console.log("-------------------回调函数--------------------------"); 

//定义 作为参数 的函数
function output(name,city){//输出name和city的值
	console.log("正在调用output()..."); 
	console.log("output()输出：" + name + "," + city);
}

//定义函数
function read(callback, name , city){//调用callback函数，对参数name和city进行处理
	console.log("正在调用read()..."); 
	callback(name,city);

}
//调用函数
read(output,"yang","Beijing");


//----------------- 闭包  ---------------------------------------------------------
console.log("------------------- 闭包 --------------------------"); 
//正常情况下，一个函数不能访问它的内部函数的局部变量
//在一个函数内部定义另一个函数，如何访问该函数内部函数的局部变量？
//让内部函数返回这个变量
function outter(count){
  console.log("inner函数调用前的count:",count);
  function inner(){//对outter函数的参数count加1后，返回
  	count++;
  	console.log("inner函数调用后的count:",count);
  	return count;
  }
  
  return inner();
}

console.log("outter()返回值:",outter(1));


//----------------- 对象 ——————————————————————————————————————————————————————————
console.log("------------------- 创建和使用对象方法一 --------------------------"); 

var student = {};	//创建student对象

student.name = "yang";	//对象属性

student.setName = function(name){//对象属性的set方法
	this.name = name;
}

student.getName = function(){//对象属性的get方法
	return this.name;
}

student.setName("yang");//调用set方法
console.log(student.getName());

console.log("------------------- 创建和使用对象方法二 --------------------------"); 

//定义对象
function Student(name){//创建student对象
	this.name = name;
	this.setName = function(name){
		this.name = name;
	}
	this.getName = function(){
		return this.name;
	}
}	
//创建对象
var student = new Student("yang");

console.log(student);

console.log("------------------- 创建和使用对象方法三（NodeJS常用） ------------"); 

function Student(name){//创建student对象
	this.name = name;
}

//object.prototype.name=value,使用prototype属性向对象添加属性和方法
Student.prototype.setName = function(name){//对象属性的set方法
	this.name = name;
}

Student.prototype.getName = function(){//对象属性的get方法
	return this.name;
}	

//创建对象
var student2 = new Student("zhang");
console.log(student2);















