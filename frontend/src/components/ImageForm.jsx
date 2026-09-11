import React, { useState, useEffect } from "react";

// This ONE form is reused for both "Create" and "Update".
// If "editingImage" is passed in, we're in update mode.
function ImageForm({ onSubmit, editingImage, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // When the user clicks "Edit" on an image, fill the form with its data
  useEffect(() => {
    if (editingImage) {
      setTitle(editingImage.title);
      setDescription(editingImage.description || "");
      setFile(null); // don't prefill file input; user can choose a new one
    } else {
      setTitle("");
      setDescription("");
      setFile(null);
    }
  }, [editingImage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editingImage && !file) {
      alert("Please choose an image file.");
      return;
    }

    // FormData is required because we're sending a FILE + text fields together
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }

    onSubmit(formData);

    // Reset the form after submitting
    setTitle("");
    setDescription("");
    setFile(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="image-form">
      <div className="form-heading">
        <div>
          <p className="form-eyebrow">Image library</p>
          <h2>{editingImage ? "Update image" : "Upload a new image"}</h2>
        </div>
        <span className="form-mode">
          {editingImage ? "Editing" : "New upload"}
        </span>
      </div>

      <p className="form-intro">
        {editingImage
          ? "Update the details below or choose a replacement file."
          : "Add an image with a title and an optional description."}
      </p>

      <label className="form-field">
        <span>Title</span>
        <input
          type="text"
          placeholder="e.g. Mountain sunrise"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span>Description <small>Optional</small></span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Write a short description..."
        />
      </label>

      <label className="form-field">
        <span>{editingImage ? "Replace image" : "Image file"}</span>
        <input
          className="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <small className="field-hint">
          {file
            ? `Selected: ${file.name}`
            : editingImage
              ? "Leave empty to keep the current image."
              : "PNG, JPG, GIF or WEBP up to your server limit."}
        </small>
      </label>

      <div className="form-buttons">
        <button type="submit" className="primary-btn">
          {editingImage ? "Save Changes" : "Upload"}
        </button>
        {editingImage && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ImageForm;

