  //扁平式的数据结构   需要封装方法  通过ID找到没一项生成节够递归
    //首先根据ID找发哦数据中的任意一项
                    function getIdItem(h){
                        for(var i=0;i<dete.length;i++){
                            if(dete[i].id===h){
                                return dete[i]
                            }
                    }
                    }
        //生成结构
        // var html=""
        //这里记得要存成变量
        // var item=getIdItem(13445354)
        // var html='<ul><li><span>'+item.title+'</span></li></ul>'
        // box.innerHTML=html;
    //现在封装的方法是 通过ID找到他下边的所有子级
                function getCliledId(id){
                    //真被一个空数组
                    var attr=[]
                        for(var i=0;i<dete.length;i++){
                            //如果有第i个上面的id跟一个父级的ID相同就把他添加到数组里
                            if(dete[i].pid===id){
                                attr.push(dete[i]) 
                            }
                        }
                        return attr;
                }   
// 现在封装的方法是根据传入的ID  就给返回这个数据下生成ul结构 用到递归
                function jiegou(id){

                 var cliled=getCliledId(id);
                //如果有子级
                var html=""
                if(cliled.length){
                   html+='<ul class="content_left_list">';
                   //从不按入的ID 如果有子级 循环他的子级
                    for(var i=0;i<cliled.length;i++){
                        //每个子级的title
                       
                        html+= '<li custome-id="'+cliled[i].id+'">'
                        html+='<img src="img/folder_jt1.png">'
                        html+=' <img src="img/s_folder2.png">'
                        html+='<span>'+cliled[i].title+'</span>';
                        html+=jiegou(cliled[i].id)
                        html+='</li>'
                        }
                html+='</ul>'
                }
                return html
                }
                //找到所有的父级 传入一个ID
                function getParentAllById(id){
                    var arr=[];
                     var item=getIdItem(id)
                 if(item){
                    arr.push(item)
                    //链接
                    arr=arr.concat(getParentAllById(item.pid))
                 }
                 return arr
                }
                