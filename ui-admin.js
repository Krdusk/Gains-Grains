async function loadProducts() {
    try {
        const result = await apiRequest('products.php', 'GET');
        
        const sourceProducts = Array.isArray(result?.products) && result.products.length > 0
            ? result.products
            : Array.isArray(result) && result.length > 0
                ? result
                : typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) && PRODUCTS.length > 0
                    ? [...PRODUCTS]
                    : getDefaultProducts();
        
        adminProducts = sourceProducts.map(p => ({
            id: p.id || p.product_id || p.product_name?.toLowerCase().replace(/\s+/g, '-') || 'prod-' + Date.now() + Math.random(),
            name: p.name || p.product_name || p.product_title || 'Unnamed Product',
            category: p.category || p.product_category || 'gym',
            basePrice: Number(p.basePrice ?? p.price ?? p.base_price ?? 0),
            desc: p.desc || p.description || p.product_description || 'No description',
            image: p.image || p.image_url || p.img || 'https://via.placeholder.com/150?text=Product',
            rating: Number(p.rating ?? 4.5),
            inStock: p.inStock !== undefined ? p.inStock : (p.in_stock !== undefined ? p.in_stock === 1 : true),
            variants: Array.isArray(p.variants) ? p.variants : (typeof p.variant === 'string' ? [p.variant] : ['Standard']),
            specs: p.specs || p.specifications || ''
        }));
        
        if (!adminProducts.length) {
            adminProducts = typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : getDefaultProducts();
        }
        
        return adminProducts;
    } catch (error) {
        adminProducts = typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : getDefaultProducts();
        return adminProducts;
    }
}

function getDefaultProducts() {
    return [
        {
            id: 'prod-1',
            name: 'Premium Dumbbell Set',
            category: 'gym',
            basePrice: 2999,
            desc: 'Professional grade dumbbells with ergonomic grip',
            image: 'https://via.placeholder.com/150?text=Dumbbell',
            rating: 4.8,
            inStock: true,
            variants: ['5kg', '10kg', '15kg'],
            specs: 'Rubber coated, hexagonal design'
        },
        {
            id: 'prod-2',
            name: 'Basketball Pro',
            category: 'sports',
            basePrice: 1899,
            desc: 'Official size and weight basketball',
            image: 'https://via.placeholder.com/150?text=Basketball',
            rating: 4.6,
            inStock: true,
            variants: ['Size 7', 'Size 6'],
            specs: 'Indoor/Outdoor, premium leather'
        },
        {
            id: 'prod-3',
            name: 'Whey Protein Isolate',
            category: 'supplements',
            basePrice: 2499,
            desc: 'Pure whey protein for muscle recovery',
            image: 'https://via.placeholder.com/150?text=Protein',
            rating: 4.9,
            inStock: true,
            variants: ['Chocolate', 'Vanilla', 'Strawberry'],
            specs: '25g protein per serving, 2lbs'
        }
    ];
}

