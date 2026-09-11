import React, { useState, useEffect } from "react";
import "./App.css";
import ImageForm from "./components/ImageForm";
import ImageList from "./components/ImageList";
import {
  fetchImages,
  createImage,
  updateImage,
  deleteImage,
} from "./api";

function App() {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null); // null = create mode
  const [loading, setLoading] = useState(true);

  // Load all images once when the app first starts
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      console.error(error);
      alert("Could not load images. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  // CREATE or UPDATE depending on whether we're editing
  const handleFormSubmit = async (formData) => {
    try {
      if (editingImage) {
        await updateImage(editingImage._id, formData);
        setEditingImage(null);
      } else {
        await createImage(formData);
      }
      await loadImages(); // refresh the list
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving the image.");
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      await deleteImage(id);
      await loadImages();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the image.");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>📷 Image CRUD App (MERN Stack)</h1>
        <p>A simple Create, Read, Update, Delete app for images</p>
      </header>

      <ImageForm
        onSubmit={handleFormSubmit}
        editingImage={editingImage}
        onCancelEdit={handleCancelEdit}
      />

      <hr />

      <h2>All Images</h2>
      {loading ? <p>Loading...</p> : (
        <ImageList
          images={images}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;

