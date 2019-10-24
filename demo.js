var person = [
	{name: '李白', src: '1.jpg', sex: 'male', des: '大河之剑天...'},
	{name: '孙尚香', src: '2.jpg', sex: 'female', des: '活力迸发'},
	{name: '墨子', src: '3.jpg', sex: 'male', des: '生存就是最...'},
	{name: '公孙离', src: '4.jpg', sex: 'female', des: '晚云落'},
	{name: '孙悟空', src: '5.jpg', sex: 'male', des: '超出三界之外'},
	{name: '后羿', src: '6.jpg', sex: 'male', des: '昨日的太阳'}
]; 

// 了解append(), appendChild(), innerHTML()的区别 https://blog.csdn.net/qq_30715329/article/details/79851015
//把所有的person添加进页面中
var listUl = document.getElementById('list');
function render(list){
	var str = '';
	list.forEach(function(ele, index){
		str += '<li>\
					<img src="./img/'+ ele.src +' " alt="">\
					<span> '+ ele.name +'</span>\
					<span> '+ ele.des +' </span>\
				</li>'
	});
	listUl.innerHTML = str;
}
render(person);


//搜索筛选
var oInput = document.getElementById('inp');
 function deal(){
	// console.log(this.value); 返回输入的内容，输入一个字母返回一次
	state.text = this.value;
	// console.log(filterText(text,person)); 返回相应的数组
	// render(filterText(text,person));
	render(addFn(objFilter,person));
}
//过滤，筛选
//indexOf返回 index值，若返回 =1 则表示不存在
function filterText(text,arr){
	return arr.filter(function(ele,index){
		//通过名字筛选
		 if(ele.name.indexOf(text) !== -1){
		 	return true; 
		 }
		 //通过性别筛选
		 // if(ele.sex.indexOf(text) !== -1){
		 // 	return true;
		 // }
		 //通过简介筛选
		 if(ele.des.indexOf(text) !== -1){
		 	return true;
		 }
	})
}
//	事件冒泡：
	 	// 结构上(非视觉上)嵌套关系的元素，会存在事件冒泡的功能，即 同一事件，自子元素冒泡像父元素(自底向上)
	 	// 即点击底部会实现其父元素功能

//通过点击事件来切换，筛选

   //先改变由all->male->female切换的背景色,即为其添加一个active的class类名
   //addEventListener 事件监听，也可以为同一个元素设置多个事件，后面的不会覆盖前面的事件
   // https://blog.csdn.net/w799766/article/details/89151742  e.target实际促发事件的对象
   var oUl = document.getElementById('oUl'); //事件冒泡
   oUl.addEventListener('click', function(e){
   	// console.log(e.target.tagName);
   		if(e.target.tagName == 'LI'){
   			state.sex = e.target.getAttribute('sex');
   			document.getElementsByClassName('active')[0].className = '';
   			e.target.className = 'active';
   			// console.log(sex);
   			//往dom结构插入li
   			// render(filterSex(sex, person));
			render(addFn(objFilter,person));

   		} 
   })
//通过sex来筛选
function filterSex(sex, arr){
	if(sex == 'all'){
		return arr;
	}else{
		//arr.filter 返回一个数组
		return arr.filter(function (ele, index){
			if(sex == ele.sex){
				return true;
			}
		})
	}
}

//实现在相应性别下查找人只能查相应性别 ，并列组合
//组合筛选

//最初的选中
var state = {
	text: '',
	sex: 'all'
}
var objFilter = {
	text:filterText,
	sex:filterSex
}
function addFn(obj, arr){
	var lastArr = arr;
	for(var prop in obj){
		// console.log(lastArr);
		lastArr = obj[prop](state[prop], lastArr);
		// obj[prop] 拿到 objFilter 里的函数 ，即filterText(text,arr)    filterSex(sex, arr)
	}
	return lastArr;
}
// addFn(objFilter, person);

// 筛选完后都进行render 页面布局渲染一下dom,即插入新的dom


//性能优化，搜索时只取最后的结果,防止在打字就开始搜索
//防抖功能
function debounce(handlerFn, delay){
	var timer = null;
	return function(){
		var self = this;
		// var arg = arguments;
		clearTimeout(timer);
		timer = setTimeout(function(){
			handlerFn.apply(self);
		},delay)
	}
}
oInput.oninput = debounce(deal, 500);

// 总过程：state状态 --> 改变filter状态 --> [arr] renderDom --> view区域  53：00
// 软件过程，设计模式区别