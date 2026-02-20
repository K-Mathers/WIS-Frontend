import { useState } from "react";
import "./Article.css";
import { getPendingArticle, moderateArticle } from "@/api/admin";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface IAuthor {
  id: string;
  email: string;
}

interface IPendingArticle {
  id: string;
  title: string;
  slug: string;
  author: IAuthor;
  category: string;
  content: string;
  coverImage: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  shortDescription: string;
  status: string;
  tags: string[];
  views: number;
}

const Article = () => {
  const queryClient = useQueryClient();
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const {
    data: articles = [],
    isPending,
    isError,
    error,
  } = useQuery<IPendingArticle[]>({
    queryKey: ["pending-articles"],
    queryFn: getPendingArticle,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: moderate } = useMutation({
    mutationFn: ({
      id,
      decision,
      feedback,
    }: {
      id: string;
      decision: string;
      feedback: string;
    }) => moderateArticle(id, { decision, feedback }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-articles"] });
    },
    onError: (err) => {
      console.error("Moderation error:", err);
      alert("Failed to send decision");
    },
  });

  const handleModerateClick = (id: string, decision: string) => {
    moderate({ id, decision, feedback: feedbacks[id] || "" });
    setFeedbacks((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  };

  if (isPending) return <div className="comic-loader">LOADING DOSSIER...</div>;
  if (isError)
    return <div className="error">Error loading data: {error.message}</div>;

  return (
    <div className="moderation-page">
      <header className="mod-header">
        <h1 className="mod-title">DAILY BUGLE: MODERATION</h1>
        <div className="mod-count">PENDING ISSUES: {articles.length}</div>
      </header>

      <div className="articles-grid">
        {articles.map((art) => (
          <div key={art.id} className="article-card">
            <div className="card-top-bar">
              <span
                className={`status-badge ${art.status ? art.status.toLowerCase() : "pending"}`}
              >
                {art.status || "UNKNOWN"}
              </span>
              <span className="category-badge">{art.category}</span>
            </div>

            <div className="card-content-wrapper">
              <div className="card-visuals">
                <div className="main-cover-wrapper">
                  <img
                    src={art.coverImage}
                    alt="Cover"
                    className="main-cover"
                  />
                  <div className="image-caption">COVER ART</div>
                </div>
                {art.images && art.images.length > 0 && (
                  <div className="mini-gallery">
                    {art.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className="gallery-thumb"
                        alt={`Evidence ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="card-info">
                <div className="title-section">
                  <h2 className="card-title">{art.title}</h2>
                  <div className="slug-text">ALIAS: {art.slug}</div>
                </div>

                <div className="meta-data-grid">
                  <div className="meta-item">
                    <span className="meta-label">AUTHOR:</span>
                    <span className="meta-value author">
                      {art.author?.email}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">CREATED:</span>
                    <span className="meta-value">
                      {art.createdAt
                        ? new Date(art.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">UPDATED:</span>
                    <span className="meta-value">
                      {art.updatedAt
                        ? new Date(art.updatedAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>

                {art.tags && art.tags.length > 0 && (
                  <div className="tags-section">
                    <span className="meta-label">TAGS:</span>
                    <div className="tags-list">
                      {art.tags.map((tag, i) => (
                        <span key={i} className="comic-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="desc-section">
                  <span className="section-header">BRIEFING:</span>
                  <p className="card-desc">{art.shortDescription}</p>
                </div>

                <div className="article-body-preview">
                  <span className="section-header">
                    FULL INTEL (Safe Preview):
                  </span>
                  <div className="html-preview">
                    <ReactMarkdown>{art.content}</ReactMarkdown>
                  </div>
                </div>

                <div className="debug-id">CASE ID: {art.id}</div>
              </div>
            </div>

            <div className="feedback-section">
              <span className="feedback-label">EDITOR'S NOTE:</span>
              <textarea
                className="comic-feedback-input"
                placeholder="WRITE YOUR VERDICT HERE, BOSS..."
                value={feedbacks[art.id] || ""}
                onChange={(e) =>
                  setFeedbacks((prev) => ({
                    ...prev,
                    [art.id]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="card-actions">
              <button
                className="btn-mod btn-reject"
                onClick={() => handleModerateClick(art.id, "REJECT")}
              >
                DENY
              </button>
              <button
                className="btn-mod btn-approve"
                onClick={() => handleModerateClick(art.id, "APPROVE")}
              >
                PUBLISH
              </button>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="empty-state">
          <div className="empty-content">
            <h2>ALL QUIET ON THE FRONT!</h2>
            <p>No new submissions to review, Sir!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
