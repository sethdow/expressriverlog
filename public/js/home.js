$(document).ready(function(){
    $(".btn1").click(function(){
    alert('btn1 was clicked')
      $("p").slideUp(1000);
    });
    $(".btn2").click(function(){
      $("p").slideDown(1000);
    });
  });

