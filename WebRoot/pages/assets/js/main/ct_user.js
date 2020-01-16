$(document).ready(function(){


    //选取的User
    var userList;
    var userIndex;
    var currentUser;
});


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////用户管理////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * 添加用户
 */
function addUser(){
    var userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
    var bodyParam={'username':$('#username').val(),'password':$('#password').val(),'nickname':$('#nickname').val(),
        'comment':$('#comment').val(),'role':$('#role').val(),'new_flag':$('#new_flag').val(),'frozen_flag':$('#frozen_flag').val(),'c_id':userinfo['id']};
    var httpR = new createHttpR(url+'addUser','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            alert("新建成功！");
            window.location.reload();
            //window.location.href="interface.html?index="+interfaceIndex;
        }
    });
}

/**
 * 修改用户
 * @param id
 */
function updateUser(bodyParam){

    var httpR = new createHttpR(url+'updateUser','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            alert("修改成功！");
            window.location.reload();
            //window.location.href="interface.html?index="+interfaceIndex;
        }
    });
}

/**
 * 删除用户
 * @param id
 */
function deleteUser(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'deleteUser','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            alert("删除成功！");
            window.location.reload();
        }
    });
}
/**
 * 查询用户
 * @param username
 * @param currentPage
 * @param pageSize
 */
