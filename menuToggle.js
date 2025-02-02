document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".hero-nav");
    const navList = document.querySelector('.nav-list');
    const menuIcon = document.getElementById('menu-icon');
  
    function toggleMenu() {
      navList.classList.toggle('active');
      menuIcon.innerHTML = navList.classList.contains('active') ? "✖" : "☰";
    }
  
    function handleScroll() {
      if (window.scrollY > lastScrollY && !navList.classList.contains("active")) {
        navbar.classList.add("hidden-nav");
      } else {
        navbar.classList.remove("hidden-nav");
      }
      lastScrollY = window.scrollY;
    }
  
    function closeMenuOnClickOutside(event) {
      if (!menuIcon.contains(event.target) && !navList.contains(event.target)) {
        navList.classList.remove("active");
        menuIcon.innerHTML = "☰";
      }
    }
  
    menuIcon.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", closeMenuOnClickOutside);
  });
  