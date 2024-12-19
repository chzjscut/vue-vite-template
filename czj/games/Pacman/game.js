'use strict';
/*
* 小型游戏引擎
*/

// requestAnimationFrame polyfill
// (function(){
//   'use strict';
//   var vendors = ['webkit', 'moz'];

// }());

function Game(id, params) {
  const _ = this;
  let settings = {
    width: 960,						//画布宽度
    height: 640						//画布高度
  };

  let _extend = function(target, settings, params) {
    params = params || {};
    for(let prop in settings) {
      target[prop] = params[prop] || settings[prop];
    }
    return target;
  }
  _extend(_, settings, params);

  var $canvas = document.getElementById(id);
  $canvas.width = _.width;
  $canvas.height = _.height;
  var _context = $canvas.getContext('2d');	//画布上下文环境
  var _stages = [];							//布景对象队列
  var _events = {};							//事件集合
  var _index = 0,								//当前布景索引
      _hander;  								//帧动画控制

  //活动对象构造
  var Item = function(params) {
    this._params = params || {};
    this._id = 0;               //标志符
    this._stage = null;         //与所属布景绑定
    this._settings = {
      x: 0,                     //位置坐标:横坐标
      y: 0,                     //位置坐标:纵坐标
      width: 20,				        //宽
      height: 20,				        //高
      type: 0,					        //对象类型,0表示普通对象(不与地图绑定),1表示玩家控制对象,2表示程序控制对象
      color: '#F00',			      //标识颜色
      status: 1,				        //对象状态,0表示未激活/结束,1表示正常,2表示暂停,3表示临时,4表示异常
      orientation: 0,			      //当前定位方向,0表示右,1表示下,2表示左,3表示上
      speed: 0,				          //移动速度
      //地图相关
      location: null,           //定位地图,Map对象
      coord: null,				      //如果对象与地图绑定,需设置地图坐标;若不绑定,则设置位置坐标
      path: [],				          //NPC自动行走的路径
      vector: null,			        //目标坐标
      //布局相关
      frames: 1,				        //速度等级,内部计算器times多少帧变化一次
      times: 0,				          //刷新画布计数(用于循环动画状态判断)
      timeout: 0,				        //倒计时(用于过程动画状态判断)
      control: {},				      //控制缓存,到达定位点时处理
      update:function(){}, 	    //更新参数信息
      draw:function(){}		      //绘制
    };

    _extend(this, this._settings, this._params);
  };

  //地图对象构造器
  var Map = function(params) {
    this._params = params || {};
    this._id = 0; //标志符
    this._stage = null; //与所属布景绑定
    this._settings = {
      x: 0,					//地图起点坐标
      y: 0,
      size: 20,				//地图单元的宽度
      data: [],				//地图数据
      x_length: 0,				//二维数组x轴长度
      y_length: 0,				//二维数组y轴长度
      frames: 1,				//速度等级,内部计算器times多少帧变化一次
      times: 0,				//刷新画布计数(用于循环动画状态判断)
      cache: false,    		//是否静态（如静态则设置缓存）
      update: function(){},	//更新地图数据
      draw: function(){},		//绘制地图
    }

    _extend(this, this._settings, this._params);
  };
  //获取地图上某点的值
  Map.prototype.get = function(x, y) {
    if(this.data[y] && typeof this.data[y][x] !== 'undefined') {
      return this.data[y][x];
    }
    return -1;
  }
  //设置地图上某点的值
  Map.prototype.set = function(x, y, value){
    if(this.data[y]){
      this.data[y][x] = value;
    }
  };
  //地图坐标转画布坐标
  Map.prototype.coord2position = function(cx, cy) {
    return {
      x: this.x + cx * this.size + this.size/2,
      y: this.y + cy * this.size + this.size/2
    }
  }
  //画布坐标转地图坐标
  Map.prototype.position2coord = function(x, y) {
    var fx = Math.abs(x-this.x)%this.size-this.size/2;
    var fy = Math.abs(y-this.y)%this.size-this.size/2;
    return {
      x:Math.floor((x-this.x)/this.size),
      y:Math.floor((y-this.y)/this.size),
      offset:Math.sqrt(fx*fx+fy*fy)
    };
  }

  //布景对象构造器
  var Stage = function(params) {
    this._params = params || {};
    this._settings = {
      index: 0,                   //布景索引
      status: 0,                  //布景状态,0表示未激活/结束,1表示正常,2表示暂停,3表示临时,4表示异常
      maps: [],                   //地图队列
      audios: [],                 //音频资源
      images: [],                 //图片资源
      items: [],                  //对象队列
      timeout: 0,                 //倒计时(用于过程动画状态判断)
      update: function() {}       //嗅探,处理布局下不同对象的相对关系
    };

    _extend(this, this._settings, this._params);
  };
  //添加对象
  Stage.prototype.createItem = function(options) {
    var item = new Item(options);
    //动态属性
    if(item.location) {
      var position = item.location.coord2position(item.coord.x, item.coord.y);
      item.x = position.x;
      item.y = position.y;
    }
    //关系绑定
    item._stage = this;
    item._id = this.items.length;
    this.items.push(item);
    return item;
  };
  //获取对象列表
  Stage.prototype.getItemsByType = function(type) {
    return this.items.filter(item => item.type === type);
  }
  //添加地图
  Stage.prototype.createMap = function(options) {
    var map = new Map(options);
    //动态属性
    map.data = JSON.parse(JSON.stringify(map._params.data)); //深拷贝
    map.y_length = map.data.length;
    map.x_length = map.data[0].length;
    map.imageData = null;
    //关系绑定
    map._stage = this;
    map._id = this.maps.length;
    this.maps.push(map);
    return map;
  };
  //绑定事件
  Stage.prototype.bind = function(eventType, callback) {
    if(!_events[eventType]) {
      _events[eventType] = {};
      window.addEventListener(eventType, function(e) {
        var key = `s${_index}`;
        if(_events[eventType][key]) {
          _events[eventType][key](e);
        }
        e.preventDefault();
      })
    }
    _events[eventType]['s' + this.index] = callback.bind(this); //绑定事件作用域
  }

  //动画开始
  this.start = function() {
    var f = 0; //帧数计算
    var fn = function() {
      var stage = _stages[_index];
      _context.clearRect(0, 0, _.width, _.height);		//清除画布
      _context.fillStyle = '#000000';
      _context.fillRect(0, 0, _.width, _.height);
      f++;
      if(stage.timeout){
        stage.timeout--;
      }
      if(stage.update() != false) {                   //update返回false,则不绘制
        stage.maps.forEach(function(map) {
          if(!(f % map.frames)) {
            map.times = f/map.frames; //计数器
          }
          if(map.cache) {
            if(!map.imageData) {
              _context.save();
              map.draw(_context);
              map.imageData = _context.getImageData(0, 0, _.width, _.height);
              _context.restore();
            } else {
              _context.putImageData(map.imageData, 0, 0);
            }
          } else {
            map.update();
            map.draw(_context);
          }
        });
        stage.items.forEach(function(item) {
          if(!(f % item.frames)){
            item.times = f/item.frames;
          }
          if(stage.status === 1 && item.status !== 2){ //对象及布景状态都不处于暂停状态
            if(item.location){
              item.coord = item.location.position2coord(item.x, item.y);
            }
            if(item.timeout){
              item.timeout--;
            }
            item.update();
          }
          item.draw(_context);
        });
      }
      _hander = requestAnimationFrame(fn);
    }
    _hander = requestAnimationFrame(fn);
  };
  //动画结束
  this.stop = function() {

  };
  //事件坐标
  this.getPosition = function(e) {

  };
  //创建布景
  this.createStage = function(options) {
    var stage = new Stage(options);
    stage.index = _stages.length;
    _stages.push(stage);
    return stage;
  };
  //指定布景
  this.setStage = function(index) {
    _stages[_index].status = 0;
    _index = index;
    _stages[_index].status = 1;
    return _stages[_index];
  };
  //下个布景
  this.nextStage = function() {
    if(_index < _stages.length - 1) {
      return this.setStage(++_index);
    }
    throw new Error('unfound new stage.');
  };

  //初始化游戏引擎
  this.init = function(){
    _index = 0;
    this.start();
  };
}