function  queryUsers (username,bodyParam,currentPage,pageSize) {


    //分页显示的页码数  必须为奇数
    var showPage=7;
    if(username==null||username==''){
        bodyParam['page']=currentPage;
        bodyParam['size']=pageSize;
    }
    else{
        bodyParam['page']=currentPage;
        bodyParam['size']=pageSize;
        bodyParam['username']='%'+username+'%';
    }

    var httpR = new createHttpR(url+'listUser','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        var msg = obj['msg'];
        if(status=='0'){
            var data=msg['data'];
            userList=msg['data'];
            var html='';
            for(var o in data){
                html+='<tr index='+o+' class="gradeX">\n' +
                    '<td>'+data[o].id+'</td>\n' +
                    '<td>'+data[o].username+'</td>\n' +
                    '<td>'+data[o].nickname+'</td>\n' +
                    '<td>'+data[o].comment+'</td>\n' +
                    '<td>'+data[o].c_dt+'</td>\n' ;
                //console.log(param.hasOwnProperty('new_flag'));
                //console.log(param.hasOwnProperty('update_flag'));
                //console.log(param.hasOwnProperty('frozen_flag'));

                if(bodyParam.hasOwnProperty('frozen_flag')){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">冻结</button></td>\n';
                }
                else if(bodyParam.hasOwnProperty('new_flag')){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">新用户待审核</button></td>\n';
                }
                else if(bodyParam.hasOwnProperty('update_flag')){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">修改待审核</button></td>\n';
                }
                else{
                    html+='<td><button type="button" class="btn btn-link text-success m-1">可用</button></td>\n';
                }
                html+='<td><button  type="button" index='+o+' data-toggle="modal" data-target="#update-box" class="updateUser btn btn-primary btn-sm waves-effect waves-light m-1 font-14">修改</button>\n' +
                    '<button  type="button" index='+o+' data-toggle="modal" data-target="#delete-box" class="deleteUser btn btn-danger btn-sm waves-effect waves-light m-1 font-14">删除</button></td>';

                html+='</tr>';
            }
            $('#contentTbody').html(html);
            var num=msg['num'];
            if(num>0) {
                var pageHtml = '';
                var totalPage = 0;
                if (num % pageSize == 0) {
                    totalPage = num / pageSize;
                }
                else {
                    totalPage = Math.ceil(num / pageSize);
                }

                if (currentPage == 1) {
                    pageHtml += '<li class="paginate_button page-item previous disabled" id="default-datatable_previous"><a\n' +
                        '                                href="#" aria-controls="default-datatable" data-dt-idx="0" tabindex="0"\n' +
                        '                                class="page-link">上一页</a></li>';
                }
                else {
                    pageHtml += '<li class="paginate_button page-item previous prevBtn" id="default-datatable_previous"><a\n' +
                        '                                href="#" aria-controls="default-datatable" data-dt-idx="0" tabindex="0"\n' +
                        '                                class="page-link">上一页</a></li>';
                }
                if (totalPage <= showPage) {
                    for (var i = 1; i < Number(totalPage) + 1; i++) {
                        if (currentPage == i) {
                            pageHtml += '<li class="paginate_button page-item active">' +
                                '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                '</li>';
                        }
                        else {
                            pageHtml += '<li class="paginate_button page-item">' +
                                '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                '</li>';
                        }
                    }
                }
                else {
                    if (currentPage <= (showPage - 1) / 2) {
                        for (var i = 1; i <= showPage; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }
                    else if (totalPage - currentPage < (showPage - 1) / 2) {
                        for (var i = Number(totalPage) - showPage; i <= totalPage; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }
                    else {
                        for (var i = Number(currentPage) - (showPage - 1) / 2; i <= Number(currentPage) + (showPage - 1) / 2; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }


                }

                if (currentPage == totalPage) {
                    pageHtml += ' <li class="paginate_button page-item next disabled" id="default-datatable_next"><a href="#"\n' +
                        '           aria-controls="default-datatable"\n' +
                        '           data-dt-idx="7"\n' +
                        '           tabindex="0"\n' +
                        '           class="page-link">下一页</a>\n' +
                        '   </li>';
                }
                else {
                    pageHtml += ' <li class="paginate_button page-item next nextBtn" id="default-datatable_next"><a href="#"\n' +
                        '           aria-controls="default-datatable"\n' +
                        '           data-dt-idx="7"\n' +
                        '           tabindex="0"\n' +
                        '           class="page-link">下一页</a>\n' +
                        '   </li>';
                }
                /* pageHtml+='<li><input type="text" id="jumpPageText" class="paging-inpbox form-control"></li>\n' +
                     '<li><button type="button" id="jumpBtn" class="paging-btnbox btn btn-primary">跳转</button></li>\n' +
                     '<li><span class="number-of-pages">共'+totalPage+'页</span></li>';*/

                $('.pagination').html(pageHtml);
            }


        }
    });
}
/**
 * 查询用户
 * @param username
 * @param currentPage
 * @param pageSize
 */
function  queryAllUsers (username,bodyParam,currentPage,pageSize) {

    //分页显示的页码数  必须为奇数
    var showPage=7;
    if(username==null||username==''){
        bodyParam['page']=currentPage;
        bodyParam['size']=pageSize;
    }
    else{
        bodyParam['page']=currentPage;
        bodyParam['size']=pageSize;
        bodyParam['username']='%'+username+'%';
    }

    var httpR = new createHttpR(url+'listUser','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        var msg = obj['msg'];
        if(status=='0'){
            var data=msg['data'];
            userList=msg['data'];
            var html='';
            for(var o in data){
                html+='<tr index='+o+' class="gradeX">\n' +
                    '<td>'+data[o].id+'</td>\n' +
                    '<td>'+data[o].username+'</td>\n' +
                    '<td>'+data[o].nickname+'</td>\n' ;
                if(data[o].role=='0'){
                    html+='<td>厅管理员</td>\n' ;
                }
                else if(data[o].role=='1'){
                    html+='<td>内容维护人员</td>\n' ;
                }
                else{
                    html+='<td>单位用户</td>\n' ;
                }
                html+='<td>'+data[o].comment+'</td>\n' +
                    '<td>'+data[o].c_dt+'</td>\n' ;
                if(data[o].frozen_flag=='1'){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">冻结</button></td>\n';
                }
                else if(data[o].new_flag=='0'){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">新用户待审核</button></td>\n';
                }
                else if(data[o].new_flag=='2'){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">新用户驳回</button></td>\n';
                }
                else if(data[o].update_flag=='0'){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">修改待审核</button></td>\n';
                }
                else if(data[o].update_flag=='2'){
                    html+='<td><button type="button" class="btn btn-link text-danger m-1">修改驳回</button></td>\n';
                }
                else{
                    html+='<td><button type="button" class="btn btn-link text-success m-1">可用</button></td>\n';
                }
                html+='<td><button  type="button" index='+o+' data-toggle="modal" data-target="#update-box" class="updateUser btn btn-primary btn-sm waves-effect waves-light m-1 font-14">修改</button>\n' +
                    '<button  type="button" index='+o+' data-toggle="modal" data-target="#password-box" class="passwordUser btn btn-success btn-sm waves-effect waves-light m-1 font-14">重置密码</button>\n' +
                    '<button  type="button" index='+o+' data-toggle="modal" data-target="#delete-box" class="deleteUser btn btn-danger btn-sm waves-effect waves-light m-1 font-14">删除</button></td>';

                html+='</tr>';
            }
            $('#contentTbody').html(html);
            var num=msg['num'];
            if(num>0) {
                var pageHtml = '';
                var totalPage = 0;
                if (num % pageSize == 0) {
                    totalPage = num / pageSize;
                }
                else {
                    totalPage = Math.ceil(num / pageSize);
                }

                if (currentPage == 1) {
                    pageHtml += '<li class="paginate_button page-item previous disabled" id="default-datatable_previous"><a\n' +
                        '                                href="#" aria-controls="default-datatable" data-dt-idx="0" tabindex="0"\n' +
                        '                                class="page-link">上一页</a></li>';
                }
                else {
                    pageHtml += '<li class="paginate_button page-item previous prevBtn" id="default-datatable_previous"><a\n' +
                        '                                href="#" aria-controls="default-datatable" data-dt-idx="0" tabindex="0"\n' +
                        '                                class="page-link">上一页</a></li>';
                }
                if (totalPage <= showPage) {
                    for (var i = 1; i < Number(totalPage) + 1; i++) {
                        if (currentPage == i) {
                            pageHtml += '<li class="paginate_button page-item active">' +
                                '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                '</li>';
                        }
                        else {
                            pageHtml += '<li class="paginate_button page-item">' +
                                '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                '</li>';
                        }
                    }
                }
                else {
                    if (currentPage <= (showPage - 1) / 2) {
                        for (var i = 1; i <= showPage; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }
                    else if (totalPage - currentPage < (showPage - 1) / 2) {
                        for (var i = Number(totalPage) - showPage; i <= totalPage; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }
                    else {
                        for (var i = Number(currentPage) - (showPage - 1) / 2; i <= Number(currentPage) + (showPage - 1) / 2; i++) {
                            if (currentPage == i) {
                                pageHtml += '<li class="paginate_button page-item active">' +
                                    '<a href="#" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                            else {
                                pageHtml += '<li class="paginate_button page-item">' +
                                    '<a href="#" class="pageBtn" index="' + i + '" aria-controls="default-datatable" data-dt-idx="1" tabindex="0" class="page-link">' + i + '</a>' +
                                    '</li>';
                            }
                        }
                    }


                }

                if (currentPage == totalPage) {
                    pageHtml += ' <li class="paginate_button page-item next disabled" id="default-datatable_next"><a href="#"\n' +
                        '           aria-controls="default-datatable"\n' +
                        '           data-dt-idx="7"\n' +
                        '           tabindex="0"\n' +
                        '           class="page-link">下一页</a>\n' +
                        '   </li>';
                }
                else {
                    pageHtml += ' <li class="paginate_button page-item next nextBtn" id="default-datatable_next"><a href="#"\n' +
                        '           aria-controls="default-datatable"\n' +
                        '           data-dt-idx="7"\n' +
                        '           tabindex="0"\n' +
                        '           class="page-link">下一页</a>\n' +
                        '   </li>';
                }
                /* pageHtml+='<li><input type="text" id="jumpPageText" class="paging-inpbox form-control"></li>\n' +
                     '<li><button type="button" id="jumpBtn" class="paging-btnbox btn btn-primary">跳转</button></li>\n' +
                     '<li><span class="number-of-pages">共'+totalPage+'页</span></li>';*/

                $('.pagination').html(pageHtml);
            }


        }
    });
}
