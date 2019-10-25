// 总过程：state状态 --> 改变filter状态 --> [arr] renderDom --> view区域
var initState = {
	text: '',
	sex: 'all'
}
function creatStore(initState){

	var state = initState || {};
	// 获取初始状态
	function getState(){
		return state;
	}

	// 修改状态
	var list = [];
	function dispatch(){
		state[action.type] = action.value;
		list.forEach(function (ele, index){
			ele();
		});
	}
	function subScribe(hander){
		list.push(hander);
	}
	return {
		getState: getState,
		dispatch: dispatch,
		subScribe: subScribe
	}
}