
/**
 * network + 
 */
var NetWork = {};

NetWork.utils = {};

NetWork.active = {};

NetWork.instance = function(){
	this.layers = new Array();
	this.output = new Array();
	
	this.init = function(){
		for(var i = 0;i<this.layers.length;i++){
			this.layers[i].init();
		}
	}
	
	this.addLayer = function(layer){
		this.layers.push(layer);
	}
	
	this.forword = function(input){
		
		var current = input;
		
		for(var i = 0;i<this.layers.length;i++){
			current = this.layers[i].forword(current);
		}
		
		this.output = current;
		
		return this.output;
	}
	
	this.update = function(params){
		
	}
	
}

/**
 * layerType:
 * 0: inputLayer
 * 1: fullyLayer
 * activeType:
 * 0: sigmoid
 * 1: relu
 */
NetWork.layer = function(){
	this.layerType = 0;
	this.name = null;
	this.inputNum = 0;
	this.outputNum = 0;
	this.activeType = null;
	this.weight = null;
	this.bais = null;
	this.input = null;
	this.output = null;
	
	this.init = function(){
		if(this.layerType != 0){
			this.weight = NetWork.utils.matrix2d(this.inputNum,this.outputNum);
			//console.log(this.weight);
			this.bais = NetWork.utils.matrix(this.outputNum);
		}
	}
	
	this.forword = function(input){

		this.input = input;
		
		//console.log(this.name,this.input);
		
		if(this.layerType == 0){
			this.output = this.input;
		}else{
			//console.log(this.outputNum);
			this.output = NetWork.utils.zero(this.outputNum);
			//console.log(this.output);
			for(var o = 0;o<this.outputNum;o++){
				for(var i = 0;i<this.inputNum;i++){
					this.output[o] = this.output[o] * 1 + this.input[i] * this.weight[i][o];
				}
				this.output[o] = this.output[o] + this.bais[o] * 1;
			}
			
			switch (this.activeType) {
			case 0:
				this.output = NetWork.active.sigmoid(this.output);
				break;
			case 1:
				this.output = NetWork.active.relu(this.output);
				break;
			default:
				break;
			}
			
		}
		
		return this.output;
	}
	
	this.update = function(weight,bais){
		this.weight = weight;
		this.bais = bais;
	}
	
}

NetWork.active.sigmoid = function(x){
	var y = new Array(x.length);
	for(var i = 0;i<x.length;i++) {
		y[i] = (1 / (1 + Math.exp(-x[i])));
	}
	return y;
}

NetWork.active.relu = function(x){
	var y = new Array(x.length);
	for(var i = 0;i<x.length;i++) {
		if(x[i] > 0) {
			y[i] = x[i];
		}else {
			y[i] = 0;
		}
	}
	return y;
}

NetWork.utils.zero = function(n){
	var x = new Array(n);
	for(var i = 0;i<n;i++){
		x[i] = 0;
	}
	return x;
}

NetWork.utils.zero2d = function(n,m){
	var x = new Array(n);
	for(var i = 0;i<n;i++){
		var y = new Array(m);
		for(var j = 0;j<m;j++){
			y[j] = 0;
		}
		x[i] = y;
	}
	return x;
}

NetWork.utils.matrix = function(n){
	var x = new Array(n);
	for(var i = 0;i<n;i++){
		x[i] = NetWork.utils.getNumberInND();
	}
	return x;
}

NetWork.utils.matrix2d = function(n,m){
	var x = new Array(n);
	for(var i = 0;i<n;i++){
		var y = new Array(m);
		for(var j = 0;j<m;j++){
			y[j] = NetWork.utils.getNumberInND();
		}
		x[i] = y;
	}
	return x;
}

NetWork.utils.getNumberInND = function(mean,std_dev){
	if(mean = null || std_dev == null){
		mean = 0;
		std_dev = 1;
	}
    return mean+(NetWork.utils.randomND()*std_dev);
}

NetWork.utils.randomND = function(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}
