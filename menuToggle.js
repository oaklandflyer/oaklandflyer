document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".nav-list");

    // Toggle menu open/close
    function toggleMenu() {
        navList.classList.toggle("active");

        // Change the hamburger menu to "X"
        menuIcon.innerHTML = navList.classList.contains("active") ? "✖" : "☰";
    }

    menuIcon.addEventListener("click", toggleMenu);
});
