import { useParams } from "react-router-dom";
import "./ArticleId.css";
import { getPublicBlog } from "@/api/blog";
import { useEffect, useMemo, useState } from "react";
import type { IBlog, ICommentState } from "@/components/BlogPage/type/type";
import Header from "@/components/Header/Header";
import FooterHome from "../HomePage/ui/Footer/FooterHome";
import LikeSVG from "@/assets/ArticleId/LikeSVG";
import DislikeSVG from "@/assets/ArticleId/DislikeSVG";
import {
  createComment,
  getCommentsForAnArticle,
  reactComment,
} from "@/api/article";

const ArticleId = () => {
  const [blogsList, setBlogsList] = useState<IBlog>();
  const [commentsList, setCommentsList] = useState<ICommentState[]>([]);
  const [inputData, setInputData] = useState("");
  console.log(commentsList);
  const { articleId } = useParams();

  const filteredBlogList = useMemo(() => {
    return blogsList?.data.filter((el) => el.id === articleId);
  }, [articleId, blogsList?.data]);

  const getBlogs = async () => {
    const response = await getPublicBlog();
    setBlogsList(response);
  };

  const article = filteredBlogList?.[0];

  const sendComment = async () => {
    if (!article?.id) return;
    try {
      const sendMsg = createComment({
        articleId: article?.id,
        content: inputData,
      });
      setInputData("");
      console.log(sendMsg);
      return sendMsg;
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async () => {
    if (!article?.id) return;
    const response = await getCommentsForAnArticle(article?.id);
    setCommentsList(response);
  };

  const handleReactComent = async (
    reactType: "LIKE" | "DISLIKE",
    idComment: string,
  ) => {
    if (!article?.id) return;

    await reactComment({ type: reactType }, idComment);
    getComments();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    if (article?.id) {
      getComments();
    }
  }, [article?.id]);

  if (!blogsList) {
    return (
      <div className="article-page-container">
        <Header />
        <div
          className="article-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <h1 className="article-title">LOADING...</h1>
        </div>
        <FooterHome />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page-container">
        <Header />
        <div
          className="article-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <h1 className="article-title">ARTICLE NOT FOUND!</h1>
        </div>
        <FooterHome />
      </div>
    );
  }
  const formattedDate = new Date(
    article.publishedAt || article.createdAt,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="article-page-container">
      <Header />

      <main className="article-content">
        <article className="article-card-news">
          <div className="article-header">
            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta">
              <span>By: {article.author?.email || "Unknown Author"}</span>
              <span>{formattedDate}</span>
              <span>Views: {article.views}</span>
            </div>
          </div>

          <div className="article-image-container">
            <img
              src={article.coverImage}
              alt={article.title}
              className="article-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x400?text=No+Image";
              }}
            />
          </div>

          <div className="article-body">
            <p>{article.shortDescription}</p>
            <p>{article.content}</p>
          </div>
        </article>

        <section className="comments-section">
          <div className="comments-title-wrapper">
            <div className="comments-title">COMMENTS {commentsList.length}</div>
          </div>
          <div className="comments-list">
            {commentsList.length ? (
              commentsList.map((el, index) => (
                <div key={el.id ?? index} className="comment-item">
                  <div className="comment-bubble">
                    <div className="comment-author">{el.author.email}</div>
                    <div className="comment-text">{el.content}</div>
                    <div className="comment-reactions">
                      <button
                        onClick={() => handleReactComent("LIKE", el.id)}
                        className={`reaction-button like-btn ${el.myReaction === "LIKE" ? "active" : ""
                          }`}
                      >
                        <span>{el.likes ?? 0}</span>
                        <LikeSVG width="20" height="20" />
                      </button>
                      <button
                        onClick={() => handleReactComent("DISLIKE", el.id)}
                        className={`reaction-button dislike-btn ${el.myReaction === "DISLIKE" ? "active" : ""
                          }`}
                      >
                        <span>{el.dislikes ?? 0}</span>
                        <DislikeSVG width="20" height="20" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="comments-empty">
                <p className="comments-empty__text">NO COMMENTS YET!</p>
                <p className="comments-empty__sub">
                  Be the first hero to speak!
                </p>
              </div>
            )}
          </div>

          <div className="comment-form">
            <h3
              style={{
                fontFamily: "Bangers",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              LEAVE A COMMENT:
            </h3>
            <div className="form-group">
              <textarea
                className="comic-input"
                rows={4}
                placeholder="Write something awesome..."
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </div>
            <button onClick={() => sendComment()} className="comic-button">
              POST COMMENT
            </button>
          </div>
        </section>
      </main>

      <FooterHome />
    </div>
  );
};

export default ArticleId;