const originalNavigate = navigate;
navigate = async function(page) {
    currentView = page;
    
    if (page === 'admin' && adminProducts.length === 0) {
        await loadProducts();
    }
    
    if (page === 'home' && adminProducts.length === 0) {
        await loadProducts();
    }
    
    renderPage();
    if (page !== 'admin' && page !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

function renderAdmin() {
    if (!currentUser || currentUser.role !== 'admin') { 
        navigate('login'); 
        return ''; 
    }
    
    if (!adminProducts || adminProducts.length === 0) {
        setTimeout(() => loadProducts().then(() => renderPage()), 100);
        return `<div class="flex items-center justify-center min-h-[60vh]">
            <div class="text-center">
                <i data-lucide="loader" class="animate-spin text-neon mx-auto mb-4" style="width:48px;height:48px"></i>
                <p class="text-muted">Loading products...</p>
            </div>
        </div>`;
    }
    
    const totalRevenue = orders.reduce((s, o) => s + (parseFloat(o.total) || 0), 0);
    const pendingOrders = orders.filter(o => ['Pending', 'Cancellation Requested'].includes(o.status)).length;
    
    return `<div class="max-w-7xl mx-auto px-4 py-8">
        <h2 class="font-display text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p class="text-muted mb-6">Manage your store</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            ${[['Revenue', '₱' + totalRevenue.toLocaleString(), 'trending-up'], 
               ['Pending Orders', pendingOrders, 'clock'], 
               ['Products', adminProducts.length, 'box'], 
               ['Customers', orders.length, 'users']]
              .map(([l,v,i]) => `
                <div class="glass-card rounded-xl p-5">
                    <i data-lucide="${i}" class="text-neon mb-2" style="width:24px;height:24px"></i>
                    <div class="font-display text-2xl font-bold">${v}</div>
                    <div class="text-xs text-muted">${l}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="glass-card rounded-xl p-6 mb-8">
            <h3 class="font-display text-xl mb-4 flex items-center gap-2">
                <i data-lucide="plus-circle"></i> Add Product
            </h3>
            <form id="add-product-form" onsubmit="addProduct(event)" class="grid md:grid-cols-3 gap-4">
                <input type="text" id="prod-name" placeholder="Name" required class="px-3 py-2 rounded-lg">
                <select id="prod-category" class="px-3 py-2 rounded-lg">
                    <option value="gym">Gym</option>
                    <option value="sports">Sports</option>
                    <option value="supplements">Supplements</option>
                </select>
                <input type="number" id="prod-price" placeholder="Price" required class="px-3 py-2 rounded-lg">
                <input type="text" id="prod-desc" placeholder="Description" required class="px-3 py-2 rounded-lg md:col-span-2">
                <input type="text" id="prod-image" placeholder="Image URL" value="https://via.placeholder.com/150?text=Product" class="px-3 py-2 rounded-lg">
                <button type="submit" class="neon-btn px-4 py-2 rounded-lg">Add</button>
            </form>
        </div>
        
        <div class="glass-card rounded-xl p-6 mb-8">
            <h3 class="font-display text-xl mb-4">Products (${adminProducts.length})</h3>
            <div class="overflow-x-auto">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminProducts.map(p => {
                            const imageUrl = p.image || 'https://via.placeholder.com/50?text=No+Image';
                            const productName = p.name || p.product_name || 'Unnamed Product';
                            const category = p.category || p.product_category || 'gym';
                            const price = Number(p.basePrice ?? p.price ?? p.base_price ?? 0);
                            const productId = p.id || p.product_id || `prod-${Math.random().toString(36).slice(2, 8)}`;
                            
                            return `<tr>
                                <td><img src="${imageUrl}" class="w-12 h-12 object-cover rounded" onerror="this.onerror=null; this.src='https://via.placeholder.com/50?text=Error'"></td>
                                <td>${productName}</td>
                                <td><span class="px-2 py-1 rounded text-xs bg-neon/20 text-neon">${category}</span></td>
                                <td><input id="price-${productId}" type="number" value="${price}" class="w-24 px-2 py-1 rounded border border-slate-300 text-sm"></td>
                                <td>
                                    <button onclick="saveProductPrice('${productId}')" class="text-neon text-sm mr-3">Save</button>
                                    <button onclick="deleteProduct('${productId}')" class="text-red-500 text-sm">Delete</button>
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="glass-card rounded-xl p-6">
            <h3 class="font-display text-xl mb-4">Orders (${orders.length})</h3>
            ${orders.length === 0 ? '<p class="text-muted text-center py-8">No orders</p>' : `
                <div class="overflow-x-auto">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(o => {
                                const customerName = o.customer_name || o.customerName || o.customer_email || 'Unknown';
                                const shippingAddress = o.shipping_address || o.address || o.shippingAddress || 'No address';
                                return `<tr>
                                    <td class="text-neon text-xs">${o.id}</td>
                                    <td class="text-sm">${customerName}</td>
                                    <td class="text-xs text-muted max-w-xs truncate">${shippingAddress}</td>
                                    <td class="text-neon font-bold">${formatPrice(parseFloat(o.total) || 0)}</td>
                                    <td>
                                        <select onchange="updateOrderStatus('${o.id}', this.value)" class="px-2 py-1 rounded text-xs">
                                            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                            <option value="Cancellation Requested" ${o.status === 'Cancellation Requested' ? 'selected' : ''}>Cancellation Requested</option>
                                            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                                            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onclick="viewOrderDetails('${o.id}')" class="text-neon text-xs">View</button>
                                    </td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
    </div>`;
}

function addProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: 'prod-' + Date.now(),
        name: document.getElementById('prod-name').value,
        category: document.getElementById('prod-category').value,
        basePrice: parseInt(document.getElementById('prod-price').value) || 0,
        desc: document.getElementById('prod-desc').value,
        image: document.getElementById('prod-image').value || 'https://via.placeholder.com/150?text=New+Product',
        rating: 4.5,
        inStock: true,
        variants: ['Standard'],
        specs: 'New product'
    };
    
    adminProducts.push(newProduct);
    showToast('Product added!');
    document.getElementById('add-product-form').reset();
    renderPage();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    await loadOrders(currentUser?.role === 'admin');
    renderPage();
});