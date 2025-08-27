import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ImageDragDrop() {
  const [images, setImages] = useLocalStorage("images", []); // [{id, name, dataUrl}]
  const inputRef = React.useRef(null);
  const [isOver, setIsOver] = React.useState(false);

  const onFiles = async (files) => {
    const reads = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, 10)
      .map(file => readAsDataURL(file).then(dataUrl => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        dataUrl
      })));
    const next = await Promise.all(reads);
    setImages([...next, ...images].slice(0, 30)); // cap gallery
  };

  const onDrop = (e) => {
    e.preventDefault(); setIsOver(false);
    if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Drag & Drop (Images only)</h3>

      <div
        className="dropzone"
        style={{ background: isOver ? "#eef4ff" : undefined }}
        onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
        onDragLeave={() => setIsOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <p style={{ margin: 0 }}>
          Drop images here or <button className="btn" type="button">Browse</button>
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => e.target.files && onFiles(e.target.files)}
        />
      </div>

      <div className="gallery">
        {images.map(img => (
          <div className="thumb" key={img.id}>
            <img src={img.dataUrl} alt={img.name} />
            <button className="btn" onClick={() => setImages(images.filter(i => i.id !== img.id))}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

