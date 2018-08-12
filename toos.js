//给指定的ID加样式
function addStyleBgById(id){
    treeMenu.find('div').css('background','')
    treeMenu.find('div[custom-id="'+id+'"]').css('background','red')	
}
// 根据id找到数据中的某一项
function getItemById(id){
    for( var i = 0; i < data.length; i++ ){
        if(data[i].id == id){
            return data[i]
        }
    }
    return null;	
}

// 通过一个id找到所有的子级
/*
    参数 是一个id
    返回值 数组 没有子级就是空数组
*/
function getChildsById(id){
    var arr = [];
    for( var i = 0; i < data.length; i++ ){
        if(data[i].pid == id){
            arr.push(data[i]);
        }
    }	
    return arr;
}
// 找到指定id所有的父级

function getParentAllById(id){
    var arr = [];
    var item = getItemById(id); // 先找到这条数据
    if(item){
        arr.push(item);
        // 递归调用这个元素，函数会返回当前数据的父级
        // 父级和当前的元素拼起来
        arr = arr.concat(getParentAllById(item.pid))
    }
    return arr;	
}

// 作用：根据传入的id，生成这个id下的这一级的ul结构
function createTreeHtml(id){
    // 通过传入的id，找到所有的子级
    // 有子级生成ul结构	
    var childs = getChildsById(id);
    var html = '';
    //如果有子级
    if(childs.length){


        html += '<ul class="content_left_list">';
        for( var i = 0; i < childs.length; i++ ){
            var lastChilds=getChildsById(childs[i].id)
            //处里树形菜单最后一个没有子级的方法  有没有图片
            var  icoClass=lastChilds.length?"content_left_list_ico":""

            var lastChilds=getChildsById(childs[i],id)
            //                                                 用来控制前面两个小图标的class
                html += '<li class="left_item">' 
                html+='<div custome-id="'+childs[i].id+'"  class='+icoClass+'>'+childs[i].title+'</div>';
                //递归
                html += createTreeHtml(childs[i].id)
                html += '</li>'
            
        }		
        html += '</ul>'
    }

    return html;
}

//父级名字渲染出来 上面nav 父级
function createPathHtml(id){
    var parents = getParentAllById(id).reverse();
    if(parents.length){
        var a = ''
        //这里面生成上面nav父级结构  点击事件只给a标签点击所以最后一个是span
        for( var i = 0; i < parents.length-1; i++ ){
            //                            这个ID是每次点击时候记录东西的ID
             a+= '<a href="javascript:;" custome-id="'+parents[i].id+'">'
             +parents[i].title+'<img src="img/br_jt.png">'+'</a>'	
        }	
        a += '<span  class="border_bottom" zuihouyixiang="'+ parents[parents.length-1].id +'">'+ parents[parents.length-1].title +'</span>'
    }
    return a;
}



// 渲染文件区域的

//封装了一个专门生成结构的函数
function shengchengfilesHtml(obg){
 
  
    return '<li class="right_div_item" custome_id="'+obg.id+'">\
                    <span class="danxuan"></span>\
                 <img src="img/folder-b.png" class="right_div_item_img">\
                    <i class="item_input">'+obg.title+'</i>\
                  <input type="text" class="name">\
                   </li>'
}

function createFileHtml(id){
    var childs = getChildsById(id);
    var filesHtml = ''
    if(childs.length){
         for( var i = 0; i < childs.length; i++ ){
            filesHtml += shengchengfilesHtml(childs[i])
            $(".right-img").css("display","none")
            //filesHtml += '<div custome-id="'+childs[i].id+'">'+childs[i].title+'</div>'
        }
    }else{
        $(".right-img").show()
    }
    return filesHtml;	
}	



//碰撞检测函数
function getRect(el){
    return el.getBoundingClientRect();
}
function collision(dragEl,hitedEl){
    var dragRect = getRect(dragEl);
    var hitedRect = getRect(hitedEl); 

    if(
        dragRect.right < hitedRect.left || 
        dragRect.bottom < hitedRect.top ||
        dragRect.left > hitedRect.right ||
        dragRect.top > hitedRect.bottom
    ){
        return false
    }

    return true
}
/// 接收一个数组，找数组id的每一个子孙
function getChildsAllByIds(idsArr){
    var arr = [];
    for( var i = 0; i < idsArr.length; i++ ){
        arr = arr.concat(getChildsAllById(idsArr[i]))
    }
    return arr;	
}
// 接收一个数组，数组中存的id，找到每一个id所有的子孙
function getChildsAllById(id){
    var self = getItemById(id);
    var arr = [];

    arr.push(self);

    var childs = getChildsById(id);

    if(childs.length){
        for( var i = 0; i < childs.length; i++ ){
            arr = arr.concat(getChildsAllById(childs[i].id))
        }
    }else{
        $(".right-img").show()
    }

    return arr;

}

// 接收一个数组，找数组id的每一个子孙
function getChildsAllByIds(idsArr){
    var arr = [];
    for( var i = 0; i < idsArr.length; i++ ){
        arr = arr.concat(getChildsAllById(idsArr[i]))
    }
    return arr;	
}
//下面是重命名
	// 指定id找所有的兄弟
	function getBrothersById(id){
		var self = getItemById(id); // 自己
		var arr = [];
		for( var i = 0; i < data.length; i++ ){
			if(data[i].pid == self.pid){
				arr.push(data[i])
			}		
		}	
		return arr;
	}
	// 给定一个id，和这个id所有的弟兄对比，是否存在某个名字
	function isExistBrothersNameById(id,title){ 
		// 排出自己
		var brothers = getBrothersById(id).filter(function (item){
			return item.id != id;	
		});

		for( var i = 0; i < brothers.length; i++ ){
			if(brothers[i].title == title){
				return true;
			}
        }
    }
    //比较当前父级下面名字有没有相同的
    function isExistChildsNameById(id,value){
		var childs = getChildsById(id);
		for( var i = 0; i < childs.length; i++ ){
			if(childs[i].title === value){
				return true;
			}		
		}

		return false;	
	}
//上面提醒弹框  用的函数
           

var timer = null;

function tip(cls,value){
    fullTipBox.css('top',-60);
    fullTipBox[0].style.transition = 'none';
    tipText.text(value);
    fullTipBox.removeClass(WARN+' ' + OK).addClass(cls);
    setTimeout(function (){
        fullTipBox.css('top',0);
        fullTipBox[0].style.transition = '.1s';
        
    })	
    clearTimeout(timer)
    timer = setTimeout(function (){
        fullTipBox.css('top',-60);	
    },1000)	
}
//批量删除
function delectItemByIds(delectIds){
    for( var i = 0; i < delectIds.length; i++ ){
        delectItemById(delectIds[i])	
    }	
}
// 找到指定id的父级
function getParentById(id){
    var self = getItemById(id);
    for( var i = 0; i < data.length; i++ ){
        if(data[i].id == self.pid){
            return data[i]
        }
    }
    return null;
}
// 接收一个数组，找数组id的每一个子孙
function getChildsAllByIds(idsArr){
    var arr = [];
    for( var i = 0; i < idsArr.length; i++ ){
        arr = arr.concat(getChildsAllById(idsArr[i]))
    }
    return arr;	
}