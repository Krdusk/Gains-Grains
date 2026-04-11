const PRODUCTS = [
  { id: 'eq1', name: 'Professional Power Rack', category: 'gym', basePrice: 24999, desc: 'Heavy-duty steel frame, 1000lb capacity', rating: 4.9, inStock: true, image: 'images/eq1.jpg', variants: ['Standard', 'Deluxe'], specs: '11-gauge steel | 200lbs' },
  { id: 'eq2', name: 'Dumbbell Set', category: 'gym', basePrice: 15999, desc: 'Space-saving design with stand', rating: 4.8, inStock: true, image: 'images/eq2.jpg', variants: ['5-25kg', '5-50kg'], specs: '5-50kg range | Includes stand' },
  { id: 'eq3', name: 'Olympic Barbell 20kg', category: 'gym', basePrice: 8999, desc: 'Premium steel, 1500lb capacity', rating: 4.9, inStock: true, image: 'images/eq3.jpg', variants: ['Chrome', 'Black Zinc'], specs: '7.2ft | 190k PSI' },
  { id: 'eq4', name: 'Weight Plates Set', category: 'gym', basePrice: 18999, desc: 'Rubber coated bumper plates', rating: 4.7, inStock: true, image: 'images/eq4.jpg', variants: ['100kg', '150kg'], specs: 'Rubber coated | Olympic size' },
  { id: 'eq5', name: 'Adjustable Bench Press', category: 'gym', basePrice: 12999, desc: '7 positions, 800lb capacity', rating: 4.8, inStock: true, image: 'images/eq5.jpg', variants: ['Standard', 'Pro'], specs: '7 positions | 800lb capacity' },
  { id: 'eq6', name: 'Cable Crossover Machine', category: 'gym', basePrice: 44999, desc: 'Dual pulleys, 200lb stack', rating: 4.9, inStock: true, image: 'images/eq6.jpg', variants: ['Standard', 'Commercial'], specs: '200lb stack | Dual pulleys' },
  { id: 'eq7', name: 'Resistance Bands Set', category: 'gym', basePrice: 1999, desc: '5 levels from X-light to XX-heavy', rating: 4.6, inStock: true, image: 'images/eq7.jpg', variants: ['5-Piece', '7-Piece'], specs: '5-150lbs resistance' },
  { id: 'eq8', name: 'Pull-up Bar', category: 'gym', basePrice: 2499, desc: 'Doorway mount, 300lb capacity', rating: 4.7, inStock: true, image: 'images/eq8.jpg', variants: ['Standard', 'Wide Grip'], specs: '300lb capacity | No-drill' },
  { id: 'eq9', name: 'Kettlebell Set', category: 'gym', basePrice: 7999, desc: 'Cast iron, color-coded set', rating: 4.8, inStock: true, image: 'images/eq9.jpg', variants: ['4-20kg', '8-32kg'], specs: 'Cast iron | Color coded' },
  { id: 'eq10', name: 'Premium Yoga Mat', category: 'gym', basePrice: 1499, desc: 'Eco-friendly, non-slip, 8mm', rating: 4.5, inStock: true, image: 'images/eq10.jpg', variants: ['Teal', 'Purple'], specs: '8mm thick | Non-slip' },
  { id: 'eq11', name: 'Hex Dumbbell Set', category: 'gym', basePrice: 24999, desc: 'Rubber hex dumbbells with rack', rating: 4.9, inStock: true, image: 'images/eq11.jpg', variants: ['5-50lbs', '10-100lbs'], specs: 'Rubber encased | Includes rack' },
  { id: 'eq12', name: 'Smith Machine', category: 'gym', basePrice: 39999, desc: 'Linear bearing system', rating: 4.9, inStock: true, image: 'images/eq12.jpg', variants: ['Standard', 'Pro'], specs: 'Linear bearings | Safety catches' },
  { id: 'eq13', name: 'Leg Press Machine', category: 'gym', basePrice: 34999, desc: 'Heavy-duty leg press', rating: 4.8, inStock: true, image: 'images/eq13.jpg', variants: ['Standard', 'Pro'], specs: '300lb stack | Heavy-duty' },
  { id: 'eq14', name: 'Treadmill Premium', category: 'gym', basePrice: 45999, desc: '3.5HP motor, incline 15%', rating: 4.9, inStock: true, image: 'images/eq14.jpg', variants: ['Standard', 'Pro'], specs: '3.5HP | 15% incline' },
  { id: 'eq15', name: 'Exercise Bike', category: 'gym', basePrice: 24999, desc: 'Magnetic resistance, LCD', rating: 4.7, inStock: true, image: 'images/eq15.jpg', variants: ['Standard', 'Pro'], specs: 'Magnetic | 300lb capacity' },
  { id: 'eq16', name: 'Rowing Machine', category: 'gym', basePrice: 29999, desc: 'Air resistance, folding', rating: 4.8, inStock: true, image: 'images/eq16.jpg', variants: ['Standard', 'Air'], specs: 'Air resistance | Folds' },
  { id: 'eq17', name: 'Medicine Ball Set', category: 'gym', basePrice: 4999, desc: 'Set of 4 medicine balls', rating: 4.6, inStock: true, image: 'images/eq17.jpg', variants: ['2-8kg', '4-12kg'], specs: 'Rubber shell | Textured' },
  { id: 'eq18', name: 'Battle Ropes', category: 'gym', basePrice: 3999, desc: '40ft battle rope', rating: 4.7, inStock: true, image: 'images/eq18.jpg', variants: ['30ft', '40ft'], specs: 'Polyester | 1.5" thick' },
  { id: 'eq19', name: 'Weighted Vest', category: 'gym', basePrice: 5999, desc: 'Adjustable weighted vest', rating: 4.8, inStock: true, image: 'images/eq19.jpg', variants: ['20lbs', '40lbs'], specs: 'Adjustable | Mesh' },
  { id: 'eq20', name: 'Ab Roller Wheel', category: 'gym', basePrice: 899, desc: 'Dual wheel ab roller', rating: 4.5, inStock: true, image: 'images/eq20.jpg', variants: ['Single', 'Dual'], specs: 'Includes knee pad' },
  { id: 'sp1', name: 'Basketball', category: 'sports', basePrice: 3499, desc: 'Official size 7, premium leather', rating: 4.8, inStock: true, image: 'images/sp1.jpg', variants: ['Size 6', 'Size 7'], specs: 'Premium leather' },
  { id: 'sp2', name: 'Soccer Ball', category: 'sports', basePrice: 2999, desc: 'FIFA quality, stitched', rating: 4.7, inStock: true, image: 'images/sp2.jpg', variants: ['Size 4', 'Size 5'], specs: 'PU leather | Butyl' },
  { id: 'sp3', name: 'Badminton Racket', category: 'sports', basePrice: 5999, desc: 'Lightweight 75g, pro grade', rating: 4.9, inStock: true, image: 'images/sp3.jpg', variants: ['Standard', 'Pro'], specs: '75g | Carbon fiber' },
  { id: 'sp4', name: 'Pickleball Paddle Set', category: 'sports', basePrice: 3999, desc: '2 paddles + 3 balls', rating: 4.8, inStock: true, image: 'images/sp4.jpg', variants: ['Standard', 'Pro'], specs: 'Graphite surface' },
  { id: 'sp5', name: 'Boxing Gloves', category: 'sports', basePrice: 3999, desc: 'Gel padding, premium leather', rating: 4.8, inStock: true, image: 'images/sp5.jpg', variants: ['12oz', '14oz', '16oz'], specs: 'Premium leather | Gel' },
  { id: 'sp6', name: 'Punching Bag', category: 'sports', basePrice: 6999, desc: '70lb, heavy-duty chains', rating: 4.7, inStock: true, image: 'images/sp6.jpg', variants: ['70lb', '100lb'], specs: 'Synthetic leather' },
  { id: 'sp7', name: 'Jump Rope', category: 'sports', basePrice: 899, desc: 'Ball bearings, adjustable', rating: 4.6, inStock: true, image: 'images/sp7.jpg', variants: ['Standard', 'Pro'], specs: 'Ball bearings' },
  { id: 'sp8', name: 'Swimming Goggles', category: 'sports', basePrice: 1499, desc: 'Anti-fog, UV protection', rating: 4.7, inStock: true, image: 'images/sp8.jpg', variants: ['Clear', 'Tinted'], specs: 'Anti-fog | UV' },
  { id: 'sp9', name: 'Tennis Racket', category: 'sports', basePrice: 8999, desc: 'Graphite, 300g', rating: 4.9, inStock: true, image: 'images/sp9.jpg', variants: ['Grip 2', 'Grip 3'], specs: 'Graphite | 300g' },
  { id: 'sp10', name: 'Volleyball', category: 'sports', basePrice: 2799, desc: 'Soft touch, indoor/outdoor', rating: 4.6, inStock: true, image: 'images/sp10.jpg', variants: ['Size 5', 'Size 4'], specs: 'Microfiber' },
  { id: 'sp11', name: 'Complete Skateboard', category: 'sports', basePrice: 4999, desc: 'Maple deck, ABEC-7', rating: 4.7, inStock: true, image: 'images/sp11.jpg', variants: ['31"', '32"'], specs: 'Maple | ABEC-7' },
  { id: 'sp12', name: 'Inline Roller Skates', category: 'sports', basePrice: 7999, desc: 'Adjustable size, LED wheels', rating: 4.5, inStock: true, image: 'images/sp12.jpg', variants: ['Small', 'Medium'], specs: 'LED wheels' },
  { id: 'sp13', name: 'Table Tennis Set', category: 'sports', basePrice: 2499, desc: '2 rackets + 3 balls', rating: 4.6, inStock: true, image: 'images/sp13.jpg', variants: ['Standard', 'Pro'], specs: 'Includes case' },
  { id: 'sp14', name: 'Cricket Bat Pro', category: 'sports', basePrice: 6999, desc: 'English willow', rating: 4.8, inStock: true, image: 'images/sp14.jpg', variants: ['SH', 'LH'], specs: 'English willow' },
  { id: 'sp15', name: 'Golf Driver Set', category: 'sports', basePrice: 15999, desc: '460cc, graphite shaft', rating: 4.8, inStock: true, image: 'images/sp15.jpg', variants: ['Stiff', 'Regular'], specs: '460cc | Graphite' },
  { id: 'sp16', name: 'Baseball Bat', category: 'sports', basePrice: 3999, desc: 'Aluminum alloy, BBCOR', rating: 4.7, inStock: true, image: 'images/sp16.jpg', variants: ['32"', '33"'], specs: 'Aluminum | BBCOR' },
  { id: 'sp17', name: 'Hockey Stick', category: 'sports', basePrice: 4999, desc: 'Composite, pro flex', rating: 4.7, inStock: true, image: 'images/sp17.jpg', variants: ['Senior', 'Inter'], specs: 'Composite' },
  { id: 'sp18', name: 'Archery Set', category: 'sports', basePrice: 8999, desc: 'Recurve bow with arrows', rating: 4.8, inStock: true, image: 'images/sp18.jpg', variants: ['20lb', '30lb'], specs: 'Recurve | Includes arrows' },
  { id: 'sp19', name: 'Frisbee Disc Golf', category: 'sports', basePrice: 2499, desc: '3 discs for disc golf', rating: 4.5, inStock: true, image: 'images/sp19.jpg', variants: ['Standard', 'Pro'], specs: '3 discs | PDGA' },
  { id: 'sp20', name: 'Kick Scooter', category: 'sports', basePrice: 5999, desc: 'Foldable, adjustable', rating: 4.6, inStock: true, image: 'images/sp20.jpg', variants: ['Kids', 'Adult'], specs: 'Foldable | 220lb' },
  { id: 'sup1', name: 'Whey Protein Isolate', category: 'supplements', basePrice: 3299, desc: '25g protein, low carb', rating: 4.9, inStock: true, image: 'images/sup1.jpg', variants: ['Chocolate', 'Vanilla'], specs: '25g protein' },
  { id: 'sup2', name: 'Creatine Monohydrate', category: 'supplements', basePrice: 1599, desc: 'Micronized, 300g', rating: 4.8, inStock: true, image: 'images/sup2.jpg', variants: ['300g', '500g'], specs: 'Micronized' },
  { id: 'sup3', name: 'Pre-Workout Extreme', category: 'supplements', basePrice: 2499, desc: '300mg caffeine', rating: 4.7, inStock: true, image: 'images/sup3.jpg', variants: ['Fruit Punch', 'Blue Raz'], specs: '300mg caffeine' },
  { id: 'sup4', name: 'BCAA 2:1:1', category: 'supplements', basePrice: 1999, desc: 'Instantized, 250g', rating: 4.6, inStock: true, image: 'images/sup4.jpg', variants: ['Fruit Punch', 'Lemon'], specs: '2:1:1 ratio' },
  { id: 'sup5', name: 'Mass Gainer', category: 'supplements', basePrice: 3999, desc: '1200 calories, 50g protein', rating: 4.5, inStock: true, image: 'images/sup5.jpg', variants: ['Chocolate', 'Vanilla'], specs: '1200 cals' },
  { id: 'sup6', name: 'Omega-3 Fish Oil', category: 'supplements', basePrice: 1299, desc: '1000mg EPA/DHA', rating: 4.8, inStock: true, image: 'images/sup6.jpg', variants: ['60ct', '120ct'], specs: '1000mg' },
  { id: 'sup7', name: 'Vitamin D3 5000IU', category: 'supplements', basePrice: 899, desc: 'Immune support', rating: 4.7, inStock: true, image: 'images/sup7.jpg', variants: ['60ct', '120ct'], specs: '5000IU' },
  { id: 'sup8', name: 'ZMA Night Recovery', category: 'supplements', basePrice: 1499, desc: 'Deep sleep, recovery', rating: 4.8, inStock: true, image: 'images/sup8.jpg', variants: ['90ct', '180ct'], specs: 'ZMA formula' },
  { id: 'sup9', name: 'Glutamine Powder', category: 'supplements', basePrice: 1799, desc: 'Recovery support', rating: 4.7, inStock: true, image: 'images/sup9.jpg', variants: ['300g', '600g'], specs: 'Pure glutamine' },
  { id: 'sup10', name: 'CLA 1000', category: 'supplements', basePrice: 1999, desc: 'Conjugated linoleic acid', rating: 4.6, inStock: true, image: 'images/sup10.jpg', variants: ['90ct', '180ct'], specs: '1000mg' }
];

