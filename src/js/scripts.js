console.log("custom javascript is working");

$(".tab-list").on("click", ".tab", function(e) {
    e.preventDefault();
    
$(".tab").removeClass("active");
    $(".tab-content").removeClass("show");
    $(this).addClass("active");
    $($(this).attr('href')).addClass("show");	
});

