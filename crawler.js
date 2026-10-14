async function crawlDanTriArticle(articleUrl) {
  try {
    // Kiểm tra URL
    let parsedUrl;

    try {
      parsedUrl = new URL(articleUrl);
    } catch {
      throw new Error("Link không hợp lệ. Hãy kiểm tra lại URL.");
    }

    if (
      parsedUrl.hostname !== "dantri.com.vn" &&
      parsedUrl.hostname !== "www.dantri.com.vn"
    ) {
      throw new Error("Vui lòng nhập link bài viết từ dantri.com.vn.");
    }

    // Lấy HTML thông qua dịch vụ trung gian
    const proxyUrl =
      "https://api.allorigins.win/get?url=" +
      encodeURIComponent(articleUrl);

    let response;

    try {
      response = await fetch(proxyUrl);
    } catch {
      throw new Error(
        "Không kết nối được dịch vụ crawl. Hãy dùng chức năng nhập JSON."
      );
    }

    if (!response.ok) {
      throw new Error(
        "Dịch vụ crawl trả về HTTP " + response.status +
        ". Hãy thử lại hoặc nhập JSON thủ công."
      );
    }

    const data = await response.json();

    if (!data.contents) {
      throw new Error("Dịch vụ crawl không trả về nội dung bài báo.");
    }

    // Phân tích HTML bài báo
    const doc = new DOMParser().parseFromString(
      data.contents,
      "text/html"
    );

    const getText = (selectors) => {
      for (const selector of selectors) {
        const element = doc.querySelector(selector);
        if (element && element.textContent.trim()) {
          return element.textContent.trim();
        }
      }
      return "";
    };

    const title = getText([
      "h1.title-page",
      ".title-page",
      "h1"
    ]);

    if (!title) {
      throw new Error(
        "Không tìm thấy tiêu đề. Dân Trí có thể đã chặn yêu cầu."
      );
    }

    const excerpt = getText([
      ".singular-sapo",
      ".sapo"
    ]);

    const paragraphs = Array.from(
      doc.querySelectorAll(
        ".singular-content p, .body-content p"
      )
    );

    const content = paragraphs
      .map(p => p.textContent.trim())
      .filter(Boolean)
      .join("\n\n");

    const author = getText([
      ".author-name",
      ".singular-author"
    ]) || "Tổng hợp";

    const publishedAt = getText([
      ".author-time",
      ".singular-time"
    ]);

    const category = getText([
      ".breadcrumb li:nth-child(2) a",
      ".bread-crumb a"
    ]) || "Tin tức";

    const image =
      doc.querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || "";

    const idMatch = articleUrl.match(/(\d+)\.htm$/);
    const slug = parsedUrl.pathname
      .split("/")
      .filter(Boolean)
      .pop()
      .replace(/\.htm$/, "");

    return {
      id: idMatch ? "dtri-" + idMatch[1] : "post-" + Date.now(),
      title,
      slug,
      excerpt,
      content: content || excerpt,
      author,
      category,
      publishedAt,
      source: "dantri.com.vn",
      url: articleUrl,
      image
    };
  } catch (error) {
    console.error("Lỗi cào dữ liệu:", error);
    throw error;
  }
}