let adminProducts = [...PRODUCTS];
let currentUser = null;
window.currentUser = currentUser;
let currentView = 'home';
let cart = [];
let orders = [];

function syncCurrentUserToWindow() {
  window.currentUser = currentUser;
}

let selectedCategory = 'all';
let isDarkMode = false;
let lastScrollY = 0;
let searchQuery = '';

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'bg-neon text-black' : 'bg-red-500 text-white'}`;
  toast.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="width:18px;height:18px"></i><span>${message}</span></div>`;
  container.appendChild(toast);
  if (typeof lucide !== 'undefined') lucide.createIcons();
  setTimeout(() => toast.remove(), 3000);
}

function formatPrice(price) {
  return '₱' + price.toLocaleString();
}

function navigate(view) {
  if (!window.adminEntry && currentUser?.role === 'admin') {
    currentUser = null;
    syncCurrentUserToWindow();
    showToast('Admin session cleared. Please login as a customer.', 'error');
  }
  if (window.adminEntry === true && !currentUser && view !== 'login') {
    view = 'login';
  }
  if (currentUser?.role === 'admin' && view === 'home' && window.adminEntry === true) {
    view = 'admin';
  }
  currentView = view;
  renderNav();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  if (window.scrollY > 50) {
    if (window.scrollY > lastScrollY) header.classList.add('hide');
    else header.classList.remove('hide');
  } else header.classList.remove('hide');
  lastScrollY = window.scrollY;
}

