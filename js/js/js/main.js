document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  renderArticles();
});

function renderNavbar() {
  const menuData = JSON.parse(localStorage.getItem("menu_data")) || [];
  const navContainer = document.getElementById("mainNav");
  const footerCatList = document.getElementById("footerCategoryList");

  if (!navContainer) return;
  navContainer.innerHTML = "";
  if (footerCatList) footerCatList.innerHTML = "";

  menuData.forEach(item => {
    const li = document.createElement("li");
    let hasChildren = item.children && item.children.length > 0;

    li.innerHTML = `<a href="${item.url}">${item.title}</a>`;

    if (hasChildren) {
      const ulDropdown = document.createElement("ul");
      ulDropdown.className = "dropdown";
      item.children.forEach(child => {
        ulDropdown.innerHTML += `<li><a href="${child.url}">${child.title}</a></li>`;
      });
      li.appendChild(ulDropdown);
    }

    navContainer.appendChild(li);

    if (footerCatList && item.type === "category") {
      footerCatList.innerHTML += `<li><a href="${item.url}">${item.title}</a></li>`;
    }
  });
}

function renderArticles() {
  const topSection = document.getElementById("topSection");
  const remainingSection = document.getElementById("remainingSection");
  if (!topSection || !remainingSection) return;

  const posts = JSON.parse(localStorage.getItem("posts_data")) || [];
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCat = urlParams.get("cat");

  let filteredPosts = posts;
  if (selectedCat && selectedCat !== "latest") {
    filteredPosts = posts.filter(p => 
      p.category.toLowerCase().includes(selectedCat.toLowerCase()) || selectedCat === p.id
    );
  }

  filteredPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  topSection.innerHTML = "";
  remainingSection.innerHTML = "";

  if (filteredPosts.length === 0) {
    topSection.innerHTML = "<p>Chưa có bài viết nào trong chuyên mục này.</p>";
    return;
  }

  const featured = filteredPosts[0];
  const sidePosts = filteredPosts.slice(1, 3);

  let topHTML = `
    <div class="featured-post" onclick="location.href='detail.html?id=${featured.id}'" style="cursor:pointer">
      <img src="${featured.image || 'https://via.placeholder.com/600x350'}" alt="${featured.title}">
      <h2>${featured.title}</h2>
      <p>${featured.excerpt}</p>
    </div>
    <div class="side-posts">
  `;

  sidePosts.forEach(post => {
    topHTML += `
      <div class="side-card" onclick="location.href='detail.html?id=${post.id}'" style="cursor:pointer">
        <img src="${post.image || 'https://via.placeholder.com/300x150'}" alt="${post.title}">
        <h4>${post.title}</h4>
      </div>
    `;
  });

  topHTML += `</div>`;
  topSection.innerHTML = topHTML;

  const remainingPosts = filteredPosts.slice(3);
  remainingPosts.forEach(post => {
    remainingSection.innerHTML += `
      <div class="news-item" onclick="location.href='detail.html?id=${post.id}'" style="cursor:pointer">
        <img src="${post.image || 'https://via.placeholder.com/220x140'}" alt="${post.title}">
        <div class="news-item-content">
          <h3>${post.title}</h3>
          <p style="font-size: 12px; color: #888;">${post.publishedAt} | Chuyên mục: ${post.category}</p>
          <p>${post.excerpt}</p>
        </div>
      </div>
    `;
  });
}
