// Unsplash API
const count = 10;
const apiKey = 'jGY-2XrswOYIk2zG6kzqWWBfYbWwGgTOC5lsm7B3PbE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    }

    catch(error) {
        // Catch error here
    }
}

getPhotos();