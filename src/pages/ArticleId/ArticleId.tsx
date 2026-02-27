import { useParams } from "react-router-dom";
import "./ArticleId.css";
import { getPublicBlog } from "@/api/blog";
import { useMemo, useState } from "react";
import type { ICommentState } from "@/components/BlogPage/type/type";
import Header from "@/components/Header/Header";
import FooterHome from "../HomePage/ui/Footer/FooterHome";
import LikeSVG from "@/assets/ArticleId/LikeSVG";
import DislikeSVG from "@/assets/ArticleId/DislikeSVG";
import { getCommentsForAnArticle } from "@/api/article";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import {
  useCreateCommentMutatuin,
  useReactCommentMutation,
} from "@/hooks/Mutations/articleMutations";

const ArticleId = () => {
  const [inputData, setInputData] = useState("");
  const { articleId } = useParams();

  const createCommentMutatuin = useCreateCommentMutatuin();
  const reactCommentMutation = useReactCommentMutation(articleId);

  const { data: blogsList } = useQuery({
    queryKey: ["blogs"],
    queryFn: getPublicBlog,
    staleTime: 1000 * 60 * 5,
  });

  const filteredBlogList = useMemo(() => {
    return blogsList?.data.filter((el) => el.id === articleId);
  }, [articleId, blogsList?.data]);

  const article = filteredBlogList?.[0];

  const htmlContent = useMemo(() => {
    return marked.parse(article?.content || "");
  }, [article?.content]);

  const { data: commentsList = [] } = useQuery<ICommentState[]>({
    queryKey: ["comments", article?.id],
    queryFn: () => getCommentsForAnArticle(article!.id),
    enabled: !!article?.id,
    staleTime: 1000 * 60 * 5,
  });

  const handleSendComment = () => {
    if (!article?.id || !inputData) return;
    createCommentMutatuin.mutate({
      articleId: article?.id,
      content: inputData,
    });
    setInputData("");
  };

  const handleReactComent = async (
    reactType: "LIKE" | "DISLIKE",
    idComment: string,
  ) => {
    if (!article?.id) return;
    reactCommentMutation.mutate({ idComment, reactData: { type: reactType } });
  };

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
            {article.shortDescription && (
              <p className="article-short-desc">{article.shortDescription}</p>
            )}

            <div
              className="markdown-render"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
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
                    <div className="comment-author">
                      {el.author?.email || "You"}
                    </div>
                    <div className="comment-text">{el.content}</div>
                    <div className="comment-reactions">
                      <button
                        onClick={() => handleReactComent("LIKE", el.id)}
                        className={`reaction-button like-btn ${
                          el.myReaction === "LIKE" ? "active" : ""
                        }`}
                      >
                        <span>{el.likes ?? 0}</span>
                        <LikeSVG width="20" height="20" />
                      </button>
                      <button
                        onClick={() => handleReactComent("DISLIKE", el.id)}
                        className={`reaction-button dislike-btn ${
                          el.myReaction === "DISLIKE" ? "active" : ""
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
            <button
              onClick={() => handleSendComment()}
              className="comic-button"
            >
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
