import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUploadCloud, FiX, FiPlus, FiSave } from "react-icons/fi";
import api from "../../api/api";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function BlogForm() {
  const { id } = useParams(); // If ID exists, we are in Edit Mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    short_description: "",
    paragraph_1: "",
    paragraph_2: "",
    paragraph_3: "",
    paragraph_4: "",
    paragraph_5: "",
    is_published: false,
  });

  const [files, setFiles] = useState({
    thumbnail: null,
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
  });

  // For displaying preview of newly selected or existing images
  const [previews, setPreviews] = useState({});

  // 1. FETCH DATA (For Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          const { data } = await api.get(`admin/blogs/${id}/`);
          setForm({
            title: data.title,
            short_description: data.short_description,
            paragraph_1: data.paragraph_1,
            paragraph_2: data.paragraph_2,
            paragraph_3: data.paragraph_3,
            paragraph_4: data.paragraph_4,
            paragraph_5: data.paragraph_5,
            is_published: data.is_published,
          });
          // Set initial previews from server URLs
          setPreviews({
            thumbnail: data.thumbnail,
            image_1: data.image_1,
            image_2: data.image_2,
            image_3: data.image_3,
            image_4: data.image_4,
            image_5: data.image_5,
          });
        } catch (error) {
          toast.error("Failed to load blog data");
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];

    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const removeImage = (name) => {
    setFiles((prev) => ({ ...prev, [name]: null }));
    setPreviews((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      if (isEditMode) {
        await api.put(`admin/blogs/${id}/update/`, data);
        toast.success("Blog updated successfully");
      } else {
        await api.post("admin/blogs/create/", data);
        toast.success("Blog created successfully");
      }
      navigate("/blogs");
    } catch (error) {
      toast.error(isEditMode ? "Update failed" : "Creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-Black">
            {isEditMode ? "Edit Blog Post" : "Create New Blog"}
          </h2>
          <button
            onClick={() => navigate("/blogs")}
            className="text-white flex items-center gap-1  bg-green-500 rounded-lg p-2 hover:underline font-medium"
          >
            <IoArrowBackCircleOutline /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CONTENT SECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-700 border-b border-green-50 pb-2">
              General Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <input
                name="title"
                value={form.title}
                placeholder="Blog Title"
                className="w-full border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg outline-none transition-all"
                onChange={handleChange}
                required
              />

              <textarea
                name="short_description"
                value={form.short_description}
                placeholder="Brief summary of the blog..."
                className="w-full border border-green-200 focus:ring-2 focus:ring-green-500 p-3 rounded-lg outline-none"
                rows="2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* IMAGES SECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-green-700 border-b border-green-50 pb-4 mb-4">
              Media & Gallery
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Thumbnail + 5 Images */}
              {["thumbnail", "image_1", "image_2", "image_3", "image_4", "image_5"].map(
                (imgKey, idx) => (
                  <div key={imgKey} className="flex flex-col items-center">
                    <span className="text-xs font-bold text-green-600 mb-2 uppercase">
                      {imgKey.replace("_", " ")}
                    </span>

                    <div className="relative group w-full aspect-square bg-green-50 border-2 border-dashed border-green-200 rounded-xl overflow-hidden hover:border-green-400 transition-colors">
                      {previews[imgKey] ? (
                        <>
                          <img
                            src={previews[imgKey]}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(imgKey)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX size={14} />
                          </button>
                        </>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <FiUploadCloud className="text-green-400 text-2xl" />
                          <span className="text-[10px] text-green-500 mt-1 font-medium">
                            Upload
                          </span>
                          <input
                            type="file"
                            name={imgKey}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* PARAGRAPHS SECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-700 border-b border-green-50 pb-2">
              Blog Content
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative">
                  <label className="text-xs font-semibold text-green-600 mb-1 block">
                    Paragraph {i} {i === 1 && "*"}
                  </label>
                  <textarea
                    name={`paragraph_${i}`}
                    value={form[`paragraph_${i}`]}
                    placeholder={`Write content for section ${i}...`}
                    className="w-full border border-green-200 focus:ring-2 focus:ring-green-500 p-3 rounded-lg outline-none"
                    rows="4"
                    onChange={handleChange}
                    required={i === 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-green-100 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                Publish immediately
              </span>
            </label>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-200 transition-all transform active:scale-95"
            >
              {isEditMode ? <FiSave /> : <FiSave />}
              {isEditMode ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
