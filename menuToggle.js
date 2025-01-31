document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-icon");
    const navList = document.getElementById("navbar");

    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
        menuToggle.textContent = navList.classList.contains("active") ? "✖" : "☰";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove("active");
            menuToggle.textContent = "☰";
        }
    });
});

