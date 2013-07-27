Function.prototype.e = function(){
  var that = this;
	var eLibrary = function(e){
		if(this instanceof eLibrary){
			this.__value = e;
			this.__bindingValue = Math.random();
		}
		else return new eLibrary(e);
	};
	eLibrary.prototype = {
		setStyle:function(name, value){
			var _name, _value, obj;
			if(typeof name === 'object'){
				obj = name;
				for(_name in obj){
					_value = obj[_name];
					this.__value.style[_name] = _value;
				}
			}
			this.__value.style[name] = value;
			return this;
		},
		setHoverLayer:function(color, opacity){
		
			if(!eLibrary.__layer_map)eLibrary.__layer_map = {};
			var node = this.__value;
			var bindingValue = 'eLibrary' + this.__bindingValue;
			if(eLibrary.__layer_map[bindingValue]){
				if(eLibrary.__layer_map[bindingValue].parentNode !== null){alert('c');
					alert(eLibrary.__layer_map[bindingValue].style.backgroundColor);
					eLibrary.__layer_map[bindingValue].parentNode.removeChild(eLibrary.__layer_map[bindingValue]);
				}
			}
			var t = node.parentNode;
			var topFix = 0, leftFix = 0;
			while(t.tagName !== 'BODY' &&
					t.style.position !== 'fixed' &&
					t.style.position !== 'relative' &&
					t.style.position !== 'absolute'){
				if(t.tagName === 'TABLE'){
					topFix += t.offsetTop;
					leftFix += t.offsetLeft;
				}
				t = t.parentNode;
			}
			var top = node.offsetTop - t.offsetTop + topFix;
			var left = node.offsetLeft - t.offsetLeft + leftFix;
			var width = node.offsetWidth;
			var height = node.offsetHeight;
			var layer = document.createElement('div');
			new eLibrary(layer).setStyle({
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
			node.addEventListener('mouseover', function(){
				layer.style.opacity = opacity;
			}, false);
			
			node.parentNode.addEventListener('mouseout', function(){
				layer.style.opacity = 0;
			}, false);
			eLibrary.__layer_map[bindingValue] = layer;
			return this;
		},
		setTip:function(text){
		
			if(!eLibrary.__text_map)eLibrary.__text_map = {};
			var node = this.__value;
			var bindingValue = 'eLibrary' + this.__bindingValue;
			if(eLibrary.__text_map[bindingValue]){
				if(eLibrary.__text_map[bindingValue].text === text){
					return this;
				}
				if(eLibrary.__text_map[bindingValue].parentNode !== null){alert('c');
					eLibrary.__text_map[bindingValue].parentNode.removeChild(eLibrary.__text_map[bindingValue]);
					return this;
				}
			}
			var layer = document.createElement('pre');
			var t = node.parentNode;
			while(t.tagName !== 'BODY' &&
					t.style.position !== 'fixed' &&
					t.style.position !== 'relative' &&
					t.style.position !== 'absolute'){
				t = t.parentNode;
			}
			var width = node.offsetWidth;
			var height = node.offsetHeight;
			var top = node.offsetTop - t.offsetTop - height;
			var left = node.offsetLeft - t.offsetLeft;
			new eLibrary(layer).setStyle({
				top: top + 'px',
				left: left + 'px',
				margin: 0,
				padding: 0,
				border: 'none',
				position: 'absolute',
				'z-index': 99999999});
			layer.appendChild(document.createTextNode(text));
			node.addEventListener('mouseover', function(){
				t.appendChild(layer);
			}, false);
			layer.addEventListener('click', function(){
				this.parentNode.removeChild(this);
			}, false);
			node.parentNode.addEventListener('mouseout', function(){
				if(event.fromElement !== node.parentNode)return;
				if(layer.parentNode === null)return;
				layer.parentNode.removeChild(layer);
			}, false);
			eLibrary.__text_map[bindingValue] = layer;
			return this;
		}
	}
	
	window.addEventListener('load', function(){ that(eLibrary); }, false);
	
};
