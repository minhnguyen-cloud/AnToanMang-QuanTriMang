# ATMMT Exam Generator - bản chạy trên VS Code/localhost

Bản này không mở bằng `file:///...` nữa, mà chạy qua local server ở `http://localhost:3000`.

## Cách chạy bằng VS Code

1. Giải nén thư mục.
2. Mở VS Code.
3. Chọn **File → Open Folder...** và chọn thư mục `atmm_exam_generator_vscode`.
4. Mở Terminal trong VS Code: **Terminal → New Terminal**.
5. Chạy:

```bash
npm run dev
```

6. Mở trình duyệt và vào:

```text
http://localhost:3000
```

## Cách chạy bằng nút Run/Debug trong VS Code

- Mở tab **Run and Debug**.
- Chọn **Run local server**.
- Bấm nút chạy.
- Vào `http://localhost:3000`.

## Ghi chú

- Không cần `npm install` vì server dùng module có sẵn của Node.js.
- Nếu máy chưa có Node.js thì cần cài Node.js trước.
- Dừng server bằng `Ctrl + C` trong terminal.

## Publish lên GitHub Pages để chạy web luôn

App này là web tĩnh, nên khi đưa lên GitHub Pages có thể mở trực tiếp `index.html`, không cần chạy `npm run dev`.

## Tạo nhiều đề Quản trị mạng

- Cách nhanh nhất: chọn **Chế độ đề** là **Bộ 25 đề Quản trị mạng để in/PDF** rồi bấm **Tạo đề mới**.
- Chọn **Môn học** là **Quản trị mạng - ôn thi tổng hợp**.
- Nếu muốn tạo nhiều mã đề cùng lúc để in hoặc lưu PDF, chọn **Luyện tập**, nhập **Số đề cần tạo** từ 1 đến 30, rồi bấm **Tạo đề mới**.
- Format QTM mặc định là **28 câu/đề**: khoảng **25 câu trắc nghiệm/đọc cấu hình/thực hành** và **3 câu tự luận cuối đề**.
- Các đề QTM trộn câu định nghĩa, lệnh thực hành, đọc cấu hình router/switch/Linux/Docker/Kubernetes, tình huống vận hành, subnet và tự luận topology kiểu cuối kỳ.
- Câu tự luận được ưu tiên dạng có topology/case lớn, chia ý **a, b, c** như đề thi và được đưa về cuối đề.
- Khi chọn sai trong chế độ luyện tập hoặc sau khi nộp bài, app sẽ giải thích vì sao phương án đã chọn sai.

1. Tạo repository mới trên GitHub, ví dụ `atmm-qtm-exam-generator`.
2. Mở terminal tại thư mục chứa `index.html`.
3. Chạy các lệnh:

```bash
git init
git add .
git commit -m "Add ATMMT and QTM exam generator"
git branch -M main
git remote add origin https://github.com/<username>/atmm-qtm-exam-generator.git
git push -u origin main
```

4. Vào GitHub repository -> **Settings** -> **Pages**.
5. Mục **Build and deployment**, chọn **Deploy from a branch**.
6. Chọn branch `main`, folder `/root`, bấm **Save**.
7. GitHub sẽ tạo link dạng:

```text
https://<username>.github.io/atmm-qtm-exam-generator/
```

Nếu repository đã có sẵn, chỉ cần `git add .`, `git commit`, `git push`, rồi bật Pages theo các bước trên.
