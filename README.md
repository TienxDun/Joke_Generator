# Máy Tạo Joke Ngẫu Nhiên 😂

Một ứng dụng tạo joke ngẫu nhiên đơn giản và vui nhộn, lấy joke từ API công khai và hiển thị chúng với giao diện hấp dẫn.

## Tính năng

- 🎲 Lấy joke ngẫu nhiên từ [JokeAPI](https://v2.jokeapi.dev)
- 🎨 Giao diện người dùng sạch sẽ và hiện đại
- 📱 Thiết kế đáp ứng - hoạt động trên tất cả thiết bị
- ⚡ Nhanh chóng và nhẹ nhàng
- 🔒 Chế độ an toàn được bật (joke thân thiện với gia đình)
- 🎭 Hỗ trợ cả joke một dòng và joke hai phần
- 🤖 Giải thích joke chi tiết bằng AI (Google Gemini 1.5 Flash)
- 🌐 Dịch joke sang tiếng Việt

## Demo

Đơn giản mở `index.html` trong trình duyệt web của bạn để bắt đầu nhận joke ngẫu nhiên!

## Cách sử dụng

1. Clone hoặc tải xuống repository này
2. Mở `index.html` trong trình duyệt web của bạn
3. Nhấn nút "Nhận Joke Mới" để lấy một joke ngẫu nhiên
4. Thưởng thức các joke! 🎉

## Cài đặt API Key cho tính năng giải thích AI

Để sử dụng tính năng giải thích joke chi tiết bằng AI:

1. Đăng ký tài khoản tại [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key mới
3. Mở file `script.js` và thay thế `'AIzaSyBV7Ik9d0ES11mp8y0zwLkpntXxuVpyFSY'` bằng API key thực của bạn
4. Lưu file và refresh trang web

**Lưu ý:** API key sẽ được sử dụng trực tiếp trong frontend, nên chỉ sử dụng cho mục đích cá nhân. Trong production, nên sử dụng backend proxy để bảo mật.

Xem file `test-api.md` để biết cách test API bằng command line.

## Công nghệ sử dụng

- **HTML5** - Cấu trúc
- **CSS3** - Tạo kiểu với gradient và animation hiện đại
- **JavaScript (ES6+)** - Tích hợp API và tương tác
- **JokeAPI** - API công khai để lấy joke

## Thông tin API

Dự án này sử dụng [JokeAPI v2](https://v2.jokeapi.dev/), một API miễn phí và công khai cung cấp:
- Các danh mục joke đa dạng
- Lọc chế độ an toàn
- Cả joke một dòng và hai phần
- Không yêu cầu xác thực

## Cấu trúc dự án

```
joke-generator/
├── index.html      # File HTML chính
├── style.css       # Stylesheet cho ứng dụng
├── script.js       # JavaScript cho các cuộc gọi API và tương tác
├── LICENSE         # Giấy phép MIT
└── README.md       # File này
```

## Hỗ trợ trình duyệt

Hoạt động trên tất cả trình duyệt hiện đại:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

## Đóng góp

Hãy thoải mái fork dự án này và gửi pull requests cho bất kỳ cải tiến nào!

## Lời cảm ơn

- Cảm ơn [JokeAPI](https://jokeapi.dev/) đã cung cấp API joke miễn phí
- Được lấy cảm hứng từ nhu cầu cười nhanh trong các phiên coding 😄
