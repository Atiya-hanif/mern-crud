import React from "react";
import { getImageUrl } from "../api";

function ImageList({ images, onEdit, onDelete }) {
  if (images.length === 0) {
    return (
      <div className="empty-message">
        <span className="empty-icon" aria-hidden="true">+</span>
        <p>No images uploaded yet.</p>
        <small>Add your first image using the form above.</small>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((image) => (
        <div className="image-card" key={image._id}>
          <div className="image-card-media">
            <img src={image.imageUrl} alt={image.title} />

          </div>
          <div className="image-card-body">
            <h3>{image.title}</h3>
            <p>{image.description || "No description provided."}</p>
            <div className="image-card-buttons">
              <button onClick={() => onEdit(image)} aria-label={`Edit ${image.title}`}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(image._id)}
                aria-label={`Delete ${image.title}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageList;

