const initialMenu = [
  { "id": "home", "title": "Trang chủ", "url": "index.html", "type": "home" },
  { "id": "dt360", "title": "Dân trí 360", "url": "https://dantri.com.vn/dt360.htm", "type": "external" },
  { "id": "latest", "title": "Mới nhất", "url": "index.html?cat=latest", "type": "category" },
  {
    "id": "the-gioi",
    "title": "Thế giới",
    "url": "index.html?cat=the-gioi",
    "type": "category",
    "children": [
      { "id": "quan-su", "title": "Quân sự", "url": "index.html?cat=quan-su" },
      { "id": "phan-tich", "title": "Phân tích - Bình luận", "url": "index.html?cat=phan-tich" }
    ]
  },
  {
    "id": "thoi-su",
    "title": "Thời sự",
    "url": "index.html?cat=thoi-su",
    "type": "category",
    "children": [
      { "id": "chinh-tri", "title": "Chính trị", "url": "index.html?cat=chinh-tri" },
      { "id": "giao-thong", "title": "Giao thông", "url": "index.html?cat=giao-thong" }
    ]
  },
  { "id": "bat-dong-san", "title": "Bất động sản", "url": "index.html?cat=bat-dong-san", "type": "category" }
];

const initialPosts = [
  {
    "id": "dtri-20260928122246655",
    "title": "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
    "slug": "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",
    "excerpt": "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",
    "content": "Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm...",
    "author": "Văn Hưng",
    "category": "Bất động sản",
    "publishedAt": "2026-09-28 12:22",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/bat-dong-san/ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat-20260928122246655.htm",
    "image": "https://icdn.dantri.com.vn/2023/05/20/duong-sat-1684556789.jpg"
  }
];

function initStorage() {
  if (!localStorage.getItem('menu_data')) {
    localStorage.setItem('menu_data', JSON.stringify(initialMenu));
  }
  if (!localStorage.getItem('posts_data')) {
    localStorage.setItem('posts_data', JSON.stringify(initialPosts));
  }
}

initStorage();