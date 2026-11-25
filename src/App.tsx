import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  brand: string
  category: 'Điện thoại' | 'Phụ kiện'
  type: string
  price: number
  color: string
  accent: string
  description: string
  specs: string[]
}

type CartItem = Product & { quantity: number }
type Route = { page: string; param?: string }

const products: Product[] = [
  { id: 1, name: 'Astra Phone 15', brand: 'Apple', category: 'Điện thoại', type: 'phone', price: 18990000, color: '#dbeafe', accent: '#2563eb', description: 'Điện thoại mẫu với thiết kế tối giản, màn hình sắc nét và hiệu năng ổn định.', specs: ['Màn hình: 6.1 inch', 'Bộ nhớ: 128 GB', 'Kết nối: 5G', 'Màu mẫu: Xanh'] },
  { id: 2, name: 'Galaxy Nova S', brand: 'Samsung', category: 'Điện thoại', type: 'phone', price: 15990000, color: '#e0e7ff', accent: '#4f46e5', description: 'Thiết bị demo cho trải nghiệm giải trí và làm việc linh hoạt hằng ngày.', specs: ['Màn hình: 6.4 inch', 'Bộ nhớ: 256 GB', 'Kết nối: 5G', 'Màu mẫu: Navy'] },
  { id: 3, name: 'Redmi Air 13', brand: 'Xiaomi', category: 'Điện thoại', type: 'phone', price: 8990000, color: '#ffedd5', accent: '#f97316', description: 'Mẫu điện thoại cân bằng giữa hiệu năng, thiết kế và thời lượng sử dụng.', specs: ['Màn hình: 6.67 inch', 'Bộ nhớ: 128 GB', 'Kết nối: 5G', 'Màu mẫu: Cam'] },
  { id: 4, name: 'Pixel Lite 8', brand: 'Google', category: 'Điện thoại', type: 'phone', price: 12990000, color: '#dcfce7', accent: '#16a34a', description: 'Thiết bị minh họa nhỏ gọn, giao diện tinh giản và camera linh hoạt.', specs: ['Màn hình: 6.2 inch', 'Bộ nhớ: 128 GB', 'Kết nối: 5G', 'Màu mẫu: Xanh lá'] },
  { id: 5, name: 'Tai nghe AirBeat', brand: 'AKAH', category: 'Phụ kiện', type: 'earbuds', price: 1290000, color: '#e0f2fe', accent: '#0284c7', description: 'Tai nghe không dây minh họa, thiết kế gọn nhẹ cho nhu cầu hằng ngày.', specs: ['Kết nối: Bluetooth', 'Cổng sạc: USB-C', 'Kiểu đeo: In-ear', 'Màu mẫu: Trắng'] },
  { id: 6, name: 'Sạc dự phòng Power 10', brand: 'AKAH', category: 'Phụ kiện', type: 'power', price: 690000, color: '#f1f5f9', accent: '#334155', description: 'Pin dự phòng demo với kiểu dáng hiện đại, thuận tiện khi di chuyển.', specs: ['Dung lượng mẫu: 10.000 mAh', 'Cổng: USB-C', 'Số cổng ra: 2', 'Màu mẫu: Đen'] },
  { id: 7, name: 'Cáp Flex USB-C', brand: 'AKAH', category: 'Phụ kiện', type: 'cable', price: 190000, color: '#ede9fe', accent: '#7c3aed', description: 'Cáp kết nối minh họa bền gọn, phù hợp nhiều thiết bị sử dụng USB-C.', specs: ['Độ dài: 1 m', 'Đầu nối: USB-C', 'Chất liệu: Bọc dù', 'Màu mẫu: Tím'] },
  { id: 8, name: 'Ốp lưng Clear Guard', brand: 'AKAH', category: 'Phụ kiện', type: 'case', price: 290000, color: '#fef3c7', accent: '#d97706', description: 'Ốp lưng mẫu trong suốt với viền bo mềm, ôm vừa thiết bị.', specs: ['Chất liệu: TPU', 'Kiểu: Trong suốt', 'Viền: Mềm', 'Màu mẫu: Trong'] },
  { id: 9, name: 'Loa Mini Wave', brand: 'AKAH', category: 'Phụ kiện', type: 'speaker', price: 890000, color: '#fee2e2', accent: '#dc2626', description: 'Loa Bluetooth minh họa nhỏ gọn cho góc làm việc và chuyến đi ngắn.', specs: ['Kết nối: Bluetooth', 'Cổng sạc: USB-C', 'Kiểu: Di động', 'Màu mẫu: Đỏ'] },
  { id: 10, name: 'Đồng hồ Active One', brand: 'AKAH', category: 'Phụ kiện', type: 'watch', price: 1990000, color: '#d1fae5', accent: '#059669', description: 'Đồng hồ thông minh demo theo dõi thông báo và hoạt động cơ bản.', specs: ['Màn hình: 1.8 inch', 'Kết nối: Bluetooth', 'Dây: Silicone', 'Màu mẫu: Xanh'] },
]

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + '₫'

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" /></>,
    minus: <><path d="M5 12h14" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    phone: <><path d="M7 3h10v18H7zM10 18h4" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    map: <><path d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" /><circle cx="12" cy="10" r="2" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  const isPhone = product.type === 'phone'
  return (
    <div className={`product-art ${large ? 'product-art-large' : ''}`} style={{ background: `linear-gradient(145deg, ${product.color}, #fff)` }}>
      {isPhone && <div className="device-phone" style={{ borderColor: product.accent }}><div className="camera-group"><i /><i /><i /></div><span style={{ background: product.accent }} /></div>}
      {product.type === 'earbuds' && <div className="earbuds"><i /><i /><span /></div>}
      {product.type === 'power' && <div className="powerbank" style={{ background: product.accent }}><i /><small>10K</small></div>}
      {product.type === 'cable' && <div className="cable" style={{ borderColor: product.accent }}><i /><i /></div>}
      {product.type === 'case' && <div className="phone-case" style={{ borderColor: product.accent }}><i /><i /></div>}
      {product.type === 'speaker' && <div className="speaker" style={{ background: product.accent }}><i /></div>}
      {product.type === 'watch' && <div className="watch"><i style={{ borderColor: product.accent }}><span /></i></div>}
      <div className="art-shadow" />
    </div>
  )
}

