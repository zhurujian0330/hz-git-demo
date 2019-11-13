$('#loginOut').on('click',function(){
    $.ajax({
      type: "post",
      url: "/logout",
      success: function (response) {
        location.reload();
      },
      error:function(){
        alert('推出失败，请重试一次');
    }
  });
})