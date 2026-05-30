import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CreditCard,
  Globe2,
  Heart,
  Instagram,
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
import { createCheckout, isShopifyConfigured } from "./lib/shopify";

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
          onClick={() => {
            setView("home");
            setActivePanel(null);
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
          <button type="button" aria-label={content.ui.account} onClick={() => togglePanel("account")}>
            <User size={18} />
          </button>
          <button className="cart-button" type="button" aria-label={content.ui.cart} onClick={() => togglePanel("cart")}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button type="button" aria-label={content.ui.language} onClick={() => setLanguage(language === "es" ? "en" : "es")}>
            <Globe2 size={18} />
          </button>
          <button className="mobile-menu" type="button" aria-label={content.ui.menu} onClick={() => togglePanel("menu")}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Navegación móvil">
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

function ActionPanel({ content, activePanel, setActivePanel, cart, removeFromCart, setView }) {
  const [query, setQuery] = useState("");
  const [accountMode, setAccountMode] = useState("signin");

  if (!activePanel || activePanel === "menu") {
    return null;
  }

  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

  return (
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
              placeholder={content.ui.searchPlaceholder}
            />
          </label>
          <div className="quick-results">
            {content.products
              .filter((product) =>
                `${product.name} ${product.type} ${product.color}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .slice(0, 4)
              .map((product) => (
                <a key={product.name} href="#women" onClick={() => setActivePanel(null)}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </a>
              ))}
          </div>
          {!query && <p>{content.ui.searchEmpty}</p>}
        </div>
      )}

      {activePanel === "account" && (
        <div className="panel-body">
          <p>{content.ui.accountCopy}</p>
          {accountMode === "create" && (
            <label className="auth-field">
              <span>{content.ui.fullName}</span>
              <input type="text" placeholder="Tenacious Built" />
            </label>
          )}
          <label className="auth-field">
            <span>{content.ui.email}</span>
            <input type="email" placeholder="tenacious@email.com" />
          </label>
          <label className="auth-field">
            <span>{content.ui.password}</span>
            <input type="password" placeholder="••••••••" />
          </label>
          <button className="button primary" type="button">
            {accountMode === "create" ? content.ui.createAccountTitle : content.ui.signIn}
            <ArrowRight size={18} />
          </button>
          <button
            className="text-button"
            type="button"
            onClick={() => setAccountMode(accountMode === "create" ? "signin" : "create")}
          >
            {accountMode === "create" ? content.ui.signIn : content.ui.createAccount}
          </button>
        </div>
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
                onClick={async () => {
                  // If products have Shopify variants, redirect to Shopify checkout
                  if (cart[0]?.variants) {
                    try {
                      const checkout = await createCheckout(cart);
                      window.location.href = checkout.webUrl;
                    } catch (err) {
                      console.error("Checkout error:", err);
                      setView("checkout");
                      setActivePanel(null);
                    }
                  } else {
                    setView("checkout");
                    setActivePanel(null);
                  }
                }}
              >
                {content.ui.checkout} ({cartTotal})
              </button>
            </>
          )}
        </div>
      )}
    </aside>
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
        <img src={content.products[3].image} alt={content.products[3].name} />
        <img src={content.products[6].image} alt={content.products[6].name} />
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
              <img src={product.image} alt={product.name} />
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

function CatalogView({ content, openOptions, setView }) {
  const [category, setCategory] = useState(null);
  const [size, setSize] = useState(content.ui.all);
  const [sort, setSort] = useState(content.ui.newest);
  const categories = [...new Set(content.products.map((product) => product.category))];
  const sizes = [content.ui.all, ...new Set(content.products.flatMap((product) => product.sizes))];

  const products = useMemo(() => {
    return content.products
      .filter((product) => !category || product.category === category)
      .filter((product) => size === content.ui.all || product.sizes.includes(size))
      .sort((a, b) => {
        if (sort === content.ui.priceLow) return a.numericPrice - b.numericPrice;
        if (sort === content.ui.priceHigh) return b.numericPrice - a.numericPrice;
        return 0;
      });
  }, [category, content.products, content.ui.all, content.ui.priceHigh, content.ui.priceLow, size, sort]);

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
                  <img src={product.image} alt={product.name} />
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

function CheckoutView({ content, cart, removeFromCart, setView }) {
  return (
    <main className="checkout-page">
      <section className="catalog-hero">
        <button className="text-button back-button" type="button" onClick={() => setView("catalog")}>
          ← {content.ui.continueShopping}
        </button>
        <span className="eyebrow">{content.ui.checkoutTitle}</span>
        <h1>{content.ui.orderSummary}</h1>
        <p>{content.ui.checkoutCopy}</p>
      </section>
      <section className="checkout-layout">
        <form className="checkout-form">
          <h2>{content.ui.customerData}</h2>
          <label className="auth-field">
            <span>{content.ui.fullName}</span>
            <input type="text" />
          </label>
          <label className="auth-field">
            <span>{content.ui.email}</span>
            <input type="email" />
          </label>
          <label className="auth-field">
            <span>{content.ui.address}</span>
            <input type="text" />
          </label>
          <label className="auth-field">
            <span>{content.ui.city}</span>
            <input type="text" />
          </label>
          <button className="button primary" type="button">
            {content.ui.submitOrder}
            <ArrowRight size={18} />
          </button>
        </form>
        <aside className="checkout-summary">
          <h2>{content.ui.orderSummary}</h2>
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
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

function ProductOptionsModal({ content, product, onClose, onAddToCart }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

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
  const totalImages = product.sizeChart ? images.length + 1 : images.length;

  function nextImage() {
    setImageIndex((prev) => (prev + 1) % totalImages);
  }

  function prevImage() {
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }

  function getCurrentImage() {
    if (imageIndex < images.length) return images[imageIndex];
    return product.sizeChart;
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
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-options-title">
        <button className="modal-close" type="button" aria-label={content.ui.close} onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-gallery">
          <img
            src={getCurrentImage()}
            alt={product.name}
            className={imageIndex >= images.length ? "size-chart-img" : ""}
          />
          {totalImages > 1 && (
            <div className="gallery-controls">
              <button type="button" onClick={prevImage} aria-label="Anterior">‹</button>
              <span>{imageIndex + 1} / {totalImages}</span>
              <button type="button" onClick={nextImage} aria-label="Siguiente">›</button>
            </div>
          )}
          {imageIndex >= images.length && (
            <span className="gallery-label">Guía de tallas</span>
          )}
        </div>
        <div className="modal-copy">
          <span className="eyebrow">{product.type}</span>
          <h2 id="product-options-title">{product.name}</h2>
          <p>{product.description}</p>
          <strong className="modal-price">{product.price}</strong>

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
    </div>
  );
}

function MenComingSoon({ content }) {
  return (
    <section className="men-band reveal" id="men">
      <div>
        <span className="eyebrow">{content.ui.comingSoon}</span>
        <h2>{content.menComingSoon.title}</h2>
        <p>{content.menComingSoon.description}</p>
      </div>
      <a className="button secondary" href="mailto:hola@tenacious.cl">
        {content.menComingSoon.cta}
      </a>
    </section>
  );
}

function StyleTiles({ content, setView }) {
  return (
    <section className="style-tiles reveal" id="top-sellers">
      <article>
        <span className="eyebrow">Top seller</span>
        <h2>Entrena con estilo, rinde con fuerza.</h2>
        <button className="button primary" type="button" onClick={() => setView("catalog")}>
          {content.hero.primaryCta}
          <ArrowRight size={18} />
        </button>
      </article>
      <article>
        <span className="eyebrow">New drop</span>
        <h2>Diseño que acompaña cada repetición.</h2>
        <button className="button secondary" type="button" onClick={() => setView("catalog")}>
          {content.hero.secondaryCta}
        </button>
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
      <form className="newsletter">
        <h3>{content.social.newsletterTitle}</h3>
        <p>{content.social.newsletterCopy}</p>
        <label>
          <input type="email" placeholder={content.brand.email} />
          <button type="button">
            <ArrowRight size={18} />
          </button>
        </label>
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
                  <img src={product.image} alt={product.name} />
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

export default function App() {
  const [language, setLanguage] = useState("es");
  const [view, setView] = useState("home");
  const [activePanel, setActivePanel] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const content = contentByLanguage[language];
  const { products: shopifyProducts, isFromShopify } = useShopifyProducts(content.products);

  // Use Shopify products if available, otherwise fallback to static
  const activeContent = useMemo(() => {
    if (isFromShopify) {
      return { ...content, products: shopifyProducts };
    }
    return content;
  }, [content, shopifyProducts, isFromShopify]);

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
    const syncViewFromHash = () => {
      if (window.location.hash === "#catalog") setView("catalog");
      if (window.location.hash === "#checkout") setView("checkout");
    };

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
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

  function addToCart(item) {
    setCart((currentCart) => [...currentCart, item]);
    setActivePanel("cart");
  }

  function removeFromCart(index) {
    setCart((currentCart) => currentCart.filter((_, i) => i !== index));
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
        setView={setView}
        hidden={headerHidden}
      />
      <div className="site-header-spacer" />
      <ActionPanel
        content={activeContent}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        cart={cart}
        removeFromCart={removeFromCart}
        setView={setView}
      />
      {view === "home" && (
        <main>
          <Hero content={activeContent} />
          <FeatureStrip content={activeContent} />
          <ProductSpotlight content={activeContent} setView={setView} />
          <CategoryGrid content={activeContent} />
          <ProductGrid content={activeContent} openOptions={setSelectedProduct} setView={setView} />
          <StyleTiles content={activeContent} setView={setView} />
          <MenComingSoon content={activeContent} />
          <Benefits content={activeContent} />
          <SocialContact content={activeContent} />
        </main>
      )}
      {view === "catalog" && (
        <CatalogView content={activeContent} openOptions={setSelectedProduct} setView={setView} />
      )}
      {view === "checkout" && <CheckoutView content={activeContent} cart={cart} removeFromCart={removeFromCart} setView={setView} />}
      {["faq", "exchanges", "size-guide", "privacy", "terms", "shipping", "top-sellers", "men-drop"].includes(view) && (
        <InfoPageView content={activeContent} pageKey={view} setView={setView} openOptions={setSelectedProduct} />
      )}
      <Footer content={activeContent} setView={setView} />
      <FloatingSocial content={activeContent} />
      <ProductOptionsModal
        content={activeContent}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </>
  );
}
