


//选取的Contents
var contentsList;
var contentsIndex;
var currentContents;


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////管理////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/**
 * 查询单条资讯
 */
function selectContents(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'selectContents','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            var data = obj['msg'];
            currentContents=data;
            //$('#title').val(data['title']);
            //$('#type').val(data['type']);
            //$('#content').val(data['content']);
            for (var item in data) {
                $('#'+item).val(data[item]);
                if(item=='image'){
                    image=data['image'];
                }
                if(item=='contents'){
                    $('#contents').summernote('code', data[item]);
                }
            }
            //image=data['image'];
            //tempImages=JSON.parse(data['content']);

            if(image!=''){
                initFiles();
            }

        }
    });
}

function detailContents(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'selectContents','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            var data = obj['msg'];
            currentContents=data;

            $('#title').text(data.title);
            $('#c_dt').text(data.c_dt);
            $('#nickname').text('发布人：'+data.nickname);
            if(data['image']==''){
                $('#image').remove();
            }
            else{
                $('#image').prop('src',url+data.image);
            }
            $('#contents').html(data.contents);
            $('#comments').text('评论数：'+data.comments);
            $('#likes').text('点赞数：'+data.likes);
            $('#reposts').text('转发数：'+data.reposts);
            if(data.state=='0'){
                $('#checkBtn').show();
            }
            else{
                $('#checkBtn').hide();
            }

        }
    });
}
function initFiles() {
    //$("#files").fileinput("destroy");
    $('#files').fileinput({
        language: 'zh', //设置语言
        uploadUrl: url+'filesUpload',
        allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
        //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
        uploadAsync: true, //默认异步上传
        showUpload:true, //是否显示上传按钮
        showRemove :false, //显示移除按钮
        showPreview :true, //是否显示预览
        showCaption:false,//是否显示标题
        browseClass:"btn btn-outline-primary waves-effect waves-light", //按钮样式
        dropZoneEnabled: false,//是否显示拖拽区域
        maxFileCount:1, //表示允许同时上传的最大文件个数
        enctype:'multipart/form-data',
        validateInitialCount:true,

        //overwriteInitial: false, //不覆盖已存在的图片
        fileActionSettings:{showDrag:false},
        initialPreviewAsData: true,
        initialPreview: [
            url+image
        ],
        initialPreviewConfig: [
            {caption: "",  width: "120px", url: url+"filesDelete", key: 1}
        ]

    }).on("filebatchselected", function(event, files) {
        //$(this).fileinput("upload");
    }).on("fileuploaded", function(event,data, previewId, index) { //异步上传成功结果处理
        if(data.response.data.length>0){
            image=data.response.data[0];
        }
    }).on('filesuccessremove', function (event, previewId,index) {
        image='';
    }).on('filepredelete', function(event, key, jqXHR, data) {
        image='';
    }) ;


}

/**
 * 添加
 */
function addContents(bodyParam){
    var httpR = new createHttpR(url+'addContents','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        //var msg = obj['msg'];
        if(status=='0'){
            alert("新建成功！");
            //window.location.reload();
            //window.history.go(-1);
        }
    });
}
/**
 * 修改
 * @param id
 */
function updateContents(bodyParam){

    var httpR = new createHttpR(url+'updateContents','post','text',bodyParam,'callBack');
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
function deleteContents(id){
    var bodyParam={'id':id};
    var httpR = new createHttpR(url+'deleteContents','post','text',bodyParam,'callBack');
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
function  queryContents (title,currentPage,pageSize) {

    //分页显示的页码数  必须为奇数
    var showPage=7;
    if(title==null||title==''){
        var bodyParam={'page':currentPage,'size':pageSize};
    }
    else{
        var bodyParam={'page':currentPage,'size':pageSize,'title':'%'+title+'%'};
    }

    var httpR = new createHttpR(url+'listContents','post','text',bodyParam,'callBack');
    httpR.HttpRequest(function(response){
        var obj = JSON.parse(response);
        var status = obj['status'];
        var msg = obj['msg'];
        if(status=='0'){
            var data=msg['data'];
            contentsList=msg['data'];
            var html='';
            for(var o in data){
                html+='<tr index='+o+' class="gradeX">\n' +
                    '<td>'+data[o].id+'</td>\n' +
                    '<td>'+data[o].title+'</td>\n' +
                    '<td>'+data[o].nickname+'</td>\n' +
                    '<td>'+data[o].c_dt+'</td>\n' ;

                html+='<td><button  type="button" index='+o+'  class="updateContents btn btn-primary btn-sm waves-effect waves-light m-1 font-14">修改</button>\n';
                html+='<button  type="button" index='+o+'   class="detailContents btn btn-info waves-effect waves-light m-1 font-14">预览</button>\n';
                if(data[o].state=='1'){
                    html+='<button  type="button" index='+o+' data-toggle="modal" data-target="#check-box" class="checkContents btn  btn-sm waves-effect waves-light m-1 font-14">已通过</button>\n';
                }
                else if(data[o].state=='-1'){
                    html+='<button  type="button" index='+o+' data-toggle="modal" data-target="#check-box" class="checkContents btn btn-sm waves-effect waves-light m-1 font-14">已驳回</button>\n';
                }
                else{
                    html+='<button  type="button" index='+o+' data-toggle="modal" data-target="#check-box" class="checkContents btn btn-success btn-sm waves-effect waves-light m-1 font-14">审核</button>\n';
                }
                html+='<button  type="button" index='+o+' data-toggle="modal" data-target="#delete-box" class="deleteContents btn btn-danger btn-sm waves-effect waves-light m-1 font-14">删除</button></td>';

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
