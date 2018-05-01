var doc = new jsPDF();

doc.text("Hello world!", 10, 10);
var string = doc.output("datauristring");
var iframe =
  "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();

// // URL of PDF document
// var url = "test.html";

// // Asynchronous download PDF
// PDFJS.getDocument(url)
//   .then(function(pdf) {
//     return pdf.getPage(1);
//   })
//   .then(function(page) {
//     // Set scale (zoom) level
//     var scale = 1.5;

//     // Get viewport (dimensions)
//     var viewport = page.getViewport(scale);

//     // Get canvas#the-canvas
//     var canvas = document.getElementById("the-canvas");

//     // Fetch canvas' 2d context
//     var context = canvas.getContext("2d");

//     // Set dimensions to Canvas
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     // Prepare object needed by render method
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };

//     // Render PDF page
//     page.render(renderContext);
//   });
