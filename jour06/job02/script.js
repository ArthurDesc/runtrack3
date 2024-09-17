$(document).ready(function() {
  var pageContents = [
      "<h1>Article 1</h1><p>Contenu de l'article 1...</p>",
      "<h1Article 2</h1><>Contenu de l'article 2...</p>",
      "<h1>Article 3</h1><p>Contenu de l'article 3...</p>"
  ];

  function updateContent(pageIndex) {
      $(".article").html(pageContents[pageIndex]);
      $(".page-item").removeClass("active");
      $(".pagination .page-item:eq(" + (pageIndex + 1) + ")").addClass("active");
  }

  $(".pagination .page-link").click(function(e) {
      e.preventDefault();
      var pageText = $(this).text().();

      if (pageText === "«") {
          updateContent(0);
      } else if (pageText === "»") {
          updateContent(pageContents.length - 1);
      } else {
          updateContent(parseInt(pageText) - 1);
      }
  });

  updateContent(0); // Initialiser avec le contenu de la première page
});