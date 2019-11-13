// 当用户点击添加按钮时
$('#addUser').on('submit',function(){
    var formData = $(this).serialize();
    // console.log(formDate);
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            location.reload();
        },
        errro:function(){
            alert('用户添加失败')
        }
    });
    return false;
})
// 当用户上传头像时候
$('#midifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
        success: function (response) {
            console.log(response);
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenIpt').val(response[0].avatar);
        }
    });
})
// 页面一刷新，就要发送ajax向服务器中获取数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // console.log(response);
      var html =  template('userTpl',{data:response});
      $('#userBox').html(html)
    }
});
// 用户信息修改功能
// 点击编辑按钮时，使用事件委托给父级，因为用户列表是动态创建的
$('#userBox').on('click','.editUser',function(){
   var id = $(this).attr('data-id')
   $.ajax({
       type: "get",
       url: "/users/"+id,
       success: function (response) {
           console.log(response);
           var html = template('midifyTpl',response);
           $('#midifyBox').html(html);
       }
   });
})
// 点击修改按钮，使用事件委托给父级，因为修改模板也是动态创建的
$('#midifyBox').on('submit','#modifyUser',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/"+id,
        data: formData,
        success: function (response) {
            location.reload();
        },
        errro:function(){
            alert('修改信息失败，请稍后重试')
        }  
    });
    return false;
})
