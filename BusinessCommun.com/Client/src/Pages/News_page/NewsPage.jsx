import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Globe, Newspaper } from "lucide-react";
import "./NewsPage.css";
// import Navbar from "../../Component/Navbar/Navbar.jsx";
import Footer from "../../Component/Footer/Footer.jsx";

export default function NewsPage() {
  // State to store articles
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch from actual API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://newsdata.io/api/1/news?apikey=pub_6674373929de07d1ffb286b9caff3d5644281&q=Business,startups&country=in&language=en");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Limit to 12 items (handling missing images with default placeholder in UI)
        if (data.results) {
          data.results = data.results.slice(0, 12);
        }

        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (

    <div className="news-page-container">
      {/* <Navbar /> */}
      <div className="container">
        <header className="news-header">
          <h1>
            <Newspaper className="header-icon" /> Latest Insights
          </h1>
          <p>Stay updated with the most recent news and developments.</p>
        </header>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="row g-4">
            {newsData?.results?.map((article, index) => (
              <div
                key={article.article_id || index}
                className="col-12 col-md-6 col-lg-4"
              >
                <motion.div
                  className="news-card h-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-image-wrapper">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="card-image"
                        onError={(e) => {
                          e.target.style.display = "none"; // Hide if broken
                        }}
                      />
                    ) : (
                      <div className="placeholder-image">
                        <Globe size={48} />
                      </div>
                    )}
                    <div className="category-badge">
                      {article.category?.[0]?.toUpperCase() || "NEWS"}
                    </div>
                  </div>

                  <div className="card-content d-flex flex-column">
                    <div className="card-meta">
                      <span className="source-info">
                        {article.source_icon && (
                          <img
                            src={article.source_icon}
                            alt=""
                            className="source-icon"
                          />
                        )}
                        {article.source_name || "Unknown Source"}
                      </span>
                      <span className="date-info">
                        <Calendar size={14} />
                        {formatDate(article.pubDate)}
                      </span>
                    </div>

                    <h3 className="card-title">{article.title}</h3>

                    <p className="card-description flex-grow-1">
                      {article.description
                        ? article.description.length > 120
                          ? `${article.description.substring(0, 120)}...`
                          : article.description
                        : "No description available."}
                    </p>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-button mt-auto"
                    >
                      Read Full Article <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>

  );
}
