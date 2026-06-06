console.log('ui-admin.js loaded');

function normalizeRemoteProduct(product) {
    const id = String(product.id || product.product_id || product.product_name?.toLowerCase().replace(/\s+/g, '-') || ('prod-' + Date.now() + Math.random()));
    const stockCount = Number(product.stock_count ?? product.stockCount ?? product.in_stock ?? (product.inStock ? 1 : 0));
    return {
        id,
        name: product.name || product.product_name || product.product_title || 'Unnamed Product',
        category: product.category || product.product_category || 'gym',
        basePrice: Number(product.basePrice ?? product.price ?? product.base_price ?? 0),
        desc: product.desc || product.description || product.product_description || 'No description',
        image: /^(eq|sp|sup)\d+$/i.test(id) ? `images/${id}.jpg` : (product.image || product.image_url || product.img || `images/${id}.jpg`),
        rating: Number(product.rating ?? 4.5),
        stockCount: Number.isFinite(stockCount) ? stockCount : 0,
        inStock: Number.isFinite(stockCount) ? stockCount > 0 : (product.inStock !== undefined ? product.inStock : true),
        variants: Array.isArray(product.variants) ? product.variants : (typeof product.variant === 'string' ? [product.variant] : ['Standard']),
        specs: product.specs || product.specifications || ''
    };
}

if (typeof BLOCKED_PRODUCT_IDS === 'undefined') {
    window.BLOCKED_PRODUCT_IDS = new Set(['sp82', 'sup52']);
} else {
    window.BLOCKED_PRODUCT_IDS = BLOCKED_PRODUCT_IDS;
}
let adminEmployees = [];
let adminSearchQuery = '';
let editingEmployeeNumber = null;

function normalizeEmployee(employee) {
    const salary = Number(employee.salary ?? employee.pay ?? employee.monthly_salary ?? 0);
    return {
        employee_number: String(employee.employee_number || employee.id || ''),
        full_name: employee.full_name || employee.name || 'Unknown Employee',
        role: employee.role || 'Staff',
        salary: Number.isFinite(salary) ? salary : 0,
        hired_at: employee.hired_at || employee.hiredAt || new Date().toISOString().slice(0, 10)
    };
}

window.scrollToAdminSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.editEmployee = function(employeeNumber) {
    const employee = adminEmployees.find(item => item.employee_number === employeeNumber);
    if (!employee) return;

    editingEmployeeNumber = employee.employee_number;
    const numberInput = document.getElementById('employee-number');
    const nameInput = document.getElementById('employee-name');
    const roleInput = document.getElementById('employee-role');
    const salaryInput = document.getElementById('employee-salary');
    const hiredAtInput = document.getElementById('employee-hired');

    if (numberInput) {
        numberInput.value = employee.employee_number;
        numberInput.readOnly = true;
    }
    if (nameInput) nameInput.value = employee.full_name;
    if (roleInput) roleInput.value = employee.role;
    if (salaryInput) salaryInput.value = employee.salary;
    if (hiredAtInput) hiredAtInput.value = employee.hired_at;

    scrollToAdminSection('admin-employee-section');
};

window.cancelEmployeeEdit = function() {
    editingEmployeeNumber = null;
    const form = document.getElementById('employee-form');
    if (form) form.reset();
    const numberInput = document.getElementById('employee-number');
    const hiredAtInput = document.getElementById('employee-hired');
    if (numberInput) numberInput.readOnly = false;
    if (hiredAtInput) hiredAtInput.value = new Date().toISOString().slice(0, 10);
};

window.saveEmployee = async function() {
    const employeeNumberInput = document.getElementById('employee-number');
    const nameInput = document.getElementById('employee-name');
    const roleInput = document.getElementById('employee-role');
    const salaryInput = document.getElementById('employee-salary');
    const hiredAtInput = document.getElementById('employee-hired');

    const fullName = nameInput?.value.trim();
    const role = roleInput?.value || 'Staff';
    const salary = Number(salaryInput?.value);
    const hiredAt = hiredAtInput?.value || new Date().toISOString().slice(0, 10);

    if (!fullName) {
        showToast('Employee name is required', 'error');
        return;
    }
    if (!Number.isFinite(salary)) {
        showToast('Enter a valid salary', 'error');
        return;
    }

    const payload = {
        full_name: fullName,
        role,
        salary,
        hired_at: hiredAt
    };

    if (editingEmployeeNumber) {
        payload.employee_number = editingEmployeeNumber;
        await apiRequest('employees.php', 'PUT', payload);
        showToast('Employee updated successfully');
    } else {
        const providedNumber = employeeNumberInput?.value.trim();
        if (providedNumber) {
            payload.employee_number = providedNumber;
        }
        await apiRequest('employees.php', 'POST', payload);
        showToast('Employee added successfully');
    }

    cancelEmployeeEdit();
    await loadEmployees();
    renderPage();
};

