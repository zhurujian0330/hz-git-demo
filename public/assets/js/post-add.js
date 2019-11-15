// 页面一刷新，把分类列表获取到，展示在分类下拉框中
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl',{data:response});
        $('#category').html(html);
    }
});
// 实现文件上传功能，给文件控件绑定change事件
$('#feature').on('change',function(){
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover',file);
    // 发送ajax请求，获取文件绝对路径
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
        success: function (response) {
            $('#hideIpt').val(response[0].cover)
            $('#proview').attr('src',response[0].cover).show();
        }
    });
    
});
// 给添加文章表单绑定提交事件
$('#postAddForm').on('submit',function(){
    // 获取所有的input中的数据
    var formData = $(this).serialize();
    // 发送ajax请求添加文章
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = './posts.html'
        }
    });
    // 组织表单默认跳转行为
    return false;
})
