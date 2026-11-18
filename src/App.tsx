import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Apple,
  BadgeCheck,
  Banknote,
  BatteryCharging,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Cable,
  CreditCard,
  Headphones,
  Heart,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Speaker,
  Sparkles,
  Star,
  Trash2,
  Truck,
  User,
  Watch,
  X,
  Zap,
} from "lucide-react";

import { filterArchive, useStorefront, type Product } from "./storefront";

type CartLine = Product & { qty: number };

const phoneImages = [
  "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=900&q=88",
];

const accessoryImages = [
  "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=88",
];

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max 256GB",
    brand: "Apple",
    category: "Điện thoại",
    price: 30990000,
    oldPrice: 34990000,
    image: phoneImages[0],
    badge: "Giảm 4 triệu",
    rating: 4.9,
    specs: ["6.9 inch", "Apple A18 Pro", "256GB"],
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra 5G",
    brand: "Samsung",
    category: "Điện thoại",
    price: 28990000,
    oldPrice: 33990000,
    image: phoneImages[1],
    badge: "Bán chạy",
    rating: 4.8,
    specs: ["6.9 inch", "Snapdragon 8 Elite", "256GB"],
  },
  {
    id: 3,
    name: "Xiaomi 15 Ultra 5G",
    brand: "Xiaomi",
    category: "Điện thoại",
    price: 25990000,
    oldPrice: 29990000,
    image: phoneImages[2],
    badge: "Quà 2 triệu",
    rating: 4.7,
    specs: ["6.73 inch", "Snapdragon 8 Elite", "512GB"],
  },
  {
    id: 4,
    name: "OPPO Find X8 Pro 5G",
    brand: "OPPO",
    category: "Điện thoại",
    price: 23990000,
    oldPrice: 26990000,
    image: phoneImages[3],
    badge: "Trả góp 0%",
    rating: 4.8,
    specs: ["6.78 inch", "Dimensity 9400", "512GB"],
  },
  {
    id: 5,
    name: "realme 14 Pro+ 5G",
    brand: "realme",
    category: "Điện thoại",
    price: 10990000,
    oldPrice: 12990000,
    image: phoneImages[4],
    badge: "Mới",
    rating: 4.6,
    specs: ["6.83 inch", "Snapdragon 7s Gen 3", "256GB"],
  },
  {
    id: 6,
    name: "vivo V50 5G",
    brand: "vivo",
    category: "Điện thoại",
    price: 12990000,
    oldPrice: 14990000,
    image: phoneImages[5],
    badge: "Giá tốt",
    rating: 4.7,
    specs: ["6.77 inch", "Snapdragon 7 Gen 3", "256GB"],
  },
  {
    id: 7,
    name: "AirPods Pro (thế hệ 2)",
    brand: "Apple",
    category: "Phụ kiện",
    subcategory: "Tai nghe",
    price: 4990000,
    oldPrice: 6190000,
    image: accessoryImages[0],
    badge: "Giảm 19%",
    rating: 4.9,
    specs: ["Chống ồn chủ động", "USB-C", "MagSafe"],
  },
  {
    id: 8,
    name: "Bộ sạc nhanh Samsung 45W kèm cáp",
    brand: "Samsung",
    category: "Phụ kiện",
    subcategory: "Cáp sạc",
    price: 890000,
    oldPrice: 1190000,
    image: accessoryImages[1],
    badge: "Chính hãng",
    rating: 4.8,
    specs: ["45W", "USB-C", "Bảo hành 12 tháng"],
  },
  {
    id: 9,
    name: "Pin dự phòng Xiaomi 10000mAh",
    brand: "Xiaomi",
    category: "Phụ kiện",
    subcategory: "Sạc dự phòng",
    price: 690000,
    oldPrice: 890000,
    image: accessoryImages[2],
    badge: "Tiện lợi",
    rating: 4.6,
    specs: ["10000mAh", "22.5W", "2 cổng ra"],
  },
  {
    id: 10,
    name: "Tai nghe Bluetooth OPPO Enco",
    brand: "OPPO",
    category: "Phụ kiện",
    subcategory: "Tai nghe",
    price: 1290000,
    oldPrice: 1590000,
    image: accessoryImages[3],
    badge: "Âm thanh hay",
    rating: 4.7,
    specs: ["Bluetooth 5.4", "Chống ồn AI", "28 giờ"],
  },
  {
    id: 11,
    name: "Ốp lưng MagSafe trong suốt",
    brand: "Apple",
    category: "Phụ kiện",
    subcategory: "Ốp lưng",
    price: 690000,
    oldPrice: 890000,
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=88",
    badge: "Bảo vệ tốt",
    rating: 4.7,
    specs: ["MagSafe", "Chống sốc", "Trong suốt"],
  },
  {
    id: 12,
    name: "Loa Bluetooth JBL Go 4",
    brand: "JBL",
    category: "Phụ kiện",
    subcategory: "Loa bluetooth",
    price: 1190000,
    oldPrice: 1490000,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=88",
    badge: "Âm thanh mạnh",
    rating: 4.8,
    specs: ["Bluetooth 5.3", "Chống nước IP67", "7 giờ"],
  },
  {
    id: 13,
    name: "Apple Watch Series 10 GPS",
    brand: "Apple",
    category: "Phụ kiện",
    subcategory: "Đồng hồ thông minh",
    price: 9990000,
    oldPrice: 10990000,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=88",
    badge: "Mới",
    rating: 4.9,
    specs: ["46mm", "GPS", "Theo dõi sức khỏe"],
  },
];

const brands = ["Apple", "Samsung", "Xiaomi", "OPPO", "realme", "vivo"];
const money = (value: number) => `${value.toLocaleString("vi-VN")}₫`;

