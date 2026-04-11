const USER_PROFILE_STORAGE_KEY = 'gng_user_profiles';

function loadUserProfiles() {
  try {
    const raw = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUserProfiles(profiles) {
  localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

function getUserProfileData(email) {
  if (!email) return {};
  const profiles = loadUserProfiles();
  return profiles[email.toLowerCase()] || {};
}

function updateUserProfileData(email, data) {
  if (!email) return;
  const key = email.toLowerCase();
  const profiles = loadUserProfiles();
  profiles[key] = {
    ...profiles[key],
    ...data
  };
  saveUserProfiles(profiles);
  return profiles[key];
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
  const user = window.currentUser || null;
  if (!user || user.role === 'admin') {
    showToast('Please login as customer first', 'error');
    navigate('login');
    return;
  }

  const product = adminProducts.find(p => p.id === productId);
  if (!product) {
    showToast('Product not found', 'error');
    return;
  }

  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, variant: null, quantity: 1 });
    await loadCart();
    showToast(`${product.name} added to cart`);
    renderNav();
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not add to cart', 'error');
  }
}

async function addToCartWithVariant(productId) {
  const user = window.currentUser || null;
  if (!user || user.role === 'admin') { showToast('Please login as customer first', 'error'); navigate('login'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) { showToast('Product not found', 'error'); return; }
  const variant = document.getElementById('product-variant')?.value || null;
  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, variant, quantity: 1 });
    await loadCart();
    showToast(`${product.name}${variant ? ` (${variant})` : ''} added to cart`);
    renderNav();
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not add to cart', 'error');
  }
}

async function buyNow(productId) {
  const user = window.currentUser || null;
  if (!user || user.role === 'admin') { showToast('Please login as customer first', 'error'); navigate('login'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) { showToast('Product not found', 'error'); return; }
  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, quantity: 1 });
    await loadCart();
    navigate('checkout');
  } catch (error) {
    showToast(error.message || 'Could not start checkout', 'error');
  }
}

