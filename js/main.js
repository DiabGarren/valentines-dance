/**
 * Get image from url
 */
function getImageName(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const imageName = urlParams.get(param);
    return imageName;
}
/**
 * Home Page
 */

let pageWrapper = document.querySelector(".page-wrapper");

if (pageWrapper) {
    function loadImages(images) {
        let output = "";
        images.forEach((image) => {
            if (image.Name != "template") {
                output += `<div class="page-wrapper__image-wrapper">
                    <a href="image/?image=${image.Name}" class="view">
                        <img src="images/placeholder.webp" data-src="${image.Thumbnail}" alt="${image.Name}">
                        View Image
                    </a>
                </div>`;
            }
        });
    
        return output;
    }
    
    function initImages() {
        let imagesToLoad = document.querySelectorAll("img[data-src]");
    
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
                localStorage.setItem("images", JSON.stringify(imagesJSON))
            });
    }
    
    getImages("./images.json");
}

/**
 * Images page
 */

let imagepageWrapper = document.querySelector(".page__image-wrapper");

if (imagepageWrapper) {
    const imageName = getImageName("image");
    const images = JSON.parse(localStorage.getItem("images"));
    
    const image = images.find((img) => img.Name === imageName);

    imagepageWrapper.innerHTML = `<h3>${image.Name}</h3>
    <img src="../${image.Large}" alt="${image.Name}">
    <a href="../${image.Image}" download>Download High Res Image</a>`;
}