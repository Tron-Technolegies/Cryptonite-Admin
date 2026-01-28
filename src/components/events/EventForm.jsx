import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUploadCloud, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import api from "../../api/api";

export default function EventForm() {
  const { id } = useParams();
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

  const [previews, setPreviews] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          const { data } = await api.get(`admin/events/${id}/`);
          setForm({
            title: data.title,
            short_description: data.short_description,
            paragraph_1: data.paragraph_1 || "",
            paragraph_2: data.paragraph_2 || "",
            paragraph_3: data.paragraph_3 || "",
            paragraph_4: data.paragraph_4 || "",
            paragraph_5: data.paragraph_5 || "",
            is_published: data.is_published,
          });
          setPreviews({
            thumbnail: data.thumbnail,
            image_1: data.image_1,
            image_2: data.image_2,
            image_3: data.image_3,
            image_4: data.image_4,
            image_5: data.image_5,
          });
        } catch {
          toast.error("Error loading event data");
        }
      };
      fetchEvent();
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
        await api.put(`admin/events/${id}/update/`, data);
        toast.success("Event updated!");
      } else {
        await api.post("admin/events/create/", data);
        toast.success("Event created!");
      }
      navigate("/events");
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 font-medium mb-4"
        >
          <FiArrowLeft /> Back
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              {isEditMode ? "Edit Event" : "New Event"}
            </h2>
            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="w-full p-3 border border-green-200 rounded-lg outline-none focus:border-green-500"
                required
              />
              <textarea
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full p-3 border border-green-200 rounded-lg outline-none focus:border-green-500"
                rows="2"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
            <h3 className="font-semibold text-green-700 mb-4">Event Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["thumbnail", "image_1", "image_2", "image_3", "image_4", "image_5"].map((name) => (
                <div key={name} className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-green-600 mb-1">
                    {name.replace("_", " ")}
                  </span>
                  <div className="relative w-full aspect-square bg-green-50 border-2 border-dashed border-green-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {previews[name] ? (
                      <>
                        <img
                          src={previews[name]}
                          className="w-full h-full object-cover"
                          alt="preview"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(name)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                          <FiX size={12} />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center">
                        <FiUploadCloud className="text-green-400 text-xl" />
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          name={name}
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-green-700">Content Sections</h3>
            {[1, 2, 3, 4, 5].map((i) => (
              <textarea
                key={i}
                name={`paragraph_${i}`}
                value={form[`paragraph_${i}`]}
                onChange={handleChange}
                placeholder={`Paragraph ${i}`}
                className="w-full p-3 border border-green-200 rounded-lg outline-none focus:border-green-500"
                rows="3"
                required={i === 1}
              />
            ))}
          </div>

          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-green-100 shadow-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="accent-green-600 w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Published</span>
            </label>
            <button
              type="submit"
              className="bg-green-600 text-white px-10 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-md"
            >
              <FiSave /> {isEditMode ? "Update Event" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