window.addEventListener('scroll', handleScroll);

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.classList.add('dark');
    document.getElementById('theme-icon')?.setAttribute('data-lucide', 'sun');
  } else {
    document.body.classList.remove('dark');
    document.getElementById('theme-icon')?.setAttribute('data-lucide', 'moon');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function logout(redirectView = 'home') {
  currentUser = null;
  cart = [];
  orders = [];
  syncCurrentUserToWindow();
  showToast('Logged out successfully');
  apiRequest('auth.php', 'POST', null, { action: 'logout' }).catch(() => {});
  navigate(redirectView);
}

const API_BASE = './api';

async function apiRequest(file, method = 'GET', data = null, queryParams = {}) {
  let url = `${API_BASE}/${file}`;
  const params = new URLSearchParams(queryParams);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const options = { method, headers: {}, credentials: 'same-origin' };
  if (data !== null) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let payload;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch (parseError) {
      if (!response.ok) {
        throw new Error(`Server returned invalid JSON: ${text}`);
      }
      throw new Error(`Invalid JSON response from server: ${text}`);
    }
    if (!response.ok) {
      throw new Error(payload?.error || text || 'API request failed');
    }
    return payload;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Please check if XAMPP is running.');
    }
    throw error;
  }
}

async function loadCurrentUser() {
  try {
    const result = await apiRequest('auth.php', 'GET', null, { action: 'me' });
    currentUser = result.user || null;
  } catch (error) {
    currentUser = null;
  }
  syncCurrentUserToWindow();
}

async function loadProducts() {
  try {
    const products = await apiRequest('products.php', 'GET');
    if (Array.isArray(products) && products.length > 0) {
      adminProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        desc: p.description,
        basePrice: Number(p.base_price),
        rating: Number(p.rating),
        inStock: p.in_stock == 1,
        image: p.image_url,
        specs: p.specs || '',
        variants: Array.isArray(p.variants) ? p.variants : []
      }));
    } else {
      adminProducts = [...PRODUCTS];
    }
  } catch (error) {
    adminProducts = [...PRODUCTS];
  }
}

async function loadCart() {
  if (!currentUser) {
    cart = [];
    return;
  }
  try {
    const items = await apiRequest('cart.php', 'GET');
    cart = items.map(item => ({
      id: item.id,
      product_id: item.product_id,
      name: item.name,
      quantity: Number(item.quantity),
      variant: item.variant_name,
      price: Number(item.price),
      image: item.image_url
    }));
  } catch (error) {
    cart = [];
  }
}

async function loadOrders(all = false) {
  if (!currentUser) {
    orders = [];
    return;
  }
  try {
    const query = all && currentUser.role === 'admin' ? { all: 1 } : {};
    const fetchedOrders = await apiRequest('orders.php', 'GET', null, query);
    orders = fetchedOrders.map(order => ({
      ...order,
      subtotal: Number(order.subtotal ?? 0),
      shipping: Number(order.shipping_fee ?? 0),
      total: Number(order.total ?? 0),
      date: order.created_at || order.date || new Date().toISOString(),
      items: Array.isArray(order.items) ? order.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price ?? 0)
      })) : []
    }));
  } catch (error) {
    orders = [];
  }
}

async function initApp() {
  await loadCurrentUser();
  if (!window.adminEntry && currentUser?.role === 'admin') {
    await apiRequest('auth.php', 'POST', null, { action: 'logout' }).catch(() => {});
    currentUser = null;
    syncCurrentUserToWindow();
  }
  await loadProducts();
  if (currentUser) {
    await loadCart();
    await loadOrders(currentUser.role === 'admin');
  }
  renderNav();
  if (window.adminEntry === true) {
    navigate('login');
  } else {
    navigate('home');
  }
}

function createMovingText(text, className = '') {
  return `<span class="moving-text ${className}">${text.split('').map((char, i) => char === ' ' ? ' ' : `<span style="--i: ${i}">${char}</span>`).join('')}</span>`;
}

function showLocationMap() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `<div class="modal-content glass-card rounded-2xl p-6 slide-in" style="max-width: 800px"><div class="flex justify-between items-start mb-4"><h3 class="font-display text-2xl font-bold">Gains & Grains HQ</h3><button onclick="this.closest('.modal-overlay').remove()" class="text-muted hover:text-neon"><i data-lucide="x" style="width:24px;height:24px"></i></button></div><div class="mb-4"><p class="text-muted mb-2"><i data-lucide="map-pin" style="width:16px;height:16px;display:inline"></i> Josephine Resort Subdivision, Kawit, Cavite, Philippines 4104</p><p class="text-muted mb-2"><i data-lucide="phone" style="width:16px;height:16px;display:inline"></i> 09942380471</p><p class="text-muted mb-2"><i data-lucide="mail" style="width:16px;height:16px;display:inline"></i> santocincs@gmail.com</p><p class="text-muted text-sm">Hours: Mon-Sat 9AM-8PM</p></div><div id="location-map" class="map-container"></div><div class="mt-4"><a href="https://www.google.com/maps/search/Josephine+Resort+Subdivision+Kawit+Cavite" target="_blank" class="neon-btn w-full py-2 rounded-lg text-center inline-block">Open in Google Maps</a></div></div>`;
  document.body.appendChild(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();
  setTimeout(() => {
    const mapDiv = document.getElementById('location-map');
    if (mapDiv && typeof L !== 'undefined') {
      const map = L.map('location-map').setView([14.4443, 120.9016], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
      L.marker([14.4443, 120.9016]).addTo(map).bindPopup('Gains & Grains HQ<br>Josephine Resort Subdivision, Kawit, Cavite').openPopup();
    }
  }, 100);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function processPayment(amount, method) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `<div class="payment-container"><i data-lucide="credit-card" style="width:48px;height:48px;color:#39ff14;margin-bottom:20px"></i><h3 class="font-display text-2xl font-bold mb-2">Processing Payment</h3><p class="text-muted mb-4">${method.toUpperCase()}</p><p class="text-sm mb-4">Amount: ${formatPrice(amount)}</p><div class="spinner"></div><p class="text-muted text-sm mt-4">Please wait...</p></div>`;
    document.body.appendChild(modal);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => { modal.remove(); resolve(true); }, 2000);
  });
}

