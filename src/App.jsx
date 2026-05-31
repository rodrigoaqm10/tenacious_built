import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  CreditCard,
  Instagram,
  Languages,
  Mail,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { contentByLanguage } from "./data/siteContent";
import { useShopifyProducts } from "./lib/useShopifyProducts";
import { createCheckout, isShopifyConfigured, shopifyFetch } from "./lib/shopify";
import { createCustomer, loginCustomer, getCustomerInfo, logout, isLoggedIn } from "./lib/auth";
import { subscribeNewsletter } from "./lib/newsletter";

function Header({
  content,
  language,
  setLanguage,
  activePanel,
  setActivePanel,
  cartCount,
  setView,
  hidden,
}) {
  const isMenuOpen = activePanel === "menu";

  function togglePanel(panel) {
    setActivePanel(activePanel === panel ? null : panel);
  }

  return (
    <header className={`site-header${hidden ? " header-hidden" : ""}`}>
      <div className="announcement">
        <div>
          <span>{content.brand.announcement}</span>
          <span>✦</span>
          <span>{content.brand.announcement}</span>
          <span>✦</span>
          <span>{content.brand.announcement}</span>
          <span>✦</span>
          <span>{content.brand.announcement}</span>
          <span>✦</span>
        </div>
      </div>
      <div className="nav-shell">
        <a
          className="brand"
          href="#top"
          aria-label="Tenacious inicio"
          onClick={(event) => {
            event.preventDefault();
            setView("home");
            setActivePanel(null);
            window.scrollTo(0, 0);
          }}
        >
          <span className="brand-mark">
            <img src={content.brand.logo} alt="" />
          </span>
          <span>{content.brand.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Principal">
          {content.nav.map((item) => (
            <a
              key={item.href || item.view}
              href={item.href || "#catalog"}
              onClick={(event) => {
                if (item.view) {
                  event.preventDefault();
                  setView(item.view);
                  setActivePanel(null);
                } else {
                  setView("home");
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" aria-label={content.ui.search} onClick={() => togglePanel("search")}>
            <Search size={18} />
          </button>
          <button className={`account-btn${isLoggedIn() ? " logged-in" : ""}`} type="button" aria-label={content.ui.account} onClick={() => togglePanel("account")}>
            {isLoggedIn() ? <span className="user-initials">{(localStorage.getItem("shopify_customer_name") || "U")[0]}</span> : <User size={18} />}
          </button>
          <button className="cart-button" type="button" aria-label={content.ui.cart} onClick={() => togglePanel("cart")}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button type="button" aria-label={content.ui.language} onClick={() => setLanguage(language === "es" ? "en" : "es")}>
            <Languages size={18} />
          </button>
          <button className="mobile-menu" type="button" aria-label={content.ui.menu} onClick={() => togglePanel("menu")}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Navegación móvil">
          <button
            className="mobile-search-btn"
            type="button"
            onClick={() => { setActivePanel("search"); }}
          >
            <Search size={16} />
            <span>{content.ui.searchPlaceholder}</span>
          </button>
          {content.nav.map((item) => (
            <a
              key={item.href || item.view}
              href={item.href || "#catalog"}
              onClick={(event) => {
                if (item.view) {
                  event.preventDefault();
                  setView(item.view);
                } else {
                  setView("home");
                }
                setActivePanel(null);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function AccountPanel({ content, setActivePanel }) {
  const [mode, setMode] = useState(isLoggedIn() ? "loading" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      getCustomerInfo().then((info) => {
        if (info) {
          setCustomer(info);
          setMode("profile");
          localStorage.setItem("shopify_customer_name", info.firstName || info.email || "U");
        } else {
          setMode("signin");
        }
      });
    }
  }, []);

  async function handleSignIn() {
    setError("");
    setLoading(true);
    try {
      await loginCustomer({ email, password });
      const info = await getCustomerInfo();
      setCustomer(info);
      setMode("profile");
      setSuccess("Sesión iniciada correctamente.");
      if (info) localStorage.setItem("shopify_customer_name", info.firstName || info.email || "U");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleCreate() {
    setError("");
    setLoading(true);
    try {
      const [firstName, ...lastParts] = name.split(" ");
      const lastName = lastParts.join(" ") || "";
      await createCustomer({ firstName, lastName, email, password });
      await loginCustomer({ email, password });
      const info = await getCustomerInfo();
      setCustomer(info);
      setMode("profile");
      setSuccess("Cuenta creada exitosamente.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  function handleLogout() {
    logout();
    localStorage.removeItem("shopify_customer_name");
    setCustomer(null);
    setMode("signin");
    setSuccess("");
  }

  if (mode === "loading") {
    return <div className="panel-body"><p style={{ textAlign: "center", color: "var(--muted)" }}>Cargando...</p></div>;
  }

  if (mode === "profile" && customer) {
    function viewOrderDetail(order) {
      window.__selectedOrder = order;
      window.dispatchEvent(new Event("viewOrder"));
      setActivePanel(null);
    }

    return (
      <div className="panel-body">
        <div className="account-greeting">
          <strong>Hola, {customer.firstName || "Cliente"}</strong>
          <span>{customer.email}</span>
        </div>
        {customer.orders?.nodes?.length > 0 ? (
          <div className="account-orders">
            <h3>Mis pedidos</h3>
            {customer.orders.nodes.map((order) => (
              <button className="order-line" key={order.id} type="button" onClick={() => viewOrderDetail(order)}>
                <div>
                  <strong>#{order.orderNumber}</strong>
                  <span className="order-date">{new Date(order.processedAt).toLocaleDateString("es-CL")}</span>
                </div>
                <div>
                  <span className="order-status">
                    {order.fulfillmentStatus === "FULFILLED" ? "✓ Despachado" : "● En preparación"}
                  </span>
                  <strong>${Math.round(Number(order.totalPrice.amount)).toLocaleString("es-CL")}</strong>
                </div>
                <span className="order-arrow">Ver detalle →</span>
              </button>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--muted)" }}>Aún no tienes pedidos.</p>
        )}
        <button className="button secondary" type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="panel-body">
      <p>{content.ui.accountCopy}</p>
      {mode === "create" && (
        <label className="auth-field">
          <span>{content.ui.fullName}</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="María López" />
        </label>
      )}
      <label className="auth-field">
        <span>{content.ui.email}</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
      </label>
      <label className="auth-field">
        <span>{content.ui.password}</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </label>
      {error && <p className="option-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <button
        className="button primary"
        type="button"
        onClick={mode === "create" ? handleCreate : handleSignIn}
        disabled={loading}
      >
        {loading ? "Cargando..." : mode === "create" ? content.ui.createAccountTitle : content.ui.signIn}
        <ArrowRight size={18} />
      </button>
      <button
        className="text-button"
        type="button"
        onClick={() => { setMode(mode === "create" ? "signin" : "create"); setError(""); }}
      >
        {mode === "create" ? content.ui.signIn : content.ui.createAccount}
      </button>
    </div>
  );
}

function ActionPanel({ content, activePanel, setActivePanel, cart, removeFromCart, setView, openOptions, setCatalogFilter }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      if (!isLoggedIn()) return [];
      const saved = localStorage.getItem("tenacious_recent_searches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function saveSearch(term) {
    if (!isLoggedIn() || !term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("tenacious_recent_searches", JSON.stringify(updated));
  }

  function getMatchedCategory(q) {
    if (!q) return null;
    const lower = q.toLowerCase();
    const categories = [...new Set(content.products.map((p) => p.category))];
    return categories.find((cat) => cat.toLowerCase().includes(lower) || lower.includes(cat.toLowerCase()));
  }

  if (!activePanel || activePanel === "menu") {
    return null;
  }

  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="panel-overlay" onClick={() => setActivePanel(null)} aria-hidden="true" />
      <aside className="action-panel" aria-live="polite">
        <div className="panel-header">
          <h2>
            {activePanel === "search" && content.ui.search}
          {activePanel === "account" && content.ui.accountTitle}
          {activePanel === "cart" && content.ui.cartTitle}
        </h2>
        <button type="button" aria-label={content.ui.close} onClick={() => setActivePanel(null)}>
          <X size={18} />
        </button>
      </div>

      {activePanel === "search" && (
        <div className="panel-body">
          <label className="search-field">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query.trim()) {
                  saveSearch(query.trim());
                  const matchedCat = getMatchedCategory(query);
                  setCatalogFilter(matchedCat || content.ui.all);
                  setActivePanel(null);
                  setView("catalog");
                  setQuery("");
                }
              }}
              placeholder={content.ui.searchPlaceholder}
              autoFocus
            />
          </label>
          <div className="quick-results">
            {query && content.products
              .filter((product) =>
                `${product.name} ${product.type} ${product.color} ${product.category}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .slice(0, 4)
              .map((product) => (
                <button key={product.name} type="button" className="search-result" onClick={() => {
                  saveSearch(query.trim());
                  openOptions(product);
                  setActivePanel(null);
                  setQuery("");
                }}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div>
                    <span className="search-result-name">{product.name}</span>
                    <span className="search-result-meta">{product.category} · {product.price}</span>
                  </div>
                </button>
              ))}
            {query && content.products.filter((p) =>
              `${p.name} ${p.type} ${p.color} ${p.category}`.toLowerCase().includes(query.toLowerCase())
            ).length === 0 && (
              <p className="search-no-results">No se encontraron productos para "{query}"</p>
            )}
            {query && content.products.filter((p) =>
              `${p.name} ${p.type} ${p.color} ${p.category}`.toLowerCase().includes(query.toLowerCase())
            ).length > 0 && (
              <button className="search-view-all" type="button" onClick={() => {
                saveSearch(query.trim());
                const matchedCat = getMatchedCategory(query);
                setCatalogFilter(matchedCat || content.ui.all);
                setActivePanel(null);
                setView("catalog");
                setQuery("");
              }}>
                {getMatchedCategory(query) ? `Ver todo en ${getMatchedCategory(query)}` : "Ver todo en catálogo"}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
          {!query && isLoggedIn() && recentSearches.length > 0 && (
            <div className="recent-searches">
              <span className="recent-searches-title">Buscado recientemente</span>
              {recentSearches.map((term) => (
                <button key={term} type="button" className="recent-search-item" onClick={() => setQuery(term)}>
                  <Search size={14} />
                  {term}
                </button>
              ))}
            </div>
          )}
          {!query && (!isLoggedIn() || recentSearches.length === 0) && <p>{content.ui.searchEmpty}</p>}
        </div>
      )}

      {activePanel === "account" && (
        <AccountPanel content={content} setActivePanel={setActivePanel} />
      )}

      {activePanel === "cart" && (
        <div className="panel-body">
          {cart.length === 0 ? (
            <p>{content.ui.emptyCart}</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div className="cart-line" key={`${item.name}-${item.size}-${item.color}-${index}`}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.size} / {item.color} x {item.quantity}
                    </span>
                    <span className="cart-price">{item.price}</span>
                  </div>
                  <button
                    className="cart-remove"
                    type="button"
                    aria-label="Eliminar"
                    onClick={() => removeFromCart(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                className="button primary"
                type="button"
                onClick={() => {
                  setView("checkout");
                  setActivePanel(null);
                }}
              >
                {content.ui.checkout} ({cartTotal})
              </button>
            </>
          )}
        </div>
      )}
    </aside>
    </>
  );
}

function Hero({ content }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="hero-logo-lockup">
          <img src={content.brand.logo} alt="" />
          <span>{content.brand.tagline}</span>
        </div>
        <span className="eyebrow">{content.hero.eyebrow}</span>
        <h1>{content.hero.title}</h1>
        <p>{content.hero.description}</p>
        <div className="hero-actions">
          <a className="button primary" href="#women">
            {content.hero.primaryCta}
            <ArrowRight size={18} />
          </a>
          <a className="button secondary" href="#collections">
            {content.hero.secondaryCta}
          </a>
        </div>
      </div>
      <div
        className="hero-media"
        style={{ backgroundImage: `url(${content.hero.image})` }}
        aria-label="Campaña Tenacious"
      >
        <img src={content.hero.image} alt="Campaña de vestuario deportivo Tenacious" />
      </div>
      <div className="stat-strip" aria-label="Puntos destacados">
        {content.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureStrip({ content }) {
  return (
    <section className="feature-strip" aria-label="Beneficios de compra">
      <div>
        {[...content.featureStrip, ...content.featureStrip].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function ProductSpotlight({ content, setView }) {
  return (
    <section className="product-spotlight reveal">
      <div className="spotlight-copy">
        <span className="eyebrow">{content.spotlight.eyebrow}</span>
        <h2>{content.spotlight.title}</h2>
        <p>{content.spotlight.description}</p>
        <div className="spotlight-features">
          {content.spotlight.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
        <button className="button primary" type="button" onClick={() => setView("catalog")}>
          {content.ui.catalog}
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="spotlight-media">
        {content.spotlight.images?.[0] && <img src={content.spotlight.images[0]} alt="Colección" />}
        {content.spotlight.images?.[1] && <img src={content.spotlight.images[1]} alt="Colección" />}
      </div>
    </section>
  );
}

function CategoryGrid({ content }) {
  return (
    <section className="section reveal" id="collections">
      <div className="section-heading">
        <span className="eyebrow">{content.collections.eyebrow}</span>
        <h2>{content.collections.title}</h2>
      </div>
      <div className="category-grid">
        {content.categories.map((category) => (
          <a className="category-card" href="#women" key={category.title}>
            <img src={category.image} alt={category.title} />
            <div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span>
                {content.hero.primaryCta}
                <ArrowRight size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ content, openOptions, setView }) {
  if (content.products.length === 0) {
    return null;
  }

  return (
    <section className="section product-section reveal" id="women">
      <div className="section-heading">
        <span className="eyebrow">{content.productSection.eyebrow}</span>
        <h2>{content.productSection.title}</h2>
        <p>{content.productSection.description}</p>
      </div>
      <div className="product-grid">
        {content.products.slice(0, 4).map((product) => (
          <article className="product-card" key={product.name}>
            <button className="product-image" type="button" onClick={() => openOptions(product)}>
              <img src={product.image} alt={product.name} loading="lazy" />
              <span>{product.badge}</span>
            </button>
            <div className="product-info">
              <div>
                <p>{product.type}</p>
                <h3>{product.name}</h3>
                <span>{product.color}</span>
              </div>
              <strong>{product.price}</strong>
            </div>
            <button className="option-button" type="button" onClick={() => openOptions(product)}>
              {content.ui.viewOptions}
            </button>
          </article>
        ))}
      </div>
      <div className="section-cta">
        <button className="button primary" type="button" onClick={() => setView("catalog")}>
          {content.ui.catalog}
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function CatalogView({ content, openOptions, setView, loading, initialCategory }) {
  const [category, setCategory] = useState(initialCategory || null);
  const [size, setSize] = useState(content.ui.all);
  const [sort, setSort] = useState(content.ui.newest);

  const categories = [...new Set(content.products.map((product) => product.category))];
  const sizes = [content.ui.all, ...new Set(content.products.flatMap((product) => product.sizes))];

  const products = useMemo(() => {
    return content.products
      .filter((product) => !category || category === content.ui.all || product.category === category)
      .filter((product) => size === content.ui.all || product.sizes.includes(size))
      .sort((a, b) => {
        if (sort === content.ui.priceLow) return a.numericPrice - b.numericPrice;
        if (sort === content.ui.priceHigh) return b.numericPrice - a.numericPrice;
        return 0;
      });
  }, [category, content.products, content.ui.all, content.ui.priceHigh, content.ui.priceLow, size, sort]);

  // Show loading state while products are being fetched
  if (content.products.length === 0 && loading) {
    return (
      <main className="catalog-page">
        <section className="catalog-hero">
          <button className="text-button back-button" type="button" onClick={() => setView("home")}>
            ← Home
          </button>
          <span className="eyebrow">{content.ui.catalog}</span>
          <h1>{content.productSection.title}</h1>
          <p>{content.productSection.description}</p>
        </section>
        <section className="catalog-categories" style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="loading-spinner" />
            <p style={{ color: "var(--muted)", marginTop: "16px" }}>Cargando productos...</p>
          </div>
        </section>
      </main>
    );
  }

  if (content.products.length === 0) {
    return (
      <main className="catalog-page">
        <section className="catalog-hero">
          <button className="text-button back-button" type="button" onClick={() => setView("home")}>
            ← Home
          </button>
          <span className="eyebrow">{content.ui.catalog}</span>
          <h1>{content.productSection.title}</h1>
          <p>{content.productSection.description}</p>
        </section>
        <section className="catalog-categories" style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <span className="eyebrow">{content.ui.comingSoon}</span>
            <p>Próximamente</p>
          </div>
        </section>
      </main>
    );
  }

  // Show category picker if no category selected
  if (!category) {
    return (
      <main className="catalog-page">
        <section className="catalog-hero">
          <button className="text-button back-button" type="button" onClick={() => setView("home")}>
            ← Home
          </button>
          <span className="eyebrow">{content.ui.catalog}</span>
          <h1>{content.productSection.title}</h1>
          <p>{content.productSection.description}</p>
        </section>
        <section className="catalog-categories">
          <button
            className="catalog-category-card"
            type="button"
            onClick={() => setCategory(content.ui.all)}
          >
            <img src={content.products[0].image} alt={content.ui.all} />
            <div>
              <h3>{content.ui.all}</h3>
              <span>{content.products.length} productos</span>
            </div>
          </button>
          {categories.map((cat) => {
            const catProducts = content.products.filter((p) => p.category === cat);
            return (
              <button
                className="catalog-category-card"
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
              >
                <img src={catProducts[0].image} alt={cat} />
                <div>
                  <h3>{cat}</h3>
                  <span>{catProducts.length} productos</span>
                </div>
              </button>
            );
          })}
        </section>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={() => setCategory(null)}>
          ← {content.ui.catalog}
        </button>
        <span className="eyebrow">{category === content.ui.all ? content.ui.catalog : category}</span>
        <h1>{category === content.ui.all ? content.productSection.title : category}</h1>
      </section>
      <section className="catalog-layout">
        <aside className="catalog-filters">
          <div>
            <h2>{content.ui.filters}</h2>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setSize(content.ui.all);
                setSort(content.ui.newest);
              }}
            >
              {content.ui.clearFilters}
            </button>
          </div>
          <label>
            <span>{content.ui.size}</span>
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              {sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{content.ui.sort}</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              {[content.ui.newest, content.ui.priceLow, content.ui.priceHigh].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </aside>
        <div className="catalog-results">
          <div className="catalog-toolbar">
            <strong>{products.length} productos</strong>
            <button className="button secondary" type="button" onClick={() => setCategory(null)}>
              {content.ui.catalog}
            </button>
          </div>
          <div className="product-grid catalog-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <button className="product-image" type="button" onClick={() => openOptions(product)}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>{product.badge}</span>
                </button>
                <div className="product-info">
                  <div>
                    <p>{product.type}</p>
                    <h3>{product.name}</h3>
                    <span>{product.color}</span>
                  </div>
                  <strong>{product.price}</strong>
                </div>
                <button className="option-button" type="button" onClick={() => openOptions(product)}>
                  {content.ui.viewOptions}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EditCartItemModal({ content, item, onClose, onSave }) {
  const [size, setSize] = useState(item.size || "");
  const [color, setColor] = useState(item.color || "");
  const [quantity, setQuantity] = useState(item.quantity || 1);

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="product-modal edit-modal" role="dialog" aria-modal="true">
        <button className="modal-close" type="button" aria-label={content.ui.close} onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-copy">
          <span className="eyebrow">{item.type}</span>
          <h2>{item.name}</h2>
          <strong className="modal-price">{item.price}</strong>

          {item.sizes && item.sizes.length > 0 && (
            <div className="option-group">
              <span>{content.ui.size}</span>
              <div>
                {item.sizes.map((s) => (
                  <button
                    className={size === s ? "selected" : ""}
                    type="button"
                    key={s}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.colors && item.colors.length > 0 && (
            <div className="option-group">
              <span>{content.ui.color}</span>
              <div>
                {item.colors.map((c) => (
                  <button
                    className={color === c ? "selected" : ""}
                    type="button"
                    key={c}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-row">
            <span>{content.ui.quantity}</span>
            <div>
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </button>
              <strong>{quantity}</strong>
              <button type="button" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            className="button primary"
            type="button"
            onClick={() => onSave({ ...item, size, color, quantity })}
          >
            Guardar cambios
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function CheckoutView({ content, cart, removeFromCart, updateCartItem, setView }) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  async function handleShopifyCheckout() {
    const shopifyItems = cart.filter((item) => item.variants);
    if (shopifyItems.length === 0) {
      setCheckoutError("No hay productos disponibles para checkout.");
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const checkout = await createCheckout(shopifyItems);
      localStorage.removeItem("tenacious_cart");
      window.location.href = checkout.webUrl;
    } catch (err) {
      setCheckoutError(err.message);
      setCheckoutLoading(false);
    }
  }

  return (
    <main className="checkout-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={() => setView("home")}>
          ← {content.ui.continueShopping}
        </button>
        <span className="eyebrow">{content.ui.checkoutTitle}</span>
        <h1>{content.ui.orderSummary}</h1>
        <p>Revisa tu pedido, modifica cantidades o elimina productos antes de proceder al pago.</p>
      </section>
      <section className="checkout-layout">
        <div className="checkout-form">
          <h2>Tu pedido</h2>
          {cart.length === 0 ? (
            <p>{content.ui.emptyCart}</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div className="cart-line checkout-line" key={`${item.name}-${item.size}-${item.color}-${index}`}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.size} / {item.color} x {item.quantity}
                    </span>
                    <span className="cart-price">{item.price}</span>
                  </div>
                  <div className="checkout-item-actions">
                    <button
                      className="cart-edit"
                      type="button"
                      aria-label="Editar"
                      onClick={() => setEditingItem({ ...item, cartIndex: index })}
                    >
                      ✎
                    </button>
                    <button
                      className="cart-remove"
                      type="button"
                      aria-label="Eliminar"
                      onClick={() => removeFromCart(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {checkoutError && <p className="option-error">{checkoutError}</p>}
              <button
                className="button primary"
                type="button"
                onClick={handleShopifyCheckout}
                disabled={checkoutLoading || cart.length === 0}
              >
                {checkoutLoading ? "Redirigiendo..." : "Proceder al pago"}
                <ArrowRight size={18} />
              </button>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "8px" }}>
                Serás redirigido al checkout seguro de Shopify para completar tu compra.
              </p>
            </>
          )}
        </div>
        <aside className="checkout-summary">
          <h2>Resumen</h2>
          <div className="checkout-totals">
            <div>
              <span>Subtotal</span>
              <strong>${cart.reduce((sum, item) => sum + (item.numericPrice || 0) * item.quantity, 0).toLocaleString("es-CL")}</strong>
            </div>
            <div>
              <span>Envío</span>
              <span>Calculado en checkout</span>
            </div>
            <div className="checkout-total-line">
              <span>Total estimado</span>
              <strong>${cart.reduce((sum, item) => sum + (item.numericPrice || 0) * item.quantity, 0).toLocaleString("es-CL")}</strong>
            </div>
          </div>
          <button className="button secondary" type="button" onClick={() => setView("catalog")}>
            {content.ui.continueShopping}
          </button>
        </aside>
      </section>

      {editingItem && (
        <EditCartItemModal
          content={content}
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(updatedItem) => {
            updateCartItem(editingItem.cartIndex, updatedItem);
            setEditingItem(null);
          }}
        />
      )}
    </main>
  );
}

function ProductDetailView({ content, product, onBack, onAddToCart }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setSize("");
    setColor("");
    setQuantity(1);
    setError("");
    setImageIndex(0);
  }, [product]);

  if (!product) {
    return null;
  }

  const images = product.images || [product.image];
  const [imgLoaded, setImgLoaded] = useState(true);

  // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [product]);

  function nextImage() {
    setImgLoaded(false);
    setImageIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setImgLoaded(false);
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function addProduct() {
    if (!size) {
      setError(content.ui.chooseSize);
      return;
    }

    if (!color) {
      setError(content.ui.chooseColor);
      return;
    }

    onAddToCart({ ...product, size, color, quantity });
  }

  return (
    <main className="product-detail-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={onBack}>
          ← {content.ui.continueShopping}
        </button>
      </section>
      <section className="product-detail-layout">
        <div
          className="product-detail-gallery"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
          onTouchEnd={() => {
            const diff = touchStartX.current - touchEndX.current;
            if (diff > 50) nextImage();
            if (diff < -50) prevImage();
          }}
        >
          <img
            src={images[imageIndex]}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
          />
          {images.length > 1 && (
            <>
              <button className="gallery-arrow gallery-arrow-left" type="button" onClick={prevImage} aria-label="Imagen anterior">
                ‹
              </button>
              <button className="gallery-arrow gallery-arrow-right" type="button" onClick={nextImage} aria-label="Imagen siguiente">
                ›
              </button>
              <div className="gallery-dots">
                <span>{imageIndex + 1} / {images.length}</span>
              </div>
            </>
          )}
        </div>
        <div className="product-detail-info">
          <span className="eyebrow">{product.type}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <strong className="product-detail-price">{product.price}</strong>

          <div className="option-group">
            <span>{content.ui.size}</span>
            <div>
              {product.sizes.map((item) => (
                <button
                  className={size === item ? "selected" : ""}
                  type="button"
                  key={item}
                  onClick={() => {
                    setSize(item);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <span>{content.ui.color}</span>
            <div>
              {product.colors.map((item) => (
                <button
                  className={color === item ? "selected" : ""}
                  type="button"
                  key={item}
                  onClick={() => {
                    setColor(item);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-row">
            <span>{content.ui.quantity}</span>
            <div>
              <button type="button" aria-label="Disminuir" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </button>
              <strong>{quantity}</strong>
              <button type="button" aria-label="Aumentar" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          {error && <p className="option-error">{error}</p>}

          <button className="button primary" type="button" onClick={addProduct}>
            {content.ui.addToCart}
            <ShoppingBag size={18} />
          </button>


        </div>
      </section>
    </main>
  );
}

function MenComingSoon({ content, setActivePanel }) {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleNotify() {
    if (!isLoggedIn()) {
      setActivePanel("account");
      return;
    }

    setLoading(true);
    try {
      const customerInfo = await getCustomerInfo();
      if (customerInfo?.email) {
        await subscribeNewsletter(customerInfo.email);
      }
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    }
    setLoading(false);
  }

  return (
    <section className="men-band reveal" id="men">
      <div>
        <span className="eyebrow">{content.ui.comingSoon}</span>
        <h2>{content.menComingSoon.title}</h2>
        <p>{content.menComingSoon.description}</p>
      </div>
      {subscribed ? (
        <span className="men-band-confirmed">✓ Te avisaremos cuando esté disponible</span>
      ) : (
        <button className="button secondary" type="button" onClick={handleNotify} disabled={loading}>
          {loading ? "Suscribiendo..." : content.menComingSoon.cta}
        </button>
      )}
    </section>
  );
}

function StyleTiles({ content, setView }) {
  const tileImages = content.styleTileImages || [];
  return (
    <section className="style-tiles reveal" id="top-sellers">
      <article className="style-tile-with-bg" style={{ backgroundImage: `url(${tileImages[0] || ""})` }}>
        <div className="style-tile-overlay" />
        <div className="style-tile-content">
          <span className="eyebrow">Top seller</span>
          <h2>Entrena con estilo, rinde con fuerza.</h2>
          <button className="button primary" type="button" onClick={() => setView("catalog")}>
            {content.hero.primaryCta}
            <ArrowRight size={18} />
          </button>
        </div>
      </article>
      <article className="style-tile-with-bg" style={{ backgroundImage: `url(${tileImages[1] || ""})` }}>
        <div className="style-tile-overlay" />
        <div className="style-tile-content">
          <span className="eyebrow">New drop</span>
          <h2>Diseño que acompaña cada repetición.</h2>
          <button className="button secondary" type="button" onClick={() => setView("catalog")}>
            {content.hero.secondaryCta}
          </button>
        </div>
      </article>
    </section>
  );
}

function Benefits({ content }) {
  return (
    <section className="benefits reveal">
      {content.benefits.map((benefit) => (
        <article key={benefit.title}>
          <Sparkles size={18} />
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </article>
      ))}
    </section>
  );
}

function SocialContact({ content }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  async function handleNewsletter() {
    if (!newsletterEmail) return;
    try {
      const result = await subscribeNewsletter(newsletterEmail);
      setNewsletterStatus(result.message);
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterStatus(err.message);
    }
  }

  return (
    <section className="social-contact reveal" id="contact">
      <div>
        <span className="eyebrow">{content.social.eyebrow}</span>
        <h2>{content.social.title}</h2>
        <p>{content.social.description}</p>
        <div className="contact-actions">
          <a className="button primary" href={content.brand.instagram} target="_blank" rel="noreferrer">
            <Instagram size={18} />
            {content.ui.followInstagram}
          </a>
          <a className="button secondary" href={`mailto:${content.brand.email}`}>
            <Mail size={18} />
            {content.ui.contactEmail}
          </a>
        </div>
      </div>
      <form className="newsletter" onSubmit={(e) => { e.preventDefault(); handleNewsletter(); }}>
        <h3>{content.social.newsletterTitle}</h3>
        <p>{content.social.newsletterCopy}</p>
        <label>
          <input
            type="email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="tu@email.com"
          />
          <button type="submit">
            <ArrowRight size={18} />
          </button>
        </label>
        {newsletterStatus && <span className="newsletter-status">{newsletterStatus}</span>}
      </form>
    </section>
  );
}

function FloatingSocial({ content }) {
  return (
    <div className="floating-social" aria-label="Contacto rápido">
      <a href={content.brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram size={18} />
      </a>
      <a href={`mailto:${content.brand.email}`} aria-label="Correo">
        <Mail size={18} />
      </a>
    </div>
  );
}

function Footer({ content, setView }) {
  return (
    <footer className="mega-footer">
      <div className="footer-brand-panel">
        <a className="footer-logo" href="#top" onClick={() => setView("home")}>
          <img src={content.brand.logo} alt="Tenacious" />
          <span>{content.brand.name}</span>
        </a>
        <p>{content.brand.tagline}</p>
      </div>
      <div className="footer-social">
        <span>{content.social.title}</span>
        <div>
          <a href={content.brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href={`mailto:${content.brand.email}`} aria-label="Correo">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="footer-columns">
        {Object.values(content.footerLinks).map((group) => (
          <nav key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <a
                key={link.label}
                href={link.href || "#top"}
                target={link.href && link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href && link.href.startsWith("http") ? "noreferrer" : undefined}
                onClick={(event) => {
                  if (link.view) {
                    event.preventDefault();
                    setView(link.view);
                    window.scrollTo(0, 0);
                  } else if (!link.href) {
                    setView("home");
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 {content.brand.legalName}</span>
        <div>
          <CreditCard size={18} />
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Amex</span>
        </div>
      </div>
    </footer>
  );
}

function InfoPageView({ content, pageKey, setView, openOptions }) {
  const page = content.pages[pageKey];

  if (!page) return null;

  return (
    <main className="info-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={() => setView("home")}>
          ← Home
        </button>
        <h1>{page.title}</h1>
        {page.intro && <p>{page.intro}</p>}
        {page.description && <p>{page.description}</p>}
      </section>

      {/* Coming soon pages */}
      {page.comingSoon && (
        <section className="info-content">
          <div className="coming-soon-card">
            <span className="eyebrow">{content.ui.comingSoon}</span>
            <p>{page.message}</p>
            <a className="button primary" href={content.brand.instagram} target="_blank" rel="noreferrer">
              <Instagram size={18} />
              {content.ui.followInstagram}
            </a>
          </div>
        </section>
      )}

      {/* Top sellers product grid */}
      {page.isProductPage && (
        <section className="info-content" style={{ maxWidth: "var(--max)" }}>
          <div className="product-grid catalog-grid">
            {content.products.slice(0, 4).map((product) => (
              <article className="product-card" key={product.name}>
                <button className="product-image" type="button" onClick={() => openOptions(product)}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>{product.badge}</span>
                </button>
                <div className="product-info">
                  <div>
                    <p>{product.type}</p>
                    <h3>{product.name}</h3>
                    <span>{product.color}</span>
                  </div>
                  <strong>{product.price}</strong>
                </div>
                <button className="option-button" type="button" onClick={() => openOptions(product)}>
                  {content.ui.viewOptions}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Regular info pages */}
      {!page.comingSoon && !page.isProductPage && (
        <section className="info-content">
          {/* FAQ format */}
          {page.sections && page.sections[0]?.question && (
            <div className="faq-list">
              {page.sections.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          )}

          {/* Generic sections format */}
          {page.sections && page.sections[0]?.subtitle && (
            <div className="info-sections">
              {page.sections.map((section) => (
                <article key={section.subtitle}>
                  <h3>{section.subtitle}</h3>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          )}

          {/* Size guide table */}
          {page.table && (
            <div className="size-table-wrapper">
              <table className="size-table">
                <thead>
                  <tr>
                    {page.table.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tips */}
          {page.tips && (
            <div className="info-tips">
              <h3>Tips</h3>
              <ul>
                {page.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function OrderDetailView({ order, onBack, onHome }) {
  if (!order) return null;

  const status = order.fulfillmentStatus === "FULFILLED" ? "✓ Enviado" 
    : order.fulfillmentStatus === "IN_PROGRESS" ? "◐ En camino"
    : order.fulfillmentStatus === "DELIVERED" ? "✓ Entregado"
    : "● En preparación";

  return (
    <main className="info-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={onBack}>
          ← Volver a mi cuenta
        </button>
        <h1>Pedido #{order.orderNumber}</h1>
        <p>Realizado el {new Date(order.processedAt).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</p>
      </section>
      <section className="info-content">
        <div className="order-detail-status">
          <span className="order-status">{status}</span>
        </div>

        <div className="info-sections">
          <article>
            <h3>Productos</h3>
            {order.lineItems?.nodes?.map((item, i) => (
              <div className="order-item" key={i}>
                {item.variant?.image?.url && <img src={item.variant.image.url} alt={item.title} />}
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.variant?.title !== "Default Title" ? item.variant?.title : ""} x {item.quantity}</span>
                  <span>${Math.round(Number(item.variant?.price?.amount || 0)).toLocaleString("es-CL")}</span>
                </div>
              </div>
            ))}
          </article>

          {order.shippingAddress && (
            <article>
              <h3>Dirección de envío</h3>
              <p style={{ margin: 0 }}>
                {order.shippingAddress.address1}<br />
                {order.shippingAddress.city}{order.shippingAddress.province ? `, ${order.shippingAddress.province}` : ""}<br />
                {order.shippingAddress.country}
              </p>
            </article>
          )}

          {order.successfulFulfillments?.length > 0 && order.successfulFulfillments[0].trackingInfo?.length > 0 && (
            <article>
              <h3>Seguimiento de envío</h3>
              {order.successfulFulfillments[0].trackingInfo.map((track, idx) => (
                <a key={idx} href={track.url} target="_blank" rel="noreferrer" className="tracking-link">
                  N° seguimiento: {track.number} →
                </a>
              ))}
            </article>
          )}

          <article>
            <h3>Resumen</h3>
            <div className="order-summary-lines">
              <div><span>Subtotal</span><strong>${Math.round(Number(order.subtotalPrice?.amount || 0)).toLocaleString("es-CL")}</strong></div>
              <div><span>Envío</span><strong>${Math.round(Number(order.totalShippingPrice?.amount || 0)).toLocaleString("es-CL")}</strong></div>
              <div><span>Impuestos</span><strong>${Math.round(Number(order.totalTax?.amount || 0)).toLocaleString("es-CL")}</strong></div>
              <div className="order-total"><span>Total</span><strong>${Math.round(Number(order.totalPrice.amount)).toLocaleString("es-CL")}</strong></div>
            </div>
          </article>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          <button className="button primary" type="button" onClick={onBack}>
            Volver a mi cuenta
          </button>
          <button className="button secondary" type="button" onClick={onHome}>
            Seguir comprando
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

function PromoPopup({ setView }) {
  const [promo, setPromo] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo_dismissed");
    if (dismissed) return;

    // Read promo from Shopify page with handle "promo"
    shopifyFetch(`{ page(handle: "promo") { title body } }`)
      .then((data) => {
        const page = data?.page;
        if (page && page.body) {
          setPromo({ title: page.title, message: page.body });
          setTimeout(() => setVisible(true), 1500);
        }
      })
      .catch(() => {});
  }, []);

  // Block scroll when popup is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!promo || !visible) return null;

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem("promo_dismissed", "true");
  }

  // Strip HTML tags from Shopify rich text
  const cleanMessage = promo.message.replace(/<[^>]*>/g, "");

  return (
    <div className="promo-overlay" role="presentation" onClick={dismiss}>
      <div className="promo-popup" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" type="button" onClick={dismiss}>
          <X size={16} />
        </button>
        <div className="promo-visual">
          <img src={`${import.meta.env.BASE_URL}images/tenacious-logo-pink.png`} alt="Tenacious Built" className="promo-logo" />
          <div className="promo-sparkles">
            <Sparkles size={20} />
          </div>
        </div>
        <div className="promo-popup-content">
          <h2>{promo.title}</h2>
          <p>{cleanMessage}</p>
          <button
            className="button primary"
            type="button"
            onClick={() => { setView("catalog"); dismiss(); }}
          >
            Ver ofertas
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState("es");
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    const allViews = ["catalog", "checkout", "product", "order-detail", "faq", "exchanges", "size-guide", "privacy", "terms", "shipping", "top-sellers", "men-drop"];
    return allViews.includes(hash) ? hash : "home";
  });
  const [catalogKey, setCatalogKey] = useState(0);
  const [activePanel, setActivePanel] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      const saved = sessionStorage.getItem("tenacious_selected_product");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("tenacious_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const content = contentByLanguage[language];
  const { products: shopifyProducts, isFromShopify, loading: productsLoading } = useShopifyProducts(content.products);

  // Use Shopify products if available, otherwise fallback to static
  const activeContent = useMemo(() => {
    if (isFromShopify && shopifyProducts && shopifyProducts.length > 0) {
      return { ...content, products: shopifyProducts };
    }
    return content;
  }, [content, shopifyProducts, isFromShopify]);

  useEffect(() => {
    try {
      localStorage.setItem("tenacious_cart", JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Persist selected product for refresh
  useEffect(() => {
    try {
      if (selectedProduct) {
        sessionStorage.setItem("tenacious_selected_product", JSON.stringify(selectedProduct));
      } else {
        sessionStorage.removeItem("tenacious_selected_product");
      }
    } catch {
      // ignore storage errors
    }
  }, [selectedProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, catalogKey]);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollY.current;

          if (diff > 8 && currentY > 80) {
            setHeaderHidden(true);
          } else if (diff < -5) {
            setHeaderHidden(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Replace initial history state so popstate works from the start
    const url = view === "home" ? "/" : `#${view}`;
    window.history.replaceState({ view }, "", url);
  }, []);

  // Listen for browser back/forward button
  useEffect(() => {
    // Skip the initial popstate that some browsers fire on load
    let isInitial = true;
    setTimeout(() => { isInitial = false; }, 100);

    function handlePopState(event) {
      if (isInitial) return;
      const state = event.state;
      if (state && state.view) {
        // Views that require state data - if we don't have it, go to catalog/home
        if (state.view === "product" && !selectedProduct) {
          setView("catalog");
          setCatalogKey((k) => k + 1);
        } else if (state.view === "order-detail" && !selectedOrder) {
          setView("home");
        } else {
          if (state.view === "catalog") setCatalogKey((k) => k + 1);
          setView(state.view);
        }
        setActivePanel(null);
      } else {
        setView("home");
        setActivePanel(null);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedProduct, selectedOrder]);

  useEffect(() => {
    function handleViewOrder() {
      setSelectedOrder(window.__selectedOrder);
      setView("order-detail");
      window.history.pushState({ view: "order-detail" }, "", "#order-detail");
    }
    window.addEventListener("viewOrder", handleViewOrder);
    return () => window.removeEventListener("viewOrder", handleViewOrder);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [view, language]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  function changeView(newView) {
    if (newView === "catalog") setCatalogKey((k) => k + 1);
    if (newView !== "catalog") setCatalogFilter(null);
    setView(newView);
    // Push to browser history so back button works
    const url = newView === "home" ? "/" : `#${newView}`;
    window.history.pushState({ view: newView }, "", url);
  }

  // Safety: redirect to valid view if current view requires missing state
  useEffect(() => {
    if (view === "product" && !selectedProduct && !productsLoading) {
      setView("catalog");
      setCatalogKey((k) => k + 1);
      window.history.replaceState({ view: "catalog" }, "", "#catalog");
    }
    if (view === "order-detail" && !selectedOrder) {
      setView("home");
      window.history.replaceState({ view: "home" }, "", "/");
    }
  }, [view, selectedProduct, selectedOrder, productsLoading]);

  function openProductDetail(product) {
    setSelectedProduct(product);
    changeView("product");
  }

  function addToCart(item) {
    setCart((currentCart) => [...currentCart, item]);
    setActivePanel("cart");
  }

  function removeFromCart(index) {
    setCart((currentCart) => currentCart.filter((_, i) => i !== index));
  }

  function updateCartItem(index, updatedItem) {
    setCart((currentCart) => currentCart.map((item, i) => i === index ? updatedItem : item));
  }

  return (
    <>
      <Header
        content={activeContent}
        language={language}
        setLanguage={setLanguage}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        cartCount={cartCount}
        setView={changeView}
        hidden={headerHidden}
      />
      <div className="site-header-spacer" />
      <ActionPanel
        content={activeContent}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        cart={cart}
        removeFromCart={removeFromCart}
        setView={changeView}
        openOptions={openProductDetail}
        setCatalogFilter={setCatalogFilter}
      />
      {view === "home" && (
        <main>
          <Hero content={activeContent} />
          <FeatureStrip content={activeContent} />
          <ProductSpotlight content={activeContent} setView={changeView} />
          <CategoryGrid content={activeContent} />
          <ProductGrid content={activeContent} openOptions={openProductDetail} setView={changeView} />
          <StyleTiles content={activeContent} setView={changeView} />
          <MenComingSoon content={activeContent} setActivePanel={setActivePanel} />
          <Benefits content={activeContent} />
          <SocialContact content={activeContent} />
        </main>
      )}
      {view === "catalog" && (
        <CatalogView key={catalogKey} content={activeContent} openOptions={openProductDetail} setView={changeView} loading={productsLoading} initialCategory={catalogFilter} />
      )}
      {view === "checkout" && <CheckoutView content={activeContent} cart={cart} removeFromCart={removeFromCart} updateCartItem={updateCartItem} setView={changeView} />}
      {view === "order-detail" && selectedOrder && <OrderDetailView order={selectedOrder} onBack={() => { changeView("home"); setActivePanel("account"); }} onHome={() => changeView("home")} />}
      {view === "product" && selectedProduct && (
        <ProductDetailView
          content={activeContent}
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            changeView("catalog");
          }}
          onAddToCart={addToCart}
        />
      )}
      {["faq", "exchanges", "size-guide", "privacy", "terms", "shipping", "top-sellers", "men-drop"].includes(view) && (
        <InfoPageView content={activeContent} pageKey={view} setView={changeView} openOptions={openProductDetail} />
      )}
      <Footer content={activeContent} setView={changeView} />
      <FloatingSocial content={activeContent} />
      <PromoPopup setView={changeView} />
    </>
  );
}