window.deleteEmployee = async function(employeeNumber) {
    if (!confirm('Delete this employee?')) {
        return;
    }

    try {
        await apiRequest('employees.php', 'DELETE', null, { employee_number: employeeNumber });
        if (editingEmployeeNumber === employeeNumber) {
            cancelEmployeeEdit();
        }
        await loadEmployees();
        showToast('Employee removed');
        renderPage();
    } catch (error) {
        showToast(error.message || 'Error deleting employee', 'error');
    }
};

window.inlineEditEmployee = function(employeeNumber) {
    const row = document.getElementById(`emp-row-${employeeNumber}`);
    const emp = adminEmployees.find(e => e.employee_number === employeeNumber);
    if (!row || !emp) return;
    row.innerHTML = `
        <td class="text-neon text-xs"><input id="inline-id-${employeeNumber}" value="${emp.employee_number}" class="w-28 px-2 py-1 rounded border"></td>
        <td><input id="inline-name-${employeeNumber}" value="${emp.full_name}" class="w-56 px-2 py-1 rounded border"></td>
        <td><input id="inline-role-${employeeNumber}" value="${emp.role}" class="w-40 px-2 py-1 rounded border"></td>
        <td><input id="inline-salary-${employeeNumber}" type="number" value="${emp.salary}" class="w-32 px-2 py-1 rounded border"></td>
        <td><input id="inline-hired-${employeeNumber}" type="date" value="${emp.hired_at}" class="px-2 py-1 rounded border"></td>
        <td>
            <div class="flex gap-2">
                <button onclick="inlineSaveEmployee('${employeeNumber}')" class="text-neon text-xs">Save</button>
                <button onclick="inlineCancelEmployee('${employeeNumber}')" class="text-muted text-xs">Cancel</button>
            </div>
        </td>
    `;
};

window.inlineSaveEmployee = async function(employeeNumber) {
    const name = document.getElementById(`inline-name-${employeeNumber}`)?.value.trim();
    const role = document.getElementById(`inline-role-${employeeNumber}`)?.value.trim() || 'Staff';
    const salary = Number(document.getElementById(`inline-salary-${employeeNumber}`)?.value || 0);
    const hired_at = document.getElementById(`inline-hired-${employeeNumber}`)?.value || new Date().toISOString().slice(0,10);
    if (!name) { showToast('Employee name required', 'error'); return; }
    try {
        await apiRequest('employees.php', 'PUT', { employee_number: employeeNumber, full_name: name, role, salary, hired_at });
        await loadEmployees();
        showToast('Employee updated');
        renderPage();
    } catch (e) {
        showToast(e.message || 'Error saving employee', 'error');
    }
};

