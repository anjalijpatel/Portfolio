// js/include.js
function includeHTML(id, file, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch(error => console.error('Error loading ' + file + ':', error));
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML("include-header", "/Portfolio/components/header.html", function() {
    // Now that header (and canvas) is loaded, load script.js
    var s = document.createElement('script');
    s.src = '/Portfolio/js/script.js';
    document.body.appendChild(s);
  });
  includeHTML("include-footer", "/Portfolio/components/footer.html");
});
