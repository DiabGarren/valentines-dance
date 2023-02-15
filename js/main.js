let pageWrapper = document.querySelector(".page-wrapper");

function loadImages(images) {
    let output = "";
    images.forEach((image) => {
        if (image.Name != "template") {
            output += `<div class="page__image-wrapper">
            <img src="images/placeholder.webp" data-src="${image.Thumbnail}" alt="${image.Name}">
            <a href="${image.Image}" class="download" download>Download (${image.Size}MB)</a>
        </div>`;
        }
    });

    return output;
}

function initImages() {
    let imagesToLoad = document.querySelectorAll("img[data-src]");
    console.log(imagesToLoad);

    const loadImages = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.onload = () => {
            image.removeAttribute("data-src");
        };
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    observer.unobserve(item.target);
                }
            });
        });

        imagesToLoad.forEach((img) => {
            observer.observe(img);
        });

    } else {
        imagesToLoad.forEach((img) => {
            loadImages(img);
        });
    }
}

async function getImages(path) {
    fetch(path)
        .then((iamges) => iamges.json())
        .then((imagesJSON) => {
            pageWrapper.innerHTML = loadImages(imagesJSON);
            initImages();
        });
}

const images = getImages("./images.json");