window.inlineCancelEmployee = function(employeeNumber) {
    
    loadEmployees().then(() => renderPage());
};

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

        const baseProducts = typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) ? PRODUCTS : [];
        const productMap = new Map(baseProducts.map(p => [p.id, { ...p }]));
        const remoteProducts = sourceProducts.map(normalizeRemoteProduct);
        for (const remote of remoteProducts) {
            if (window.BLOCKED_PRODUCT_IDS.has(remote.id)) {
                continue;
            }
            if (productMap.has(remote.id)) {
                productMap.set(remote.id, { ...productMap.get(remote.id), ...remote });
            } else {
                productMap.set(remote.id, remote);
            }
        }
        adminProducts = Array.from(productMap.values()).filter(p => !window.BLOCKED_PRODUCT_IDS.has(p.id));
        
        if (!adminProducts.length) {
            adminProducts = (typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : getDefaultProducts()).filter(p => !window.BLOCKED_PRODUCT_IDS.has(p.id));
        }
        
        return adminProducts;
    } catch (error) {
        adminProducts = (typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : getDefaultProducts()).filter(p => !window.BLOCKED_PRODUCT_IDS.has(p.id));
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

function getDefaultEmployees() {
    return [
        { employee_number: 'EMP001', full_name: 'Ana Reyes', role: 'Store Manager', salary: 42000.00, hired_at: '2023-01-15' },
        { employee_number: 'EMP002', full_name: 'Carlo Dela Cruz', role: 'Sales Lead', salary: 35000.00, hired_at: '2023-03-22' },
        { employee_number: 'EMP003', full_name: 'Mia Santos', role: 'Operations Specialist', salary: 32000.00, hired_at: '2023-05-05' },
        { employee_number: 'EMP004', full_name: 'Juan Garcia', role: 'Customer Support', salary: 28000.00, hired_at: '2023-07-10' }
    ];
}

async function loadEmployees() {
    try {
        const result = await apiRequest('employees.php', 'GET');
        adminEmployees = Array.isArray(result) ? result.map(normalizeEmployee) : getDefaultEmployees().map(normalizeEmployee);
    } catch (error) {
        adminEmployees = getDefaultEmployees().map(normalizeEmployee);
    }
}

window.handleAdminSearch = function handleAdminSearch(query) {
    adminSearchQuery = query.toLowerCase().trim();
    if (window._adminSearchTimer) clearTimeout(window._adminSearchTimer);
    window._adminSearchTimer = setTimeout(() => {
        if (currentView !== 'admin') return;
        const prodSection = document.getElementById('admin-products-section');
        if (!prodSection) return;
        const tbody = prodSection.querySelector('table.admin-table tbody');
        if (!tbody) return;

        const rows = Array.from(tbody.querySelectorAll('tr'));
        let visibleCount = 0;
        for (const row of rows) {
            const text = row.innerText.toLowerCase();
            const matches = !adminSearchQuery || text.includes(adminSearchQuery);
            if (matches) {
                row.style.visibility = '';
                row.style.pointerEvents = '';
                row.style.opacity = '';
            } else {
                row.style.visibility = 'hidden';
                row.style.pointerEvents = 'none';
                row.style.opacity = '0';
            }
            if (matches) visibleCount++;
        }

        const header = prodSection.querySelector('h3.font-display');
        if (header) header.innerText = `Products (${visibleCount})`;

        const searchInput = document.getElementById('admin-product-search');
        if (searchInput) {
            try { searchInput.focus({ preventScroll: true }); } catch (e) { try { searchInput.focus(); } catch (e) {} }
        }
    }, 150);
}

window.clearAdminSearch = function clearAdminSearch() {
    adminSearchQuery = '';
    const searchInput = document.getElementById('admin-product-search');
    if (searchInput) {
        searchInput.value = '';
        handleAdminSearch('');
    }
}

if (typeof window.originalNavigate === 'undefined') {
    window.originalNavigate = navigate;
}
window.navigate = async function(page) {
    currentView = page;
    
    
    if (currentUser?.role === 'admin' && page === 'home' && window.adminEntry === true) {
        currentView = 'admin';
    }
    
    if (currentView === 'admin') {
        if (adminProducts.length === 0) await loadProducts();
        if (adminEmployees.length === 0) await loadEmployees();
    }
    
    if (currentView === 'home' && adminProducts.length === 0) {
        await loadProducts();
    }
    
    renderPage();
    if (currentView !== 'admin' && currentView !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.renderAdmin = function renderAdmin() {
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
    
    const filteredProducts = adminProducts.filter(p => {
        const searchValue = adminSearchQuery;
        if (!searchValue) return true;
        return p.name.toLowerCase().includes(searchValue) ||
            p.category.toLowerCase().includes(searchValue) ||
            p.id.toLowerCase().includes(searchValue) ||
            p.desc.toLowerCase().includes(searchValue);
    });
    const totalRevenue = orders.reduce((s, o) => s + (parseFloat(o.total) || 0), 0);
    const payrollTotal = adminEmployees.reduce((s, e) => s + (parseFloat(e.salary) || 0), 0);
    const pendingOrders = orders.filter(o => ['Pending', 'Cancellation Requested'].includes(o.status)).length;
    const profitEstimate = Math.round(totalRevenue * 0.25);
    const revenueByMonth = orders.reduce((acc, o) => {
        const date = new Date(o.date);
        if (isNaN(date)) return acc;
        const key = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        acc[key] = (acc[key] || 0) + (parseFloat(o.total) || 0);
        return acc;
    }, {});
    const monthLabels = Object.keys(revenueByMonth).slice(-6);
    const maxRevenue = Math.max(...Object.values(revenueByMonth), 1);
    const maxSalary = Math.max(...adminEmployees.map(e => Number(e.salary) || 0), 1);
    
    return `<div class="max-w-7xl mx-auto px-4 py-8">
        <h2 class="font-display text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p class="text-muted mb-6">Manage your store with live sales, team payroll, and product control.</p>
        <div class="glass-card rounded-xl p-5 mb-6">
            <div class="flex flex-wrap gap-3">
                <button type="button" onclick="scrollToAdminSection('admin-products-section')" class="neon-btn px-4 py-2 rounded-lg text-sm">Products</button>
                <button type="button" onclick="scrollToAdminSection('admin-employee-section')" class="neon-outline px-4 py-2 rounded-lg text-sm">Employees</button>
                <button type="button" onclick="scrollToAdminSection('admin-orders-section')" class="neon-outline px-4 py-2 rounded-lg text-sm">Orders</button>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            ${[['Revenue', '₱' + totalRevenue.toLocaleString(), 'trending-up'], 
               ['Pending Orders', pendingOrders, 'clock'], 
               ['Products', adminProducts.length, 'box'], 
               ['Employees', adminEmployees.length, 'users']]
              .map(([l,v,i]) => `
                <div class="glass-card rounded-xl p-5">
                    <i data-lucide="${i}" class="text-neon mb-2" style="width:24px;height:24px"></i>
                    <div class="font-display text-2xl font-bold">${v}</div>
                    <div class="text-xs text-muted">${l}</div>
                </div>
            `).join('')}
        </div>

        <div class="grid gap-6 lg:grid-cols-2 mb-8">
            <div class="glass-card rounded-xl p-6">
                <h3 class="font-display text-xl mb-4">Profit Overview</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div class="glass-card rounded-xl p-4 bg-slate-900/80">
                        <div class="text-xs uppercase text-neon font-semibold">Total Revenue</div>
                        <div class="text-3xl font-bold mt-2">₱${totalRevenue.toLocaleString()}</div>
                    </div>
                    <div class="glass-card rounded-xl p-4 bg-slate-900/80">
                        <div class="text-xs uppercase text-neon font-semibold">Estimated Profit</div>
                        <div class="text-3xl font-bold mt-2">₱${profitEstimate.toLocaleString()}</div>
                        <div class="text-xs text-muted mt-1">Based on a 25% estimated margin</div>
                    </div>
                    ${monthLabels.length ? monthLabels.map(label => {
                        const value = revenueByMonth[label];
                        const width = Math.round((value / maxRevenue) * 100);
                        return `<div>
                            <div class="flex justify-between text-xs text-muted mb-1"><span>${label}</span><span>₱${value.toLocaleString()}</span></div>
                            <div class="h-3 rounded-full bg-slate-800 overflow-hidden">
                                <div class="h-full bg-neon" style="width:${width}%;"></div>
                            </div>
                        </div>`;
                    }).join('') : '<p class="text-muted">No revenue data available yet.</p>'}
                </div>
            </div>
            <div class="glass-card rounded-xl p-6">
                <h3 class="font-display text-xl mb-4">Team & Payroll</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="glass-card rounded-xl p-4 bg-slate-900/80 text-center">
                        <div class="text-xs uppercase text-neon font-semibold">Employees</div>
                        <div class="text-3xl font-bold mt-2">${adminEmployees.length}</div>
                    </div>
                    <div class="glass-card rounded-xl p-4 bg-slate-900/80 text-center">
                        <div class="text-xs uppercase text-neon font-semibold">Monthly Payroll</div>
                        <div class="text-3xl font-bold mt-2">₱${payrollTotal.toLocaleString()}</div>
                    </div>
                    <div class="glass-card rounded-xl p-4 bg-slate-900/80 text-center">
                        <div class="text-xs uppercase text-neon font-semibold">Open Requests</div>
                        <div class="text-3xl font-bold mt-2">${pendingOrders}</div>
                    </div>
                </div>
                <div class="grid gap-4 mb-6">
                    ${adminEmployees.length ? adminEmployees.map(employee => `
                        <div class="space-y-2">
                            <div class="flex justify-between text-xs text-muted">
                                <span>${employee.full_name}</span>
                                <span>₱${Number(employee.salary).toLocaleString()}</span>
                            </div>
                            <div class="h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div class="h-full bg-neon" style="width:${Math.round((Number(employee.salary) || 0) / maxSalary * 100)}%"></div>
                            </div>
                        </div>
                    `).join('') : '<p class="text-muted">Employee salary data not available.</p>'}
                </div>
                <div class="overflow-x-auto">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${adminEmployees.length ? adminEmployees.map(employee => `
                                <tr>
                                    <td class="text-neon text-xs">${employee.employee_number}</td>
                                    <td>${employee.full_name}</td>
                                    <td>${employee.role}</td>
                                    <td class="font-bold">₱${parseFloat(employee.salary).toLocaleString()}</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="4" class="text-center text-muted py-8">No employee data available.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <div class="glass-card rounded-xl p-6 mb-8" id="admin-products-section">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                    <h3 class="font-display text-xl mb-1">Add New Product</h3>
                    <p class="text-muted text-sm">Create new stock and manage the item catalog below.</p>
                </div>
                <div class="relative w-full lg:w-96 mb-4">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" style="width:18px;height:18px"></i>
                    <input id="admin-product-search" type="text" oninput="handleAdminSearch(this.value)" value="${adminSearchQuery.replace(/"/g, '&quot;')}" placeholder="Search items by name, category, or ID" class="w-full pl-11 pr-10 py-3 rounded-full bg-slate-900/80 border border-slate-700 focus:border-neon focus:outline-none text-sm">
                    <button type="button" onclick="clearAdminSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-neon transition" style="display:${adminSearchQuery ? 'block' : 'none'}"><i data-lucide="x" style="width:16px;height:16px"></i></button>
                </div>
            </div>
            <form id="add-product-form" onsubmit="event.preventDefault(); addProduct(); return false;" class="grid gap-4 lg:grid-cols-4 mb-6">
                <input id="prod-name" type="text" placeholder="Product name" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <select id="prod-category" class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                    <option value="gym">Gym Equipment</option>
                    <option value="sports">Sports Items</option>
                    <option value="supplements">Supplements</option>
                </select>
                <input id="prod-price" type="number" placeholder="Price" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <input id="prod-stock" type="number" placeholder="Stock count" min="0" value="0" class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <input id="prod-desc" type="text" placeholder="Description" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm lg:col-span-2">
                <input id="prod-image" type="text" placeholder="Image URL" value="images/placeholder.jpg" class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm lg:col-span-2">
                <button type="submit" class="neon-btn py-3 rounded-xl lg:col-span-1">Add Product</button>
            </form>
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-display text-xl">Products (${filteredProducts.length})</h3>
                <span class="text-xs text-muted">Item search applies to the product catalog below.</span>
            </div>
            <div class="overflow-x-auto">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredProducts.map(p => {
                            const imageUrl = p.image || 'https://via.placeholder.com/50?text=No+Image';
                            const productName = p.name || p.product_name || 'Unnamed Product';
                            const category = p.category || p.product_category || 'gym';
                            const price = Number(p.basePrice ?? p.price ?? p.base_price ?? 0);
                            const productId = p.id || p.product_id || `prod-${Math.random().toString(36).slice(2, 8)}`;
                            const stockCount = Number(p.stockCount ?? p.stock_count ?? (p.inStock ? 1 : 0));
                            
                            return `<tr>
                                <td><img src="${imageUrl}" class="w-12 h-12 object-cover rounded" onerror="this.onerror=null; this.src='https://via.placeholder.com/50?text=Error'"></td>
                                <td>${productName}</td>
                                <td><span class="px-2 py-1 rounded text-xs bg-neon/20 text-neon">${category}</span></td>
                                <td><input id="price-${productId}" type="number" value="${price}" class="w-24 px-2 py-1 rounded border border-slate-300 text-sm"></td>
                                <td><input id="stock-${productId}" type="number" value="${stockCount}" min="0" class="w-20 px-2 py-1 rounded border border-slate-300 text-sm"></td>
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
        
        <div class="glass-card rounded-xl p-6 mb-8" id="admin-employee-section">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-display text-xl mb-1">Employee Management</h3>
                    <p class="text-muted text-sm">Add team members, update details, and remove inactive staff from the roster.</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs bg-neon/10 text-neon">${adminEmployees.length} staff</span>
            </div>
            <form id="employee-form" onsubmit="event.preventDefault(); saveEmployee(); return false;" class="grid gap-3 md:grid-cols-2 xl:grid-cols-5 mb-6">
                <input id="employee-number" type="text" placeholder="Employee ID (optional)" class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <input id="employee-name" type="text" placeholder="Full name" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <select id="employee-role" class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                    <option value="Store Manager">Store Manager</option>
                    <option value="Sales Lead">Sales Lead</option>
                    <option value="Operations Specialist">Operations Specialist</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Staff">Staff</option>
                </select>
                <input id="employee-salary" type="number" step="0.01" min="0" placeholder="Salary" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <input id="employee-hired" type="date" required class="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-sm">
                <div class="md:col-span-2 xl:col-span-5 flex gap-2">
                    <button type="submit" class="neon-btn px-4 py-2 rounded-xl">${editingEmployeeNumber ? 'Update Employee' : 'Add Employee'}</button>
                    <button type="button" onclick="cancelEmployeeEdit()" class="neon-outline px-4 py-2 rounded-xl">Cancel</button>
                </div>
            </form>
            <div class="overflow-x-auto">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Salary</th>
                            <th>Hired</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminEmployees.length ? adminEmployees.map(employee => `
                            <tr id="emp-row-${employee.employee_number}" ondblclick="inlineEditEmployee('${employee.employee_number}')">
                                <td class="text-neon text-xs">${employee.employee_number}</td>
                                <td>${employee.full_name}</td>
                                <td><span class="px-2 py-1 rounded text-xs bg-neon/20 text-neon">${employee.role}</span></td>
                                <td class="font-bold">${formatPrice(employee.salary || 0)}</td>
                                <td>${employee.hired_at}</td>
                                <td>
                                    <div class="flex flex-wrap gap-2">
                                        <button type="button" onclick="editEmployee('${employee.employee_number}')" class="neon-outline text-xs px-2 py-1 rounded">Edit</button>
                                        <button type="button" onclick="inlineEditEmployee('${employee.employee_number}')" class="text-neon text-xs px-2 py-1 rounded border border-neon/20">Quick Edit</button>
                                        <button type="button" onclick="deleteEmployee('${employee.employee_number}')" class="text-red-500 text-xs px-2 py-1 rounded border border-red-500/20">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="6" class="text-center text-muted py-8">No employee data available.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="glass-card rounded-xl p-6" id="admin-orders-section">
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

async function addProduct() {
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;
    const basePrice = parseFloat(document.getElementById('prod-price').value) || 0;
    const stockCount = parseInt(document.getElementById('prod-stock').value, 10) || 0;
    const description = document.getElementById('prod-desc').value.trim();
    const imageUrl = document.getElementById('prod-image').value.trim() || 'images/placeholder.jpg';

    if (!name || !description) {
        showToast('Product name and description are required', 'error');
        return;
    }

    try {
        await apiRequest('products.php', 'POST', {
            name,
            category,
            base_price: basePrice,
            stock_count: stockCount,
            description,
            image_url: imageUrl,
            rating: 4.5,
            specs: ''
        });

        await loadProducts();
        showToast('Product added successfully!');
        document.getElementById('add-product-form')?.reset();
        renderPage();
    } catch (error) {
        showToast(error.message || 'Error adding product', 'error');
    }
}

async function saveProductPrice(productId) {
    const priceInput = document.getElementById(`price-${productId}`);
    const stockInput = document.getElementById(`stock-${productId}`);
    const newPrice = parseFloat(priceInput.value) || 0;
    const newStock = stockInput ? parseInt(stockInput.value, 10) || 0 : 0;
    
    try {
        await apiRequest('products.php', 'PUT', {
            id: productId,
            base_price: newPrice,
            stock_count: newStock
        });
        
        await loadProducts();
        showToast('Product updated!');
        renderPage();
    } catch (error) {
        showToast(error.message || 'Error updating product', 'error');
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        await fetch(`${API_BASE}/products.php?id=${productId}`, {
            method: 'DELETE'
        });
        
        await loadProducts();
        showToast('Product deleted!');
        renderPage();
    } catch (error) {
        showToast('Error deleting product', 'error');
    }
}

if (typeof window !== 'undefined') {
    window.renderAdminOverride = renderAdmin;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    await loadEmployees();
    cancelEmployeeEdit();
    await loadOrders(currentUser?.role === 'admin');
    renderPage();
});
