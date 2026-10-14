
async function crawlDanTriArticle(articleUrl) {
  try {
    const parsedUrl = new URL(articleUrl);

    if (
      parsedUrl.hostname !== "dantri.com.vn" &&
      parsedUrl.hostname !== "www.dantri.com.vn"
    ) {
      throw new Error("Vui lòng nhập URL từ dantri.com.vn.");
    }

    const proxyUrl =
      `https://api.allorigins.win/get?url=${encodeURIComponent(articleUrl)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Dịch vụ lấy dữ liệu trả về lỗi HTTP ${response.status}.`);
    }

    const data = await response.json();

    if (!data.contents) {
      throw new Error("Dịch vụ trung gian không trả về nội dung bài báo.");
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");

    const title =
      doc.querySelector("h1.title-page, .title-page, h1")?.textContent?.trim() || "";

    if (!title) {
      throw new Error(
        "Không tìm thấy tiêu đề. Có thể Dân Trí đã chặn truy cập hoặc thay đổi cấu trúc trang."
      );
    }

    const excerpt =
      doc.querySelector(".singular-sapo, .sapo")?.textContent?.trim() || "";

    const contentElems = doc.querySelectorAll(
      ".singular-content p, .body-content p"
    );

    let content = Array.from(contentElems)
      .map(p => p.textContent.trim())
      .filter(Boolean)
      .join("\n\n");

    if (!content) content = excerpt;

    const author =
      doc.querySelector(".author-name, .singular-author")?.textContent?.trim() ||
      "Tổng hợp";

    const publishedAt =
      doc.querySelector(".author-time, .singular-time")?.textContent?.trim() ||
      "";

    const category =
      doc.querySelector(".breadcrumb li:nth-child(2) a, .bread-crumb a")
        ?.textContent?.trim() || "Tin tức";

    const image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";

    const idMatch = articleUrl.match(/(\d+)\.htm$/);
    const id = idMatch ? `dtri-${idMatch[1]}` : `post-${Date.now()}`;
    const slug = parsedUrl.pathname.split("/").pop().replace(/\.htm$/, "");

    return {
      id,
      title,
      slug,
      excerpt,
      content,
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
