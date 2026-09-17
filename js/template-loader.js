const templates = [
  "templates/status-badge.html",
  "templates/app-modal.html",
  "templates/order-form.html",
  "templates/stock-table.html",
  "templates/do-tracking.html",
  "templates/do-page.html",
  "templates/dashboard-page.html"
];

Promise.all(
  templates.map(url =>
    fetch(url).then(r => r.text())
  )
)

.then(htmls => {
  document.getElementById(
    "template-loader"
  ).innerHTML = htmls.join("");

  const script =
    document.createElement("script");
    script.src = "js/app.js";
    
    document.body.appendChild(
    script
  );

})
.catch(err => {
  console.error(
    "Template gagal dimuat",
    err
  );
});