fetch('imagePaths.json') // Ensure this file is deployed alongside your HTML
    .then(response => response.json())
    .then(images => {
        const galleryContainer = document.querySelector(".gallery-container");
        images.forEach(image => {
            const linkElement = document.createElement("a");
            linkElement.href = image;
            linkElement.setAttribute("data-fancybox", "gallery");
            linkElement.setAttribute("data-caption", image.split('/').pop());

            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = "Gallery Photo";
            imgElement.loading = "lazy";

            linkElement.appendChild(imgElement);
            galleryContainer.appendChild(linkElement);
        });
    })
    .catch(error => console.error("Error loading image paths:", error));
