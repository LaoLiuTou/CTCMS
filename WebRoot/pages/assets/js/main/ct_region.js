


//选取的Region
var regionList;
var regionIndex;
var currentRegion;


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////管理////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/**
 * 查询单条资讯
 */
function selectRegion(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'selectRegion','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            var data = obj['msg'];
            currentRegion=data;
            //$('#title').val(data['title']);
            //$('#type').val(data['type']);
            //$('#content').val(data['content']);
            for (var item in data) {
                $('#'+item).val(data[item]);

            }
        }
    });
}


/**
 * 添加
 */
function addRegion(bodyParam){
    var httpR = new createHttpR(url+'addRegion','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            alert("您所在地区信息提交成功！");
            //window.location.reload();
            //window.history.go(-1);
        }
    });
}
/**
 * 修改
 * @param id
 */
function updateRegion(bodyParam){

    var httpR = new createHttpR(url+'updateRegion','post','text',bodyParam,'callBack');
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
 * 删除
 * @param id
 */
function deleteRegion(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'deleteRegion','post','text',bodyParam,'callBack');
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
 * 查询
 * @param currentPage
 * @param pageSize
 */
function  queryRegion (user_id,currentPage,pageSize) {

    //分页显示的页码数  必须为奇数
    var showPage=7;
    if(user_id==null||user_id==''){
        var bodyParam={'page':currentPage,'size':pageSize};
    }
    else{
        var bodyParam={'page':currentPage,'size':pageSize,'user_id':'user_id'};
    }

    var httpR = new createHttpR(url+'listRegion','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        var msg = obj['msg'];
        if(status=='0'){
            var data=msg['data'];
            regionList=msg['data'];
            var html='';
            for(var o in data){

                html+='<tr index='+o+' class="gradeX">\n' +
                    '<td>'+data[o].id+'</td>\n' +
                    '<td>'+data[o].username+'</td>\n' +
                    '<td>'+data[o].nickname+'</td>\n' +
                    '<td>'+data[o].operation+'</td>\n' +
                    '<td>'+data[o].c_dt+'</td>\n' ;

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