function renderNav() {
  const nav = document.getElementById('nav-links');
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (!nav) return;
  if (!currentUser) {
    if (window.adminEntry === true) {
      nav.innerHTML = `<button onclick="navigate('login')" class="neon-btn px-5 py-2 rounded-lg text-sm font-semibold">Admin Login</button>`;
    } else {
      nav.innerHTML = `<button onclick="navigate('home')" class="text-muted hover:text-neon transition text-sm">Shop</button><button onclick="navigate('login')" class="neon-btn px-5 py-2 rounded-lg text-sm font-semibold">Login</button><button onclick="navigate('register')" class="text-muted hover:text-neon transition text-sm">Sign Up</button>`;
    }
  } else if (currentUser.role === 'admin') {
    nav.innerHTML = `<button onclick="navigate('admin')" class="text-muted hover:text-neon transition text-sm">Admin Panel</button><span class="text-neon text-xs bg-neon/10 px-2 py-1 rounded">ADMIN</span><button onclick="logout()" class="text-muted hover:text-red-400 transition text-sm">Logout</button>`;
  } else {
    nav.innerHTML = `<button onclick="navigate('home')" class="text-muted hover:text-neon transition text-sm">Shop</button><button onclick="navigate('cart')" class="relative text-muted hover:text-neon transition"><i data-lucide="shopping-cart" style="width:20px;height:20px"></i>${cartCount > 0 ? `<span class="absolute -top-2 -right-3 bg-neon text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">${cartCount}</span>` : ''}</button><button onclick="navigate('profile')" class="text-muted hover:text-neon transition"><i data-lucide="user" style="width:20px;height:20px"></i></button><button onclick="logout()" class="text-muted hover:text-red-400 transition text-sm">Logout</button>`;
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderProductsGridOnly() {
  const productsContainer = document.getElementById('products-grid-container');
  if (!productsContainer) return;
  
  let filteredProducts = selectedCategory === 'all' ? adminProducts : adminProducts.filter(p => p.category === selectedCategory);
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.desc.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }
  
  const productsCountSpan = document.getElementById('products-count');
  if (productsCountSpan) {
    productsCountSpan.textContent = filteredProducts.length;
  }
  
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `<div class="text-center py-12"><i data-lucide="search" class="mx-auto text-muted" style="width:48px;height:48px"></i><p class="text-muted mt-4">No products found matching "${searchQuery}"</p><button onclick="clearSearch()" class="neon-btn mt-4 px-6 py-2 rounded-lg">Clear Search</button></div>`;
  } else {
    productsContainer.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${filteredProducts.map(p => `<div class="glass-card rounded-xl overflow-hidden group cursor-pointer" onclick="showProductModal('${p.id}')"><div class="relative overflow-hidden h-48"><img src="${p.image}" class="product-img w-full h-full object-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=' + encodeURIComponent('${p.name.replace(/'/g, "\\'")}')"><div class="absolute top-2 right-2 bg-neon/90 text-black px-2 py-1 rounded text-xs font-bold">${formatPrice(p.basePrice)}</div></div><div class="p-4"><div class="flex items-center justify-between mb-2"><span class="text-xs text-neon font-display uppercase">${p.category}</span><div class="flex items-center gap-1"><i data-lucide="star" class="text-yellow-400 fill-current" style="width:12px;height:12px"></i><span class="text-xs text-muted">${p.rating}</span></div></div><h3 class="font-semibold text-lg mb-1">${p.name}</h3><p class="text-muted text-sm mb-3 line-clamp-2">${p.desc.substring(0, 60)}...</p><div class="flex gap-2"><button onclick="event.stopPropagation(); addToCart('${p.id}')" class="neon-btn flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1"><i data-lucide="plus" style="width:14px;height:14px"></i> Cart</button><button onclick="event.stopPropagation(); buyNow('${p.id}')" class="neon-outline px-4 py-2 rounded-lg text-sm flex items-center gap-1"><i data-lucide="credit-card" style="width:14px;height:14px"></i> Buy</button></div></div></div>`).join('')}</div>`;
  }
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function handleSearch(query) {
  searchQuery = query.toLowerCase().trim();
  if (currentView === 'home') {
    renderProductsGridOnly();
    const clearBtn = document.querySelector('.clear-search');
    if (clearBtn) {
      clearBtn.style.display = searchQuery ? 'block' : 'none';
    }
  }
}

function clearSearch() {
  searchQuery = '';
  const searchInput = document.getElementById('global-search');
  if (searchInput) searchInput.value = '';
  if (currentView === 'home') {
    renderProductsGridOnly();
    const clearBtn = document.querySelector('.clear-search');
    if (clearBtn) {
      clearBtn.style.display = 'none';
    }
  }
}

function renderPage() {
  const container = document.getElementById('page-container');
  if (!container) return;
  const views = { home: renderHome, about: renderAbout, faq: renderFAQ, contact: renderContact, login: renderLogin, register: renderRegister, cart: renderCart, checkout: renderCheckout, profile: renderProfile, admin: renderAdmin };
  container.innerHTML = (views[currentView] || renderHome)();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  const clearBtn = document.querySelector('.clear-search');
  if (clearBtn) {
    clearBtn.style.display = searchQuery ? 'block' : 'none';
  }
}

function renderHome() {
  let filteredProducts = selectedCategory === 'all' ? adminProducts : adminProducts.filter(p => p.category === selectedCategory);
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.desc.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }
  const categories = [{ id: 'all', name: 'ALL', icon: 'grid' }, { id: 'gym', name: 'GYM', icon: 'dumbbell' }, { id: 'sports', name: 'SPORTS', icon: 'activity' }, { id: 'supplements', name: 'SUPPLEMENTS', icon: 'droplet' }];
  return `<div class="fade-in-up"><section class="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent"></div><div class="relative text-center max-w-4xl mx-auto"><div class="inline-block px-4 py-1 rounded-full border border-neon/30 text-neon text-xs font-display tracking-widest mb-4 pulse-ring">PHILIPPINES' PREMIER FITNESS DESTINATION</div><h1 class="font-display text-5xl sm:text-7xl font-black leading-tight"><div class="mb-2">${createMovingText("GEAR UP FOR")}</div><div class="glow-text" style="color: #39ff14;">${createMovingText("GREATNESS", "glow-text")}</div></h1><p class="mt-6 text-muted text-lg max-w-2xl mx-auto">Premium gym equipment, sports gear, and supplements delivered to your doorstep.</p><div class="flex gap-4 justify-center mt-8"><button onclick="document.getElementById('products-section').scrollIntoView({behavior:'smooth'})" class="neon-btn px-8 py-3 rounded-xl font-display tracking-wide">SHOP NOW</button>${!currentUser ? `<button onclick="navigate('register')" class="neon-outline px-8 py-3 rounded-xl font-display tracking-wide">SIGN UP</button>` : ''}</div></div></section><section class="max-w-6xl mx-auto px-4 py-12"><div class="grid grid-cols-2 md:grid-cols-4 gap-4">${[['30+', 'Products', 'package'], ['50K+', 'On-site Customers', 'users'], ['24/7', 'Support', 'headphones'], ['Free', 'Shipping Over ₱5000', 'truck']].map(([v,l,i]) => `<div class="glass-card rounded-xl p-4 text-center"><i data-lucide="${i}" class="mx-auto mb-2" style="width:28px;height:28px;color:#39ff14"></i><div class="font-display text-xl font-bold">${v}</div><div class="text-xs text-muted">${l}</div></div>`).join('')}</div></section><section id="products-section" class="max-w-7xl mx-auto px-4 py-12"><h2 class="font-display text-3xl font-bold mb-2">FEATURED PRODUCTS</h2><div class="relative max-w-md mx-auto mb-6"><i data-lucide="search" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" style="width:18px;height:18px"></i><input type="text" id="global-search" class="w-full pl-11 pr-10 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-neon focus:outline-none transition-colors" placeholder="Search products..." oninput="handleSearch(this.value)" value="${searchQuery.replace(/"/g, '&quot;')}"><i data-lucide="x" class="clear-search absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-muted hover:text-neon transition-colors" onclick="clearSearch()" style="width:18px;height:18px;display:${searchQuery ? 'block' : 'none'}"></i></div><p class="text-muted mb-6 text-center"><span id="products-count">${filteredProducts.length}</span> products available</p><div class="flex gap-3 mb-8 flex-wrap justify-center">${categories.map(cat => `<button onclick="filterCategory('${cat.id}')" class="cat-btn px-5 py-2 rounded-full text-sm transition flex items-center gap-2 ${selectedCategory === cat.id ? 'active' : ''}"><i data-lucide="${cat.icon}" style="width:14px;height:14px"></i>${cat.name}</button>`).join('')}</div><div id="products-grid-container">${filteredProducts.length === 0 ? `<div class="text-center py-12"><i data-lucide="search" class="mx-auto text-muted" style="width:48px;height:48px"></i><p class="text-muted mt-4">No products found matching "${searchQuery}"</p><button onclick="clearSearch()" class="neon-btn mt-4 px-6 py-2 rounded-lg">Clear Search</button></div>` : `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${filteredProducts.map(p => `<div class="glass-card rounded-xl overflow-hidden group cursor-pointer" onclick="showProductModal('${p.id}')"><div class="relative overflow-hidden h-48"><img src="${p.image}" class="product-img w-full h-full object-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=' + encodeURIComponent('${p.name.replace(/'/g, "\\'")}')"><div class="absolute top-2 right-2 bg-neon/90 text-black px-2 py-1 rounded text-xs font-bold">${formatPrice(p.basePrice)}</div></div><div class="p-4"><div class="flex items-center justify-between mb-2"><span class="text-xs text-neon font-display uppercase">${p.category}</span><div class="flex items-center gap-1"><i data-lucide="star" class="text-yellow-400 fill-current" style="width:12px;height:12px"></i><span class="text-xs text-muted">${p.rating}</span></div></div><h3 class="font-semibold text-lg mb-1">${p.name}</h3><p class="text-muted text-sm mb-3 line-clamp-2">${p.desc.substring(0, 60)}...</p><div class="flex gap-2"><button onclick="event.stopPropagation(); addToCart('${p.id}')" class="neon-btn flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1"><i data-lucide="plus" style="width:14px;height:14px"></i> Cart</button><button onclick="event.stopPropagation(); buyNow('${p.id}')" class="neon-outline px-4 py-2 rounded-lg text-sm flex items-center gap-1"><i data-lucide="credit-card" style="width:14px;height:14px"></i> Buy</button></div></div></div>`).join('')}</div>`}</div></section></div>`;
}

