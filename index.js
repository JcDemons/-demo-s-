//实现防抖功能
var oInput = document.getElementById('inp');

//防抖功能
function debounce(handler, delay){
	var timer = null;
	return function(){
		var self = this;
		// var arg = arguments;
		clearTimeout(timer);
		timer = setTimeout(function(){
			handler.apply(self);
		},delay)
	}
}

//实现功能
function event() {
	console.log(this.value);
}

//绑定事件
oInput.oninput = debounce(event, 1000);