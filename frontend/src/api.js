// All backend requests live here so students only need to look
// in ONE file to understand how the frontend talks to the API.
const BASE_URL = "https://mern-crud-production-01c4.up.railway.app/api/images";

// Get all images
export async function fetchImages() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch images");
  return response.json();
}

// Create a new image (title + description + file)
export async function createImage(formData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log("Create image response:", data);

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to create image");
  }

  return data;
}

// Update an existing image by id
export async function updateImage(id, formData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update image");
  return response.json();
}

// Delete an image by id
export async function deleteImage(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete image");
  return response.json();
}

// Helper to build the full image URL from the stored filename
export function getImageUrl(imagePath) {
  return `https://mern-crud-production-01c4.up.railway.app/uploads/${imagePath}`;
}
