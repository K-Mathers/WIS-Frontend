import { useRef, useState } from "react";
import "./CreateBlogPage.css";
import { uploadImage } from "@/api/ai";
import { createBlog } from "@/api/blog";
import type { IBlogJSON } from "@/api/blog/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "@/components/MenuBar/MenuBar";
import {
  errorNotification,
  successNotification,
} from "@/utils/notification/notification";
import Header from "../../components/Header/Header";

const CreateBlogPage = () => {
  const [userTitle, setUserTitle] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("USERS_ARTICLES");

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviewsUrl, setGalleryPreviewsUrl] = useState<string[]>([]);

  const coverInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "big-input tiptap-editor-content",
      },
    },
  });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList) return;

    const newFiles = Array.from(filesList);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setGalleryFiles((prev) => [...prev, ...newFiles]);
    setGalleryPreviewsUrl((prev) => [...prev, ...newUrls]);
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setGalleryFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setGalleryPreviewsUrl((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleClearInputs = () => {
    setUserTitle("");
    setShortDescription("");
    editor?.commands.setContent("");
    setCategory("USERS_ARTICLES");
    setCoverFile(null);
    setCoverPreviewUrl(null);
    setGalleryFiles([]);
    setGalleryPreviewsUrl([]);
  };

  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    const contentHtml = editor?.getHTML() || "";
    try {
      const coverServerImage = await uploadImage(coverFile);
      const galleryServerFiles = await Promise.all(
        galleryFiles.map(async (el) => {
          const response = await uploadImage(el);
          return response.imageUrl;
        }),
      );

      const blogJSON: IBlogJSON = {
        title: userTitle,
        shortDescription,
        content: contentHtml,
        coverImage: coverServerImage.imageUrl,
        images: galleryServerFiles,
        category: category,
      };

      await createBlog(blogJSON);
      handleClearInputs();
      successNotification("The article has been sent for moderation!");
    } catch (error) {
      errorNotification("Error create article");
      console.error(error);
    }
  };

  return (
    <div className="comic-page-wrapper">
      <Header />
      <div className="comic-form-container mt-12">
        <div className="comic-badge-top">NEW POST</div>

        <header className="comic-form-header">
          <h1 className="huge-title">CREATE ARTICLE</h1>
        </header>

        <form className="comic-grid-form" onSubmit={handlePublishBlog}>
          <div className="form-column main-inputs">
            <div className="comic-group">
              <label>ARTICLE TITLE</label>
              <input
                onChange={(e) => setUserTitle(e.target.value)}
                value={userTitle}
                type="text"
                className="big-input title-input"
                placeholder="NAME YOUR MASTERPIECE..."
              />
            </div>

            <div className="comic-group">
              <label>SHORT DESCRIPTION</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="big-input short-desc-input"
                placeholder="WHAT IS IT ABOUT IN TWO WORDS?"
                rows={3}
              ></textarea>
            </div>

            <div className="comic-group">
              <label>MAIN CONTENT</label>
              <div className="tiptap-wrapper">
                {editor && <MenuBar editor={editor} />}
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          <div className="form-column visual-inputs">
            <div className="comic-visual-section">
              <div className="comic-group">
                <label className="comic-label-badge">COVER IMAGE</label>

                <div
                  className={`comic-upload-zone ${
                    coverPreviewUrl ? "filled" : "empty"
                  }`}
                  onClick={() => coverInputRef.current?.click()}
                >
                  {coverPreviewUrl ? (
                    <>
                      <img
                        src={coverPreviewUrl}
                        alt="Cover Preview"
                        className="cover-img-preview"
                      />
                      <div className="overlay-change">CLICK TO CHANGE</div>
                    </>
                  ) : (
                    <div className="upload-placeholder-content">
                      <span className="icon-camera">📷</span>
                      <span className="text-main">SELECT FILE</span>
                      <span className="text-sub">OR DROP IT HERE</span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={coverInputRef}
                  onChange={handleCoverChange}
                  hidden
                  accept="image/*"
                />
              </div>

              <div className="comic-group">
                <label className="comic-label-badge">ADDITIONAL GALLERY</label>

                <div className="comic-gallery-grid">
                  {galleryPreviewsUrl.map((src, index) => (
                    <div key={index} className="gallery-item">
                      <img src={src} alt={`Gallery ${index}`} />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeGalleryImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <label className="gallery-add-btn">
                    <span className="plus-sign">+</span>
                    <input
                      type="file"
                      multiple
                      hidden
                      onChange={handleGalleryChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="category-select-wrapper">
              <label>CATEGORY</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="big-input comic-select"
              >
                <option value="PREMIUM_COLLECTION">PREMIUM_COLLECTION</option>
                <option value="BEST_MINIMALS">BEST_MINIMALS</option>
                <option value="CRAZY_SHOES">CRAZY_SHOES</option>
                <option value="NEW_SHOES">NEW_SHOES</option>
                <option value="My_BLOG">My_BLOG</option>
                <option value="USERS_ARTICLES">USERS_ARTICLES</option>
              </select>
            </div>

            <button type="submit" className="huge-submit-btn">
              PUBLISH NOW!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
