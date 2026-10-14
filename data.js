const initialMenu = [
    { id: "home", title: "Trang chủ", url: "index.html", type: "link" },
    { id: "latest", title: "Tin mới nhất", url: "index.html", type: "category" },
    { id: "the-gioi", title: "Thế giới", url: "index.html?cat=Thế%20giới", type: "category" },
    { id: "thoi-su", title: "Thời sự", url: "index.html?cat=Thời%20sự", type: "category" },
    { id: "bat-dong-san", title: "Bất động sản", url: "index.html?cat=Bất%20động%20sản", type: "category" }
];

const initialPosts = [
    {
        id: "tin001",
        title: "Hà Nội tính cơ chế bồi thường đất đặc biệt cho các dự án đường sắt",
        excerpt: "Thông tin đáng chú ý về quy hoạch và phát triển đô thị.",
        content: "Đây là nội dung bài viết mẫu dùng để kiểm tra giao diện website.",
        category: "Bất động sản",
        author: "Ban biên tập",
        publishedAt: "2026-10-14 08:00",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900",
        source: "Dữ liệu mẫu",
        url: "https://dantri.com.vn/"
    },
    {
        id: "tin002",
        title: "Những chuyển động đáng chú ý trên thế giới",
        excerpt: "Tổng hợp một số thông tin quốc tế đáng quan tâm.",
        content: "Đây là nội dung bài viết mẫu dùng để kiểm tra giao diện website.",
        category: "Thế giới",
        author: "Ban biên tập",
        publishedAt: "2026-10-14 07:30",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900",
        source: "Dữ liệu mẫu",
        url: "https://dantri.com.vn/"
    },
    {
        id: "tin003",
        title: "Thông tin thời sự và đời sống đáng quan tâm",
        excerpt: "Các thông tin nổi bật trong nước.",
        content: "Đây là nội dung bài viết mẫu dùng để kiểm tra giao diện website.",
        category: "Thời sự",
        author: "Ban biên tập",
        publishedAt: "2026-10-14 07:00",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
        source: "Dữ liệu mẫu",
        url: "https://dantri.com.vn/"
    },
    {
        id: "tin004",
        title: "Thị trường bất động sản có những thay đổi mới",
        excerpt: "Một số thông tin về thị trường nhà đất.",
        content: "Đây là nội dung bài viết mẫu dùng để kiểm tra giao diện website.",
        category: "Bất động sản",
        author: "Ban biên tập",
        publishedAt: "2026-10-13 15:00",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900",
        source: "Dữ liệu mẫu",
        url: "https://dantri.com.vn/"
    }
];

function initStorage() {
    try {
        if (!localStorage.getItem("menu_data")) {
            localStorage.setItem("menu_data", JSON.stringify(initialMenu));
        }

        let savedPosts = JSON.parse(localStorage.getItem("posts_data") || "[]");

        if (!Array.isArray(savedPosts)) {
            savedPosts = [];
        }

        initialPosts.forEach(function(post) {
            if (!savedPosts.some(function(item) {
                return item.id === post.id;
            })) {
                savedPosts.push(post);
            }
        });

        localStorage.setItem("posts_data", JSON.stringify(savedPosts));
    } catch (error) {
        console.error("Lỗi khởi tạo dữ liệu:", error);
    }
}

initStorage();
