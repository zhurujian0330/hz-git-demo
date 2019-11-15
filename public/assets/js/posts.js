// 发送ajax 请求获取分类数据，并且通过模板渲染到页面中
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl',{data:response});
        $('#categoryBox').html(html);
    }
});
// 发送ajax请求，获取文章数据，并且通过模板显示到页面中
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        console.log(response);
        
        var html = template('postsListTpl',response);
        $('#postsBox').html(html);
        var page = template('pageTpl',response);
        $('#pageBox').html(page);
    }
});
// 分页按钮点击函数
function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postsListTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#pageBox').html(page);
        }
    });
};
// 筛选功能
$('#filterForm').on('submit',function(){
    // 获取下拉框中选中的数据
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            console.log(response);
            var html = template('postsListTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#pageBox').html(page);
        }
    });
    return false;
})