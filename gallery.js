document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.querySelector(".gallery-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!galleryContainer) {
        console.error("Gallery container not found!");
        return;
    }

    fetch("imagePaths.json")
        .then(response => response.json())
        .then(images => {
            galleryContainer.innerHTML = ""; // Clear gallery before loading

            images.forEach(image => {
                const linkElement = document.createElement("a");
                linkElement.href = image.src;
                linkElement.setAttribute("data-fancybox", "gallery");
                linkElement.setAttribute("data-category", image.category);
                linkElement.setAttribute("data-caption", image.src.split('/').pop());

                const imgElement = document.createElement("img");
                imgElement.src = image.src;
                imgElement.alt = "Gallery Photo";
                imgElement.loading = "lazy";

                // Log errors if an image fails to load
                imgElement.onerror = function () {
                    console.error("Image not found:", imgElement.src);
                };

                linkElement.appendChild(imgElement);
                galleryContainer.appendChild(linkElement);
            });

            // Initialize Fancybox
            Fancybox.bind("[data-fancybox]", {});

            // Enable Filtering
            filterButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const category = button.dataset.category;

                    // Remove active class from buttons
                    filterButtons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    // Show/hide images based on category
                    document.querySelectorAll(".gallery-container a").forEach(item => {
                        if (category === "all" || item.getAttribute("data-category") === category) {
                            item.style.display = "block";
                        } else {
                            item.style.display = "none";
                        }
                    });
                });
            });

        })
        .catch(error => console.error("Error loading images:", error));
});
