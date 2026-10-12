async function crawlDanTriArticle(articleUrl) {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(articleUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Không thể truy cập URL bài viết.");
    
    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");

    const title = doc.querySelector(".title-page, h1.title-page")?.textContent?.trim() || "";
    const excerpt = doc.querySelector(".singular-sapo, .sapo")?.textContent?.trim() || "";
    
    const contentElems = doc.querySelectorAll(".singular-content p, .body-content p");
    let content = Array.from(contentElems).map(p => p.textContent.trim()).join("\n\n");
    if (!content) content = excerpt;

    const author = doc.querySelector(".author-name, .singular-author")?.textContent?.trim() || "Tổng hợp";
    const publishedAt = doc.querySelector(".author-time, .singular-time")?.textContent?.trim() || new Date().toLocaleString();
    const category = doc.querySelector(".breadcrumb li:nth-child(2) a, .bread-crumb a")?.textContent?.trim() || "Tin tức";
    const image = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";

    const idMatch = articleUrl.match(/(\d+)\.htm$/);
    const id = idMatch ? `dtri-${idMatch[1]}` : `post-${Date.now()}`;
    const slug = articleUrl.split("/").pop().replace(".htm", "");

    return {
      id: id,
      title: title,
      slug: slug,
      excerpt: excerpt,
      content: content,
      author: author,
      category: category,
      publishedAt: publishedAt,
      source: "dantri.com.vn",
      url: articleUrl,
      image: image
    };
  } catch (error) {
    console.error("Lỗi cào dữ liệu:", error);
    throw error;
  }
}