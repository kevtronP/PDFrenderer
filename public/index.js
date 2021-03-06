/* global Vue, VueRouter, axios, generate, margins, jsPDF */
console.log("MARGINS", margins);
var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      student: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        bio: "",
        linkedin_url: "",
        twitter_handle: "",
        personal_url: "",
        resume_url: "",
        github_url: "",
        photo: ""
      },
      education: [
        {
          start_date: "",
          end_date: "",
          degree: "",
          university_name: "",
          details: ""
        }
      ],
      experience: [
        {
          start_date: "",
          end_date: "",
          job_title: "",
          company: "",
          details: ""
        }
      ],
      skill: {
        skill: ""
      }
      // base64Img: null
      // margins: {
      //   top: 70,
      //   bottom: 40,
      //   left: 30,
      //   width: 550
      // }
    };
  },
  created: function() {},
  methods: {
    generate: function() {
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
          this.headerFooterFormatting(pdf);
        }.bind(this),
        margins
      );

      var iframe = document.createElement("iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
      );
      document.body.appendChild(iframe);

      iframe.src = pdf.output("datauristring");
    },
    headerFooterFormatting: function(doc) {
      var totalPages = doc.internal.getNumberOfPages();

      for (var i = totalPages; i >= 1; i--) {
        //make this page, the current page we are currently working on.
        doc.setPage(i);

        this.header(doc);

        this.footer(doc, i, totalPages);
      }
    },
    footer: function(doc) {},
    header: function(doc) {
      doc.setFontSize(30);
      doc.setTextColor(40);
      doc.setFontStyle("normal");

      if (this.base64Img) {
        doc.addImage(this.base64Img, "JPEG", margins.left, 10, 40, 40);
      }

      doc.text("Report Header Template", margins.left + 50, 40);

      doc.line(3, 70, margins.width + 43, 70); // horizontal line
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});

//
/* append other function below: */

// You could either use a function similar to this or preconvert an image with, for example, http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
// function imgToBase64(url, callback, imgVariable) {
//   if (!window.FileReade) {
//     callback(null);
//     return;
//   }
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = "blob";
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       imgVariable = reader.result.replace("text/xml", "image/jpeg");
//       callback(imgVariable);
//     };
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open("GET", url);
//   xhr.send();
// }