const policyContent: Record<string, { title: string; intro: string; points: string[] }> = {
  "bao-hanh": {
    title: "Chính sách bảo hành",
    intro: "Cam kết bảo hành minh bạch, thuận tiện cho mọi sản phẩm chính hãng.",
    points: [
      "Bảo hành theo tiêu chuẩn nhà sản xuất từ 12–24 tháng.",
      "Hỗ trợ tiếp nhận tại cửa hàng hoặc gửi qua đơn vị vận chuyển.",
      "Thời gian xử lý dự kiến 7–15 ngày làm việc.",
    ],
  },
  "doi-tra": {
    title: "Chính sách đổi trả",
    intro: "Đổi mới linh hoạt để bạn an tâm trong từng quyết định mua sắm.",
    points: [
      "Đổi mới trong 30 ngày với lỗi phần cứng từ nhà sản xuất.",
      "Sản phẩm còn nguyên trạng, đủ phụ kiện và chứng từ.",
      "Không áp dụng với lỗi do rơi vỡ, vào nước hoặc can thiệp phần mềm.",
    ],
  },
  "giao-hang": {
    title: "Chính sách giao hàng",
    intro: "Giao nhanh, theo dõi rõ ràng trên toàn quốc.",
    points: [
      "Miễn phí nội thành cho đơn từ 500.000₫.",
      "Giao tiêu chuẩn toàn quốc từ 2–5 ngày làm việc.",
      "Khách hàng được kiểm tra ngoại quan trước khi nhận.",
    ],
  },
  "thanh-toan": {
    title: "Chính sách thanh toán",
    intro: "Nhiều hình thức thanh toán an toàn và thuận tiện.",
    points: [
      "Thanh toán khi nhận hàng (COD).",
      "Chuyển khoản ngân hàng theo thông tin trên đơn hàng.",
      "Hỗ trợ thẻ và trả góp tại cửa hàng (bản demo).",
    ],
  },
  "bao-mat": {
    title: "Chính sách bảo mật",
    intro: "AKAH MOBILE tôn trọng và bảo vệ dữ liệu cá nhân của khách hàng.",
    points: [
      "Chỉ thu thập thông tin cần thiết để xử lý đơn hàng.",
      "Không bán hoặc chia sẻ dữ liệu cho bên thứ ba trái phép.",
      "Khách hàng có quyền yêu cầu cập nhật hoặc xóa dữ liệu.",
    ],
  },
  "kiem-hang": {
    title: "Chính sách kiểm hàng",
    intro: "Kiểm tra kỹ sản phẩm trước khi nhận để đảm bảo đúng nhu cầu.",
    points: [
      "Đối chiếu mẫu mã, màu sắc và dung lượng.",
      "Kiểm tra niêm phong và tình trạng ngoại quan.",
      "Không kích hoạt hoặc dùng thử sâu trước khi thanh toán.",
    ],
  },
};

function Button({
  children,
  onClick,
  kind = "primary",
  type = "button",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "dark" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_10px_25px_rgba(37,99,235,.2)]",
    secondary: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[kind]} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[.18em] text-blue-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function NativeSlot({ name }: { name: string }) {
  const target = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const content = document.getElementById(`akah-native-${name}`);
    const source = content?.parentElement;
    if (!content || !source || !target.current) return;
    target.current.append(content);
    return () => {
      source.append(content);
    };
  }, [name]);
  return <div ref={target} />;
}

function ProductPrice({ product }: { product: Product }) {
  if (product.priceHtml !== undefined) {
    // The theme sanitizes WooCommerce price markup before serializing it.
    return <span dangerouslySetInnerHTML={{ __html: product.priceHtml }} />;
  }
  return <>{money(product.price)}</>;
}

