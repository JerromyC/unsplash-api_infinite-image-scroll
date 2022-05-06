const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const query = "geometrics";
const apiKey = 'Qc3wiYujKOwbvtvYNO28UVwsO9ZiQMGcsv8vnqf-2Nc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper Function to Set Attributes on DOM elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
} 

// Create Elements for Links and Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run for each in photos array
    photosArray.forEach((photo) => {
        // Creating anchor element to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();