Function.prototype.e = function(){

	function foreach(input, func){
		for(var e in input){
			func(e, input[e]);
		}
	}
	
	function _setStyle(e, name, value){
		var _name, _value, obj;
		if(typeof name === 'object'){
			obj = name;
			for(_name in obj){
				_value = obj[_name];
				e.style[_name] = _value;
			}
		}
		e.style[name] = value;
	}
	function _setHoverLayer(e, color, opacity){
		var t = e.parentNode;
		var topFix = 0, leftFix = 0;
		while(t.tagName !== 'BODY' &&
				t.style.position !== 'fixed' &&
				t.style.position !== 'relative' &&
				t.style.position !== 'absolute'){
			if(t.tagName === 'TABLE' || t.tagName === 'TD'){
				topFix += t.offsetTop;
				leftFix += t.offsetLeft;
			}
			t = t.parentNode;
		}
		var top = e.offsetTop - t.offsetTop + topFix;
		var left = e.offsetLeft - t.offsetLeft + leftFix;
		var width = e.offsetWidth;
		var height = e.offsetHeight;
		var layer = document.createElement('div');
		_setStyle(layer, {
			top: top + 'px',
			left: left + 'px',
			width: width + 'px',
			height: height + 'px',
			margin: 0,
			padding: 0,
			border: 'none',
			position: 'absolute',
			display: 'block',
			'z-index': -1,
			backgroundColor: color,
			opacity: 0});
		t.appendChild(layer);;
		e.addEventListener('mouseover', function(){
			layer.style.opacity = opacity;
		}, false);
			
		e.parentNode.addEventListener('mouseout', function(){
			layer.style.opacity = 0;
		}, false);
	}
	function _setTip(e, text){
		var layer = document.createElement('pre');
		var t = e.parentNode;
		var topFix = 0, leftFix = 0;
		while(t.tagName !== 'BODY' &&
				t.style.position !== 'fixed' &&
				t.style.position !== 'relative' &&
				t.style.position !== 'absolute'){
			if(t.tagName === 'TABLE' || t.tagName === 'TD'){
				topFix += t.offsetTop;
				leftFix += t.offsetLeft;
			}
			t = t.parentNode;
		}
		var width = e.offsetWidth;
		var height = e.offsetHeight;
		var top = e.offsetTop - t.offsetTop - height + topFix;
		var left = e.offsetLeft - t.offsetLeft + leftFix;
		_setStyle(layer, {
			top: top + 'px',
			left: left + 'px',
			margin: 0,
			padding: 0,
			border: 'none',
			position: 'absolute',
			'z-index': 99999999,
			cursor: 'pointer'});
		layer.appendChild(document.createTextNode(text));
		e.addEventListener('mouseover', function(){
			t.appendChild(layer);
		}, false);
		layer.addEventListener('click', function(){
			this.parentNode.removeChild(this);
		}, false);
		e.parentNode.addEventListener('mouseout', function(){
			if(layer.parentNode === null)return;
			layer.parentNode.removeChild(layer);
		}, false);
	}
	var eLibrary = function(e){
		var ret = {setHoverLayer: setHoverLayer, setTip: setTip, setStyle: setStyle};
		function setHoverLayer(color, opacity){
			_setHoverLayer(e, color, opacity);
			return ret;
		}
		function setTip(text){
			_setTip(e, text);
			return ret;
		}
		function setStyle(name, value){
			_setStyle(e, name, value);
			return ret;
		}
		return ret;
	};
	foreach({setHoverLayer: _setHoverLayer, setTip: _setTip, setStyle: _setStyle},
				function(key, value){
					eLibrary[key] = value;
				});
	var that = this;
	window.addEventListener('load', function(){ that(eLibrary); }, false);
	
};