function App() {
  const store = useStorefront();
  const [route, setRoute] = useState(store?.route ?? "home");
  const [selected, setSelected] = useState<Product>(store?.selected ?? products[0]);
  const [cart, setCart] = useState<CartLine[]>([
    { ...products[1], qty: 1 },
    { ...products[7], qty: 1 },
  ]);
  const [query, setQuery] = useState(store?.query ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  const navigate = (next: string) => {
    if (store) {
      if (next === "search") {
        const url = new URL(store.urls.search);
        url.searchParams.set("s", query.trim());
        window.location.assign(url);
      } else {
        window.location.assign(store.urls[next] ?? store.urls.home);
      }
      return;
    }
    setRoute(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const viewProduct = (product: Product) => {
    if (product.url) {
      window.location.assign(product.url);
      return;
    }
    setSelected(product);
    navigate("product");
  };
  const addToCart = (product: Product, go = false) => {
    if (store && product.url) {
      if (!product.quickAdd) {
        viewProduct(product);
        return;
      }
      const form = document.createElement("form");
      form.method = "post";
      form.action = product.url;
      const id = document.createElement("input");
      id.type = "hidden";
      id.name = "add-to-cart";
      id.value = String(product.id);
      const quickAdd = document.createElement("input");
      quickAdd.type = "hidden";
      quickAdd.name = "akah_quick_add";
      quickAdd.value = "1";
      form.append(id, quickAdd);
      document.body.append(form);
      form.submit();
      return;
    }
    setCart((current) =>
      current.some((p) => p.id === product.id)
        ? current.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
        : [...current, { ...product, qty: 1 }],
    );
    setToast(`${product.name} đã được thêm vào giỏ`);
    window.setTimeout(() => setToast(""), 2400);
    if (go) navigate("cart");
  };
  const [wooCartCount, setWooCartCount] = useState(store?.cartCount ?? 0);
  useEffect(() => {
    if (!store) return;
    const read = () => {
      const count = document.getElementById("akah-cart-count")?.dataset.count;
      if (count !== undefined) setWooCartCount(Number(count));
    };
    const state = document.getElementById("akah-cart-state");
    if (!state) return;
    const observer = new MutationObserver(read);
    observer.observe(state, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-count"],
    });
    read();
    return () => observer.disconnect();
  }, [store]);
  const cartCount = store ? wooCartCount : cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header
        route={route}
        navigate={navigate}
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main id={store ? "akah-main" : undefined}>
        {store && <NativeSlot name="notices" />}
        {store?.archive && (
          <Catalog
            category={store.archive.category}
            navigate={navigate}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        )}
        {store && route === "native" && (
          <PageWrap>
            <NativeSlot name="content" />
          </PageWrap>
        )}
        {route === "home" && (
          <Home navigate={navigate} viewProduct={viewProduct} addToCart={addToCart} />
        )}
        {!store && route.startsWith("phones") && (
          <Catalog
            key={route}
            category="Điện thoại"
            initialBrand={route.includes(":") ? route.split(":")[1] : undefined}
            navigate={navigate}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        )}
        {!store && route.startsWith("accessories") && (
          <Catalog
            key={route}
            category="Phụ kiện"
            initialSubcategory={route.includes(":") ? route.split(":")[1] : undefined}
            navigate={navigate}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        )}
        {route === "product" && (
          <ProductDetail
            product={selected}
            navigate={navigate}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        )}
        {route === "search" && (
          <SearchPage
            query={query}
            setQuery={setQuery}
            navigate={navigate}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        )}
        {!store && route === "cart" && (
          <CartPage cart={cart} setCart={setCart} navigate={navigate} />
        )}
        {!store && route === "checkout" && <Checkout cart={cart} navigate={navigate} />}
        {!store && route === "success" && <OrderSuccess navigate={navigate} />}
        {!store && route === "login" && <Auth navigate={navigate} />}
        {!store && route === "account" && <Account navigate={navigate} />}
        {route === "about" && <About navigate={navigate} />}
        {route === "contact" && <Contact />}
        {route.startsWith("policy-") && (
          <Policy slug={route.replace("policy-", "")} navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          <Check size={17} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function Header({
  route,
  navigate,
  query,
  setQuery,
  cartCount,
  mobileOpen,
  setMobileOpen,
}: {
  route: string;
  navigate: (r: string) => void;
  query: string;
  setQuery: (q: string) => void;
  cartCount: number;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const useAccountInMobile = Boolean(useStorefront());
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate("search");
  };
  const links = [
    ["home", "Trang chủ"],
    ["phones", "Điện thoại"],
    ["accessories", "Phụ kiện"],
    ["phones", "Thương hiệu"],
    ["about", "Giới thiệu"],
    ["contact", "Liên hệ"],
  ];
  return (
    <>
      <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium text-slate-200">
        Miễn phí giao hàng toàn quốc cho đơn từ 500.000₫{" "}
        <span className="mx-2 text-slate-600">|</span> Hotline: 1900 6868
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 lg:px-8">
          <button
            onClick={() => navigate("home")}
            className="flex shrink-0 items-center gap-2 text-left"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-200">
              A
            </span>
            <span>
              <strong className="block text-base leading-4 tracking-tight text-slate-950">
                AKAH
              </strong>
              <small className="text-[10px] font-bold tracking-[.18em] text-blue-600">MOBILE</small>
            </span>
          </button>
          <form onSubmit={submitSearch} className="relative ml-3 hidden flex-1 md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
              placeholder="Bạn cần tìm điện thoại, phụ kiện gì?"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </form>
          <button
            onClick={() => navigate("login")}
            className="ml-auto hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:flex"
          >
            <User size={21} />
            <span className="hidden xl:block">Tài khoản</span>
          </button>
          <button
            onClick={() => navigate("cart")}
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ShoppingBag size={22} />
            <span className="hidden xl:block">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-blue-600 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-800 lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav className="hidden border-t border-slate-100 lg:block">
          <div className="mx-auto flex h-12 max-w-7xl items-center gap-8 px-8">
            {links.map(([key, label], i) => (
              <button
                key={`${key}-${i}`}
                onClick={() => navigate(key)}
                className={`text-sm font-semibold transition hover:text-blue-600 ${route.startsWith(key) ? "text-blue-600" : "text-slate-600"}`}
              >
                {label}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-2 text-xs font-bold text-emerald-600">
              <BadgeCheck size={16} /> Cam kết hàng chính hãng
            </span>
          </div>
        </nav>
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
            <form onSubmit={submitSearch} className="relative mb-3">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Tìm kiếm sản phẩm"
                placeholder="Tìm kiếm sản phẩm..."
                className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none"
              />
            </form>
            <div className="grid grid-cols-2 gap-2">
              {links.map(([key, label], i) => (
                <button
                  key={`${key}-${i}`}
                  onClick={() => navigate(key)}
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {label}
                </button>
              ))}
              {useAccountInMobile && (
                <button
                  onClick={() => navigate("login")}
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 sm:hidden"
                >
                  Tài khoản
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Home({ navigate, viewProduct, addToCart }: PageActions) {
  const store = useStorefront();
  return (
    <>
      <section className="overflow-hidden bg-[#EFF6FF]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:min-h-[570px] md:grid-cols-2 md:px-8 md:py-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-blue-700">
              <Sparkles size={15} /> Công nghệ mới, giá tốt hơn
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-[-.04em] text-slate-950 md:text-6xl">
              Chạm tương lai.
              <br />
              <span className="text-blue-600">Sắm công nghệ.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 md:text-lg">
              Khám phá smartphone chính hãng, phụ kiện thông minh và dịch vụ tận tâm dành riêng cho
              bạn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => navigate("phones")}>
                Khám phá ngay <ArrowRight size={17} />
              </Button>
              <Button kind="ghost" onClick={() => navigate("accessories")}>
                Xem phụ kiện
              </Button>
            </div>
            <div className="mt-9 flex gap-7 border-t border-blue-100 pt-6 text-sm">
              <span>
                <strong className="block text-xl text-slate-950">10K+</strong>
                <small className="text-slate-500">Khách hàng</small>
              </span>
              <span>
                <strong className="block text-xl text-slate-950">100%</strong>
                <small className="text-slate-500">Chính hãng</small>
              </span>
              <span>
                <strong className="block text-xl text-slate-950">4.9/5</strong>
                <small className="text-slate-500">Đánh giá</small>
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-blue-300/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-slate-900 shadow-[0_30px_70px_rgba(15,23,42,.22)]">
              <img
                src={
                  store?.heroImage ||
                  "https://images.unsplash.com/photo-1707438095940-1eee18e85400?auto=format&fit=crop&w=1200&q=90"
                }
                alt="Bộ sưu tập smartphone cao cấp"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/90 p-4 backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold text-blue-600">BỘ SƯU TẬP 2025</p>
                  <p className="mt-1 font-extrabold text-slate-950">Mạnh mẽ. Tinh tế. Khác biệt.</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-blue-600 text-white">
                  <ArrowRight size={18} />
                </span>
              </div>
            </div>
            <div className="absolute -left-5 top-8 hidden rounded-2xl bg-white p-3 shadow-xl md:flex md:items-center md:gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck />
              </span>
              <span className="text-xs">
                <strong className="block text-sm text-slate-900">Chính hãng</strong>Bảo hành toàn
                quốc
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <SectionTitle
          eyebrow="Chọn theo thương hiệu"
          title="Hãng điện thoại nổi bật"
          subtitle="Khám phá điện thoại theo thương hiệu bạn yêu thích"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[
            ["Apple", "Đẳng cấp và tinh tế", Apple],
            ["Samsung", "Công nghệ dẫn đầu", Smartphone],
            ["Xiaomi", "Hiệu năng vượt trội", Zap],
            ["OPPO", "Camera chân dung đẹp", Sparkles],
            ["realme", "Cấu hình mạnh, giá tốt", BatteryCharging],
            ["vivo", "Thiết kế trẻ trung", Phone],
          ].map(([title, text, Icon], index) => (
            <button
              key={title as string}
              onClick={() => navigate(`phones:${title as string}`)}
              className="group relative min-h-44 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-[0_8px_30px_rgba(15,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_35px_rgba(37,99,235,.12)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <span className="absolute right-4 top-4 text-5xl font-black text-slate-50 transition group-hover:text-blue-50">
                {index + 1}
              </span>
              <h3 className="mt-6 text-base font-extrabold text-slate-950">{title as string}</h3>
              <p className="mt-1 min-h-8 text-xs leading-4 text-slate-500">{text as string}</p>
              <span className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600">
                Xem điện thoại
                <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-14 border-t border-slate-100 pt-12">
          <SectionTitle
            eyebrow="Phụ kiện công nghệ"
            title="Danh mục sản phẩm khác"
            subtitle="Phụ kiện và thiết bị công nghệ hỗ trợ trải nghiệm mua sắm của bạn"
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Tai nghe", "Âm thanh sống động", Headphones],
              ["Sạc dự phòng", "Năng lượng mọi lúc", BatteryCharging],
              ["Cáp sạc", "Kết nối nhanh, bền bỉ", Cable],
              ["Ốp lưng", "Bảo vệ đầy phong cách", ShieldCheck],
              ["Loa bluetooth", "Âm nhạc mọi không gian", Speaker],
              ["Đồng hồ thông minh", "Sức khỏe trên cổ tay", Watch],
            ].map(([title, text, Icon]) => (
              <button
                key={title as string}
                onClick={() => navigate(`accessories:${title as string}`)}
                className="group flex min-h-40 flex-col rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-[0_16px_35px_rgba(37,99,235,.1)]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-sm font-extrabold text-slate-950">{title as string}</h3>
                <p className="mt-1 text-xs leading-4 text-slate-500">{text as string}</p>
                <span className="mt-auto flex items-center justify-end pt-3 text-blue-600">
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <SectionTitle
          eyebrow="Được chọn nhiều nhất"
          title="Sản phẩm nổi bật"
          action={
            <button
              onClick={() => navigate("phones")}
              className="hidden items-center gap-1 text-sm font-bold text-blue-600 sm:flex"
            >
              Xem tất cả <ChevronRight size={17} />
            </button>
          }
        />
        <ProductGrid
          products={store?.products ?? products.slice(0, 6)}
          viewProduct={viewProduct}
          addToCart={addToCart}
        />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-10 text-white md:px-14 md:py-14">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.6),transparent_65%)]" />
          <div className="relative max-w-xl">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-blue-400">
              Ưu đãi thành viên mới
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Giảm thêm đến 1.000.000₫</h2>
            <p className="mt-3 text-slate-400">
              Đăng ký AKAH Member và nhận ngay voucher cho đơn hàng đầu tiên.
            </p>
            <Button className="mt-7" onClick={() => navigate("login")}>
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </section>
      <Benefits />
    </>
  );
}

type PageActions = {
  navigate: (r: string) => void;
  viewProduct: (p: Product) => void;
  addToCart: (p: Product, go?: boolean) => void;
};

function ProductGrid({
  products: list,
  viewProduct,
  addToCart,
}: {
  products: Product[];
  viewProduct: (p: Product) => void;
  addToCart: (p: Product) => void;
}) {
  if (!list.length)
    return (
      <StatePanel
        type="empty"
        title="Chưa tìm thấy sản phẩm"
        text="Hãy thử thay đổi từ khóa hoặc bộ lọc để xem thêm kết quả."
      />
    );
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {list.map((product) => (
        <article
          key={product.id}
          className="group flex min-w-0 flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,.05)] transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
        >
          <button
            onClick={() => viewProduct(product)}
            className="relative overflow-hidden rounded-xl bg-slate-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute left-2 top-2 rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">
                {product.badge}
              </span>
            )}
            <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-slate-500">
              <Heart size={15} />
            </span>
          </button>
          <div className="flex flex-1 flex-col pt-4">
            <button
              onClick={() => viewProduct(product)}
              className="line-clamp-2 min-h-11 text-left text-sm font-bold leading-5 text-slate-900 hover:text-blue-600"
            >
              {product.name}
            </button>
            <div className="mt-2 flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="rounded bg-slate-100 px-1.5 py-1 text-[9px] font-medium text-slate-500"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <p className="text-base font-black text-blue-600">
                <ProductPrice product={product} />
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 line-through">
                  {product.priceHtml === undefined ? money(product.oldPrice) : ""}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                  <Star size={11} fill="currentColor" />
                  {product.rating}
                </span>
              </div>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 text-xs font-bold text-white transition hover:bg-blue-600"
            >
              <ShoppingCart size={14} />{" "}
              {product.quickAdd === false ? "Xem sản phẩm" : "Thêm vào giỏ"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function Catalog({
  category,
  initialBrand,
  initialSubcategory,
  navigate,
  viewProduct,
  addToCart,
}: PageActions & {
  category: string;
  initialBrand?: string;
  initialSubcategory?: string;
}) {
  const store = useStorefront();
  const archive = store?.archive;
  const [brand, setBrand] = useState(initialBrand || "Tất cả");
  const [subcategory, setSubcategory] = useState(initialSubcategory || "Tất cả");
  const [price, setPrice] = useState("Tất cả");
  const [sort, setSort] = useState("Nổi bật");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(id);
  }, [brand, subcategory, price, sort, category]);
  const list = useMemo(() => {
    let found = products.filter(
      (p) =>
        p.category === category &&
        (brand === "Tất cả" || p.brand === brand) &&
        (subcategory === "Tất cả" || p.subcategory === subcategory),
    );
    if (price === "Dưới 10 triệu") found = found.filter((p) => p.price < 10000000);
    if (price === "10 - 20 triệu")
      found = found.filter((p) => p.price >= 10000000 && p.price <= 20000000);
    if (price === "Trên 20 triệu") found = found.filter((p) => p.price > 20000000);
    if (sort === "Giá thấp") found.sort((a, b) => a.price - b.price);
    if (sort === "Giá cao") found.sort((a, b) => b.price - a.price);
    return found;
  }, [brand, subcategory, price, sort, category]);
  const pageTitle = archive?.title || initialBrand || initialSubcategory || category;
  const visibleProducts = store?.products ?? list;
  const sortOrders = ["Nổi bật", "Giá thấp", "Giá cao"];
  const sortValues = ["", "price", "price-desc"];
  const priceRanges = ["Tất cả", "Dưới 10 triệu", "10 - 20 triệu", "Trên 20 triệu"];
  const priceBounds = [
    ["", ""],
    ["", "9999999"],
    ["10000000", "20000000"],
    ["20000001", ""],
  ];
  const changePrice = (value: string) => {
    const [min, max] = priceBounds[priceRanges.indexOf(value)];
    filterArchive("min_price", { min_price: min, max_price: max });
  };
  return (
    <PageWrap>
      <Breadcrumb
        items={["Trang chủ", category, ...(pageTitle !== category ? [pageTitle] : [])]}
        navigate={navigate}
      />
      <div className="rounded-[1.75rem] bg-gradient-to-r from-slate-950 to-blue-950 px-7 py-9 text-white md:px-10">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-300">
          Danh mục sản phẩm
        </p>
        <h1 className="mt-2 text-3xl font-black">{pageTitle}</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          {category === "Điện thoại"
            ? "Khám phá smartphone chính hãng, công nghệ mới nhất và mức giá hấp dẫn."
            : "Nâng cấp trải nghiệm với phụ kiện chính hãng, bền đẹp và tương thích tối ưu."}
        </p>
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[230px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2 font-extrabold">
            <SlidersHorizontal size={18} /> Bộ lọc
          </div>
          <Filter
            title="Thương hiệu"
            options={["Tất cả", ...brands]}
            value={archive?.brand || brand}
            setValue={
              archive
                ? (value) =>
                    filterArchive("akah_brand", { akah_brand: value === "Tất cả" ? "" : value })
                : setBrand
            }
          />
          {category === "Phụ kiện" && (
            <Filter
              title="Loại sản phẩm"
              options={[
                "Tất cả",
                "Tai nghe",
                "Sạc dự phòng",
                "Cáp sạc",
                "Ốp lưng",
                "Loa bluetooth",
                "Đồng hồ thông minh",
              ]}
              value={archive ? (pageTitle === category ? "Tất cả" : pageTitle) : subcategory}
              setValue={
                archive
                  ? (value) => navigate(value === "Tất cả" ? "accessories" : `accessories:${value}`)
                  : setSubcategory
              }
            />
          )}
          {(!archive || archive.usesVnd) && (
            <Filter
              title="Khoảng giá"
              options={priceRanges}
              value={archive?.price || price}
              setValue={archive ? changePrice : setPrice}
            />
          )}
        </aside>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Tìm thấy <strong className="text-slate-900">{store?.total ?? list.length}</strong> sản
              phẩm
            </p>
            <label className="flex items-center gap-2 text-sm text-slate-500">
              Sắp xếp:
              <select
                value={
                  archive ? (sortOrders[sortValues.indexOf(archive.sort)] ?? sortOrders[0]) : sort
                }
                onChange={(e) =>
                  archive
                    ? filterArchive("orderby", {
                        orderby: sortValues[sortOrders.indexOf(e.target.value)],
                      })
                    : setSort(e.target.value)
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800 outline-none"
              >
                <option>Nổi bật</option>
                <option>Giá thấp</option>
                <option>Giá cao</option>
              </select>
            </label>
          </div>
          {!store && loading ? (
            <LoadingGrid />
          ) : (
            <ProductGrid
              products={visibleProducts}
              viewProduct={viewProduct}
              addToCart={addToCart}
            />
          )}
          {store && <Pagination />}
          {!store && list.length > 0 && (
            <div className="mt-9 flex justify-center gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`size-10 rounded-lg text-sm font-bold ${n === 1 ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-600"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrap>
  );
}

function Pagination() {
  const store = useStorefront();
  if (!store?.pagination.length) return null;
  return (
    <nav aria-label="Phân trang sản phẩm" className="mt-9 flex justify-center gap-2">
      {store.pagination.map(({ label, url, current }) => (
        <a
          key={label}
          href={url}
          aria-current={current ? "page" : undefined}
          className={`grid size-10 place-items-center rounded-lg text-sm font-bold ${current ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-600"}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function Filter({
  title,
  options,
  value,
  setValue,
}: {
  title: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">{title}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
          >
            <input
              type="radio"
              className="accent-blue-600"
              checked={value === option}
              onChange={() => setValue(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-slate-100 p-3">
          <div className="aspect-square rounded-xl bg-slate-100" />
          <div className="mt-4 h-4 rounded bg-slate-100" />
          <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
          <div className="mt-5 h-5 w-1/2 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function ProductDetail({
  product,
  navigate,
  viewProduct,
  addToCart,
}: PageActions & { product: Product }) {
  const store = useStorefront();
  const [color, setColor] = useState("Đen Titan");
  const [storage, setStorage] = useState("256GB");
  const [image, setImage] = useState(product.image);
  useEffect(() => setImage(product.image), [product]);
  return (
    <PageWrap>
      <Breadcrumb items={["Trang chủ", product.category, product.name]} navigate={navigate} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl bg-slate-50">
            <img src={image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {(product.gallery ?? [product.image, ...phoneImages.slice(1, 4)]).map((img, i) => (
              <button
                key={img}
                onClick={() => setImage(img)}
                className={`overflow-hidden rounded-xl border-2 ${image === img ? "border-blue-600" : "border-transparent"}`}
              >
                <img
                  src={img}
                  alt={`Ảnh sản phẩm ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            {product.badge && (
              <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
              <Star size={15} fill="currentColor" /> {product.rating}{" "}
              <span className="font-normal text-slate-400">
                ({product.reviewCount ?? 128} đánh giá)
              </span>
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-6 rounded-2xl bg-blue-50 p-5">
            <p className="text-3xl font-black text-blue-600">
              <ProductPrice product={product} />
            </p>
            {!store && (
              <p className="mt-1 text-sm text-slate-400">
                <span className="line-through">{money(product.oldPrice)}</span>{" "}
                <span className="ml-2 font-bold text-emerald-600">
                  Tiết kiệm {money(product.oldPrice - product.price)}
                </span>
              </p>
            )}
          </div>
          {store ? (
            <div className="akah-purchase product mt-6">
              <NativeSlot name="purchase" />
            </div>
          ) : (
            <>
              <Option
                title="Màu sắc"
                options={["Đen Titan", "Trắng", "Xanh sa mạc"]}
                value={color}
                setValue={setColor}
              />
              <Option
                title="Bộ nhớ"
                options={["256GB", "512GB", "1TB"]}
                value={storage}
                setValue={setStorage}
              />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button className="w-full" onClick={() => addToCart(product)}>
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </Button>
                <Button className="w-full" kind="dark" onClick={() => addToCart(product, true)}>
                  Mua ngay <ArrowRight size={17} />
                </Button>
              </div>
            </>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-2 rounded-xl border border-slate-100 p-3">
              <ShieldCheck className="text-blue-600" size={18} /> Bảo hành 12 tháng
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-slate-100 p-3">
              <Truck className="text-blue-600" size={18} /> Giao nhanh toàn quốc
            </span>
          </div>
        </div>
      </div>
      {(!store || Boolean(product.attributes?.length)) && (
        <section className="mt-16 rounded-3xl border border-slate-100 p-6 md:p-9">
          <SectionTitle title="Thông số nổi bật" />
          <div className="grid gap-3 md:grid-cols-2">
            {(
              product.attributes ?? [
                ["Màn hình", product.specs[0]],
                ["Vi xử lý", product.specs[1]],
                ["Bộ nhớ", product.specs[2]],
                ["Pin & sạc", "4.685mAh, sạc nhanh"],
                ["Camera sau", "48MP + 48MP + 12MP"],
                ["Hệ điều hành", "Phiên bản mới nhất"],
              ]
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
              >
                <span className="text-slate-500">{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </section>
      )}
      {store && <NativeSlot name="description" />}
      {(!store || store.products.length > 0) && (
        <section className="mt-16">
          <SectionTitle title="Có thể bạn cũng thích" />
          <ProductGrid
            products={store?.products ?? products.filter((p) => p.id !== product.id).slice(0, 5)}
            viewProduct={viewProduct}
            addToCart={addToCart}
          />
        </section>
      )}
    </PageWrap>
  );
}

function Option({
  title,
  options,
  value,
  setValue,
}: {
  title: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-bold">
        {title}: <span className="font-normal text-slate-500">{value}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold ${value === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchPage({
  query,
  setQuery,
  navigate,
  viewProduct,
  addToCart,
}: PageActions & { query: string; setQuery: (v: string) => void }) {
  const store = useStorefront();
  const searched = store?.query ?? query;
  const result =
    store?.products ??
    products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <PageWrap>
      <Breadcrumb items={["Trang chủ", "Tìm kiếm"]} navigate={navigate} />
      <h1 className="text-3xl font-black">Tìm kiếm sản phẩm</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("search");
        }}
        className="relative mt-6 max-w-2xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-14 w-full rounded-2xl border border-slate-200 pl-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 ${store ? "pr-20" : "pr-4"}`}
          aria-label="Từ khóa tìm kiếm"
          placeholder="Nhập tên điện thoại hoặc thương hiệu..."
        />
        {store && (
          <button
            type="submit"
            className="absolute inset-y-2 right-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white"
          >
            Tìm
          </button>
        )}
      </form>
      <p className="my-7 text-sm text-slate-500">
        {searched ? (
          <>
            Kết quả cho “<strong className="text-slate-900">{searched}</strong>” —{" "}
            {store?.total ?? result.length} sản phẩm
          </>
        ) : (
          "Nhập từ khóa để bắt đầu tìm kiếm."
        )}
      </p>
      {searched ? (
        <ProductGrid products={result} viewProduct={viewProduct} addToCart={addToCart} />
      ) : (
        <StatePanel
          type="empty"
          title="Bạn đang tìm sản phẩm nào?"
          text="Gợi ý: iPhone, Samsung, tai nghe hoặc sạc nhanh."
        />
      )}
      <Pagination />
    </PageWrap>
  );
}

function CartPage({
  cart,
  setCart,
  navigate,
}: {
  cart: CartLine[];
  setCart: React.Dispatch<React.SetStateAction<CartLine[]>>;
  navigate: (r: string) => void;
}) {
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const update = (id: number, n: number) =>
    setCart((c) => c.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty + n) } : p)));
  if (!cart.length)
    return (
      <PageWrap>
        <Breadcrumb items={["Trang chủ", "Giỏ hàng"]} navigate={navigate} />
        <StatePanel
          type="empty"
          title="Giỏ hàng đang trống"
          text="Hãy khám phá các sản phẩm công nghệ phù hợp với bạn."
          action={<Button onClick={() => navigate("phones")}>Tiếp tục mua sắm</Button>}
        />
      </PageWrap>
    );
  return (
    <PageWrap>
      <Breadcrumb items={["Trang chủ", "Giỏ hàng"]} navigate={navigate} />
      <h1 className="mb-8 text-3xl font-black">
        Giỏ hàng{" "}
        <span className="text-base font-medium text-slate-400">({cart.length} sản phẩm)</span>
      </h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 rounded-2xl border border-slate-100 p-4 shadow-sm"
            >
              <img
                src={p.image}
                alt={p.name}
                className="size-24 rounded-xl object-cover sm:size-32"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <h3 className="font-extrabold">{p.name}</h3>
                  <button
                    onClick={() => setCart((c) => c.filter((x) => x.id !== p.id))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">Màu đen · Chính hãng VN/A</p>
                <p className="mt-3 font-black text-blue-600">{money(p.price)}</p>
                <div className="mt-auto flex items-center gap-3 pt-3">
                  <button
                    onClick={() => update(p.id, -1)}
                    className="grid size-8 place-items-center rounded-lg border border-slate-200"
                  >
                    <Minus size={14} />
                  </button>
                  <strong className="text-sm">{p.qty}</strong>
                  <button
                    onClick={() => update(p.id, 1)}
                    className="grid size-8 place-items-center rounded-lg border border-slate-200"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderSummary total={total}>
          <Button className="mt-5 w-full" onClick={() => navigate("checkout")}>
            Tiến hành thanh toán <ArrowRight size={17} />
          </Button>
          <button
            onClick={() => navigate("phones")}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-bold text-blue-600"
          >
            <ArrowLeft size={16} /> Tiếp tục mua sắm
          </button>
        </OrderSummary>
      </div>
    </PageWrap>
  );
}

function OrderSummary({ total, children }: { total: number; children?: ReactNode }) {
  return (
    <aside className="h-fit rounded-2xl border border-slate-100 bg-slate-50 p-6">
      <h2 className="text-lg font-extrabold">Tóm tắt đơn hàng</h2>
      <div className="mt-5 space-y-3 text-sm">
        <p className="flex justify-between text-slate-500">
          <span>Tạm tính</span>
          <span className="font-semibold text-slate-800">{money(total)}</span>
        </p>
        <p className="flex justify-between text-slate-500">
          <span>Phí vận chuyển</span>
          <span className="font-bold text-emerald-600">Miễn phí</span>
        </p>
      </div>
      <div className="mt-5 flex justify-between border-t border-slate-200 pt-5">
        <strong>Tổng cộng</strong>
        <strong className="text-xl text-blue-600">{money(total)}</strong>
      </div>
      <p className="mt-1 text-right text-[10px] text-slate-400">Đã bao gồm VAT</p>
      {children}
    </aside>
  );
}

function Checkout({ cart, navigate }: { cart: CartLine[]; navigate: (r: string) => void }) {
  const [payment, setPayment] = useState("COD");
  const [valid, setValid] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValid(true);
    const form = new FormData(e.currentTarget);
    if (form.get("name") && form.get("phone") && form.get("address")) navigate("success");
  };
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  return (
    <PageWrap>
      <Breadcrumb items={["Giỏ hàng", "Thanh toán"]} navigate={navigate} />
      <h1 className="mb-8 text-3xl font-black">Thanh toán</h1>
      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-100 p-6">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold">
              <MapPin className="text-blue-600" size={20} /> Thông tin nhận hàng
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Họ và tên" placeholder="Nguyễn Văn An" />
              <Field name="phone" label="Số điện thoại" placeholder="0901 234 567" />
              <div className="sm:col-span-2">
                <Field
                  name="address"
                  label="Địa chỉ giao hàng"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                />
              </div>
            </div>
            {valid && (
              <p className="mt-3 text-xs text-red-500">
                Vui lòng điền đầy đủ các trường bắt buộc nếu chưa hoàn tất.
              </p>
            )}
          </section>
          <section className="rounded-2xl border border-slate-100 p-6">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold">
              <CreditCard className="text-blue-600" size={20} /> Phương thức thanh toán
            </h2>
            {[
              ["COD", "Thanh toán khi nhận hàng (COD)", Banknote],
              ["BANK", "Chuyển khoản ngân hàng", CreditCard],
            ].map(([key, label, Icon]) => (
              <label
                key={key as string}
                className={`mb-3 flex cursor-pointer items-center gap-4 rounded-xl border p-4 ${payment === key ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}
              >
                <input
                  type="radio"
                  checked={payment === key}
                  onChange={() => setPayment(key as string)}
                  className="accent-blue-600"
                />
                <Icon className="text-blue-600" size={22} />
                <span className="text-sm font-bold">{label as string}</span>
              </label>
            ))}
          </section>
        </div>
        <OrderSummary total={total}>
          <Button type="submit" className="mt-5 w-full" disabled={!cart.length}>
            Đặt hàng <ShieldCheck size={17} />
          </Button>
          <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
            Bằng việc đặt hàng, bạn đồng ý với điều khoản và chính sách của AKAH MOBILE.
          </p>
        </OrderSummary>
      </form>
    </PageWrap>
  );
}

function Field({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />
    </label>
  );
}

function OrderSuccess({ navigate }: { navigate: (r: string) => void }) {
  return (
    <PageWrap>
      <div className="mx-auto max-w-2xl py-10 text-center">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <PackageCheck size={40} />
        </span>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-blue-600">
          Đặt hàng thành công
        </p>
        <h1 className="mt-3 text-3xl font-black md:text-4xl">Cảm ơn bạn đã tin chọn AKAH!</h1>
        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          Đơn hàng đã được ghi nhận. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left">
          <div className="flex justify-between border-b border-slate-200 pb-4">
            <span className="text-sm text-slate-500">Mã đơn hàng</span>
            <strong className="text-blue-600">#AKH25062168</strong>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-5 text-sm">
            <span className="text-slate-500">
              Trạng thái<strong className="mt-1 block text-amber-600">Chờ xác nhận</strong>
            </span>
            <span className="text-slate-500">
              Tổng thanh toán<strong className="mt-1 block text-slate-950">34.870.000₫</strong>
            </span>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate("account")}>Theo dõi đơn hàng</Button>
          <Button kind="ghost" onClick={() => navigate("home")}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </PageWrap>
  );
}

function Auth({ navigate }: { navigate: (r: string) => void }) {
  const [register, setRegister] = useState(false);
  return (
    <div className="grid min-h-[700px] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
        <img
          src="https://images.unsplash.com/photo-1663245482988-22fad02654e3?auto=format&fit=crop&w=1200&q=88"
          alt="Công nghệ di động"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-blue-900/30" />
        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-300">AKAH MEMBER</p>
          <h2 className="mt-3 text-4xl font-black">Nhiều đặc quyền hơn mỗi ngày.</h2>
          <p className="mt-3 text-slate-300">
            Quản lý đơn hàng, tích điểm và nhận ưu đãi riêng dành cho thành viên.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("home")}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500"
          >
            <ArrowLeft size={17} /> Về trang chủ
          </button>
          <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
            {register ? "Tạo tài khoản mới" : "Chào mừng trở lại"}
          </p>
          <h1 className="mt-2 text-3xl font-black">
            {register ? "Đăng ký AKAH Member" : "Đăng nhập tài khoản"}
          </h1>
          <div className="mt-8 space-y-4">
            {register && <Field label="Họ và tên" name="name" placeholder="Nguyễn Văn An" />}
            <Field label="Số điện thoại hoặc email" name="login" placeholder="email@example.com" />
            <Field label="Mật khẩu" name="password" placeholder="••••••••" />
          </div>
          <Button className="mt-6 w-full" onClick={() => navigate("account")}>
            {register ? "Tạo tài khoản" : "Đăng nhập"} <ArrowRight size={17} />
          </Button>
          <p className="mt-6 text-center text-sm text-slate-500">
            {register ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
            <button onClick={() => setRegister(!register)} className="font-bold text-blue-600">
              {register ? "Đăng nhập" : "Đăng ký ngay"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Account({ navigate }: { navigate: (r: string) => void }) {
  const [tab, setTab] = useState("orders");
  return (
    <PageWrap>
      <Breadcrumb items={["Trang chủ", "Tài khoản"]} navigate={navigate} />
      <div className="grid gap-7 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-2xl bg-slate-950 p-5 text-white">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <span className="grid size-11 place-items-center rounded-full bg-blue-600 font-black">
              NA
            </span>
            <div>
              <strong className="text-sm">Nguyễn Văn An</strong>
              <p className="text-xs text-slate-400">AKAH Member</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            {[
              ["orders", "Đơn hàng của tôi", Box],
              ["profile", "Thông tin cá nhân", User],
              ["address", "Sổ địa chỉ", MapPin],
            ].map(([key, label, Icon]) => (
              <button
                key={key as string}
                onClick={() => setTab(key as string)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${tab === key ? "bg-blue-600" : "text-slate-300 hover:bg-white/5"}`}
              >
                <Icon size={18} />
                {label as string}
              </button>
            ))}
          </div>
        </aside>
        <section>
          <h1 className="text-3xl font-black">
            {tab === "orders"
              ? "Đơn hàng của tôi"
              : tab === "profile"
                ? "Thông tin cá nhân"
                : "Sổ địa chỉ"}
          </h1>
          {tab === "orders" && (
            <div className="mt-6 rounded-2xl border border-slate-100 p-5">
              <div className="flex flex-wrap justify-between gap-3 border-b border-slate-100 pb-4">
                <span>
                  <strong>#AKH25062168</strong>
                  <small className="ml-3 text-slate-400">18/06/2025</small>
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                  Đang xử lý
                </span>
              </div>
              <div className="flex items-center gap-4 py-5">
                <img src={products[0].image} className="size-16 rounded-lg object-cover" alt="" />
                <div>
                  <strong className="text-sm">{products[0].name}</strong>
                  <p className="mt-1 text-xs text-slate-400">Số lượng: 1</p>
                </div>
                <strong className="ml-auto text-blue-600">{money(products[0].price)}</strong>
              </div>
              <div className="flex justify-end border-t border-slate-100 pt-4">
                <Button kind="ghost">Xem chi tiết</Button>
              </div>
            </div>
          )}
          {tab === "profile" && (
            <div className="mt-6 grid gap-4 rounded-2xl border border-slate-100 p-6 sm:grid-cols-2">
              <Field label="Họ và tên" name="name" placeholder="Nguyễn Văn An" />
              <Field label="Số điện thoại" name="phone" placeholder="0901 234 567" />
              <Field label="Email" name="email" placeholder="an.nguyen@example.com" />
              <div className="self-end">
                <Button>Lưu thay đổi</Button>
              </div>
            </div>
          )}
          {tab === "address" && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <strong>Nguyễn Văn An</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    0901 234 567
                    <br />
                    120 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM
                  </p>
                </div>
                <span className="rounded bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">
                  MẶC ĐỊNH
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </PageWrap>
  );
}

function About({ navigate }: { navigate: (r: string) => void }) {
  return (
    <>
      <section className="bg-slate-950 px-4 py-20 text-center text-white">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-blue-400">
          Về AKAH MOBILE
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Công nghệ tốt hơn.
          <br />
          Trải nghiệm gần hơn.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Chúng tôi xây dựng một nơi mua sắm công nghệ minh bạch, hiện đại và tận tâm cho người
          Việt.
        </p>
      </section>
      <PageWrap>
        <div className="grid gap-12 py-8 md:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Câu chuyện của chúng tôi"
              title="Không chỉ bán thiết bị, chúng tôi trao trải nghiệm."
            />
            <p className="leading-7 text-slate-600">
              AKAH MOBILE bắt đầu từ một niềm tin đơn giản: mọi người đều xứng đáng tiếp cận công
              nghệ chính hãng với mức giá hợp lý và dịch vụ tử tế. Từ tư vấn, mua hàng đến hậu mãi,
              mỗi điểm chạm đều được thiết kế để bạn an tâm.
            </p>
            <Button className="mt-7" onClick={() => navigate("contact")}>
              Liên hệ với chúng tôi
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["10K+", "Khách hàng tin chọn"],
              ["6+", "Thương hiệu lớn"],
              ["24/7", "Hỗ trợ trực tuyến"],
              ["4.9/5", "Điểm hài lòng"],
            ].map(([n, t]) => (
              <div key={n} className="rounded-2xl bg-blue-50 p-6">
                <strong className="text-3xl font-black text-blue-600">{n}</strong>
                <p className="mt-2 text-sm text-slate-500">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </PageWrap>
      <Benefits />
    </>
  );
}

function Contact() {
  const store = useStorefront();
  const [sent, setSent] = useState(false);
  return (
    <PageWrap>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-blue-600">
            Kết nối cùng AKAH
          </p>
          <h1 className="mt-3 text-4xl font-black">Chúng tôi luôn sẵn sàng hỗ trợ.</h1>
          <p className="mt-4 max-w-lg leading-7 text-slate-500">
            Bạn cần tư vấn sản phẩm, kiểm tra đơn hàng hay hỗ trợ bảo hành? Hãy để lại thông tin.
          </p>
          <div className="mt-8 space-y-4">
            {[
              [Phone, "Hotline", "1900 6868"],
              [MapPin, "Cửa hàng", "120 Nguyễn Huệ, Quận 1, TP.HCM"],
              [Clock3, "Giờ làm việc", "08:00 – 21:30, Thứ 2 – Chủ nhật"],
            ].map(([Icon, k, v]) => (
              <div
                key={k as string}
                className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-blue-600 text-white">
                  <Icon size={20} />
                </span>
                <span>
                  <small className="text-slate-400">{k as string}</small>
                  <strong className="block text-sm">{v as string}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 p-6 shadow-xl shadow-slate-100">
          <h2 className="text-xl font-extrabold">Gửi yêu cầu hỗ trợ</h2>
          {store ? (
            <NativeSlot name="contact" />
          ) : sent ? (
            <StatePanel
              type="success"
              title="Đã gửi yêu cầu"
              text="AKAH MOBILE sẽ phản hồi bạn trong vòng 2 giờ làm việc."
            />
          ) : (
            <div className="mt-6 space-y-4">
              <Field label="Họ và tên" name="name" placeholder="Tên của bạn" />
              <Field label="Số điện thoại" name="phone" placeholder="0901 234 567" />
              <label className="block text-sm font-bold">
                Nội dung
                <textarea
                  className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 p-4 font-normal outline-none focus:border-blue-500"
                  placeholder="Bạn cần AKAH hỗ trợ điều gì?"
                />
              </label>
              <Button className="w-full" onClick={() => setSent(true)}>
                Gửi yêu cầu
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageWrap>
  );
}

function Policy({ slug, navigate }: { slug: string; navigate: (r: string) => void }) {
  const content = policyContent[slug] || policyContent["bao-hanh"];
  return (
    <PageWrap>
      <Breadcrumb items={["Trang chủ", "Chính sách", content.title]} navigate={navigate} />
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-blue-600">
          Trung tâm hỗ trợ
        </p>
        <h1 className="mt-3 text-4xl font-black">{content.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-500">{content.intro}</p>
        <div className="mt-9 space-y-4">
          {content.points.map((p, i) => (
            <div key={p} className="flex gap-4 rounded-2xl border border-slate-100 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-50 text-sm font-black text-blue-600">
                {i + 1}
              </span>
              <p className="pt-1 text-sm leading-6 text-slate-600">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
          <h3 className="font-extrabold">Bạn vẫn cần hỗ trợ?</h3>
          <p className="mt-1 text-sm text-slate-400">
            Liên hệ đội ngũ AKAH MOBILE để được giải đáp nhanh chóng.
          </p>
          <Button className="mt-5" onClick={() => navigate("contact")}>
            Liên hệ ngay
          </Button>
        </div>
      </div>
    </PageWrap>
  );
}

function Benefits() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
        {[
          [Truck, "Giao hàng miễn phí", "Đơn từ 500.000₫"],
          [ShieldCheck, "Chính hãng 100%", "Nguồn gốc minh bạch"],
          [RefreshCw, "Đổi mới 30 ngày", "An tâm sử dụng"],
          [Headphones, "Hỗ trợ tận tâm", "Tư vấn 7 ngày/tuần"],
        ].map(([Icon, title, text]) => (
          <div key={title as string} className="flex gap-3">
            <Icon className="shrink-0 text-blue-600" size={25} />
            <div>
              <strong className="text-sm">{title as string}</strong>
              <p className="mt-1 text-xs text-slate-400">{text as string}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatePanel({
  type,
  title,
  text,
  action,
}: {
  type: "empty" | "success" | "error";
  title: string;
  text: string;
  action?: ReactNode;
}) {
  const Icon = type === "success" ? Check : type === "error" ? CircleHelp : Search;
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <span
        className={`grid size-14 place-items-center rounded-full ${type === "success" ? "bg-emerald-100 text-emerald-600" : type === "error" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
      >
        <Icon size={25} />
      </span>
      <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

function Breadcrumb({ items, navigate }: { items: string[]; navigate: (r: string) => void }) {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-slate-400">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={13} />}
          {i === 0 ? (
            <button onClick={() => navigate("home")} className="hover:text-blue-600">
              {item}
            </button>
          ) : (
            <span className={i === items.length - 1 ? "text-slate-600" : ""}>{item}</span>
          )}
        </span>
      ))}
    </div>
  );
}

function PageWrap({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-[600px] max-w-7xl px-4 py-10 md:px-8 md:py-14">{children}</div>
  );
}

function Footer({ navigate }: { navigate: (r: string) => void }) {
  const store = useStorefront();
  const policies = Object.entries(policyContent);
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <button onClick={() => navigate("home")} className="flex items-center gap-2 text-white">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-lg font-black">
              A
            </span>
            <span className="text-left">
              <strong className="block leading-4">AKAH</strong>
              <small className="text-[10px] font-bold tracking-[.18em] text-blue-400">MOBILE</small>
            </span>
          </button>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Hệ thống bán lẻ điện thoại và phụ kiện chính hãng, mang công nghệ tốt đến gần bạn hơn.
          </p>
          <p className="mt-4 text-sm font-bold text-white">Hotline: 1900 6868</p>
        </div>
        <FooterCol
          title="Danh mục"
          links={[
            ["Điện thoại", "phones"],
            ["Phụ kiện", "accessories"],
            ["Thương hiệu", "phones"],
            ["Sản phẩm nổi bật", "home"],
          ]}
          navigate={navigate}
        />
        <FooterCol
          title="Hỗ trợ"
          links={[
            ["Giới thiệu", "about"],
            ["Liên hệ", "contact"],
            ["Tra cứu đơn hàng", "account"],
            ["Tài khoản", "login"],
          ]}
          navigate={navigate}
        />
        <div>
          <h3 className="mb-4 text-sm font-extrabold text-white">Chính sách</h3>
          <div className="grid gap-2">
            {policies.map(([slug, p]) => (
              <button
                key={slug}
                onClick={() => navigate(`policy-${slug}`)}
                className="text-left text-sm text-slate-400 hover:text-white"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row lg:px-8">
          <span>
            © 2025 AKAH MOBILE.
            {!store && " Dữ liệu và giao dịch trong prototype chỉ mang tính minh họa."}
          </span>
          <span>Thiết kế tại Việt Nam</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  navigate,
}: {
  title: string;
  links: string[][];
  navigate: (r: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-extrabold text-white">{title}</h3>
      <div className="grid gap-2">
        {links.map(([label, route]) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className="text-left text-sm text-slate-400 hover:text-white"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