function showProductModal(productId) {
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content" style="border: 2px solid #39ff14; border-radius: 20px; box-shadow: 0 0 20px rgba(57, 255, 20, 0.5); background: var(--bg-card);">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-display text-2xl font-bold" style="color: var(--text-primary);">${product.name}</h3>
          <button onclick="this.closest('.modal-overlay').remove()" class="text-muted hover:text-neon transition" style="background: none; border: none; cursor: pointer;">
            <i data-lucide="x" style="width:24px;height:24px"></i>
          </button>
        </div>
        <img src="${product.image}" class="w-full h-64 object-cover rounded-xl mb-4" style="border: 1px solid #39ff14; border-radius: 12px;" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400?text=' + encodeURIComponent('${product.name.replace(/'/g, "\\'")}')">
        <div class="mb-4">
          <p class="text-muted mb-2" style="color: var(--text-muted);">${product.desc}</p>
          ${product.specs ? `<p class="text-sm text-neon mt-2" style="color: #39ff14;">📋 ${product.specs}</p>` : ''}
        </div>
        ${product.variants && product.variants.length > 0 ? `
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">Select Variant:</label>
            <select id="product-variant" class="variant-select w-full" style="border: 1px solid #39ff14; background: var(--bg-secondary); color: var(--text-primary); border-radius: 8px; padding: 8px;">
              ${product.variants.map(v => `<option value="${v}">${v}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div class="flex items-center justify-between mb-4">
          <div><span class="text-2xl font-bold" style="color: #39ff14;">${formatPrice(product.basePrice)}</span></div>
          <div class="flex items-center gap-1"><i data-lucide="star" class="text-yellow-400 fill-current"></i><span style="color: var(--text-primary);">${product.rating}/5</span></div>
        </div>
        <div class="flex gap-3">
          <button onclick="addToCartWithVariant('${product.id}'); this.closest('.modal-overlay').remove()" class="neon-btn flex-1 py-3 rounded-xl" style="background: linear-gradient(135deg, #39ff14, #00e676); color: #0a0a0a; font-weight: bold; border: none; border-radius: 12px;">Add to Cart</button>
          <button onclick="buyNowWithVariant('${product.id}'); this.closest('.modal-overlay').remove()" class="neon-outline flex-1 py-3 rounded-xl" style="border: 2px solid #39ff14; color: #39ff14; background: transparent; border-radius: 12px;">Buy Now</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

async function addToCart(productId) { 
  if (!currentUser) { showToast('Please login first', 'error'); navigate('login'); return; }
  if (currentUser.role === 'admin') { showToast('Admin cannot add to cart. Please use customer account.', 'error'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;
  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, variant: null, quantity: 1 });
    await loadCart();
    showToast(`${product.name} added to cart`);
    renderNav();
    if (currentView === 'cart') renderPage();
  } catch (error) {
    showToast(error.message || 'Could not add to cart', 'error');
  }
}

async function addToCartWithVariant(productId) {
  if (!currentUser) { showToast('Please login first', 'error'); navigate('login'); return; }
  if (currentUser.role === 'admin') { showToast('Admin cannot add to cart. Please use customer account.', 'error'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;
  const variant = document.getElementById('product-variant')?.value || null;
  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, variant, quantity: 1 });
    await loadCart();
    showToast(`${product.name}${variant ? ` (${variant})` : ''} added to cart`);
    renderNav();
  } catch (error) {
    showToast(error.message || 'Could not add to cart', 'error');
  }
}

async function buyNow(productId) {
  if (!currentUser) { showToast('Please login first', 'error'); navigate('login'); return; }
  if (currentUser.role === 'admin') { showToast('Admin cannot checkout. Please use customer account.', 'error'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;
  try {
    await apiRequest('cart.php', 'DELETE');
    await apiRequest('cart.php', 'POST', { product_id: productId, variant: null, quantity: 1 });
    await loadCart();
    navigate('checkout');
  } catch (error) {
    showToast(error.message || 'Could not process buy now', 'error');
  }
}

async function buyNowWithVariant(productId) {
  if (!currentUser) { showToast('Please login first', 'error'); navigate('login'); return; }
  if (currentUser.role === 'admin') { showToast('Admin cannot checkout. Please use customer account.', 'error'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) return;
  const variant = document.getElementById('product-variant')?.value || null;
  try {
    await apiRequest('cart.php', 'DELETE');
    await apiRequest('cart.php', 'POST', { product_id: productId, variant, quantity: 1 });
    await loadCart();
    navigate('checkout');
  } catch (error) {
    showToast(error.message || 'Could not process buy now', 'error');
  }
}

function filterCategory(category) { 
  selectedCategory = category; 
  if (currentView === 'home') {
    renderProductsGridOnly();
  } else {
    navigate('home');
  }
}

async function updateQuantity(itemId, delta) {
  const item = cart.find(i => i.id == itemId);
  if (!item) return;
  const newQuantity = item.quantity + delta;
  try {
    if (newQuantity <= 0) {
      await apiRequest('cart.php', 'DELETE', null, { id: itemId });
    } else {
      await apiRequest('cart.php', 'PUT', { id: itemId, quantity: newQuantity });
    }
    await loadCart();
    renderNav();
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not update cart', 'error');
  }
}

async function removeFromCart(itemId) {
  try {
    await apiRequest('cart.php', 'DELETE', null, { id: itemId });
    await loadCart();
    showToast('Item removed');
    renderNav();
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not remove item', 'error');
  }
}

function renderCart() {
  if (cart.length === 0) return `<div class="flex flex-col items-center justify-center min-h-[60vh] px-4"><i data-lucide="shopping-cart" class="text-muted mb-4" style="width:80px;height:80px"></i><h2 class="font-display text-2xl mb-2">Cart empty</h2><button onclick="navigate('home')" class="neon-btn px-6 py-3 rounded-xl">Shop Now</button></div>`;
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;
  return `<div class="max-w-6xl mx-auto px-4 py-8"><h2 class="font-display text-3xl font-bold mb-6">Cart</h2><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4">${cart.map(item => `<div class="glass-card rounded-xl p-4 flex gap-4"><img src="${item.image}" class="w-24 h-24 object-cover rounded-lg" onerror="this.onerror=null; this.src='https://via.placeholder.com/150x150?text=' + encodeURIComponent('${item.name.replace(/'/g, "\\'")}')"><div class="flex-1"><h3 class="font-semibold">${item.name}</h3>${item.variant ? `<p class="text-sm text-muted">${item.variant}</p>` : ''}<p class="text-neon font-display">${formatPrice(item.price)}</p><div class="flex items-center gap-3 mt-2"><button onclick="updateQuantity('${item.id}', -1)" class="qty-btn">-</button><span class="w-8 text-center">${item.quantity}</span><button onclick="updateQuantity('${item.id}', 1)" class="qty-btn">+</button><button onclick="removeFromCart('${item.id}')" class="ml-4 text-red-500 text-sm">Remove</button></div></div><div class="text-right"><div class="font-display text-neon font-bold">${formatPrice(item.price * item.quantity)}</div></div></div>`).join('')}</div><div class="lg:col-span-1"><div class="glass-card rounded-xl p-6 sticky top-24"><h3 class="font-display text-xl mb-4">Summary</h3><div class="space-y-3 border-b pb-4"><div class="flex justify-between"><span class="text-muted">Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="flex justify-between"><span class="text-muted">Shipping</span><span class="text-neon">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div></div><div class="flex justify-between mt-4 pb-4"><span class="font-display font-bold">Total</span><span class="font-display text-neon text-xl font-bold">${formatPrice(total)}</span></div><button onclick="navigate('checkout')" class="neon-btn w-full py-3 rounded-xl mt-6">Checkout</button></div></div></div></div>`;
}

function renderCheckout() {
  if (cart.length === 0) {
    showToast('Cart is empty', 'error');
    navigate('home');
    return '';
  }
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;
  return `<div class="max-w-4xl mx-auto px-4 py-8"><h2 class="font-display text-3xl font-bold mb-6">Checkout</h2><div class="grid md:grid-cols-2 gap-8"><div><form id="checkout-form" onsubmit="handleCheckoutSubmit(event)"><div class="glass-card rounded-xl p-6 mb-6"><h3 class="font-display text-lg mb-4">Shipping Info</h3><div class="space-y-4"><input type="text" id="checkout-name" required value="${currentUser?.name || ''}" placeholder="Full Name" class="w-full px-4 py-2 rounded-lg"><input type="email" id="checkout-email" required value="${currentUser?.email || ''}" placeholder="Email" class="w-full px-4 py-2 rounded-lg"><input type="tel" id="checkout-phone" required placeholder="Phone" class="w-full px-4 py-2 rounded-lg"><input type="text" id="checkout-address" required placeholder="Address" class="w-full px-4 py-2 rounded-lg"></div></div><div class="glass-card rounded-xl p-6"><h3 class="font-display text-lg mb-4">Payment</h3><div class="space-y-3"><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="COD" checked><i data-lucide="package"></i><span>Cash on Delivery</span></label><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="GCash"><i data-lucide="smartphone"></i><span>GCash</span></label><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="Maya"><i data-lucide="credit-card"></i><span>Maya</span></label></div></div></form></div><div><div class="glass-card rounded-xl p-6 sticky top-24"><h3 class="font-display text-lg mb-4">Order Summary</h3><div class="space-y-2 max-h-64 overflow-y-auto mb-4">${cart.map(item => `<div class="flex justify-between text-sm"><span class="text-muted">${item.name} ${item.variant ? `(${item.variant})` : ''} x${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span></div>`).join('')}</div><div class="border-t pt-4 space-y-2"><div class="flex justify-between"><span class="text-muted">Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="flex justify-between"><span class="text-muted">Shipping</span><span class="text-neon">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div><div class="flex justify-between pt-2 border-t"><span class="font-display font-bold">Total</span><span class="font-display text-neon text-xl font-bold">${formatPrice(total)}</span></div></div><button type="submit" form="checkout-form" class="neon-btn w-full py-3 rounded-xl mt-6">Place Order</button></div></div></div></div>`;
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  if (!payment) { 
    showToast('Select payment method', 'error'); 
    return; 
  }
  
  const address = document.getElementById('checkout-address').value;
  if (!address) { 
    showToast('Enter address', 'error'); 
    return; 
  }
  
  const phone = document.getElementById('checkout-phone').value;
  if (!phone) { 
    showToast('Enter phone number', 'error'); 
    return; 
  }
  
  if (cart.length === 0) {
    showToast('Cart is empty', 'error');
    navigate('home');
    return;
  }
  
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;
  
  const placeOrderBtn = document.querySelector('button[type="submit"]');
  if (placeOrderBtn) {
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';
  }
  
  try {
    if (payment !== 'COD') {
      await processPayment(total, payment);
    }
    
    const response = await apiRequest('orders.php', 'POST', { 
      address, 
      payment_method: payment, 
      phone
    });
    
    if (response.order_id) {
      showToast('Order placed successfully! Order ID: ' + response.order_id, 'success');
      await loadCart();
      await loadOrders(currentUser?.role === 'admin');
      renderNav();
      navigate('profile');
    } else {
      throw new Error('No order ID returned');
    }
  } catch (error) {
    showToast(error.message || 'Order submission failed', 'error');
  } finally {
    if (placeOrderBtn) {
      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = 'Place Order';
    }
  }
}

function renderProfile() {
  if (!currentUser) {
    navigate('login');
    return '';
  }
  
  if (currentUser.role === 'admin') {
    return '<div class="flex items-center justify-center min-h-[60vh] px-4"><div class="glass-card rounded-2xl p-8 max-w-md text-center"><i data-lucide="shield" class="text-neon mx-auto mb-4" style="width:64px;height:64px"></i><h2 class="font-display text-2xl font-bold mb-2">Admin Account</h2><p class="text-muted mb-6">Use the Admin Dashboard to manage products and orders</p><button onclick="navigate(\'admin\')" class="neon-btn px-6 py-3 rounded-xl">Go to Admin Panel</button><button onclick="logout()" class="neon-outline px-6 py-3 rounded-xl mt-3 ml-3">Logout</button></div></div>';
  }
  
  const userOrders = orders.filter(o => o.customer_email === currentUser?.email);
  
  return `<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="glass-card rounded-2xl p-6 mb-8">
      <div class="flex items-center gap-6 mb-6">
        <div class="profile-img-container">
          <img id="profile-img" src="https://via.placeholder.com/100" class="profile-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=User'">
          <label for="profile-upload" class="upload-btn">
            <i data-lucide="camera" style="width:16px;height:16px"></i>
          </label>
          <input type="file" id="profile-upload" accept="image/*" style="display:none" onchange="uploadProfileImage(event)">
          <button class="delete-img-btn" onclick="deleteProfileImage()">
            <i data-lucide="trash-2" style="width:14px;height:14px"></i>
          </button>
        </div>
        <div>
          <h2 class="font-display text-2xl font-bold">${currentUser?.name || 'User'}</h2>
          <p class="text-muted">${currentUser?.email || ''}</p>
          <p class="text-neon text-sm mt-1">Customer</p>
        </div>
      </div>
    </div>
    
    <h3 class="font-display text-xl mb-4">My Orders</h3>
    ${userOrders.length === 0 ? 
      `<div class="glass-card rounded-xl p-8 text-center">
        <i data-lucide="package" class="text-muted mb-3" style="width:48px;height:48px"></i>
        <p class="text-muted">No orders yet</p>
        <button onclick="navigate('home')" class="neon-btn px-6 py-2 rounded-lg mt-4">Shop Now</button>
      </div>` : 
      `<div class="space-y-4">
        ${userOrders.map(o => `
          <div class="glass-card rounded-xl p-5">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="text-neon text-sm font-mono">${o.id}</p>
                <p class="text-muted text-xs">${new Date(o.date).toLocaleDateString()}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs ${o.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : o.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' : o.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : o.status === 'Cancellation Requested' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}">${o.status}</span>
            </div>
            ${(o.items || []).map(i => `<div class="flex justify-between text-sm"><span class="text-muted">${i.name} x${i.quantity}</span><span>${formatPrice((i.unit_price ?? 0) * i.quantity)}</span></div>`).join('')}
            <div class="mt-3">
              ${o.status === 'Pending' ? `<button onclick="requestOrderCancellation('${o.id}')" class="neon-outline px-4 py-2 rounded-lg text-sm">Request Cancel</button>` : o.status === 'Cancellation Requested' ? `<p class="text-orange-300 text-sm">Cancellation requested, waiting admin approval.</p>` : ''}
            </div>
            <div class="border-t mt-3 pt-3 flex justify-between">
              <span class="font-display">Total</span>
              <span class="text-neon font-bold">${formatPrice(o.total)}</span>
            </div>
          </div>
        `).join('')}
      </div>`
    }
  </div>`;
}

function uploadProfileImage(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('profile-img').src = ev.target.result;
      showToast('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  }
}

function deleteProfileImage() {
  document.getElementById('profile-img').src = 'https://via.placeholder.com/100?text=User';
  showToast('Picture deleted');
}

function renderAdmin() {
  if (!currentUser || currentUser.role !== 'admin') { navigate('login'); return ''; }
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => ['Pending', 'Cancellation Requested'].includes(o.status)).length;
  return `<div class="max-w-7xl mx-auto px-4 py-8"><h2 class="font-display text-3xl font-bold mb-2">Admin Dashboard</h2><p class="text-muted mb-6">Manage your store</p><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">${[['Revenue', '₱' + totalRevenue.toLocaleString(), 'trending-up'], ['Pending Orders', pendingOrders, 'clock'], ['Products', adminProducts.length, 'box'], ['Customers', orders.length, 'users']].map(([l,v,i]) => `<div class="glass-card rounded-xl p-5"><i data-lucide="${i}" class="text-neon mb-2" style="width:24px;height:24px"></i><div class="font-display text-2xl font-bold">${v}</div><div class="text-xs text-muted">${l}</div></div>`).join('')}</div><div class="glass-card rounded-xl p-6 mb-8"><h3 class="font-display text-xl mb-4 flex items-center gap-2"><i data-lucide="plus-circle"></i> Add Product</h3><form id="add-product-form" onsubmit="addProduct(event)" class="grid md:grid-cols-3 gap-4"><input type="text" id="prod-name" placeholder="Name" required class="px-3 py-2 rounded-lg"><select id="prod-category" class="px-3 py-2 rounded-lg"><option value="gym">Gym</option><option value="sports">Sports</option><option value="supplements">Supplements</option></select><input type="number" id="prod-price" placeholder="Price" required class="px-3 py-2 rounded-lg"><input type="text" id="prod-desc" placeholder="Description" required class="px-3 py-2 rounded-lg md:col-span-2"><input type="text" id="prod-image" placeholder="Image URL" value="images/placeholder.jpg" class="px-3 py-2 rounded-lg"><button type="submit" class="neon-btn px-4 py-2 rounded-lg">Add</button></form></div><div class="glass-card rounded-xl p-6 mb-8"><h3 class="font-display text-xl mb-4">Products (${adminProducts.length})</h3><div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead><tbody>${adminProducts.map(p => `<tr><td><img src="${p.image}" class="w-12 h-12 object-cover rounded" onerror="this.onerror=null; this.src='https://via.placeholder.com/50x50?text=No+Img'"></td><td>${p.name}</td><td><span class="px-2 py-1 rounded text-xs bg-neon/20 text-neon">${p.category}</span></td><td><input id="price-${p.id}" type="number" value="${p.basePrice}" class="w-24 px-2 py-1 rounded border border-slate-300 text-sm"></td><td><input id="stock-${p.id}" type="number" value="${p.inStock ? 1 : 0}" min="0" max="1" class="w-16 px-2 py-1 rounded border border-slate-300 text-sm"></td><td><button onclick="updateProductPrice('${p.id}')" class="text-neon text-sm mr-2 px-2 py-1 rounded hover:bg-neon/20">Save</button><button onclick="deleteProduct('${p.id}')" class="text-red-500 text-sm px-2 py-1 rounded hover:bg-red-500/20">Delete</button></td></tr>`).join('')}</tbody>}</table></div></div><div class="glass-card rounded-xl p-6"><h3 class="font-display text-xl mb-4">Orders (${orders.length})</h3>${orders.length === 0 ? '<p class="text-muted text-center py-8">No orders</p>' : `<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Address</th><th>Total</th><th>Status</th><th>Action</th></tr></thead><tbody>${orders.map(o => `<tr><td class="text-neon text-xs">${o.id}</td><td class="text-sm">${o.customer_name || 'Unknown'}</td><td class="text-xs text-muted max-w-xs truncate">${o.shipping_address || 'No address'}</td><td class="text-neon font-bold">${formatPrice(o.total || 0)}</td><td><select onchange="updateOrderStatus('${o.id}', this.value)" class="px-2 py-1 rounded text-xs"><option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option><option value="Cancellation Requested" ${o.status === 'Cancellation Requested' ? 'selected' : ''}>Cancellation Requested</option><option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option><option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option><option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option></select></td><td><button onclick="viewOrderDetails('${o.id}')" class="text-neon text-xs px-2 py-1 rounded hover:bg-neon/20">View</button></td></tr>`).join('')}</tbody></table></div>`}</div></div>`;
}

async function addProduct(e) {
  e.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') { showToast('Admin access required', 'error'); return; }
  const name = document.getElementById('prod-name').value;
  const category = document.getElementById('prod-category').value;
  const basePrice = parseInt(document.getElementById('prod-price').value, 10);
  const description = document.getElementById('prod-desc').value;
  const imageUrl = document.getElementById('prod-image').value;
  try {
    await apiRequest('products.php', 'POST', {
      name, category, base_price: basePrice, description, image_url: imageUrl
    });
    await loadProducts();
    showToast('Product added!');
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not add product', 'error');
  }
}

async function updateProductPrice(id) {
  const priceInput = document.getElementById(`price-${id}`);
  const stockInput = document.getElementById(`stock-${id}`);
  if (!priceInput) return;
  const newPrice = parseFloat(priceInput.value);
  if (isNaN(newPrice) || newPrice <= 0) { showToast('Enter a valid price', 'error'); return; }
  try {
    await apiRequest('products.php', 'PUT', { id, base_price: newPrice });
    if (stockInput) {
      await apiRequest('products.php', 'PUT', { id, quantity: parseInt(stockInput.value) });
    }
    await loadProducts();
    showToast('Product updated');
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not update product', 'error');
  }
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  try {
    await apiRequest('products.php', 'DELETE', null, { id });
    await loadProducts();
    showToast('Product deleted');
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not delete product', 'error');
  }
}

async function updateOrderStatus(id, status) {
  try {
    await apiRequest('orders.php', 'PUT', { id, status });
    await loadOrders(true);
    showToast(`Order ${id} updated`);
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not update order status', 'error');
  }
}

async function requestOrderCancellation(id) {
  const o = orders.find(o => o.id === id);
  if (!o) return;
  if (o.status !== 'Pending') { showToast('Cancellation can only be requested while the order is pending', 'error'); return; }
  try {
    await apiRequest('orders.php', 'PUT', { id, status: 'Cancellation Requested' });
    await loadOrders(currentUser?.role === 'admin');
    showToast(`Cancellation requested for ${id}. Waiting admin approval.`);
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not request cancellation', 'error');
  }
}

function viewOrderDetails(id) {
  const o = orders.find(o => o.id === id);
  if (!o) return;
  alert(`Order: ${o.id}\nCustomer: ${o.customer_name}\nTotal: ${formatPrice(o.total)}\nStatus: ${o.status}\nAddress: ${o.shipping_address}`);
}

function renderAbout() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">About Gains & Grains</h1><p class="text-center text-muted mb-12">Philippines' Trusted Fitness Partner Since 2020</p><div class="glass-card rounded-2xl p-8 mb-8"><h2 class="font-display text-2xl font-bold mb-4">Our Mission</h2><p class="text-muted">To empower every Filipino to achieve their fitness goals by providing premium quality gym equipment, sports gear, and supplements at affordable prices.</p></div><div class="grid md:grid-cols-2 gap-6">${[['Quality Guaranteed', 'All products are tested'], ['Authentic Products', '100% genuine with warranty'], ['Fast Delivery', 'Nationwide shipping'], ['24/7 Support', 'Expert customer service']].map(([t,d]) => `<div class="glass-card rounded-2xl p-6"><i data-lucide="trophy" class="text-neon mb-3" style="width:32px;height:32px"></i><h3 class="font-display text-xl font-bold mb-2">${t}</h3><p class="text-muted text-sm">${d}</p></div>`).join('')}</div></div>`; }

const FAQS = [
  { q: "What is Gains & Grains?", a: "Philippines' premier online destination for premium gym equipment, sports gear, and fitness supplements." },
  { q: "Do you ship nationwide?", a: "Yes! Delivery takes 3-7 business days." },
  { q: "What's your return policy?", a: "30-day money-back guarantee." },
  { q: "Are your products authentic?", a: "100% authentic with warranty." },
  { q: "Do you offer bulk discounts?", a: "Yes! Contact our sales team." },
  { q: "Is pickup available?", a: "Yes, free pickup from Kawit, Cavite." }
];

function renderFAQ() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">FAQ</h1><div class="space-y-4">${FAQS.map((f,i) => `<div class="glass-card rounded-xl p-6 cursor-pointer" onclick="toggleFAQ(${i})"><div class="flex justify-between items-center"><h3 class="font-display text-lg font-bold">${f.q}</h3><i data-lucide="chevron-down" id="faq-icon-${i}" style="width:20px;height:20px"></i></div><div id="faq-answer-${i}" class="mt-3 text-muted hidden">${f.a}</div></div>`).join('')}</div></div>`; }

function toggleFAQ(i) { const a = document.getElementById(`faq-answer-${i}`); const ic = document.getElementById(`faq-icon-${i}`); if (a && ic) { a.classList.toggle('hidden'); ic.style.transform = a.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)'; } }

function renderContact() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">Contact Us</h1><div class="grid md:grid-cols-2 gap-8"><div class="glass-card rounded-2xl p-6"><h3 class="font-display text-xl font-bold mb-4">Get in Touch</h3><div class="space-y-4"><div class="flex gap-3"><i data-lucide="map-pin" class="text-neon"></i><span>Josephine Resort Subdivision, Kawit, Cavite</span></div><div class="flex gap-3"><i data-lucide="phone" class="text-neon"></i><span>09942380471</span></div><div class="flex gap-3"><i data-lucide="mail" class="text-neon"></i><span>santocincs@gmail.com</span></div></div></div><div class="glass-card rounded-2xl p-6"><form onsubmit="handleContact(event)"><input type="text" placeholder="Name" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><textarea rows="4" placeholder="Message" required class="w-full px-4 py-2 rounded-lg mb-4"></textarea><button type="submit" class="neon-btn w-full py-3 rounded-xl">Send</button></form></div></div></div>`; }

function handleContact(e) { e.preventDefault(); showToast('Message sent!'); e.target.reset(); }

function renderLogin() { const isAdminLogin = window.adminEntry === true; return `<div class="flex items-center justify-center min-h-[80vh] px-4"><div class="glass-card rounded-2xl p-8 max-w-md w-full slide-in"><div class="text-center mb-6"><div class="logo-icon w-20 h-20 mx-auto mb-4"><i data-lucide="zap" style="width:40px;height:40px"></i></div><h2 class="font-display text-2xl font-bold">${isAdminLogin ? 'Admin Login' : 'Welcome Back'}</h2></div><form onsubmit="handleLogin(event)"><input type="email" id="login-email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="password" id="login-password" placeholder="Password" required class="w-full px-4 py-2 rounded-lg mb-6"><button type="submit" class="neon-btn w-full py-3 rounded-xl">Sign In</button></form>${isAdminLogin ? '' : `<div class="text-center mt-4"><button onclick="navigate('register')" class="text-neon text-sm hover:underline">Create Account</button></div>`}</div></div>`; }

function renderRegister() { return `<div class="flex items-center justify-center min-h-[80vh] px-4"><div class="glass-card rounded-2xl p-8 max-w-md w-full slide-in"><div class="text-center mb-6"><div class="logo-icon w-20 h-20 mx-auto mb-4"><i data-lucide="zap" style="width:40px;height:40px"></i></div><h2 class="font-display text-2xl font-bold">Join the Grind</h2></div><form onsubmit="handleRegister(event)"><input type="text" id="reg-name" placeholder="Full Name" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="email" id="reg-email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="password" id="reg-password" placeholder="Password (min 6)" required minlength="6" class="w-full px-4 py-2 rounded-lg mb-6"><button type="submit" class="neon-btn w-full py-3 rounded-xl">Create Account</button></form><div class="text-center mt-4"><button onclick="navigate('login')" class="text-neon text-sm hover:underline">Already have an account?</button></div></div></div>`; }

async function handleLogin(e) { e.preventDefault(); const email = document.getElementById('login-email').value; const password = document.getElementById('login-password').value; try { const result = await apiRequest('auth.php', 'POST', { email, password }, { action: 'login' }); const user = result.user; if (window.adminEntry === true && user.role !== 'admin') { showToast('Only admin may login here', 'error'); return; } if (window.adminEntry !== true && user.role === 'admin') { showToast('Admin login is not allowed on the user page. Use admin.html instead.', 'error'); return; } currentUser = user; syncCurrentUserToWindow(); showToast(`Welcome ${user.name}!`); window.adminEntry = false; await loadCart(); await loadOrders(currentUser.role === 'admin'); navigate(currentUser.role === 'admin' ? 'admin' : 'home'); } catch (error) { showToast(error.message || 'Invalid credentials', 'error'); } }

async function handleRegister(e) { e.preventDefault(); const name = document.getElementById('reg-name').value; const email = document.getElementById('reg-email').value; const password = document.getElementById('reg-password').value; try { await apiRequest('auth.php', 'POST', { name, email, password }, { action: 'register' }); showToast('Account created! Please login'); navigate('login'); } catch (error) { showToast(error.message || 'Registration failed', 'error'); } }

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') { isDarkMode = true; document.body.classList.add('dark'); }

function startApp() {
  if (window._appStarted) return;
  window._appStarted = true;
  initApp();
}

if (document.readyState === 'complete') {
  startApp();
} else {
  window.addEventListener('load', startApp, { once: true });
}