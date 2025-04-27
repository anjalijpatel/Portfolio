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
    menuToggle.classList.remove("open");
    overlay.style.display = "none";
  }
  menuToggle.addEventListener("click", function () {
    const isOpen = sidebar.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    overlay.style.display = isOpen ? "block" : "none";
  });
  overlay.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
}
