const API_URL = 'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';


export async function fetchImages(page) {
  try {
    const response = await fetch(`${API_URL}/images?page=${page}`);
    const data = await response.json();
    return data.images;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}

export async function createImage(imageData) {
  try {
    const response = await fetch(`${API_URL}/images`, {
      method: 'POST',
      body: JSON.stringify(imageData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to create image');
  }
}

export async function updateImage(imageId) {
  try {
    const response = await fetch(`${API_URL}/images/${imageId}`, {
      method: 'PUT'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update image');
  }
}