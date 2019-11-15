// 添加分类，给分类添加表单添加提交事件
$('#categoryAddform').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});
// 发送ajax，获取分类列表，并且渲染到页面中
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
       var html =  template('categoryListTpl',{data:response});
       $('#categoryBox').html(html);
    }
});
// 点击编辑按钮时，利用事件委托
$('#categoryBox').on('click','.editCategory',function(){
    // 获取即将编辑分类的id
    var id = $(this).attr('data-id');
    
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
           var html = template('modifyCategoryTpl',response);
           $('#modifyBox').html(html);
        }
    });
});
// 点击修改按钮时，利用事件委托，为form表单父级添加提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    // 获取表单中的数据
    var formData = $(this).serialize();
    // 获取要修改的分类id,就是给表单设置的自定义属性data-id的值
    var id = $(this).attr('data-id');
    // 发送ajax请求，根据id修改分类
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});
// 删除分类功能
// 点击删除按钮，利用事件委托，因为删除按钮是动态创建的
$('#categoryBox').on('click','.deleteCategory',function(){
    
    if(confirm('您确定要删除当前分类吗？')){
        // 根据删除按钮获取要删除的分类的id,也就是删除按钮自定义属性data-id的值
        var id = $(this).attr('data-id');
        // 根据获取到的id发送ajax请求，删除分类
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }
})
