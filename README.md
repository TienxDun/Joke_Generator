# Máy Tạo Joke Ngẫu Nhiên 😂

Một ứng dụng web tạo joke ngẫu nhiên vui nhộn với khả năng giải thích chi tiết bằng trí tuệ nhân tạo và giao diện người dùng hiện đại, thân thiện.

## ✨ Tính năng nổi bật

- 🎲 **Lấy joke ngẫu nhiên**: Tích hợp với [JokeAPI](https://v2.jokeapi.dev) để cung cấp hàng nghìn joke đa dạng
- 🤖 **Giải thích joke bằng AI**: Sử dụng Google Gemini 2.0 Flash để phân tích và giải thích chi tiết từng câu joke một cách dễ hiểu
- 🌐 **Dịch sang tiếng Việt**: Tự động dịch joke và giải thích sang tiếng Việt
- 🎨 **Giao diện hiện đại**: Thiết kế responsive với gradient, animation và bố cục tối ưu cho UX
- 📱 **Hoạt động trên mọi thiết bị**: Mobile-first design với breakpoints tại 480px và 768px
- 🔒 **Chế độ an toàn**: Chỉ hiển thị joke thân thiện với gia đình
- ⚡ **Nhanh chóng và nhẹ nhàng**: Vanilla JavaScript, không cần framework nặng
- 🎭 **Hỗ trợ nhiều loại joke**: Joke một dòng và joke hai phần (setup + delivery)
- 🔄 **Tương tác mượt mà**: Nút bấm với hiệu ứng hover và loading states

## 🚀 Demo

Truy cập trực tiếp: [joke-generator.vercel.app](https://joke-generator.vercel.app) (sẽ được cập nhật sau khi deploy)

Hoặc chạy locally bằng cách mở `index.html` trong trình duyệt web của bạn.

## 📖 Cách sử dụng

1. **Clone repository**:

   ```bash
   git clone https://github.com/TienxDun/joke-generator.git
   cd joke-generator
   ```

2. **Mở trong trình duyệt**:
   - Double-click vào `index.html`
   - Hoặc sử dụng live server extension trong VS Code

3. **Thưởng thức**:
   - Nhấn "Nhận Joke Mới" để lấy joke ngẫu nhiên
   - Nhấn "Giải Thích" để AI phân tích chi tiết
   - Nhấn "Dịch" để chuyển sang tiếng Việt
   - Nhấn "Đóng" để ẩn phần giải thích

## 🔑 Cài đặt API Key cho tính năng AI

Để sử dụng tính năng giải thích joke chi tiết:

### Bước 1: Tạo API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng ký tài khoản Google (nếu chưa có)
3. Tạo API key mới

### Bước 2: Cấu hình

1. Mở file `script.js`
2. Thay thế `'AIzaSyBV7Ik9d0ES11mp8y0zwLkpntXxuVpyFSY'` bằng API key thực của bạn
3. Lưu file và refresh trang web

## 🔐 Bảo mật API Key - Các tùy chọn deploy an toàn

### 🚫 Không nên làm: Hardcode API key trong code

- API key sẽ bị lộ khi source code public
- Bất kỳ ai cũng có thể xem và sử dụng API key của bạn
- Dễ bị abuse và vượt quota

### ✅ Tùy chọn 1: Environment Variables (Khuyến nghị)

#### Với Netlify

1. **Deploy lên Netlify**:
   - Connect GitHub repository
   - Build settings: Build command `npm run build` (nếu có), Publish directory `.`

2. **Thêm Environment Variables**:
   - Vào Site settings > Environment variables
   - Thêm: `GEMINI_API_KEY` = `your_actual_api_key`
   - Redeploy để áp dụng

#### Với Vercel

1. **Deploy lên Vercel**:
   - Import project từ GitHub
   - Vercel tự động detect framework (hoặc chọn "Other")

2. **Thêm Environment Variables**:
   - Vào Project settings > Environment Variables
   - Thêm: `GEMINI_API_KEY` = `your_actual_api_key`
   - Redeploy

#### Local development

```bash
# Tạo file .env (copy từ .env.example)
cp .env.example .env

# Chỉnh sửa .env với API key thực
GEMINI_API_KEY=your_actual_api_key

# Chạy local server (cần cài dotenv nếu dùng Node.js)
```

### ✅ Tùy chọn 2: Backend Proxy (An toàn nhất)

Tạo API endpoint riêng để gọi Gemini AI:

#### Sử dụng Vercel Functions

```javascript
// api/explain-joke.js
export default async function handler(req, res) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  // Logic gọi Gemini API
}
```

#### Sử dụng Netlify Functions

```javascript
// netlify/functions/explain-joke.js
exports.handler = async (event) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  // Logic gọi Gemini API
};
```

### ✅ Tùy chọn 3: Restrict API Key

Trong Google AI Studio:

- **Application restrictions**: Restrict to specific websites
- **API restrictions**: Chỉ cho phép Gemini API

⚠️ **Lưu ý**: Chỉ hoạt động với một số domain cụ thể, không linh hoạt.

### ✅ Tùy chọn 4: Serverless Functions

Sử dụng dịch vụ như:

- **Cloudflare Workers**
- **AWS Lambda**
- **Google Cloud Functions**

Frontend gọi function này thay vì trực tiếp Gemini API.

### 📊 So sánh các tùy chọn

| Tùy chọn | Độ an toàn | Độ phức tạp | Phí | Khuyến nghị |
|----------|------------|-------------|-----|-------------|
| Environment Variables | Cao | Thấp | Miễn phí | ⭐⭐⭐ |
| Backend Proxy | Rất cao | Trung bình | Miễn phí | ⭐⭐⭐⭐ |
| Restrict API Key | Trung bình | Thấp | Miễn phí | ⭐⭐ |
| Serverless Functions | Rất cao | Cao | Thấp | ⭐⭐⭐ |

### 🎯 Khuyến nghị cho dự án này

1. **Dễ nhất**: Sử dụng **Vercel** với Environment Variables
2. **An toàn nhất**: Tạo **Vercel Function** làm proxy
3. **Tránh**: GitHub Pages (không hỗ trợ environment variables)

### 🔧 Cách migrate hiện tại

Code đã được cập nhật để hỗ trợ environment variables:

```javascript
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'fallback_key';
```

**Các bước**:

1. Chọn platform (Vercel/Netlify)
2. Deploy code
3. Thêm environment variable `GEMINI_API_KEY`
4. Test và verify

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic với header, main, sections
- **CSS3**: Flexbox, Grid, CSS Variables, Animations
- **JavaScript ES6+**: Async/await, Fetch API, DOM manipulation
- **JokeAPI**: API công khai cho joke (không cần key)
- **Google Gemini AI**: AI model cho giải thích joke

## 📊 Thông tin API

### JokeAPI (v2.jokeapi.dev)

- ✅ Miễn phí, không cần xác thực
- ✅ Hàng nghìn joke đa dạng
- ✅ Lọc theo category và chế độ an toàn
- ✅ Hỗ trợ cả joke một dòng và hai phần

### Google Gemini AI

- ✅ Model: gemini-2.0-flash (nhanh và chính xác)
- ✅ Parse markdown response thành HTML
- ✅ Phân tích chi tiết từng câu joke
- ⚠️ Cần API key (xem phần cài đặt)

## 📁 Cấu trúc dự án

```text
joke-generator/
├── index.html          # File HTML chính với cấu trúc responsive
├── style.css           # Stylesheet hiện đại với gradient và animations
├── script.js           # Logic ứng dụng và tích hợp API
├── README.md           # Tài liệu này
├── LICENSE             # Giấy phép MIT
└── test-api.md         # Hướng dẫn test API (tùy chọn)
```

## 🌐 Deploy lên production

### Tùy chọn 1: GitHub Pages (Đơn giản)

```bash
# Push code lên GitHub
git add .
git commit -m "Ready for production"
git push origin main

# Cài đặt GitHub Pages trong repository settings
# URL: https://tienxdun.github.io/joke-generator
```

### Tùy chọn 2: Netlify/Vercel (Khuyến nghị - Bảo mật)

1. **Tạo tài khoản** tại [Netlify](https://netlify.com) hoặc [Vercel](https://vercel.com)
2. **Connect repository** từ GitHub
3. **Thêm Environment Variables**:
   - Key: `GEMINI_API_KEY`
   - Value: API key của bạn
4. **Deploy**

### Bảo mật API Key

- Sử dụng environment variables thay vì hardcode
- Tạo file `.env` cho local development
- Sử dụng serverless functions nếu cần backend

## 🖥️ Hỗ trợ trình duyệt

Hoạt động hoàn hảo trên:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📄 Giấy phép

Dự án này được cấp phép theo **MIT License** - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp!

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 🙏 Lời cảm ơn

- **JokeAPI** - Cung cấp API joke miễn phí tuyệt vời
- **Google Gemini AI** - Công cụ AI mạnh mẽ cho giải thích
- **Cộng đồng open source** - Luôn truyền cảm hứng cho chúng tôi

---

*Tạo bởi [TienxDun](https://github.com/TienxDun) với ❤️ và ☕*

Hãy cười nhiều hơn trong cuộc sống! 😄
