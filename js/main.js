let pageWrapper = document.querySelector(".page-wrapper");

function loadImages(images) {
    let output = "";
    images.forEach((image) => {
        if (image.Name != "template") {
            output += `<div class="page__image-wrapper">
            <img src="${image.Thumbnail}" alt="${image.Name}">
            <a href="${image.Image}" class="download" download>Download (${image.Size}MB)</a>
        </div>`;
        }
    });

    return output;
}
async function getImages(path) {
    fetch(path)
        .then((iamges) => iamges.json())
        .then((imagesJSON) => {
            pageWrapper.innerHTML = loadImages(imagesJSON);
        });
}

const images = getImages("./images.json");