document.addEventListener("DOMContentLoaded", function () {
    renderNavbar();
    renderArticles();
});

// Hiển thị menu và danh mục ở chân trang
function renderNavbar() {
    const menu = JSON.parse(localStorage.getItem("menu_data") || "[]");
    const mainNav = document.getElementById("mainNav");
    const footerList = document.getElementById("footerCategoryList");

    if (mainNav) {
        mainNav.innerHTML = menu.map(function (item) {
            return `
                <li>
                    <a href="${escapeHTML(item.url || "index.html")}">
                        ${escapeHTML(item.title || "")}
                    </a>
                </li>
            `;
        }).join("");
    }

    if (footerList) {
        footerList.innerHTML = menu
            .filter(function (item) {
                return item.type === "category";
            })
            .map(function (item) {
                return `
                    <li>
                        <a href="${escapeHTML(item.url || "index.html")}">
                            ${escapeHTML(item.title || "")}
                        </a>
                    </li>
                `;
            }).join("");
    }
}

// Hiển thị danh sách bài viết
function renderArticles() {
    const topSection = document.getElementById("topSection");
    const remainingSection = document.getElementById("remainingSection");

    // Không chạy phần danh sách tin nếu trang hiện tại không có các khu vực này
    if (!topSection || !remainingSection) {
        return;
    }

    const posts = JSON.parse(localStorage.getItem("posts_data") || "[]");

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("cat");

    let filteredPosts = posts;

    if (selectedCategory) {
        filteredPosts = posts.filter(function (post) {
            return post.category === selectedCategory;
        });
    }

    // Sắp xếp bài mới nhất lên trước
    filteredPosts.sort(function (a, b) {
        return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
    });

    // Cập nhật tiêu đề trang
    const categoryTitle = document.getElementById("categoryTitle");

    if (categoryTitle) {
        categoryTitle.textContent = selectedCategory || "Tin tức mới nhất";
    }

    // Nếu không có bài viết
    if (filteredPosts.length === 0) {
        topSection.innerHTML = "<p>Chưa có bài viết trong chuyên mục này.</p>";
        remainingSection.innerHTML = "";
        return;
    }

    // Bài nổi bật
    const featuredPost = filteredPosts[0];

    topSection.innerHTML = `
        <article class="featured-post">
            ${createPostHTML(featuredPost, "featured")}
        </article>
    `;

    // Hai bài viết bên cạnh
    const sidePosts = filteredPosts.slice(1, 3);

    if (sidePosts.length > 0) {
        topSection.innerHTML += `
            <div class="side-posts">
                ${sidePosts.map(function (post) {
                    return `
                        <article class="side-card">
                            ${createPostHTML(post, "small")}
                        </article>
                    `;
                }).join("")}
            </div>
        `;
    }

    // Các bài viết còn lại
    const remainingPosts = filteredPosts.slice(3);

    remainingSection.innerHTML = remainingPosts.map(function (post) {
        return `
            <article class="news-item">
                ${createPostHTML(post, "normal")}
            </article>
        `;
    }).join("");
}

// Tạo HTML cho một bài viết
function createPostHTML(post, type) {
    const id = encodeURIComponent(post.id || "");
    const title = escapeHTML(post.title || "Chưa có tiêu đề");
    const excerpt = escapeHTML(post.excerpt || "");
    const category = escapeHTML(post.category || "Tin tức");
    const author = escapeHTML(post.author || "Ban biên tập");
    const publishedAt = escapeHTML(post.publishedAt || "");
    const image = escapeHTML(
        post.image || "https://placehold.co/800x450?text=Tin+tuc"
    );

    let titleTag = "h3";

    if (type === "featured") {
        titleTag = "h2";
    } else if (type === "small") {
        titleTag = "h4";
    }

    return `
        <a class="post-link" href="detail.html?id=${id}">
            <img
                class="post-image"
                src="${image}"
                alt="${title}"
                onerror="this.onerror=null;this.src='https://placehold.co/800x450?text=Tin+tuc';"
            >
            <div class="post-content">
                <span class="post-category">${category}</span>
                <${titleTag}>${title}</${titleTag}>
                <p class="post-excerpt">${excerpt}</p>
                <div class="post-meta">
                    <span>${author}</span>
                    <span>${publishedAt}</span>
                </div>
            </div>
        </a>
    `;
}

// Tránh đưa ký tự HTML không an toàn vào nội dung
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}
