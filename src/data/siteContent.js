const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const sharedImages = {
  logo: assetPath("images/tenacious-logo-pink.png"),
  hero: assetPath("images/hero-tenacious.png"),
  categories: [
    assetPath("images/product-legging.png"),
    assetPath("images/product-bra.png"),
    assetPath("images/product-set.png"),
  ],
  products: [
    assetPath("images/product-legging.png"),
    assetPath("images/product-bra.png"),
    assetPath("images/product-set.png"),
    assetPath("images/product-tee.png"),
  ],
};

export const contentByLanguage = {
  es: {
    languageLabel: "Español",
    brand: {
      name: "tenacious",
      legalName: "tenacious_built",
      tagline: "Creada para cada repetición.",
      logoText: "T",
      logo: sharedImages.logo,
      announcement: "Sitio oficial Tenacious | Envíos a todo Chile | Cambios simples",
      instagram: "https://www.instagram.com/tenacious_built?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "tenaciousbuilt@gmail.com",
    },
    nav: [
      { label: "Mujer", href: "#women" },
      { label: "Catálogo", view: "catalog" },
      { label: "Colecciones", href: "#collections" },
      { label: "Top ventas", href: "#top-sellers" },
      { label: "Hombre próximamente", href: "#men" },
      { label: "Contacto", href: "#contact" },
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
        "Prendas técnicas, cómodas y versátiles para entrenar, moverte y vestir con intención dentro y fuera del gimnasio.",
      primaryCta: "Comprar mujer",
      secondaryCta: "Ver colecciones",
      image: sharedImages.hero,
    },
    spotlight: {
      eyebrow: "Nueva silueta",
      title: "Performance que se siente limpia, firme y lista para moverse.",
      description:
        "Una selección pensada para calce seguro, telas suaves y combinaciones que funcionan en entrenamiento, descanso y rutina diaria.",
      features: ["Soporte cómodo", "Texturas suaves", "Calce seguro"],
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
        title: "Leggings",
        description: "Compresión media, tiro alto y acabado suave.",
        image: sharedImages.categories[0],
      },
      {
        title: "Tops",
        description: "Soporte para entrenamientos intensos y looks limpios.",
        image: sharedImages.categories[1],
      },
      {
        title: "Sets",
        description: "Combinaciones listas para entrenar y salir.",
        image: sharedImages.categories[2],
      },
    ],
    productSection: {
      eyebrow: "Mujer",
      title: "Lo último en Tenacious.",
      description:
        "Prendas seleccionadas para entrenar fuerte, moverte cómoda y mantener una presencia limpia dentro y fuera del gym.",
      tabs: ["Top ventas", "Novedades", "Sets", "Leggings"],
    },
    products: [
      {
        name: "Core Sculpt Legging",
        type: "Legging",
        price: "$39.990",
        numericPrice: 39990,
        badge: "Nuevo",
        color: "Black rose",
        category: "Leggings",
        description:
          "Legging de tiro alto con soporte medio, tacto suave y ajuste firme para entrenamientos de fuerza.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black rose", "Graphite", "Deep black"],
        image: sharedImages.products[0],
      },
      {
        name: "Tenacious Training Bra",
        type: "Top",
        price: "$29.990",
        numericPrice: 29990,
        badge: "Mejor ajuste",
        color: "Graphite",
        category: "Tops",
        description:
          "Top deportivo de soporte medio con tirantes firmes y terminación limpia para uso diario.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Graphite", "Rose shadow", "Black"],
        image: sharedImages.products[1],
      },
      {
        name: "Motion Seamless Set",
        type: "Set",
        price: "$64.990",
        numericPrice: 64990,
        badge: "Drop",
        color: "Carbon pink",
        category: "Sets",
        description:
          "Set seamless de calce cómodo, pensado para movilidad, cardio y entrenamiento funcional.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Carbon pink", "Charcoal", "Midnight"],
        image: sharedImages.products[2],
      },
      {
        name: "Oversized Pump Tee",
        type: "Polera",
        price: "$27.990",
        numericPrice: 27990,
        badge: "Gym",
        color: "Washed black",
        category: "Poleras",
        description:
          "Polera oversized de algodón suave para calentamiento, entrenamiento y descanso.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Washed black", "Stone", "Rose ink"],
        image: sharedImages.products[3],
      },
      {
        name: "Rose Lift Short",
        type: "Short",
        price: "$31.990",
        numericPrice: 31990,
        badge: "Nuevo",
        color: "Rose shadow",
        category: "Shorts",
        description:
          "Short de entrenamiento con calce firme, pretina alta y movilidad para pierna/glúteo.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Rose shadow", "Black", "Graphite"],
        image: sharedImages.products[0],
      },
      {
        name: "Power Zip Jacket",
        type: "Chaqueta",
        price: "$49.990",
        numericPrice: 49990,
        badge: "Layer",
        color: "Deep black",
        category: "Chaquetas",
        description:
          "Chaqueta ligera para entrada y salida del gym, con calce limpio y tacto suave.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Deep black", "Graphite"],
        image: sharedImages.products[3],
      },
      {
        name: "Everyday Ribbed Top",
        type: "Top",
        price: "$25.990",
        numericPrice: 25990,
        badge: "Ribbed",
        color: "Carbon pink",
        category: "Tops",
        description:
          "Top ribbed de uso diario, cómodo para entrenar suave o combinar con sets.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Carbon pink", "Black"],
        image: sharedImages.products[1],
      },
      {
        name: "Sculpt Seamless Legging",
        type: "Legging",
        price: "$42.990",
        numericPrice: 42990,
        badge: "Seamless",
        color: "Midnight",
        category: "Leggings",
        description:
          "Legging seamless con textura sutil, compresión media y sensación envolvente.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Midnight", "Black rose", "Charcoal"],
        image: sharedImages.products[2],
      },
    ],
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
    footerLinks: {
      store: {
        title: "Tenacious",
        links: [
          { label: "Catálogo mujer", view: "catalog" },
          { label: "Top ventas", href: "#top-sellers" },
          { label: "Próximo drop hombre", href: "#men" },
        ],
      },
      info: {
        title: "Información",
        links: [
          { label: "Preguntas frecuentes", view: "faq" },
          { label: "Cambios y devoluciones", view: "exchanges" },
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
        title: "Cambios y devoluciones",
        intro: "En Tenacious queremos que estés conforme con tu compra. Si algo no te queda bien, te ayudamos.",
        sections: [
          {
            subtitle: "Plazo para cambios",
            text: "Tienes 10 días corridos desde que recibes tu pedido para solicitar un cambio de talla o color, siempre que la prenda esté sin uso, con etiquetas y en su empaque original.",
          },
          {
            subtitle: "¿Cómo solicitar un cambio?",
            text: "Escríbenos a tenaciousbuilt@gmail.com o por Instagram con tu número de pedido, el producto que deseas cambiar y la nueva talla o color. Te indicaremos los pasos a seguir.",
          },
          {
            subtitle: "Costos de envío en cambios",
            text: "El costo de envío del cambio corre por cuenta del cliente. Si el cambio es por un error nuestro (producto equivocado o defectuoso), asumimos el costo completo.",
          },
          {
            subtitle: "Devoluciones",
            text: "Aceptamos devoluciones dentro de los 10 días si la prenda presenta un defecto de fabricación. No se aceptan devoluciones por cambio de opinión. El reembolso se realiza por el mismo medio de pago original.",
          },
          {
            subtitle: "Productos en promoción",
            text: "Los productos adquiridos en promoción o liquidación solo pueden ser cambiados por otra talla del mismo producto, sujeto a disponibilidad.",
          },
        ],
      },
      "size-guide": {
        title: "Guía de tallas",
        intro: "Nuestras prendas tienen un calce ajustado y técnico, pensado para entrenamiento. Te recomendamos medir tu cuerpo y comparar con la tabla.",
        table: {
          headers: ["Talla", "Pecho (cm)", "Cintura (cm)", "Cadera (cm)"],
          rows: [
            ["XS", "78-82", "58-62", "84-88"],
            ["S", "82-86", "62-66", "88-92"],
            ["M", "86-90", "66-70", "92-96"],
            ["L", "90-94", "70-74", "96-100"],
            ["XL", "94-98", "74-78", "100-104"],
          ],
        },
        tips: [
          "Si estás entre dos tallas, te recomendamos la talla mayor para mayor comodidad.",
          "Para leggings, prioriza la medida de cadera.",
          "Para tops y bras, prioriza la medida de pecho.",
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
    },
  },
  en: {
    languageLabel: "English",
    brand: {
      name: "tenacious",
      legalName: "tenacious_built",
      tagline: "Built for every rep.",
      logoText: "T",
      logo: sharedImages.logo,
      announcement: "Official Tenacious site | Chile-wide shipping | Easy exchanges",
      instagram: "https://www.instagram.com/tenacious_built?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "tenaciousbuilt@gmail.com",
    },
    nav: [
      { label: "Women", href: "#women" },
      { label: "Catalog", view: "catalog" },
      { label: "Collections", href: "#collections" },
      { label: "Top sellers", href: "#top-sellers" },
      { label: "Men coming soon", href: "#men" },
      { label: "Contact", href: "#contact" },
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
        "Technical, comfortable and versatile pieces made for training, movement and intentional everyday styling.",
      primaryCta: "Shop women",
      secondaryCta: "View collections",
      image: sharedImages.hero,
    },
    spotlight: {
      eyebrow: "New silhouette",
      title: "Performance that feels clean, secure and ready to move.",
      description:
        "A curated selection built around secure fit, soft textures and combinations that work for training, recovery and daily routines.",
      features: ["Comfort support", "Soft textures", "Secure fit"],
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
        title: "Leggings",
        description: "Medium compression, high rise and a soft finish.",
        image: sharedImages.categories[0],
      },
      {
        title: "Tops",
        description: "Support for intense training and clean looks.",
        image: sharedImages.categories[1],
      },
      {
        title: "Sets",
        description: "Ready-to-wear combinations for gym and everyday plans.",
        image: sharedImages.categories[2],
      },
    ],
    productSection: {
      eyebrow: "Women",
      title: "Latest at Tenacious.",
      description:
        "Selected pieces to train hard, move comfortably and keep a clean presence inside and outside the gym.",
      tabs: ["Top sellers", "New arrivals", "Sets", "Leggings"],
    },
    products: [
      {
        name: "Core Sculpt Legging",
        type: "Legging",
        price: "$39.990",
        numericPrice: 39990,
        badge: "New",
        color: "Black rose",
        category: "Leggings",
        description:
          "High-rise legging with medium support, soft touch and a firm fit for strength training.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black rose", "Graphite", "Deep black"],
        image: sharedImages.products[0],
      },
      {
        name: "Tenacious Training Bra",
        type: "Top",
        price: "$29.990",
        numericPrice: 29990,
        badge: "Best fit",
        color: "Graphite",
        category: "Tops",
        description:
          "Medium-support sports bra with secure straps and a clean finish for daily wear.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Graphite", "Rose shadow", "Black"],
        image: sharedImages.products[1],
      },
      {
        name: "Motion Seamless Set",
        type: "Set",
        price: "$64.990",
        numericPrice: 64990,
        badge: "Drop",
        color: "Carbon pink",
        category: "Sets",
        description:
          "Comfortable seamless set designed for mobility, cardio and functional training.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Carbon pink", "Charcoal", "Midnight"],
        image: sharedImages.products[2],
      },
      {
        name: "Oversized Pump Tee",
        type: "T-shirt",
        price: "$27.990",
        numericPrice: 27990,
        badge: "Gym",
        color: "Washed black",
        category: "T-shirts",
        description:
          "Soft oversized cotton tee for warmups, training and recovery.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Washed black", "Stone", "Rose ink"],
        image: sharedImages.products[3],
      },
      {
        name: "Rose Lift Short",
        type: "Short",
        price: "$31.990",
        numericPrice: 31990,
        badge: "New",
        color: "Rose shadow",
        category: "Shorts",
        description:
          "Training short with a firm fit, high waistband and mobility for leg days.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Rose shadow", "Black", "Graphite"],
        image: sharedImages.products[0],
      },
      {
        name: "Power Zip Jacket",
        type: "Jacket",
        price: "$49.990",
        numericPrice: 49990,
        badge: "Layer",
        color: "Deep black",
        category: "Jackets",
        description:
          "Light jacket for entering and leaving the gym, with a clean fit and soft touch.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Deep black", "Graphite"],
        image: sharedImages.products[3],
      },
      {
        name: "Everyday Ribbed Top",
        type: "Top",
        price: "$25.990",
        numericPrice: 25990,
        badge: "Ribbed",
        color: "Carbon pink",
        category: "Tops",
        description:
          "Ribbed everyday top for lighter training sessions or set styling.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Carbon pink", "Black"],
        image: sharedImages.products[1],
      },
      {
        name: "Sculpt Seamless Legging",
        type: "Legging",
        price: "$42.990",
        numericPrice: 42990,
        badge: "Seamless",
        color: "Midnight",
        category: "Leggings",
        description:
          "Seamless legging with subtle texture, medium compression and a wrapped feel.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Midnight", "Black rose", "Charcoal"],
        image: sharedImages.products[2],
      },
    ],
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
    footerLinks: {
      store: {
        title: "Tenacious",
        links: [
          { label: "Women's catalog", view: "catalog" },
          { label: "Top sellers", href: "#top-sellers" },
          { label: "Men's next drop", href: "#men" },
        ],
      },
      info: {
        title: "Information",
        links: [
          { label: "FAQ", view: "faq" },
          { label: "Exchanges and returns", view: "exchanges" },
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
        title: "Exchanges and returns",
        intro: "At Tenacious we want you to be happy with your purchase. If something doesn't fit right, we'll help.",
        sections: [
          {
            subtitle: "Exchange window",
            text: "You have 10 calendar days from receiving your order to request a size or color exchange, as long as the garment is unworn, with tags and in its original packaging.",
          },
          {
            subtitle: "How to request an exchange?",
            text: "Email us at tenaciousbuilt@gmail.com or message us on Instagram with your order number, the product you want to exchange and the new size or color. We'll guide you through the process.",
          },
          {
            subtitle: "Shipping costs for exchanges",
            text: "Exchange shipping costs are covered by the customer. If the exchange is due to our error (wrong product or defect), we cover the full cost.",
          },
          {
            subtitle: "Returns",
            text: "We accept returns within 10 days if the garment has a manufacturing defect. Returns for change of mind are not accepted. Refunds are processed through the original payment method.",
          },
          {
            subtitle: "Sale items",
            text: "Products purchased on sale or clearance can only be exchanged for another size of the same product, subject to availability.",
          },
        ],
      },
      "size-guide": {
        title: "Size guide",
        intro: "Our garments have a fitted, technical cut designed for training. We recommend measuring your body and comparing with the chart.",
        table: {
          headers: ["Size", "Chest (cm)", "Waist (cm)", "Hips (cm)"],
          rows: [
            ["XS", "78-82", "58-62", "84-88"],
            ["S", "82-86", "62-66", "88-92"],
            ["M", "86-90", "66-70", "92-96"],
            ["L", "90-94", "70-74", "96-100"],
            ["XL", "94-98", "74-78", "100-104"],
          ],
        },
        tips: [
          "If you're between two sizes, we recommend going up for more comfort.",
          "For leggings, prioritize hip measurement.",
          "For tops and bras, prioritize chest measurement.",
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
    },
  },
};
