// 给修改密码form表单绑定提交事件
$('#modifyPassFrom').on('submit',function(){
    var formData = $(this).serialize();
    console.log(formData);
    
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            location.href = 'login.html'
        }
    });
    return false;
})