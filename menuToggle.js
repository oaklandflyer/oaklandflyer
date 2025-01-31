document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".nav-list");

    function toggleMenu() {
        navList.classList.toggle("active");

        // Change hamburger icon when menu is active
        menuIcon.innerHTML = navList.classList.contains("active") ? "✖" : "☰";
    }

    menuIcon.addEventListener("click", toggleMenu);
});
