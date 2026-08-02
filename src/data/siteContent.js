const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const sharedImages = {
  logo: assetPath("images/tenacious-logo-pink.png"),
  hero: assetPath("images/hero.jpeg"),
  categories: [
    assetPath("images/short-negro-1.jpeg"),
    assetPath("images/sosten-negro-2.jpeg"),
    assetPath("images/top-negro-3.jpeg"),
  ],
  spotlight: [
    assetPath("images/sosten-azul.jpeg"),
    assetPath("images/top-deportivo-negro.jpeg"),
  ],
  styleTiles: [
    assetPath("images/product-tee.png"),
    assetPath("images/sosten-negro.jpeg"),
  ],
};



export const contentByLanguage = {
  es: {
    languageLabel: "Español",
    brand: {
      name: "Tenacious Built",
      legalName: "Tenacious Built",
      tagline: "Creada para cada repetición.",
      logoText: "T",
      logo: sharedImages.logo,
      announcement: "Sitio oficial Tenacious Built | Envíos a todo Chile | Cambios simples",
      instagram: "https://www.instagram.com/tenacious_built?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "tenaciousbuilt@gmail.com",
    },
    nav: [
      { label: "Mujer", href: "#women" },
      { label: "Catálogo", view: "catalog" },
      { label: "Colecciones", href: "#collections" },
      { label: "Top ventas", href: "#women" },
      { label: "Coming Soon", view: "coming-soon" },
      { label: "Contacto", view: "contact" },
    ],
    ui: {
      search: "Buscar",
      account: "Cuenta",
      cart: "Carrito",
      menu: "Menú",
      close: "Cerrar",
      language: "Idioma",
      searchPlaceholder: "Busca leggings, tops o sets",
      searchEmpty: "Prueba buscando por categoría, color o tipo de prenda.",
      accountTitle: "Tu cuenta Tenacious",
      accountCopy:
        "Ingresa para guardar favoritos, revisar tus pedidos y recibir novedades antes que nadie.",
      email: "Correo electrónico",
      password: "Contraseña",
      signIn: "Iniciar sesión",
      createAccount: "Crear cuenta",
      createAccountTitle: "Crear cuenta",
      fullName: "Nombre completo",
      cartTitle: "Tu carrito",
      emptyCart: "Tu carrito está vacío.",
      addedToCart: "Agregado al carrito",
      viewOptions: "Ver opciones",
      addToCart: "Agregar al carrito",
      chooseSize: "Elige una talla",
      chooseColor: "Elige un color",
      size: "Talla",
      color: "Color",
      quantity: "Cantidad",
      checkout: "Ir al checkout",
      checkoutTitle: "Checkout",
      checkoutCopy: "Completa tus datos y te contactaremos para confirmar disponibilidad, pago y despacho.",
      continueShopping: "Seguir comprando",
      orderSummary: "Resumen del pedido",
      customerData: "Datos de contacto",
      address: "Dirección de despacho",
      city: "Ciudad",
      submitOrder: "Enviar pedido",
      catalog: "Catálogo",
      filters: "Filtros",
      all: "Todo",
      sort: "Ordenar",
      newest: "Novedades",
      priceLow: "Menor precio",
      priceHigh: "Mayor precio",
      clearFilters: "Limpiar filtros",
      comingSoon: "Disponible pronto",
      followInstagram: "Ver Instagram",
      contactEmail: "Escríbenos",
    },
    hero: {
      eyebrow: "Vestuario deportivo femenino",
      title: "Fuerza, ajuste y presencia para entrenar sin pausa.",
      description:
        "Más que ropa deportiva. El reflejo de una mujer que convirtió sus desafíos en fuerza y su disciplina en poder.",
      primaryCta: "Comprar ahora",
      secondaryCta: "Ver colecciones",
      image: sharedImages.hero,
    },
    spotlight: {
      eyebrow: "Nueva silueta",
      title: "Diseñada para moverte con confianza, dentro y fuera del gym.",
      description:
        "Una selección pensada para calce seguro, telas suaves y combinaciones que funcionan en entrenamiento, descanso y rutina diaria.",
      features: ["Soporte cómodo", "Texturas suaves", "Calce seguro"],
      images: sharedImages.spotlight,
    },
    styleTileImages: sharedImages.styleTiles,
    styleTiles: {
      tile1: "Entrena con estilo, rinde con fuerza.",
      tile2: "Diseño que acompaña cada repetición.",
    },
    stats: [
      { value: "4-way", label: "elasticidad" },
      { value: "24/7", label: "comodidad" },
      { value: "2026", label: "drop hombre" },
    ],
    collections: {
      eyebrow: "Colecciones",
      title: "Compra por entrenamiento.",
    },
    featureStrip: [
      "Cambios fáciles",
      "Despacho a todo Chile",
      "Pago seguro",
      "Atención por Instagram",
    ],
    categories: [
      {
        title: "Shorts",
        description: "Calce firme, pretina alta y movilidad total.",
        image: sharedImages.categories[0],
      },
      {
        title: "Breastplates",
        description: "Soporte medio para entrenamientos intensos.",
        image: sharedImages.categories[1],
      },
      {
        title: "T-Shirts",
        description: "Comodidad y estilo para entrenar y salir.",
        image: sharedImages.categories[2],
      },
    ],
    productSection: {
      eyebrow: "Mujer",
      title: "Lo último en Tenacious Built.",
      description:
        "Prendas seleccionadas para entrenar fuerte, moverte cómoda y mantener una presencia limpia dentro y fuera del gym.",
      tabs: ["Top ventas", "Novedades", "Shorts", "Tops"],
    },
    products: [],
    menComingSoon: {
      title: "Línea hombre en desarrollo",
      description:
        "La primera colección masculina está pensada para fuerza, volumen y movilidad. Este espacio queda listo sin distraer del lanzamiento femenino actual.",
      cta: "Avisarme del drop",
    },
    benefits: [
      {
        title: "Calce pensado para entrenar",
        description: "Tiro alto, soporte cómodo y telas que acompañan cada repetición.",
      },
      {
        title: "Cambios simples",
        description: "Si la talla no era, te acompañamos para encontrar el ajuste correcto.",
      },
      {
        title: "Atención directa",
        description: "Resolvemos dudas por correo o Instagram antes y después de tu compra.",
      },
    ],
    social: {
      eyebrow: "Comunidad",
      title: "Síguenos en Instagram",
      description:
        "Drops, novedades, contenido de entrenamiento y primeras vistas de la línea masculina.",
      newsletterTitle: "Recibe el próximo drop",
      newsletterCopy: "Sé la primera en saber cuando lleguen nuevos colores, tallas y colecciones.",
    },
    contact: {
      title: "Contacto",
      description: "Estamos para ayudarte. Escríbenos por cualquiera de estos canales.",
      emailLabel: "Correo",
    },
    comingSoon: {
      cta: "Avisarme del drop",
      viewMore: "Ver más",
      subscribed: "Te avisaremos cuando esté disponible",
    },
    footerLinks: {
      store: {
        title: "Tenacious Built",
        links: [
          { label: "Catálogo mujer", view: "catalog" },
          { label: "Top ventas", view: "top-sellers" },
          { label: "Nuestra historia", view: "about" },
          { label: "Embajadoras", view: "embajadoras" },
          { label: "Próximo drop hombre", view: "men-drop" },
        ],
      },
      info: {
        title: "Información",
        links: [
          { label: "Preguntas frecuentes", view: "faq" },
          { label: "Política de cambios", view: "exchanges" },
          { label: "Guía de tallas", view: "size-guide" },
        ],
      },
      policies: {
        title: "Políticas",
        links: [
          { label: "Política de privacidad", view: "privacy" },
          { label: "Términos y condiciones", view: "terms" },
          { label: "Despachos", view: "shipping" },
        ],
      },
      support: {
        title: "Contacto",
        links: [
          { label: "tenaciousbuilt@gmail.com", href: "mailto:tenaciousbuilt@gmail.com" },
          { label: "@tenacious_built", href: "https://www.instagram.com/tenacious_built" },
        ],
      },
    },
    pages: {
      about: {
        title: "Nuestra historia",
        intro: "Más que ropa deportiva. Una marca creada desde la pasión por el entrenamiento y la confianza en cada mujer.",
        sections: [
          {
            subtitle: "Cómo nació Tenacious Built",
            text: "Tenacious nació de una idea simple: crear prendas deportivas que realmente acompañen a la mujer que entrena con fuerza y determinación. No queríamos una marca más de ropa fitness. Queríamos algo que representara actitud, calidad y presencia.",
          },
          {
            subtitle: "Nuestro propósito",
            text: "Creemos que vestir bien para entrenar no es vanidad — es intención. Cada prenda está pensada para que te sientas segura, cómoda y con la confianza de dar todo en cada repetición. Diseñamos para la mujer que no se conforma, que entrena con propósito y vive con fuerza.",
          },
          {
            subtitle: "Lo que nos mueve",
            text: "Nos mueve ver mujeres que se sienten bien consigo mismas, que entrenan por salud, por fuerza, por disciplina. Tenacious Built es para ellas — para las que se levantan temprano, las que no paran, las que construyen su mejor versión día a día.",
          },
          {
            subtitle: "Calidad sobre cantidad",
            text: "Trabajamos con telas técnicas, costuras planas y calce pensado para el movimiento real. No lanzamos colecciones masivas — preferimos pocas prendas bien hechas que muchas sin identidad. Cada pieza lleva nuestro sello: resistencia, comodidad y diseño limpio.",
          },
          {
            subtitle: "Nuestra misión",
            text: "Crear prendas que hagan sentir a cada persona fuerte, capaz e imparable.",
          },
          {
            subtitle: "Nuestra visión",
            text: "Ser una marca deportiva mundial, reconocida por representar fuerza, confianza y superación.",
          },
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        sections: [
          {
            question: "¿Cómo puedo hacer un pedido?",
            answer: "Puedes hacer tu pedido directamente desde nuestra web. Selecciona los productos, elige talla y color, agrégalos al carrito y completa el formulario de checkout. Nos contactaremos contigo para confirmar disponibilidad y coordinar el pago.",
          },
          {
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos transferencia bancaria, tarjetas de crédito/débito (Visa, Mastercard, Amex) y pagos a través de MercadoPago. Te enviaremos los datos una vez confirmes tu pedido.",
          },
          {
            question: "¿Cuánto demora el envío?",
            answer: "Los envíos dentro de Santiago se realizan en 1-3 días hábiles. Para regiones, el plazo es de 3-7 días hábiles dependiendo de la zona. Te enviaremos el número de seguimiento una vez despachado.",
          },
          {
            question: "¿Puedo cambiar mi pedido después de confirmarlo?",
            answer: "Si aún no hemos despachado tu pedido, puedes solicitar cambios escribiéndonos por Instagram o correo. Una vez despachado, aplica nuestra política de cambios y devoluciones.",
          },
          {
            question: "¿Las tallas son estándar?",
            answer: "Nuestras prendas tienen un calce ajustado pensado para entrenamiento. Te recomendamos revisar nuestra guía de tallas antes de comprar. Si tienes dudas, escríbenos y te ayudamos a elegir.",
          },
          {
            question: "¿Tienen tienda física?",
            answer: "Por ahora operamos 100% online. Esto nos permite ofrecer mejores precios y atención personalizada. Puedes ver y tocar nuestros productos en eventos y pop-ups que anunciamos por Instagram.",
          },
        ],
      },
      exchanges: {
        title: "Política de cambios",
        intro: "Aceptamos solicitudes de cambio dentro de los 10 días posteriores a la recepción de tu pedido.",
        sections: [
          {
            subtitle: "Requisitos para gestionar tu cambio",
            text: "La prenda debe encontrarse sin uso, libre de manchas, aromas o señales de uso, con sus etiquetas y empaque original, y en perfectas condiciones tal como fue entregada.",
          },
          {
            subtitle: "Importante",
            text: "Por cuidado e higiene, no realizamos cambios de prendas usadas o con marcas, ya que no pueden volver a venderse.",
          },
          {
            subtitle: "Disponibilidad",
            text: "Los cambios están sujetos a disponibilidad de stock.",
          },
          {
            subtitle: "Costo de envío",
            text: "El costo de envío asociado al cambio es responsabilidad de la clienta.",
          },
          {
            subtitle: "¿Cómo solicitar un cambio?",
            text: "Escríbenos a tenaciousbuilt@gmail.com o por Instagram con tu número de pedido, el producto que deseas cambiar y la nueva talla o color. Te indicaremos los pasos a seguir.",
          },
        ],
      },
      "size-guide": {
        title: "Guía de tallas",
        intro: "Nuestras prendas tienen un calce ajustado y técnico, pensado para entrenamiento. Medidas en centímetros.",
        sizeTables: [
          {
            name: "Top deportivo (sostén)",
            headers: ["Talla", "Chile", "Largo", "Busto"],
            rows: [
              ["S", "36", "36.6", "64.0"],
              ["M", "38", "37.6", "68.1"],
              ["L", "40-42", "38.6", "71.9"],
            ],
          },
          {
            name: "Short deportivo",
            headers: ["Talla", "Chile", "Cadera", "Largo", "Cintura"],
            rows: [
              ["S", "36", "69.1", "30", "56.9"],
              ["M", "38", "72.9", "31", "61"],
              ["L", "40-42", "77", "32", "65"],
            ],
          },
          {
            name: "Top deportivo (polera)",
            headers: ["Talla", "Chile", "Largo", "Busto"],
            rows: [
              ["S", "36", "47", "65"],
              ["M", "38", "48", "70.1"],
              ["L", "40-42", "50", "74.9"],
            ],
          },
          {
            name: "Sostén deportivo",
            headers: ["Talla", "Chile", "Largo", "Bajo busto", "Busto"],
            rows: [
              ["S", "36", "23.1", "52.1", "59.9"],
              ["M", "38", "24.9", "55.9", "64"],
              ["L", "40-42", "25.9", "59.9", "68.1"],
            ],
          },
        ],
        tips: [
          "Si estás entre dos tallas, te recomendamos la talla mayor para mayor comodidad.",
          "Mide sobre tu cuerpo sin ropa o con ropa ajustada.",
          "Si tienes dudas, escríbenos con tus medidas y te ayudamos a elegir.",
        ],
      },
      privacy: {
        title: "Política de privacidad",
        intro: "En Tenacious Built nos comprometemos a proteger tu información personal. Esta política describe cómo recopilamos, usamos y protegemos tus datos.",
        sections: [
          {
            subtitle: "Información que recopilamos",
            text: "Recopilamos tu nombre, correo electrónico, dirección de envío y datos de contacto cuando realizas un pedido o te suscribes a nuestro newsletter. No almacenamos datos de tarjetas de crédito.",
          },
          {
            subtitle: "Uso de la información",
            text: "Usamos tus datos para procesar pedidos, enviar confirmaciones, coordinar despachos y enviarte novedades si te suscribiste. No vendemos ni compartimos tu información con terceros.",
          },
          {
            subtitle: "Protección de datos",
            text: "Tu información se almacena de forma segura. Utilizamos conexiones cifradas (HTTPS) y acceso restringido a los datos personales.",
          },
          {
            subtitle: "Cookies",
            text: "Nuestro sitio puede usar cookies para mejorar tu experiencia de navegación. Puedes desactivarlas en tu navegador sin afectar la funcionalidad básica del sitio.",
          },
          {
            subtitle: "Tus derechos",
            text: "Puedes solicitar la eliminación o modificación de tus datos personales en cualquier momento escribiéndonos a tenaciousbuilt@gmail.com.",
          },
        ],
      },
      terms: {
        title: "Términos y condiciones",
        intro: "Al usar este sitio web y realizar compras en Tenacious Built, aceptas los siguientes términos y condiciones.",
        sections: [
          {
            subtitle: "Uso del sitio",
            text: "Este sitio es propiedad de Tenacious Built. El contenido, imágenes y diseño están protegidos por derechos de autor. No está permitida su reproducción sin autorización.",
          },
          {
            subtitle: "Productos y precios",
            text: "Los precios publicados están en pesos chilenos (CLP) e incluyen IVA. Nos reservamos el derecho de modificar precios sin previo aviso. El precio válido es el vigente al momento de confirmar tu pedido.",
          },
          {
            subtitle: "Disponibilidad",
            text: "Todos los productos están sujetos a disponibilidad. Si un producto se agota después de tu compra, te contactaremos para ofrecerte alternativas o un reembolso completo.",
          },
          {
            subtitle: "Confirmación de pedido",
            text: "Un pedido se considera confirmado una vez que recibes nuestro correo de confirmación con los datos de pago. El despacho se realiza una vez verificado el pago.",
          },
          {
            subtitle: "Responsabilidad",
            text: "Tenacious Built no se hace responsable por retrasos en el envío causados por terceros (courier, aduanas, fuerza mayor). Haremos nuestro mejor esfuerzo por mantener los plazos informados.",
          },
          {
            subtitle: "Modificaciones",
            text: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página y aplican desde su publicación.",
          },
        ],
      },
      shipping: {
        title: "Despachos",
        intro: "Realizamos envíos a todo Chile. Aquí encontrarás toda la información sobre plazos, costos y seguimiento.",
        sections: [
          {
            subtitle: "Cobertura",
            text: "Despachamos a todo Chile continental a través de servicios de courier confiables (Starken, Chilexpress, Blue Express).",
          },
          {
            subtitle: "Plazos de entrega",
            text: "Santiago: 1-3 días hábiles. Regiones: 3-7 días hábiles. Zonas extremas: 5-10 días hábiles. Los plazos comienzan a contar desde la confirmación del pago.",
          },
          {
            subtitle: "Costos de envío",
            text: "Santiago: $3.990. Regiones: $4.990 - $6.990 dependiendo de la zona. Envío gratis en compras sobre $80.000.",
          },
          {
            subtitle: "Seguimiento",
            text: "Una vez despachado tu pedido, recibirás un correo con el número de seguimiento para que puedas rastrear tu paquete en tiempo real.",
          },
          {
            subtitle: "Retiro en punto",
            text: "Por ahora no contamos con puntos de retiro. Todos los pedidos se envían directamente a la dirección que indiques al momento de la compra.",
          },
        ],
      },
      "top-sellers": {
        title: "Top ventas",
        isProductPage: true,
        description: "Las prendas más elegidas por nuestra comunidad. Calce probado, telas favoritas y combinaciones que funcionan.",
      },
      "men-drop": {
        title: "Línea hombre",
        comingSoon: true,
        message: "La primera colección masculina de Tenacious está en desarrollo. Pensada para fuerza, volumen y movilidad. Síguenos en Instagram para enterarte del lanzamiento antes que nadie.",
      },
    },
  },
  en: {
    languageLabel: "English",
    brand: {
      name: "Tenacious Built",
      legalName: "Tenacious Built",
      tagline: "Built for every rep.",
      logoText: "T",
      logo: sharedImages.logo,
      announcement: "Official Tenacious Built site | Chile-wide shipping | Easy exchanges",
      instagram: "https://www.instagram.com/tenacious_built?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "tenaciousbuilt@gmail.com",
    },
    nav: [
      { label: "Women", href: "#women" },
      { label: "Catalog", view: "catalog" },
      { label: "Collections", href: "#collections" },
      { label: "Top sellers", href: "#women" },
      { label: "Coming Soon", view: "coming-soon" },
      { label: "Contact", view: "contact" },
    ],
    ui: {
      search: "Search",
      account: "Account",
      cart: "Cart",
      menu: "Menu",
      close: "Close",
      language: "Language",
      searchPlaceholder: "Search leggings, tops or sets",
      searchEmpty: "Try searching by category, color or garment type.",
      accountTitle: "Your Tenacious account",
      accountCopy:
        "Sign in to save favorites, review your orders and receive new drops early.",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      createAccount: "Create account",
      createAccountTitle: "Create account",
      fullName: "Full name",
      cartTitle: "Your cart",
      emptyCart: "Your cart is empty.",
      addedToCart: "Added to cart",
      viewOptions: "View options",
      addToCart: "Add to cart",
      chooseSize: "Choose a size",
      chooseColor: "Choose a color",
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      checkout: "Go to checkout",
      checkoutTitle: "Checkout",
      checkoutCopy: "Complete your details and we will contact you to confirm availability, payment and shipping.",
      continueShopping: "Continue shopping",
      orderSummary: "Order summary",
      customerData: "Contact details",
      address: "Shipping address",
      city: "City",
      submitOrder: "Send order",
      catalog: "Catalog",
      filters: "Filters",
      all: "All",
      sort: "Sort",
      newest: "Newest",
      priceLow: "Lowest price",
      priceHigh: "Highest price",
      clearFilters: "Clear filters",
      comingSoon: "Coming soon",
      followInstagram: "View Instagram",
      contactEmail: "Email us",
    },
    hero: {
      eyebrow: "Women's training wear",
      title: "Strength, fit and presence for every session.",
      description:
        "More than sportswear. The reflection of a woman who turned her challenges into strength and her discipline into power.",
      primaryCta: "Shop now",
      secondaryCta: "View collections",
      image: sharedImages.hero,
    },
    spotlight: {
      eyebrow: "New silhouette",
      title: "Designed to move with confidence, in and out of the gym.",
      description:
        "A curated selection built around secure fit, soft textures and combinations that work for training, recovery and daily routines.",
      features: ["Comfort support", "Soft textures", "Secure fit"],
      images: sharedImages.spotlight,
    },
    styleTileImages: sharedImages.styleTiles,
    styleTiles: {
      tile1: "Train with style, perform with strength.",
      tile2: "Design that supports every rep.",
    },
    stats: [
      { value: "4-way", label: "stretch" },
      { value: "24/7", label: "comfort" },
      { value: "2026", label: "men drop" },
    ],
    collections: {
      eyebrow: "Collections",
      title: "Shop by training style.",
    },
    featureStrip: [
      "Easy exchanges",
      "Chile-wide shipping",
      "Secure payment",
      "Instagram support",
    ],
    categories: [
      {
        title: "Shorts",
        description: "Firm fit, high waist and total mobility.",
        image: sharedImages.categories[0],
      },
      {
        title: "Sports Bras",
        description: "Medium support for intense training.",
        image: sharedImages.categories[1],
      },
      {
        title: "Tops",
        description: "Comfort and style for training and everyday.",
        image: sharedImages.categories[2],
      },
    ],
    productSection: {
      eyebrow: "Women",
      title: "Latest at Tenacious Built.",
      description:
        "Selected pieces to train hard, move comfortably and keep a clean presence inside and outside the gym.",
      tabs: ["Top sellers", "New arrivals", "Shorts", "Tops"],
    },
    products: [],
    menComingSoon: {
      title: "Men's line in development",
      description:
        "The first men's collection is being built for strength, volume and mobility. This section is ready without distracting from the current women's launch.",
      cta: "Notify me",
    },
    benefits: [
      {
        title: "Fit made for training",
        description: "High-rise support, comfortable compression and fabric that moves with every rep.",
      },
      {
        title: "Easy exchanges",
        description: "If the size is not right, we help you find the correct fit.",
      },
      {
        title: "Direct support",
        description: "Reach us by email or Instagram before and after your purchase.",
      },
    ],
    social: {
      eyebrow: "Community",
      title: "Follow us on Instagram",
      description:
        "Drops, new arrivals, training content and first looks at the men's line.",
      newsletterTitle: "Get the next drop",
      newsletterCopy: "Be the first to know when new colors, sizes and collections arrive.",
    },
    contact: {
      title: "Contact",
      description: "We're here to help. Reach us through any of these channels.",
      emailLabel: "Email",
    },
    comingSoon: {
      cta: "Notify me",
      viewMore: "Learn more",
      subscribed: "We'll notify you when it's available",
    },
    footerLinks: {
      store: {
        title: "Tenacious Built",
        links: [
          { label: "Women's catalog", view: "catalog" },
          { label: "Top sellers", view: "top-sellers" },
          { label: "Our story", view: "about" },
          { label: "Ambassadors", view: "embajadoras" },
          { label: "Men's next drop", view: "men-drop" },
        ],
      },
      info: {
        title: "Information",
        links: [
          { label: "FAQ", view: "faq" },
          { label: "Exchange policy", view: "exchanges" },
          { label: "Size guide", view: "size-guide" },
        ],
      },
      policies: {
        title: "Policies",
        links: [
          { label: "Privacy policy", view: "privacy" },
          { label: "Terms and conditions", view: "terms" },
          { label: "Shipping", view: "shipping" },
        ],
      },
      support: {
        title: "Contact",
        links: [
          { label: "tenaciousbuilt@gmail.com", href: "mailto:tenaciousbuilt@gmail.com" },
          { label: "@tenacious_built", href: "https://www.instagram.com/tenacious_built" },
        ],
      },
    },
    pages: {
      about: {
        title: "Our story",
        intro: "More than sportswear. A brand born from passion for training and confidence in every woman.",
        sections: [
          {
            subtitle: "How Tenacious Built was born",
            text: "Tenacious was born from a simple idea: create sportswear that truly supports women who train with strength and determination. We didn't want just another fitness brand. We wanted something that represents attitude, quality and presence.",
          },
          {
            subtitle: "Our purpose",
            text: "We believe dressing well for training isn't vanity — it's intention. Every garment is designed to make you feel secure, comfortable and confident to give everything in every rep. We design for women who don't settle, who train with purpose and live with strength.",
          },
          {
            subtitle: "What drives us",
            text: "We're driven by seeing women who feel good about themselves, who train for health, strength and discipline. Tenacious Built is for them — for those who wake up early, who don't stop, who build their best version every day.",
          },
          {
            subtitle: "Quality over quantity",
            text: "We work with technical fabrics, flat seams and fit designed for real movement. We don't launch massive collections — we prefer few well-made pieces over many without identity. Each piece carries our seal: resistance, comfort and clean design.",
          },
          {
            subtitle: "Our mission",
            text: "Create garments that make every person feel strong, capable and unstoppable.",
          },
          {
            subtitle: "Our vision",
            text: "Be a world-class sports brand, recognized for representing strength, confidence and overcoming.",
          },
        ],
      },
      faq: {
        title: "Frequently asked questions",
        sections: [
          {
            question: "How do I place an order?",
            answer: "You can order directly from our website. Select products, choose size and color, add them to cart and complete the checkout form. We'll contact you to confirm availability and coordinate payment.",
          },
          {
            question: "What payment methods do you accept?",
            answer: "We accept bank transfers, credit/debit cards (Visa, Mastercard, Amex) and MercadoPago. We'll send you payment details once you confirm your order.",
          },
          {
            question: "How long does shipping take?",
            answer: "Shipping within Santiago takes 1-3 business days. For other regions, delivery takes 3-7 business days depending on the area. We'll send you a tracking number once dispatched.",
          },
          {
            question: "Can I change my order after confirming?",
            answer: "If we haven't shipped your order yet, you can request changes via Instagram or email. Once shipped, our exchanges and returns policy applies.",
          },
          {
            question: "Are sizes standard?",
            answer: "Our garments have a fitted cut designed for training. We recommend checking our size guide before purchasing. If in doubt, reach out and we'll help you choose.",
          },
          {
            question: "Do you have a physical store?",
            answer: "We currently operate 100% online. This allows us to offer better prices and personalized service. You can see our products in person at events and pop-ups announced on Instagram.",
          },
        ],
      },
      exchanges: {
        title: "Exchange policy",
        intro: "We accept exchange requests within 10 days after receiving your order.",
        sections: [
          {
            subtitle: "Requirements for your exchange",
            text: "The garment must be unworn, free of stains, odors or signs of use, with its original tags and packaging, and in perfect condition as it was delivered.",
          },
          {
            subtitle: "Important",
            text: "For hygiene and care reasons, we do not accept exchanges of worn garments or items with marks, as they cannot be resold.",
          },
          {
            subtitle: "Availability",
            text: "Exchanges are subject to stock availability.",
          },
          {
            subtitle: "Shipping cost",
            text: "The shipping cost associated with the exchange is the customer's responsibility.",
          },
          {
            subtitle: "How to request an exchange?",
            text: "Email us at tenaciousbuilt@gmail.com or message us on Instagram with your order number, the product you want to exchange and the new size or color. We'll guide you through the process.",
          },
        ],
      },
      "size-guide": {
        title: "Size guide",
        intro: "Our garments have a fitted, technical cut designed for training. Measurements in centimeters.",
        sizeTables: [
          {
            name: "Sports top (bra style)",
            headers: ["Size", "Chile", "Length", "Bust"],
            rows: [
              ["S", "36", "36.6", "64.0"],
              ["M", "38", "37.6", "68.1"],
              ["L", "40-42", "38.6", "71.9"],
            ],
          },
          {
            name: "Sports short",
            headers: ["Size", "Chile", "Hips", "Length", "Waist"],
            rows: [
              ["S", "36", "69.1", "30", "56.9"],
              ["M", "38", "72.9", "31", "61"],
              ["L", "40-42", "77", "32", "65"],
            ],
          },
          {
            name: "Sports top (tee)",
            headers: ["Size", "Chile", "Length", "Bust"],
            rows: [
              ["S", "36", "47", "65"],
              ["M", "38", "48", "70.1"],
              ["L", "40-42", "50", "74.9"],
            ],
          },
          {
            name: "Sports bra",
            headers: ["Size", "Chile", "Length", "Under bust", "Bust"],
            rows: [
              ["S", "36", "23.1", "52.1", "59.9"],
              ["M", "38", "24.9", "55.9", "64"],
              ["L", "40-42", "25.9", "59.9", "68.1"],
            ],
          },
        ],
        tips: [
          "If you're between two sizes, we recommend going up for more comfort.",
          "Measure over your body without clothes or with fitted clothing.",
          "If in doubt, send us your measurements and we'll help you choose.",
        ],
      },
      privacy: {
        title: "Privacy policy",
        intro: "At Tenacious Built we are committed to protecting your personal information. This policy describes how we collect, use and protect your data.",
        sections: [
          {
            subtitle: "Information we collect",
            text: "We collect your name, email, shipping address and contact details when you place an order or subscribe to our newsletter. We do not store credit card data.",
          },
          {
            subtitle: "Use of information",
            text: "We use your data to process orders, send confirmations, coordinate shipping and send you updates if you subscribed. We do not sell or share your information with third parties.",
          },
          {
            subtitle: "Data protection",
            text: "Your information is stored securely. We use encrypted connections (HTTPS) and restricted access to personal data.",
          },
          {
            subtitle: "Cookies",
            text: "Our site may use cookies to improve your browsing experience. You can disable them in your browser without affecting basic site functionality.",
          },
          {
            subtitle: "Your rights",
            text: "You can request deletion or modification of your personal data at any time by emailing tenaciousbuilt@gmail.com.",
          },
        ],
      },
      terms: {
        title: "Terms and conditions",
        intro: "By using this website and making purchases at Tenacious Built, you accept the following terms and conditions.",
        sections: [
          {
            subtitle: "Site usage",
            text: "This site is owned by Tenacious Built. Content, images and design are protected by copyright. Reproduction without authorization is not permitted.",
          },
          {
            subtitle: "Products and pricing",
            text: "Published prices are in Chilean pesos (CLP) and include VAT. We reserve the right to modify prices without prior notice. The valid price is the one at the time of order confirmation.",
          },
          {
            subtitle: "Availability",
            text: "All products are subject to availability. If a product sells out after your purchase, we'll contact you to offer alternatives or a full refund.",
          },
          {
            subtitle: "Order confirmation",
            text: "An order is considered confirmed once you receive our confirmation email with payment details. Shipping is processed once payment is verified.",
          },
          {
            subtitle: "Liability",
            text: "Tenacious Built is not responsible for shipping delays caused by third parties (courier, customs, force majeure). We'll do our best to meet stated delivery times.",
          },
          {
            subtitle: "Modifications",
            text: "We reserve the right to modify these terms at any time. Changes will be published on this page and apply from the date of publication.",
          },
        ],
      },
      shipping: {
        title: "Shipping",
        intro: "We ship throughout Chile. Here you'll find all information about delivery times, costs and tracking.",
        sections: [
          {
            subtitle: "Coverage",
            text: "We ship to all of continental Chile through reliable courier services (Starken, Chilexpress, Blue Express).",
          },
          {
            subtitle: "Delivery times",
            text: "Santiago: 1-3 business days. Regions: 3-7 business days. Remote areas: 5-10 business days. Times start from payment confirmation.",
          },
          {
            subtitle: "Shipping costs",
            text: "Santiago: $3,990. Regions: $4,990 - $6,990 depending on the area. Free shipping on orders over $80,000.",
          },
          {
            subtitle: "Tracking",
            text: "Once your order is shipped, you'll receive an email with a tracking number so you can follow your package in real time.",
          },
          {
            subtitle: "Pickup points",
            text: "We currently don't have pickup points. All orders are shipped directly to the address you provide at checkout.",
          },
        ],
      },
      "top-sellers": {
        title: "Top sellers",
        isProductPage: true,
        description: "The most chosen pieces by our community. Proven fit, favorite fabrics and combinations that work.",
      },
      "men-drop": {
        title: "Men's line",
        comingSoon: true,
        message: "The first men's collection from Tenacious is in development. Built for strength, volume and mobility. Follow us on Instagram to be the first to know about the launch.",
      },
    },
  },
};

