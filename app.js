import { fetchImages, createImage, updateImage } from './api.js';

const API_KEY = 'live_Ipha6Krcq7kJy08xb7hnK3saW89uK3GlynrMELaehdGlwtctLfACSMF9BtM6hNbQ';
const API_URL = 'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let page = 1;

async function displayImages() {
  try {
    const images = await fetchImages(page);
    images.forEach(image => {
      const imageElement = createImageElement(image);
      gallery.appendChild(imageElement);
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
}

// Loop through each image object in the response array and create carousel elements
if (Array.isArray(breedInfoArray)) {
    breedInfoArray.forEach((imageInfo) => {
      const carouselItem = Carousel.createCarouselItem(
        imageInfo.url,
        `Breed ${selectedBreedId}`,
        imageInfo.id
      );
  
      Carousel.appendCarousel(carouselItem);
    });
  } else {
    console.log("breedInfoArray is undefined or not an array");
  }

function createImageElement(image) {
  const imageElement = document.createElement('div');
  imageElement.classList.add('image');
  imageElement.innerHTML = `
    <img src="${image.url}" alt="${image.title}">
    <h3>${image.title}</h3>
    <p>${image.description}</p>
    <button class="likeBtn" data-id="${image.id}">Like</button>
  `;
  return imageElement;
  
}

async function handleLike(event) {
  const imageId = event.target.dataset.id;
  try {
    const updatedImage = await updateImage(imageId);
    const likeBtn = event.target;
    likeBtn.textContent = updatedImage.liked ? 'Unlike' : 'Like';
  } catch (error) {
    console.log('Error:', error.message);
  }
}

loadMoreBtn.addEventListener('click', () => {
  page++;
  displayImages();
});

gallery.addEventListener('click', event => {
  if (event.target.classList.contains('likeBtn')) {
    handleLike(event);
  }
});

displayImages();