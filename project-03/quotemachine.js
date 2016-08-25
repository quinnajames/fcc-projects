


 $(document).ready(function() {


    var quotenum = 15;
    var arrayint = Math.floor((Math.random() * (quotenum)));


   $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" + quotenum + "&callback=", function(a) {
     a[arrayint].content = a[arrayint].content.replace("<p>", "").replace("</p>", "");
   $("#quoteArea").html("<h2>" + a[arrayint].content + "</h2><p>— " + a[arrayint].title + "</p>");
      var url = "https://twitter.com/intent/tweet?text=" + a[arrayint].content.replace("<p>", "").replace("</p>", "") + " —" + a[arrayint].title + "&hashtags=designquotes&via=volucrisscr";
      $("#ext").attr("href", url);

    });




  $("#quoteButton").on("click", function() {
    var arrayint = Math.floor((Math.random() * (quotenum)));

$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" + quotenum + "&callback=", function(a) {
     a[arrayint].content = a[arrayint].content.replace("<p>", "").replace("</p>", "");
   $("#quoteArea").html("<h2>" + a[arrayint].content + "</h2><p>— " + a[arrayint].title + "</p>");
      var url = "https://twitter.com/intent/tweet?text=" + a[arrayint].content.replace("<p>", "").replace("</p>", "") + " —" + a[arrayint].title + "&hashtags=designquotes&via=volucrisscr";
      $("#ext").attr("href", url);

    });



  });
});