async function buyNowWithVariant(productId) {
  const user = window.currentUser || null;
  if (!user || user.role === 'admin') { showToast('Please login as customer first', 'error'); navigate('login'); return; }
  const product = adminProducts.find(p => p.id === productId);
  if (!product) { showToast('Product not found', 'error'); return; }
  const variant = document.getElementById('product-variant')?.value || null;
  try {
    await apiRequest('cart.php', 'POST', { product_id: productId, variant, quantity: 1 });
    await loadCart();
    navigate('checkout');
  } catch (error) {
    showToast(error.message || 'Could not start checkout', 'error');
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

async function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const newQuantity = item.quantity + delta;
  try {
    if (newQuantity <= 0) {
      await apiRequest('cart.php', 'DELETE', null, { id: item.id });
    } else {
      await apiRequest('cart.php', 'PUT', { id: item.id, quantity: newQuantity });
    }
    await loadCart();
    renderNav();
    renderPage();
  } catch (error) {
    showToast(error.message || 'Could not update cart', 'error');
  }
}

async function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  try {
    await apiRequest('cart.php', 'DELETE', null, { id: item.id });
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
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;
  const profileData = getUserProfileData(currentUser?.email);
  const emailValue = profileData.email || currentUser?.email || '';
  return `<div class="max-w-4xl mx-auto px-4 py-8"><h2 class="font-display text-3xl font-bold mb-6">Checkout</h2><div class="grid md:grid-cols-2 gap-8"><div><form id="checkout-form" onsubmit="handleCheckoutSubmit(event)"><div class="glass-card rounded-xl p-6 mb-6"><h3 class="font-display text-lg mb-4">Shipping Info</h3><div class="space-y-4"><input type="text" id="checkout-name" required value="${currentUser?.name || ''}" placeholder="Full Name" class="w-full px-4 py-2 rounded-lg"><input type="email" id="checkout-email" required value="${emailValue}" placeholder="Email" class="w-full px-4 py-2 rounded-lg"><input type="tel" id="checkout-phone" required value="${profileData?.phone || ''}" placeholder="Phone" class="w-full px-4 py-2 rounded-lg"><input type="text" id="checkout-address" required placeholder="Address" value="${profileData?.address || ''}" class="w-full px-4 py-2 rounded-lg"></div></div><div class="glass-card rounded-xl p-6"><h3 class="font-display text-lg mb-4">Payment</h3><div class="space-y-3"><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="COD" checked><i data-lucide="package"></i><span>Cash on Delivery</span></label><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="GCash"><i data-lucide="smartphone"></i><span>GCash</span></label><label class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/10"><input type="radio" name="payment" value="Maya"><i data-lucide="credit-card"></i><span>Maya</span></label></div></div></form></div><div><div class="glass-card rounded-xl p-6 sticky top-24"><h3 class="font-display text-lg mb-4">Order Summary</h3><div class="space-y-2 max-h-64 overflow-y-auto mb-4">${cart.map(item => `<div class="flex justify-between text-sm"><span class="text-muted">${item.name} ${item.variant ? `(${item.variant})` : ''} x${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span></div>`).join('')}</div><div class="border-t pt-4 space-y-2"><div class="flex justify-between"><span class="text-muted">Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="flex justify-between"><span class="text-muted">Shipping</span><span class="text-neon">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div><div class="flex justify-between pt-2 border-t"><span class="font-display font-bold">Total</span><span class="font-display text-neon text-xl font-bold">${formatPrice(total)}</span></div></div><button type="submit" form="checkout-form" class="neon-btn w-full py-3 rounded-xl mt-6">Place Order</button></div></div></div></div>`;
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  if (!payment) { showToast('Select payment method', 'error'); return; }
  const name = document.getElementById('checkout-name').value.trim();
  const email = document.getElementById('checkout-email').value.trim().toLowerCase();
  const address = document.getElementById('checkout-address').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  if (!name || !email || !address || !phone) {
    showToast('Please fill in all shipping details', 'error');
    return;
  }
  if (!currentUser) {
    showToast('Please login first', 'error');
    navigate('login');
    return;
  }
  currentUser.name = name;
  if (typeof syncCurrentUserToWindow === 'function') syncCurrentUserToWindow();
  updateUserProfileData(currentUser.email, { name, contactEmail: email, phone, address });
  try {
    if (payment !== 'COD') {
      const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
      const shipping = subtotal >= 5000 ? 0 : 299;
      const total = subtotal + shipping;
      const paymentSuccess = await processPayment(total, payment);
      if (!paymentSuccess) return;
    }
    await apiRequest('orders.php', 'POST', { address, payment_method: payment, phone, email });
    await loadOrders(false);
    await loadCart();
    showToast(`Order placed successfully!`, 'success');
    cart = [];
    renderNav();
    navigate('profile');
  } catch (error) {
    showToast(error.message || 'Could not place order', 'error');
  }
}

function renderProfile() {
  if (!currentUser) {
    return `<div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"><p class="font-display text-xl mb-4">Please login to view your profile.</p><button onclick="navigate('login')" class="neon-btn px-6 py-3 rounded-xl">Login</button></div>`;
  }
  const userOrders = orders;
  const userData = getUserProfileData(currentUser.email);
  const emailValue = userData.contactEmail || userData.email || currentUser.email || '';
  return `<div class="max-w-4xl mx-auto px-4 py-8"><div class="glass-card rounded-2xl p-6 mb-8"><div class="flex items-center gap-6 mb-6"><div class="profile-img-container"><img id="profile-img" src="${userData.profilePic || 'https://via.placeholder.com/100'}" class="profile-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=User'"><label for="profile-upload" class="upload-btn"><i data-lucide="camera" style="width:16px;height:16px"></i></label><input type="file" id="profile-upload" accept="image/*" style="display:none" onchange="uploadProfileImage(event)"><button class="delete-img-btn" onclick="deleteProfileImage()"><i data-lucide="trash-2" style="width:14px;height:14px"></i></button></div><div><h2 class="font-display text-2xl font-bold">${currentUser.name}</h2><p class="text-muted">${emailValue}</p><p class="text-neon text-sm mt-1">Member</p></div></div><div class="border-t pt-6"><h3 class="font-display text-lg mb-4">Edit Profile</h3><form id="profile-update-form" onsubmit="updateProfile(event)"><div class="grid md:grid-cols-2 gap-4 mb-4"><div><input type="text" id="profile-name" value="${currentUser.name}" class="w-full px-4 py-2 rounded-lg"></div><div><input type="email" id="profile-email" value="${emailValue}" class="w-full px-4 py-2 rounded-lg"></div><div><input type="tel" id="profile-phone" value="${userData.phone || ''}" placeholder="Phone" class="w-full px-4 py-2 rounded-lg"></div><div><input type="text" id="profile-address" value="${userData.address || ''}" placeholder="Address" class="w-full px-4 py-2 rounded-lg"></div></div><button type="submit" class="neon-btn px-6 py-2 rounded-lg">Update</button></form></div></div><h3 class="font-display text-xl mb-4">Orders</h3>${userOrders.length === 0 ? `<div class="glass-card rounded-xl p-8 text-center"><i data-lucide="package" class="text-muted mb-3" style="width:48px;height:48px"></i><p class="text-muted">No orders yet</p><button onclick="navigate('home')" class="neon-btn px-6 py-2 rounded-lg mt-4">Shop Now</button></div>` : `<div class="space-y-4">${userOrders.map(o => `<div class="glass-card rounded-xl p-5"><div class="flex justify-between items-start mb-3"><div><p class="text-neon text-sm">${o.id}</p><p class="text-muted text-xs">${new Date(o.date).toLocaleDateString()}</p></div><span class="px-3 py-1 rounded-full text-xs ${o.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : o.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' : o.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : o.status === 'Cancellation Requested' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}">${o.status}</span></div>${o.items.map(i => `<div class="flex justify-between text-sm"><span class="text-muted">${i.name} x${i.quantity}</span><span>${formatPrice((i.price ?? i.unit_price) * i.quantity)}</span></div>`).join('')}<div class="mt-3">${o.status === 'Pending' ? `<button onclick="requestOrderCancellation('${o.id}')" class="neon-outline px-4 py-2 rounded-lg text-sm">Request Cancel</button>` : o.status === 'Cancellation Requested' ? `<p class="text-orange-300 text-sm">Cancellation requested, waiting admin approval.</p>` : ''}</div><div class="border-t mt-3 pt-3 flex justify-between"><span class="font-display">Total</span><span class="text-neon font-bold">${formatPrice(o.total)}</span></div></div>`).join('')}</div>`}</div>`;
}

function uploadProfileImage(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('profile-img').src = ev.target.result;
      updateUserProfileData(currentUser?.email, { profilePic: ev.target.result });
      showToast('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  }
}

function deleteProfileImage() {
  if (!currentUser?.email) return;
  const profileData = getUserProfileData(currentUser.email);
  updateUserProfileData(currentUser.email, { ...profileData, profilePic: null });
  const img = document.getElementById('profile-img');
  if (img) img.src = 'https://via.placeholder.com/100?text=User';
  showToast('Picture deleted');
}

function updateProfile(e) {
  e.preventDefault();
  const name = document.getElementById('profile-name').value.trim();
  const email = document.getElementById('profile-email').value.trim().toLowerCase();
  const phone = document.getElementById('profile-phone').value.trim();
  const address = document.getElementById('profile-address').value.trim();
  if (!name || !email) {
    showToast('Name and email are required', 'error');
    return;
  }
  if (!currentUser) {
    showToast('No user logged in', 'error');
    return;
  }
  currentUser.name = name;
  if (typeof syncCurrentUserToWindow === 'function') syncCurrentUserToWindow();
  updateUserProfileData(currentUser.email, { name, contactEmail: email, phone, address });
  showToast('Profile updated!');
  renderPage();
}

async function requestOrderCancellation(id) {
  const o = orders.find(o => o.id === id);
  if (!o) return;
  if (o.status !== 'Pending') { showToast('Cancellation can only be requested while the order is pending', 'error'); return; }
  try {
    await apiRequest('orders.php', 'PUT', { id, status: 'Cancellation Requested' });
    await loadOrders(false);
    showToast(`Cancellation requested for ${id}. Waiting admin approval.`);
    renderPage();
  } catch (error) {bnnm          
    showToast(error.message || 'Could not request cancellation', 'error');
  }
}

function renderAbout() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">About Gains & Grains</h1><p class="text-center text-muted mb-12">Philippines' Trusted Fitness Partner Since 2020</p><div class="glass-card rounded-2xl p-8 mb-8"><h2 class="font-display text-2xl font-bold mb-4">Our Mission</h2><p class="text-muted">To empower every Filipino to achieve their fitness goals by providing premium quality gym equipment, sports gear, and supplements at affordable prices.</p></div><div class="grid md:grid-cols-2 gap-6">${[['Quality Guaranteed', 'All products are tested'], ['Authentic Products', '100% genuine with warranty'], ['Fast Delivery', 'Nationwide shipping'], ['24/7 Support', 'Expert customer service']].map(([t,d]) => `<div class="glass-card rounded-2xl p-6"><i data-lucide="trophy" class="text-neon mb-3" style="width:32px;height:32px"></i><h3 class="font-display text-xl font-bold mb-2">${t}</h3><p class="text-muted text-sm">${d}</p></div>`).join('')}</div></div>`; }

function renderFAQ() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">FAQ</h1><div class="space-y-4">${FAQS.map((f,i) => `<div class="glass-card rounded-xl p-6 cursor-pointer" onclick="toggleFAQ(${i})"><div class="flex justify-between items-center"><h3 class="font-display text-lg font-bold">${f.q}</h3><i data-lucide="chevron-down" id="faq-icon-${i}" style="width:20px;height:20px"></i></div><div id="faq-answer-${i}" class="mt-3 text-muted hidden">${f.a}</div></div>`).join('')}</div></div>`; }

function toggleFAQ(i) { const a = document.getElementById(`faq-answer-${i}`); const ic = document.getElementById(`faq-icon-${i}`); if (a && ic) { a.classList.toggle('hidden'); ic.style.transform = a.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)'; } }

function renderContact() { return `<div class="max-w-4xl mx-auto px-4 py-12"><h1 class="font-display text-4xl font-bold text-center mb-4">Contact Us</h1><div class="grid md:grid-cols-2 gap-8"><div class="glass-card rounded-2xl p-6"><h3 class="font-display text-xl font-bold mb-4">Get in Touch</h3><div class="space-y-4"><div class="flex gap-3"><i data-lucide="map-pin" class="text-neon"></i><span>Josephine Resort Subdivision, Kawit, Cavite</span></div><div class="flex gap-3"><i data-lucide="phone" class="text-neon"></i><span>09942380471</span></div><div class="flex gap-3"><i data-lucide="mail" class="text-neon"></i><span>santocincs@gmail.com</span></div></div></div><div class="glass-card rounded-2xl p-6"><form onsubmit="handleContact(event)"><input type="text" placeholder="Name" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><textarea rows="4" placeholder="Message" required class="w-full px-4 py-2 rounded-lg mb-4"></textarea><button type="submit" class="neon-btn w-full py-3 rounded-xl">Send</button></form></div></div></div>`; }

function handleContact(e) { e.preventDefault(); showToast('Message sent!'); e.target.reset(); }

function renderLogin() { const isAdminLogin = window.adminEntry === true; return `<div class="flex items-center justify-center min-h-[80vh] px-4"><div class="glass-card rounded-2xl p-8 max-w-md w-full slide-in"><div class="text-center mb-6"><div class="logo-icon w-20 h-20 mx-auto mb-4"><i data-lucide="zap" style="width:40px;height:40px"></i></div><h2 class="font-display text-2xl font-bold">${isAdminLogin ? 'Welcome Back!<br><span class="block mt-2">Admin Login</span>' : 'Welcome Back'}</h2>${isAdminLogin ? '<p class="text-sm text-muted mt-2">Sign in with your admin credentials to access the dashboard.</p>' : ''}</div><form onsubmit="handleLogin(event)"><input type="email" id="login-email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="password" id="login-password" placeholder="Password" required class="w-full px-4 py-2 rounded-lg mb-6"><button type="submit" class="neon-btn w-full py-3 rounded-xl">Sign In</button></form>${isAdminLogin ? '' : '<div class="text-center mt-4"><button onclick="navigate(\'register\')" class="text-neon text-sm hover:underline">Create Account</button></div>'}</div></div>`; }

function renderRegister() { return `<div class="flex items-center justify-center min-h-[80vh] px-4"><div class="glass-card rounded-2xl p-8 max-w-md w-full slide-in"><div class="text-center mb-6"><div class="logo-icon w-20 h-20 mx-auto mb-4"><i data-lucide="zap" style="width:40px;height:40px"></i></div><h2 class="font-display text-2xl font-bold">Join the Grind</h2></div><form onsubmit="handleRegister(event)"><input type="text" id="reg-name" placeholder="Full Name" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="email" id="reg-email" placeholder="Email" required class="w-full px-4 py-2 rounded-lg mb-4"><input type="password" id="reg-password" placeholder="Password (min 6)" required minlength="6" class="w-full px-4 py-2 rounded-lg mb-6"><button type="submit" class="neon-btn w-full py-3 rounded-xl">Create Account</button></form><div class="text-center mt-4"><button onclick="navigate('login')" class="text-neon text-sm hover:underline">Already have an account?</button></div></div></div>`; }

async function handleLogin(e) { e.preventDefault(); const email = document.getElementById('login-email').value; const password = document.getElementById('login-password').value; try { const result = await apiRequest('auth.php', 'POST', { email, password }, { action: 'login' }); const user = result.user; if (window.adminEntry === true && user.role !== 'admin') { showToast('Only admin may login here', 'error'); return; } if (window.adminEntry !== true && user.role === 'admin') { showToast('Admin login is not allowed on the user page. Use admin.html instead.', 'error'); return; } currentUser = user; syncCurrentUserToWindow(); showToast(`Welcome ${user.name}!`); window.adminEntry = false; await loadCart(); await loadOrders(currentUser.role === 'admin'); navigate(currentUser.role === 'admin' ? 'admin' : 'home'); } catch (error) { showToast(error.message || 'Invalid credentials', 'error'); } }

async function handleRegister(e) { e.preventDefault(); const name = document.getElementById('reg-name').value; const email = document.getElementById('reg-email').value; const password = document.getElementById('reg-password').value; try { await apiRequest('auth.php', 'POST', { name, email, password }, { action: 'register' }); showToast('Account created! Please login'); navigate('login'); } catch (error) { showToast(error.message || 'Registration failed', 'error'); } }