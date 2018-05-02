/* global generate, margin jsPDF */

var base64Img = null;
var margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

/* append other function below: */

function generate() {
  var pdf = new jsPDF("p", "pt", "a4");
  pdf.setFontSize(18);
  pdf.fromHTML(
    document.getElementById("html-2-pdfwrapper"),
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width // max width of content on PDF
    },
    function(dispose) {
      headerFooterFormatting(pdf);
    },
    margins
  );

  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
  );
  document.body.appendChild(iframe);

  iframe.src = pdf.output("datauristring");
}

function headerFooterFormatting(doc) {
  var totalPages = doc.internal.getNumberOfPages();

  for (var i = totalPages; i >= 1; i--) {
    //make this page, the current page we are currently working on.
    doc.setPage(i);

    header(doc);

    footer(doc, i, totalPages);
  }
}

function footer(doc) {}

function header(doc) {
  doc.setFontSize(30);
  doc.setTextColor(40);
  doc.setFontStyle("normal");

  if (base64Img) {
    doc.addImage(base64Img, "JPEG", margins.left, 10, 40, 40);
  }

  doc.text("Report Header Template", margins.left + 50, 40);

  doc.line(3, 70, margins.width + 43, 70); // horizontal line
}

// You could either use a function similar to this or preconvert an image with, for example, http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {
  if (!window.FileReade) {
    callback(null);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      imgVariable = reader.result.replace("text/xml", "image/jpeg");
      callback(imgVariable);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.send();
}

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
