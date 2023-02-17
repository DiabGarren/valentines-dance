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
 * Header/Footer
 */
const header = document.querySelector("header");
header.innerHTML = `<h1>Curro Krugersdorp High School</h1>
<h2>Valentine's Dance 2023</h2>`;

const footer = document.querySelector("footer");
footer.innerHTML = `<a href="mailto:garrendiab@gmail.com"><h1>&copy;Garren Diab - 2023</h1></a>`;

/**
 * Home Page
 */
const pageWrapper = document.querySelector(".page-wrapper");

if (pageWrapper) {
    function loadImages(images) {
        let output = "";
        images.forEach((image) => {
            if (image.Name != "template") {
                output += `<div class="page-wrapper__image-wrapper">
                    <a href="image/?image=${image.Name}" class="view">
                        <img src="images/placeholder.webp" data-src="images/${image.Name}-thumbnail.JPG" alt="${image.Name}">
                        <p>View Image</p>
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

const imagepageWrapper = document.querySelector(".page__image-wrapper");

if (imagepageWrapper) {
    
    function loadImage(image) {
        imagepageWrapper.innerHTML = `<h3>${image.Name}</h3>
        <picture class="image"> 
            <source media="(max-width:300px)" srcset="../images/${image.Name}-thumbnail.JPG">
            <source media="(max-width:720px)" srcset="../images/${image.Name}-small.JPG">
            <img src="../images/${image.Name}-medium.JPG" alt="${image.Name}">
        </picture>
        <a href="../${image.Image}" download>Download High Res Image (${image.Size}MB)</a>`;
    }

    const imageName = getImageName("image");
    const images = JSON.parse(localStorage.getItem("images"));
    let image = "";
    
    if (!images) {
        async function getImage(path) {
            fetch(path)
            .then((iamges) => iamges.json())
            .then((imagesJSON) => {
                const images = JSON.parse(JSON.stringify(imagesJSON));
                const image = images.find((img) => img.Name === imageName);
                loadImage(image);
            });
        }
        getImage("../images.json");
    } else {
        image = images.find((img) => img.Name === imageName);
        loadImage(image);
    }

}