function App() {
  const [route, setRoute] = useState<Route>({ page: 'home' })
  const [mobileMenu, setMobileMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const onPop = () => setRoute(readRoute())
    setRoute(readRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (page: string, param?: string) => {
    const url = param ? `/${page}/${param}` : page === 'home' ? '/' : `/${page}`
    history.pushState({}, '', url)
    setRoute({ page, param })
    setMobileMenu(false)
    setSearchOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: Product) => {
    setCart(current => {
      const exists = current.find(item => item.id === product.id)
      return exists ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    })
    setNotice(`Đã thêm ${product.name} vào giỏ`)
    window.setTimeout(() => setNotice(''), 2300)
  }

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    return products.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)).slice(0, 5)
  }, [search])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header navigate={navigate} route={route} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} search={search} setSearch={setSearch} searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchResults={searchResults} cartCount={cartCount} />
      <main>
        {route.page === 'home' && <Home navigate={navigate} addToCart={addToCart} />}
        {route.page === 'store' && <Store navigate={navigate} addToCart={addToCart} initialQuery={route.param ? decodeURIComponent(route.param) : ''} />}
        {route.page === 'category' && <Store navigate={navigate} addToCart={addToCart} initialCategory={route.param === 'phu-kien' ? 'Phụ kiện' : route.param === 'dien-thoai' ? 'Điện thoại' : undefined} />}
        {route.page === 'product' && <ProductDetail product={products.find(p => String(p.id) === route.param) || products[0]} navigate={navigate} addToCart={addToCart} />}
        {route.page === 'cart' && <Cart cart={cart} setCart={setCart} navigate={navigate} />}
        {route.page === 'checkout' && <Checkout cart={cart} setCart={setCart} navigate={navigate} />}
        {route.page === 'login' && <Auth mode="login" navigate={navigate} />}
        {route.page === 'register' && <Auth mode="register" navigate={navigate} />}
        {route.page === 'account' && <Account navigate={navigate} />}
        {route.page === 'about' && <About />}
        {route.page === 'contact' && <Contact />}
        {route.page === 'policy' && <Policy />}
        {!['home','store','category','product','cart','checkout','login','register','account','about','contact','policy'].includes(route.page) && <NotFound navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
      {notice && <div className="toast"><span><Icon name="check" size={16} /></span>{notice}</div>}
    </div>
  )
}

function readRoute(): Route {
  const parts = window.location.pathname.split('/').filter(Boolean)
  return { page: parts[0] || 'home', param: parts.slice(1).join('/') || undefined }
}

