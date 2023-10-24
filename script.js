const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'jGY-2XrswOYIk2zG6kzqWWBfYbWwGgTOC5lsm7B3PbE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create photos elements, Add to the DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in the array
    photosArray.forEach((photo)=>{
        // Create anchor elemnt to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create image for a photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listener, check when img is loaded
        img.addEventListener('load', imageLoaded);

        // Add img inside item, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    }

    catch(error) {
        // Catch error here
    }
}

// Check to see if scrolling is near to bottom of the page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()

    }
});  

getPhotos();

