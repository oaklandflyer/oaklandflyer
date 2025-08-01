document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector(".gallery-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!galleryContainer) {
        console.error("Gallery container not found!");
        return;
    }

    // Load image data from JSON
    fetch("imagePaths.json")
        .then(res => res.json())
        .then(images => {
            galleryContainer.innerHTML = ""; // Clear existing gallery content

            images.forEach(({ src, category }) => {
                const link = document.createElement("a");
                link.href = src;
                link.setAttribute("data-fancybox", "gallery");
                link.setAttribute("data-category", category);
                link.setAttribute("data-caption", src.split("/").pop());

                const img = document.createElement("img");
                img.src = src;
                img.alt = "Gallery Photo";
                img.loading = "lazy";

                img.onerror = () => {
                    console.error("Image not found:", src);
                };

                link.appendChild(img);
                galleryContainer.appendChild(link);
            });

            // Activate Fancybox
            Fancybox.bind("[data-fancybox]", {});

            // Filter logic
            filterButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const selectedCategory = button.dataset.category;

                    // Toggle active button class
                    filterButtons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    // Show/hide images
                    document.querySelectorAll(".gallery-container a").forEach(item => {
                        const itemCategory = item.getAttribute("data-category");
                        item.style.display =
                            selectedCategory === "all" || itemCategory === selectedCategory
                                ? "block"
                                : "none";
                    });
                });
            });
        })
        .catch(err => {
            console.error("Error loading images:", err);
        });
});
