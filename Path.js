;(function(window, document, undefined){

var Property = {
		position : function(elem, style, pos){
			style.left = pos.x + 'px';
			style.top = pos.y + 'px';
		},
		margin : function(elem, style, pos){
			style.marginLeft = pos.x + 'px';
			style.marginTop = pos.y + 'px';
		}
	},
	
	Easing = {
		linear : function(v, t, b, c, d){
			return v;
		},
		swing : function(v, t, b, c, d){
			return 0.5 - Math.cos(v * Math.PI) / 2;
		},
		easeInQuad : function(v, t, b, c, d){
			return c * (t /= d) * t + b;
		},
		easeOutQuad : function(v, t, b, c, d){
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad : function(v, t, b, c, d){
			if((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic : function(v, t, b, c, d){
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic : function(v, t, b, c, d){
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic : function(v, t, b, c, d){
			if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart : function(v, t, b, c, d){
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart : function(v, t, b, c, d){
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart : function(v, t, b, c, d){
			if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint : function(v, t, b, c, d){
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint : function(v, t, b, c, d){
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint : function(v, t, b, c, d){
			if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine : function(v, t, b, c, d){
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine : function(v, t, b, c, d){
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine : function(v, t, b, c, d){
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo : function(v, t, b, c, d){
			return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo : function(v, t, b, c, d){
			return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo : function(v, t, b, c, d){
			if(t == 0) return b;
			if(t == d) return b + c;
			if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc : function(v, t, b, c, d){
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc : function(v, t, b, c, d){
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc : function(v, t, b, c, d){
			if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic : function(v, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if(t == 0) return b;
			if((t /= d) == 1) return b + c;
			if(!p) p = d * .3;
			if(a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic : function(v, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if(t == 0) return b;
			if((t /= d) == 1) return b + c;
			if(!p) p = d * .3;
			if(a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic : function(v, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if(t == 0) return b;
			if((t /= d / 2) == 2) return b + c;
			if(!p) p = d * (.3 * 1.5);
			if(a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack : function(v, t, b, c, d, s){
			if(s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack : function(v, t, b, c, d, s){
			if(s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack : function(v, t, b, c, d, s){
			if(s == undefined) s = 1.70158;
			if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce : function(v, t, b, c, d){
			return c - Easing.easeOutBounce(v, d - t, 0, c, d) + b;
		},
		easeOutBounce : function(v, t, b, c, d){
			if((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;

			} else if(t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;

			} else if(t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;

			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;

			}
		},
		easeInOutBounce : function(v, t, b, c, d){
			if(t < d / 2) return Easing.easeInBounce(v, t * 2, 0, c, d) * .5 + b;
			return Easing.easeOutBounce(v, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	},
	
	Default = {x:0, y:0, z:0},
	
	rnum = /([1-9]+[0-9]*)|(0[1-7]+[0-7]*)|((#|0x)[1-9a-f]+[0-9a-f]*)/i,
	
	coordinate = 'xyz'.split(''),
	
	arr2obj = function(array){
		var result = {},
			axis,
			i = 0,
			len = coordinate.length;
		
		for(;i < len; i++){
			axis = coordinate[i];
			result[axis] = array[i] || 0;
		}
		
		return result;
	}
	
	parse = function(value){
		var match, radix;
		
		if(typeof value == 'number'){
			return parseInt(value);
		}
		
		if(match = rnum.exec(value)){
			value = match[0];
			radix = match[1] ? 10 : match[2] ? 8 : 16;
			return parseInt(value, radix);
		}else{
			return 0
		}
	},
	
	map = function(def, target, transform){
		var result = {},
			name,
			copy;
		
		transform = transform && typeof transform == 'function' ? transform : function(v){return v};
		
		target = target || {};
		if(target.length){
			target = arr2obj(target);
		}
		
		//copy default value
		for(name in def){
			result[name] = def[name];
		}
		for(name in target){
			copy = target[name];
			copy = transform(copy);
			
			result[name] = copy;
		}
		
		return result;
		
	},
	
	drawLine = function(points, t){
		var begin, end,
			result = {},
			axis,
			i = 0,
			len = coordinate.length;
		
		begin = points.begin;
		end = points.end;
		
		for(; i < len; i++){
			axis = coordinate[i];
			result[axis] = (end[axis] - begin[axis]) * t + begin[axis];
		}
		
		return result;
	},
	
	drawCubicBezier = function(points, t){
		var t2, t3,
			begin, end, cp1, cp2,
			a = {},
			b = {},
			c = {},
			result = {},
			axis,
			i = 0,
			len = coordinate.length;

		t2 = t * t;
		t3 = t2 * t;
		
		begin = points.begin;
		end = points.end;
		cp1 = points.cp1;
		cp2 = points.cp2;
		
		for(; i < len; i++){
			axis = coordinate[i];
			c[axis] = 3 * (cp1[axis] - begin[axis]);
			b[axis] = 3 * (cp2[axis] - cp1[axis]) - c[axis];
			a[axis] = end[axis] - begin[axis] - c[axis] - b[axis];
		}
		
		i = 0;
		for(; i < len; i++){
			axis = coordinate[i];
			result[axis] = (a[axis] * t3) + (b[axis] * t2) + (c[axis] * t) + begin[axis];
		}

		return result;
	},
	
	configDrawPoint = function(begin, end){
		var points = {},
			i = 2,
			len = arguments.length;
		
		points.begin = map(Default, begin, parse);
		points.end = map(Default, end, parse);
		
		//config control point
		if(i < len){
			for(;i < len; i++){
				points['cp' + (i - 1)] = map(Default, arguments[i], parse);
			}
		}
		
		return points;
	};
	
function Path(element, offset, type){
	if(typeof element == 'string'){
		element = document.getElementById(element);
	}
	
	if(!(element && element.nodeType && element.nodeType == 1)){
		throw 'Not Find Element!';
		return;
	}
	
	if(offset && typeof offset == 'string'){
		type = offset;
		offset == null;
	}

	this.elem = element;
	this.style = element.style;
	
	this.cache = {};
	
	this.beginStep = this.curStep = 0;
	this.beginPos = map(Default);
	this.curPos = map(Default);
	this.offset = map(Default, offset || {}, parse);
	
	this.setPosition = Property[type] && typeof Property[type] == 'function' ? Property[type] : Property['margin'];
}

Path.prototype = {
	beginPath : function(pos, begin){
		this.beginStep = this.curStep = begin ? Math.floor(begin) : 0;
		
		this.beginPos = map(Default, pos, parse);
		this.curPos = map(Default, pos, parse);
	},
	
	endPath : function(end, easing){
		var pos, duration;
			
		pos = map(Defalut, this.beginPos);
		duration = end > this.curStep ? end - this.curStep : 0;
		
		this.lineTo(pos, duration, easing);
	},
	
	lineTo : function(pos, duration, easing){
		var begin, end, points, percent, temp, tempPos;
		
		duration = Math.floor(duration);
		
		begin = this.curStep;
		end = begin + duration;
		points = configDrawPoint(this.curPos, pos);
		
		easing = Easing[easing] || Easing['linear'];
		
		for(var step = begin; step < end; step++){
			temp = step - begin;
			percent = temp / duration;
			
			temp = easing(percent, temp, 0, 1, duration);
			tempPos = drawLine(points, temp);
			
			this.cache[step] = tempPos;
		}
		
		this.curStep = end;
		this.curPos = points.end;
	},
	
	curveTo : function(pos, cp1, cp2, duration, easing){
		var begin, end, points, percent, temp, tempPos;
		
		duration = Math.floor(duration);
		
		begin = this.curStep;
		end = begin + duration;
		points = configDrawPoint(this.curPos, pos, cp1, cp2);
		
		easing = Easing[easing] || Easing['linear'];
		
		for(var step = begin; step < end; step++){
			temp = step - begin;
			percent = temp / duration;
			
			temp = easing(percent, temp, 0, 1, duration);
			tempPos = drawCubicBezier(points, temp);
			
			this.cache[step] = tempPos;
		}
		
		this.curStep = end;
		this.curPos = points.end;
	},
	
	stay : function(duration){
		var begin, end, tempPos;
		
		duration = Math.floor(duration);
		
		begin = this.curStep;
		end = begin + duration;
		
		tempPos = map(Default, this.curPos);
		tempPos.begin = begin;
		tempPos.end = end;
		
		this.cache['stay'] || (this.cache['stay'] = []);
		this.cache['stay'].push(tempPos);
		
		this.curStep = end;
	},
	
	getStay : function(step){
		var	stay, pos,
			i = 0, len;
			
		if(!(stay = this.cache['stay'])) return
		len = stay.length;
		
		for(; i < len; i++){
			pos = stay[i];
			if(step >= pos.begin && step < pos.end){
				return pos;
			}
		}
	},
	
	update : function(step){
		var pos;
	
		if(step < this.beginStep){
			step = this.beginStep;
		}
		if(step > this.curStep){
			step = this.curStep;
		}
		
		pos = this.cache[step];
		if(!pos){
			if(step == this.curStep){
				pos = this.curPos;
			}else{
				pos = this.getStay(step);
			}
		}
		
		if(!pos){
			throw 'Not Find Pos';
		}
	
		this.setPosition(this.elem, this.style, {
			x : pos.x + this.offset.x,
			y : pos.y + this.offset.y,
			z : pos.z + this.offset.z
		});
	}
};

Path.property = Property;
Path.easing = Easing;

window.Path = Path;
	
})(this, this.document);