function Header({ navigate, route, mobileMenu, setMobileMenu, search, setSearch, searchOpen, setSearchOpen, searchResults, cartCount }: any) {
  const links = [
    ['Trang chủ', 'home'], ['Điện thoại', 'category', 'dien-thoai'], ['Phụ kiện', 'category', 'phu-kien'],
    ['Cửa hàng', 'store'], ['Giới thiệu', 'about'], ['Liên hệ', 'contact'],
  ]
  return <header className="site-header">
    <div className="header-main container">
      <button className="hamburger icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Mở menu"><Icon name={mobileMenu ? 'close' : 'menu'} size={24} /></button>
      <button className="logo" onClick={() => navigate('home')}><span className="logo-mark">A</span><span>AKAH <b>MOBILE</b></span></button>
      <nav className={mobileMenu ? 'nav open' : 'nav'}>
        {links.map(([label, page, param]) => <button key={label} className={route.page === page && (!param || route.param === param) ? 'active' : ''} onClick={() => navigate(page, param)}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button onClick={() => navigate('account')}><Icon name="user" /><span>Tài khoản</span></button>
        <button onClick={() => navigate('cart')} className="cart-link"><Icon name="bag" /><span>Giỏ hàng</span>{cartCount > 0 && <i>{cartCount}</i>}</button>
      </div>
    </div>
    <div className="search-row">
      <div className="search-wrap">
        <Icon name="search" size={21} />
        <input aria-label="Tìm kiếm sản phẩm" placeholder="Tìm điện thoại, phụ kiện..." value={search} onFocus={() => setSearchOpen(true)} onChange={e => { setSearch(e.target.value); setSearchOpen(true) }} onKeyDown={e => { if (e.key === 'Enter' && search.trim()) navigate('store', encodeURIComponent(search.trim())) }} />
        {search && <button className="clear-search" aria-label="Xóa tìm kiếm" onClick={() => setSearch('')}><Icon name="close" size={17} /></button>}
        {searchOpen && search.trim() && <div className="search-results">
          <div className="search-result-head"><span>Kết quả gợi ý</span><button onClick={() => navigate('store', encodeURIComponent(search.trim()))}>Xem tất cả</button></div>
          {searchResults.length ? searchResults.map((p: Product) => <button className="search-result" key={p.id} onClick={() => navigate('product', String(p.id))}><div className="result-thumb"><ProductArt product={p} /></div><span><b>{p.name}</b><small>{p.category} · {p.brand}</small></span><strong>{formatPrice(p.price)}</strong></button>) : <div className="no-search">Không tìm thấy sản phẩm phù hợp.</div>}
        </div>}
      </div>
    </div>
    <div className="announcement"><span>Trải nghiệm mua sắm sản phẩm công nghệ thuận tiện tại AKAH MOBILE</span></div>
  </header>
}

function Home({ navigate, addToCart }: any) {
  const categories = [
    { name: 'Apple', slug: 'Apple', product: products[0] },
    { name: 'Samsung', slug: 'Samsung', product: products[1] },
    { name: 'Xiaomi', slug: 'Xiaomi', product: products[2] },
    { name: 'Phụ kiện', slug: 'Phụ kiện', product: products[4] },
  ]
  return <>
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">CÔNG NGHỆ TRONG TẦM TAY</span>
          <h1>Chọn thiết bị phù hợp với <em>nhịp sống của bạn</em></h1>
          <p>Khám phá điện thoại và phụ kiện công nghệ qua trải nghiệm mua sắm rõ ràng, dễ dùng.</p>
          <button className="primary-btn" onClick={() => navigate('store')}>Khám phá sản phẩm <Icon name="arrow" /></button>
          <div className="hero-notes"><span><Icon name="shield" size={18} /> Thông tin minh bạch</span><span><Icon name="map" size={18} /> Hỗ trợ dễ dàng</span></div>
        </div>
        <div className="hero-visual" aria-label="Minh họa điện thoại công nghệ">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="hero-phone back"><span /></div>
          <div className="hero-phone front"><div className="hero-screen"><i>AKAH</i><b>mobile</b></div></div>
          <div className="floating-chip chip-one">5G</div><div className="floating-chip chip-two"><Icon name="phone" size={20} /></div>
        </div>
      </div>
    </section>
    <section className="section container">
      <SectionTitle eyebrow="KHÁM PHÁ NHANH" title="Danh mục nổi bật" action="Xem tất cả" onClick={() => navigate('store')} />
      <div className="category-grid">
        {categories.map(cat => <button className="category-card" key={cat.name} onClick={() => cat.name === 'Phụ kiện' ? navigate('category', 'phu-kien') : navigate('store', encodeURIComponent(cat.slug))}>
          <ProductArt product={cat.product} />
          <span>{cat.name}<Icon name="chevron" size={18} /></span>
        </button>)}
      </div>
    </section>
    <section className="section section-soft">
      <div className="container">
        <SectionTitle eyebrow="GỢI Ý CHO BẠN" title="Sản phẩm nổi bật" subtitle="Dữ liệu minh họa để bạn hình dung trải nghiệm cửa hàng." action="Xem cửa hàng" onClick={() => navigate('store')} />
        <div className="product-grid">{products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />)}</div>
      </div>
    </section>
    <section className="benefits container">
      <div><span><Icon name="phone" /></span><b>Sản phẩm rõ ràng</b><p>Thông tin được trình bày dễ xem.</p></div>
      <div><span><Icon name="shield" /></span><b>Mua sắm an tâm</b><p>Quy trình đặt hàng minh bạch.</p></div>
      <div><span><Icon name="map" /></span><b>Hỗ trợ thuận tiện</b><p>Thông tin liên hệ tập trung.</p></div>
    </section>
  </>
}

function SectionTitle({ eyebrow, title, subtitle, action, onClick }: any) {
  return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button onClick={onClick}>{action}<Icon name="arrow" size={18} /></button>}</div>
}

