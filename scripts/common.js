function setupSidebarToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (!menuToggle || !sidebar) return;
  let overlay = document.getElementById("sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "sidebar-overlay";
    document.body.appendChild(overlay);
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.style.display = "none";
  }
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    overlay.style.display = sidebar.classList.contains("open")
      ? "block"
      : "none";
  });
  overlay.addEventListener("click", closeSidebar);
}
