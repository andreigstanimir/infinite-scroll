const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = "OhQqWB0eVXmCasGtWlcZ9iNYq7QSFSmTQQc9DOlwCfk";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

const updateAPIURLWithNewCount = function (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
};

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
const setAttributes = function (element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
};

// Create elements for links & photos, add to DOM
const displayPhotos = function () {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhotosUnsplashAPI = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotosUnsplashAPI();
    ready = false;
  }
});

// On Load
getPhotosUnsplashAPI();
