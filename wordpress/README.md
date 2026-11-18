# AKAH MOBILE cho WordPress

Cài **Astra Free** làm theme cha và kích hoạt **WooCommerce**. Tải
[`akah-mobile-child-theme.zip`](akah-mobile-child-theme.zip) ở mục **Giao diện → Thêm giao diện → Tải giao diện lên** rồi kích hoạt **AKAH Mobile Child**. ZIP đã chứa JavaScript, CSS và font. WordPress không cần Node.js để chạy theme.

## Nội dung và cấu hình WooCommerce

- Trong **WooCommerce → Cài đặt**, gán các trang Cửa hàng, Giỏ hàng, Thanh toán và Tài khoản. Có thể dùng Cart/Checkout Blocks hoặc shortcode WooCommerce tương ứng. Trang Tài khoản dùng shortcode `[woocommerce_my_account]` để hiển thị biểu mẫu và dữ liệu tài khoản bên trong bố cục AKAH.
- Để các lối tắt trên trang chủ dẫn đúng danh mục, tạo danh mục cha `dien-thoai` và `phu-kien`. Đặt `tai-nghe`, `sac-du-phong`, `cap-sac`, `op-lung`, `loa-bluetooth` và `dong-ho-thong-minh` bên dưới danh mục Phụ kiện. Gán thương hiệu WooCommerce với slug `apple`, `samsung`, `xiaomi`, `oppo`, `realme` và `vivo`.
- Đặt đơn vị tiền tệ VND để hiển thị các mức lọc giá từ thiết kế. Giá hiển thị, ảnh, thuộc tính, đánh giá và trạng thái tồn kho đến từ dữ liệu WooCommerce. Danh sách nổi bật ưu tiên sản phẩm được đánh dấu **Nổi bật**. Theme không nhập sản phẩm mẫu hoặc thay đổi cài đặt khi kích hoạt.
- Trang Liên hệ dùng nội dung của trang WordPress đã xuất bản có slug `lien-he` trong vùng biểu mẫu. Nếu chưa cấu hình nội dung, khách hàng thấy liên kết hotline. Cài đặt đăng ký tài khoản, vận chuyển, thuế và phương thức thanh toán được quản lý trong WooCommerce.
- Kiểm tra hotline, địa chỉ, ưu đãi, chính sách và nội dung thương hiệu kế thừa từ bản Figma Make trước khi phát hành.

## Dựng lại ZIP

Tại thư mục gốc, dùng Node.js 22 và pnpm 10.34.3 theo `.mise.toml`.

```bash
pnpm install --frozen-lockfile
pnpm build:wordpress
bash wordpress/package-theme.sh
```

Lệnh cuối tạo `wordpress/akah-mobile-child-theme.zip` với một thư mục theme ở cấp gốc. Có thể truyền một thư mục đầu ra khác cho script.

## Sai khác khi chuyển sang WooCommerce

Trang chủ, header, menu, footer, trang danh mục, tìm kiếm và phần trình bày sản phẩm dùng lại component và breakpoint của Figma Make. Hero dùng ảnh kèm bản xuất trong `wordpress/`. Inter được đóng gói cục bộ. Dữ liệu thật quyết định số thẻ sản phẩm, giá, ảnh và chiều dài trang.

Giỏ hàng dùng thẻ sản phẩm, nút tăng giảm và tóm tắt đơn theo Figma Make. Nội dung Cart Block hoặc shortcode được hiển thị qua biểu mẫu giỏ hàng WooCommerce, giữ mã giảm giá, phí vận chuyển và thuế từ cửa hàng. Thanh toán, xác nhận đơn và biểu mẫu biến thể dùng giao diện chức năng của WooCommerce với màu, font và góc bo của AKAH. Trang đăng nhập dùng lại bố cục hai cột của Figma Make. Khi đăng nhập, thanh điều hướng AKAH Member dẫn đến các mục WooCommerce thật. Đăng nhập hỗ trợ tên người dùng hoặc email theo mặc định của WooCommerce. Tùy chọn đăng ký chỉ xuất hiện khi cửa hàng bật đăng ký tài khoản. Bố cục trường, thông báo, nhãn WooCommerce và trạng thái đơn có thể khác prototype. Nút tim trong thẻ sản phẩm là chi tiết trang trí của bản gốc. Nội dung footer bỏ ghi chú dành cho prototype.