function ProductCard({ product, navigate, addToCart }: { product: Product; navigate: any; addToCart: any }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => navigate('product', String(product.id))}><ProductArt product={product} /></button>
    <div className="product-info">
      <span className="product-type">{product.category} · {product.brand}</span>
      <button className="product-name" onClick={() => navigate('product', String(product.id))}>{product.name}</button>
      <strong>{formatPrice(product.price)}</strong>
      <div className="product-actions"><button className="outline-btn" onClick={() => navigate('product', String(product.id))}>Xem</button><button className="add-btn" onClick={() => addToCart(product)}><Icon name="bag" size={18} /> Thêm giỏ</button></div>
    </div>
  </article>
}

function Store({ navigate, addToCart, initialQuery = '', initialCategory }: any) {
  const [query, setQuery] = useState(initialQuery)
  const [brand, setBrand] = useState('Tất cả')
  const [category, setCategory] = useState(initialCategory || 'Tất cả')
  const [price, setPrice] = useState('Tất cả')
  const [filtersOpen, setFiltersOpen] = useState(false)
  useEffect(() => { setQuery(initialQuery); if (initialCategory) setCategory(initialCategory) }, [initialQuery, initialCategory])
  const filtered = products.filter(p => {
    const matchesQuery = `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    const matchesBrand = brand === 'Tất cả' || p.brand === brand
    const matchesCategory = category === 'Tất cả' || p.category === category
    const matchesPrice = price === 'Tất cả' || (price === 'Dưới 1 triệu' && p.price < 1000000) || (price === '1–10 triệu' && p.price >= 1000000 && p.price <= 10000000) || (price === 'Trên 10 triệu' && p.price > 10000000)
    return matchesQuery && matchesBrand && matchesCategory && matchesPrice
  })
  const reset = () => { setQuery(''); setBrand('Tất cả'); setCategory('Tất cả'); setPrice('Tất cả') }
  return <div className="page container">
    <PageHeader label="CỬA HÀNG" title={initialCategory || 'Tất cả sản phẩm'} text="Khám phá danh sách sản phẩm mẫu và lọc theo nhu cầu của bạn." />
    <div className="mobile-filter-row"><button className="outline-btn" onClick={() => setFiltersOpen(!filtersOpen)}>Bộ lọc {filtersOpen ? '−' : '+'}</button><span>{filtered.length} sản phẩm</span></div>
    <div className="store-layout">
      <aside className={filtersOpen ? 'filters open' : 'filters'}>
        <div className="filter-title"><b>Bộ lọc</b><button onClick={reset}>Đặt lại</button></div>
        <label>Tìm trong cửa hàng<div className="filter-search"><Icon name="search" size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Nhập tên sản phẩm" /></div></label>
        <FilterGroup title="Danh mục" options={['Tất cả', 'Điện thoại', 'Phụ kiện']} value={category} setValue={setCategory} />
        <FilterGroup title="Thương hiệu" options={['Tất cả', 'Apple', 'Samsung', 'Xiaomi', 'Google', 'AKAH']} value={brand} setValue={setBrand} />
        <FilterGroup title="Khoảng giá" options={['Tất cả', 'Dưới 1 triệu', '1–10 triệu', 'Trên 10 triệu']} value={price} setValue={setPrice} />
      </aside>
      <div className="store-products">
        <div className="result-line"><span>Hiển thị <b>{filtered.length}</b> sản phẩm</span><span>Sắp xếp: Mặc định</span></div>
        {filtered.length ? <div className="product-grid store-grid">{filtered.map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />)}</div> : <EmptyState title="Không có kết quả" text="Thử thay đổi từ khóa hoặc bỏ bớt bộ lọc để xem thêm sản phẩm." action="Xóa bộ lọc" onClick={reset} />}
      </div>
    </div>
  </div>
}

function FilterGroup({ title, options, value, setValue }: any) {
  return <fieldset><legend>{title}</legend>{options.map((option: string) => <label className="radio" key={option}><input type="radio" name={title} checked={value === option} onChange={() => setValue(option)} /><span />{option}</label>)}</fieldset>
}

function ProductDetail({ product, navigate, addToCart }: { product: Product; navigate: any; addToCart: any }) {
  const [qty, setQty] = useState(1)
  return <div className="page container">
    <div className="breadcrumb"><button onClick={() => navigate('home')}>Trang chủ</button><i>/</i><button onClick={() => navigate('store')}>Cửa hàng</button><i>/</i><span>{product.name}</span></div>
    <div className="product-detail">
      <div className="detail-gallery"><ProductArt product={product} large /><span>Hình ảnh minh họa</span></div>
      <div className="detail-info">
        <span className="eyebrow">{product.category} · {product.brand}</span><h1>{product.name}</h1><p className="detail-description">{product.description}</p><strong className="detail-price">{formatPrice(product.price)}</strong>
        <div className="detail-divider" />
        <div className="quantity-label">Số lượng</div><div className="detail-buy"><Quantity value={qty} onChange={setQty} /><button className="primary-btn" onClick={() => { for (let i = 0; i < qty; i++) addToCart(product) }}><Icon name="bag" /> Thêm vào giỏ</button></div>
        <p className="demo-note">Đây là sản phẩm và mức giá minh họa, không phát sinh giao dịch thật.</p>
      </div>
    </div>
    <section className="spec-section"><h2>Thông số sản phẩm</h2><div>{product.specs.map((spec, i) => { const [label, value] = spec.split(': '); return <p key={spec}><span>{label}</span><b>{value}</b></p> })}</div></section>
    <section className="section related"><SectionTitle eyebrow="CÓ THỂ BẠN QUAN TÂM" title="Sản phẩm liên quan" /><div className="product-grid">{products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />)}</div></section>
  </div>
}

function Quantity({ value, onChange }: any) {
  return <div className="quantity"><button onClick={() => onChange(Math.max(1, value - 1))}><Icon name="minus" size={15} /></button><span>{value}</span><button onClick={() => onChange(value + 1)}><Icon name="plus" size={15} /></button></div>
}

function Cart({ cart, setCart, navigate }: { cart: CartItem[]; setCart: any; navigate: any }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const update = (id: number, quantity: number) => setCart((items: CartItem[]) => items.map(i => i.id === id ? { ...i, quantity } : i))
  if (!cart.length) return <div className="page container"><PageHeader label="GIỎ HÀNG" title="Giỏ hàng của bạn" /><EmptyState icon="bag" title="Giỏ hàng đang trống" text="Bạn chưa thêm sản phẩm nào. Hãy khám phá cửa hàng để bắt đầu." action="Khám phá sản phẩm" onClick={() => navigate('store')} /></div>
  return <div className="page container"><PageHeader label="GIỎ HÀNG" title="Giỏ hàng của bạn" text={`${cart.length} sản phẩm trong giỏ`} />
    <div className="cart-layout"><div className="cart-list">{cart.map(item => <article className="cart-item" key={item.id}><div className="cart-thumb"><ProductArt product={item} /></div><div className="cart-item-info"><span>{item.category} · {item.brand}</span><button onClick={() => navigate('product', String(item.id))}>{item.name}</button><strong>{formatPrice(item.price)}</strong></div><Quantity value={item.quantity} onChange={(q: number) => update(item.id, q)} /><b className="line-price">{formatPrice(item.price * item.quantity)}</b><button className="remove" onClick={() => setCart((items: CartItem[]) => items.filter(i => i.id !== item.id))} aria-label="Xóa sản phẩm"><Icon name="trash" /></button></article>)}</div>
    <aside className="order-summary"><h2>Tóm tắt đơn hàng</h2><p><span>Tạm tính</span><b>{formatPrice(subtotal)}</b></p><p><span>Phí vận chuyển</span><span>Tính ở bước sau</span></p><div /><p className="total"><span>Tổng cộng</span><b>{formatPrice(subtotal)}</b></p><button className="primary-btn full" onClick={() => navigate('checkout')}>Tiến hành thanh toán <Icon name="arrow" /></button><button className="continue" onClick={() => navigate('store')}>Tiếp tục mua sắm</button></aside></div>
  </div>
}

function Checkout({ cart, setCart, navigate }: { cart: CartItem[]; setCart: any; navigate: any }) {
  const [method, setMethod] = useState('cod')
  const [done, setDone] = useState(false)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); setCart([]); window.scrollTo(0, 0) }
  if (done) return <div className="page container narrow"><div className="success-state"><span><Icon name="check" size={34} /></span><small>ĐẶT HÀNG DEMO THÀNH CÔNG</small><h1>Cảm ơn bạn đã trải nghiệm</h1><p>Đơn hàng mẫu đã được ghi nhận trên giao diện. Không có thanh toán hoặc giao dịch thật nào được thực hiện.</p><button className="primary-btn" onClick={() => navigate('home')}>Về trang chủ <Icon name="arrow" /></button></div></div>
  if (!cart.length) return <div className="page container"><EmptyState title="Chưa có sản phẩm để thanh toán" text="Vui lòng thêm sản phẩm vào giỏ trước khi tiếp tục." action="Đến cửa hàng" onClick={() => navigate('store')} /></div>
  return <div className="page container"><PageHeader label="THANH TOÁN DEMO" title="Hoàn tất đơn hàng" text="Thông tin dưới đây chỉ phục vụ trải nghiệm prototype." />
    <form className="checkout-layout" onSubmit={submit}><div className="checkout-form"><section><h2>Thông tin nhận hàng</h2><div className="form-grid"><label>Họ và tên<input required placeholder="Nguyễn Văn A" /></label><label>Số điện thoại<input required type="tel" placeholder="Nhập số điện thoại" /></label><label className="wide">Email<input required type="email" placeholder="email@example.com" /></label><label className="wide">Địa chỉ nhận hàng<input required placeholder="Số nhà, tên đường, phường/xã..." /></label><label className="wide">Ghi chú<textarea placeholder="Ghi chú cho đơn hàng (không bắt buộc)" /></label></div></section>
      <section><h2>Phương thức thanh toán</h2><label className={`payment ${method === 'cod' ? 'selected' : ''}`}><input type="radio" checked={method === 'cod'} onChange={() => setMethod('cod')} /><span><b>Thanh toán khi nhận hàng (COD)</b><small>Thanh toán demo khi nhận sản phẩm.</small></span></label><label className={`payment ${method === 'bank' ? 'selected' : ''}`}><input type="radio" checked={method === 'bank'} onChange={() => setMethod('bank')} /><span><b>Chuyển khoản ngân hàng</b><small>Thông tin chuyển khoản chỉ hiển thị minh họa.</small></span></label>{method === 'bank' && <div className="bank-demo"><b>THÔNG TIN DEMO</b><p>Ngân hàng: Đang cập nhật</p><p>Số tài khoản: Đang cập nhật</p><p>Nội dung: AKAH + Số điện thoại</p></div>}</section></div>
      <aside className="order-summary checkout-summary"><h2>Đơn hàng ({cart.length})</h2>{cart.map(item => <div className="checkout-item" key={item.id}><div><ProductArt product={item} /><i>{item.quantity}</i></div><span>{item.name}</span><b>{formatPrice(item.price * item.quantity)}</b></div>)}<div /><p><span>Tạm tính</span><b>{formatPrice(total)}</b></p><p><span>Phí vận chuyển</span><span>Đang cập nhật</span></p><div /><p className="total"><span>Tổng cộng</span><b>{formatPrice(total)}</b></p><button className="primary-btn full" type="submit">Đặt hàng demo <Icon name="check" /></button><small className="checkout-disclaimer">Bằng cách tiếp tục, bạn xác nhận đây chỉ là prototype và không phát sinh giao dịch thật.</small></aside></form>
  </div>
}

function Auth({ mode, navigate }: any) {
  const isLogin = mode === 'login'
  const [submitted, setSubmitted] = useState(false)
  return <div className="auth-page"><div className="auth-side"><span className="logo-mark">A</span><h2>Công nghệ phù hợp,<br />trải nghiệm dễ dàng.</h2><p>Không gian mua sắm hiện đại dành cho điện thoại và phụ kiện.</p></div><div className="auth-card">
    <button className="back-home" onClick={() => navigate('home')}>← Về trang chủ</button>
    {submitted ? <div className="auth-success"><span><Icon name="check" /></span><h1>{isLogin ? 'Đăng nhập demo thành công' : 'Đăng ký demo thành công'}</h1><p>Đây là trạng thái minh họa, không có tài khoản thật được tạo.</p><button className="primary-btn" onClick={() => navigate('account')}>Đến tài khoản</button></div> : <><small>TÀI KHOẢN AKAH</small><h1>{isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h1><p>{isLogin ? 'Đăng nhập để xem thông tin tài khoản demo.' : 'Điền thông tin để trải nghiệm luồng đăng ký.'}</p><form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>{!isLogin && <label>Họ và tên<input required placeholder="Nhập họ và tên" /></label>}<label>Email<input required type="email" placeholder="email@example.com" /></label><label>Mật khẩu<input required type="password" placeholder="Ít nhất 6 ký tự" minLength={6} /></label><button className="primary-btn full">{isLogin ? 'Đăng nhập' : 'Đăng ký'} <Icon name="arrow" /></button></form><div className="auth-switch">{isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} <button onClick={() => navigate(isLogin ? 'register' : 'login')}>{isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}</button></div></>}
  </div></div>
}

function Account({ navigate }: any) {
  return <div className="page container"><PageHeader label="TÀI KHOẢN" title="Xin chào, Khách hàng" text="Khu vực tài khoản mẫu để minh họa trải nghiệm sau đăng nhập." /><div className="account-grid"><aside><div className="avatar">AK</div><b>Tài khoản demo</b><span>demo@akahmobile.vn</span><nav><button className="active">Tổng quan</button><button>Đơn hàng</button><button>Địa chỉ</button><button onClick={() => navigate('login')}>Đăng xuất</button></nav></aside><div className="account-content"><h2>Tổng quan tài khoản</h2><div className="account-cards"><article><span>Đơn hàng</span><b>0</b><small>Chưa có đơn hàng</small></article><article><span>Địa chỉ</span><b>0</b><small>Chưa lưu địa chỉ</small></article></div><div className="account-note"><Icon name="shield" /><div><b>Trạng thái tài khoản demo</b><p>Dữ liệu tại đây chỉ để minh họa giao diện và không được lưu trữ.</p></div></div></div></div></div>
}

function About() {
  return <><div className="about-hero"><div className="container"><span>VỀ AKAH MOBILE</span><h1>Công nghệ gần gũi hơn<br />với mọi người</h1><p>AKAH MOBILE hướng đến một trải nghiệm mua sắm điện thoại và phụ kiện rõ ràng, hiện đại và dễ tiếp cận.</p></div></div><div className="page container"><section className="story"><div><span>CÂU CHUYỆN CỦA CHÚNG TÔI</span><h2>Một cửa hàng công nghệ được xây dựng từ sự đơn giản</h2></div><div><p>Chúng tôi tin rằng việc tìm một thiết bị phù hợp không nên phức tạp. Vì vậy, AKAH MOBILE tập trung vào cách trình bày thông tin trực quan và hành trình mua sắm thuận tiện.</p><p>Website hiện là prototype với dữ liệu minh họa. Thông tin chính thức về doanh nghiệp và cửa hàng sẽ được cập nhật sau.</p></div></section><section className="values"><article><span>01</span><h3>Rõ ràng</h3><p>Thông tin sản phẩm có cấu trúc, dễ đọc và dễ so sánh.</p></article><article><span>02</span><h3>Thuận tiện</h3><p>Thiết kế linh hoạt trên điện thoại, máy tính bảng và desktop.</p></article><article><span>03</span><h3>Tận tâm</h3><p>Đặt nhu cầu thực tế của khách hàng vào trung tâm trải nghiệm.</p></article></section></div></>
}

function Contact() {
  const [sent, setSent] = useState(false)
  return <div className="page container"><PageHeader label="LIÊN HỆ" title="Chúng tôi có thể hỗ trợ gì?" text="Gửi lời nhắn cho AKAH MOBILE. Thông tin liên hệ chính thức sẽ được cập nhật sau." /><div className="contact-layout"><div className="contact-info"><h2>Thông tin liên hệ</h2><div><span><Icon name="map" /></span><p><b>Địa chỉ</b>Đang cập nhật</p></div><div><span><Icon name="phone" /></span><p><b>Điện thoại</b>Đang cập nhật</p></div><div><span>@</span><p><b>Email</b>Đang cập nhật</p></div><small>Thời gian làm việc: Đang cập nhật</small></div><div className="contact-form">{sent ? <div className="message-sent"><span><Icon name="check" /></span><h2>Đã nhận lời nhắn demo</h2><p>Biểu mẫu chỉ minh họa giao diện, dữ liệu chưa được gửi hoặc lưu trữ.</p><button className="outline-btn" onClick={() => setSent(false)}>Gửi lời nhắn khác</button></div> : <form onSubmit={e => { e.preventDefault(); setSent(true) }}><h2>Gửi lời nhắn</h2><div className="form-grid"><label>Họ và tên<input required placeholder="Nhập họ và tên" /></label><label>Số điện thoại<input required placeholder="Nhập số điện thoại" /></label><label className="wide">Email<input type="email" required placeholder="email@example.com" /></label><label className="wide">Nội dung<textarea required placeholder="Bạn cần AKAH MOBILE hỗ trợ điều gì?" /></label></div><button className="primary-btn">Gửi lời nhắn <Icon name="arrow" /></button></form>}</div></div></div>
}

function Policy() {
  return <div className="page container policy-page"><PageHeader label="THÔNG TIN" title="Chính sách & điều khoản" text="Nội dung dưới đây là khung minh họa và sẽ được cập nhật theo chính sách chính thức." /><div className="policy-layout"><nav><a href="#privacy">Bảo mật thông tin</a><a href="#order">Đặt hàng</a><a href="#payment">Thanh toán</a><a href="#support">Hỗ trợ</a></nav><article><section id="privacy"><h2>1. Bảo mật thông tin</h2><p>AKAH MOBILE tôn trọng quyền riêng tư của người dùng. Chính sách thu thập, sử dụng và bảo vệ dữ liệu chính thức đang được cập nhật.</p></section><section id="order"><h2>2. Chính sách đặt hàng</h2><p>Website hiện là prototype. Mọi sản phẩm, mức giá và thao tác đặt hàng đều là dữ liệu minh họa, không tạo đơn hàng hoặc nghĩa vụ mua bán thật.</p></section><section id="payment"><h2>3. Phương thức thanh toán</h2><p>Luồng COD và chuyển khoản được hiển thị để mô phỏng trải nghiệm. Hệ thống không thu tiền và không kết nối cổng thanh toán.</p></section><section id="support"><h2>4. Hỗ trợ khách hàng</h2><p>Thông tin về bảo hành, đổi trả, giao nhận và hỗ trợ sau bán hàng đang được cập nhật. Vui lòng xem lại khi website chính thức hoạt động.</p></section><p className="policy-updated">Cập nhật lần cuối: Đang cập nhật</p></article></div></div>
}

function PageHeader({ label, title, text }: any) {
  return <div className="page-header"><span>{label}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>
}

function EmptyState({ icon = 'search', title, text, action, onClick }: any) {
  return <div className="empty-state"><span><Icon name={icon} size={30} /></span><h2>{title}</h2><p>{text}</p><button className="primary-btn" onClick={onClick}>{action}<Icon name="arrow" /></button></div>
}

function NotFound({ navigate }: any) {
  return <div className="page container"><EmptyState title="Không tìm thấy trang" text="Trang bạn đang tìm không tồn tại hoặc đã được thay đổi." action="Về trang chủ" onClick={() => navigate('home')} /></div>
}

function Footer({ navigate }: any) {
  return <footer><div className="container footer-grid"><div><button className="logo footer-logo" onClick={() => navigate('home')}><span className="logo-mark">A</span><span>AKAH <b>MOBILE</b></span></button><p>Không gian mua sắm điện thoại và phụ kiện công nghệ hiện đại, rõ ràng và dễ dùng.</p></div><div><h3>Liên hệ</h3><p>Địa chỉ: Đang cập nhật</p><p>Điện thoại: Đang cập nhật</p><p>Email: Đang cập nhật</p></div><div><h3>Liên kết nhanh</h3><button onClick={() => navigate('store')}>Cửa hàng</button><button onClick={() => navigate('about')}>Giới thiệu</button><button onClick={() => navigate('contact')}>Liên hệ</button><button onClick={() => navigate('policy')}>Chính sách</button></div></div><div className="copyright"><div className="container"><span>© 2025 AKAH MOBILE. Giao diện prototype.</span><span>Không phát sinh giao dịch thật.</span></div></div></footer>
}

export default App
