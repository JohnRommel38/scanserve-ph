// ScanServe PH - QR ordering demo

// ===== Menu and tables =====

const CATEGORIES = ['Starters', 'Mains', 'Drinks', 'Desserts'];

const MENU = [
  { id: 'lumpia', category: 0, name: 'Lumpiang Shanghai', desc: 'Pork spring rolls, 10 pcs', price: 220 },
  { id: 'sisig', category: 1, name: 'Sizzling Sisig', desc: 'Pork, calamansi, chili', price: 320, options: ['Mild', 'Medium', 'Hot'] },
  { id: 'adobo', category: 1, name: 'Chicken Adobo', desc: 'With plain rice', price: 340 },
  { id: 'karekare', category: 1, name: 'Kare-Kare', desc: 'Oxtail in peanut sauce, good for 2-3', price: 560 },
  { id: 'sinigang', category: 1, name: 'Sinigang na Baboy', desc: 'Pork ribs in tamarind broth', price: 450 },
  { id: 'rice', category: 1, name: 'Garlic Rice', desc: 'Per cup', price: 60 },
  { id: 'calamansi', category: 2, name: 'Calamansi Juice', desc: 'Freshly squeezed', price: 95 },
  { id: 'icedtea', category: 2, name: 'House Iced Tea', desc: 'Bottomless', price: 85 },
  { id: 'halo', category: 3, name: 'Halo-Halo', desc: 'Shaved ice, ube, leche flan', price: 190 },
  { id: 'flan', category: 3, name: 'Leche Flan', desc: 'Egg custard, caramel', price: 140 }
];

// each table has its own code for the QR
const TABLES = [
  { id: 'T1', name: 'Table 1', code: 'k7m2qa' },
  { id: 'T2', name: 'Table 2', code: 'p9x4tb' },
  { id: 'T3', name: 'Table 3', code: 'd3h8wc' },
  { id: 'T4', name: 'Table 4', code: 'r6n1yd' },
  { id: 'T5', name: 'Table 5', code: 'z2c7ve' },
  { id: 'T6', name: 'Table 6', code: 'f8j3uf' },
  { id: 'T7', name: 'Table 7', code: 'm4s9kg' },
  { id: 'T8', name: 'Table 8', code: 'b1w6ph' },
  { id: 'T9', name: 'Table 9', code: 'h5q2xj' },
  { id: 'T10', name: 'Table 10', code: 'v7t4nk' },
  { id: 'T11', name: 'Table 11', code: 'c9e5rm' },
  { id: 'T12', name: 'Table 12', code: 'g3y8an' }
];

const SERVICE_CHARGE = 0.10;
const PAY_METHODS = ['GCash', 'Maya', 'QR Ph', 'Card'];
const STEPS = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED'];
const STEP_LABELS = ['Received', 'Accepted', 'Preparing', 'Ready', 'Served'];
const SAVE_KEY = 'scanserve-demo';


// ===== Saved data =====

function newData() {
  const now = Date.now();
  return {
    tableCode: 'g3y8an',
    cart: [],
    nextOrderNo: 1003,
    orders: [
      {
        no: 1001, table: 'T4', method: 'GCash', status: 'PREPARING',
        time: now - 8 * 60000,
        lines: [makeLine('sisig', 1, 'Hot'), makeLine('rice', 2, '')]
      },
      {
        no: 1002, table: 'T9', method: 'Maya', status: 'NEW',
        time: now - 2 * 60000,
        lines: [makeLine('karekare', 1, ''), makeLine('icedtea', 3, '')]
      }
    ]
  };
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY));
  } catch (e) {
    return null;
  }
}

function saveData() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    // storage not available, ignore
  }
}

let data = loadData() || newData();

// screen state (not saved)
let screen = 'menu';
let popup = null;
let payMethod = 'GCash';
let currentView = '';
let adminTab = 'qr';


// ===== Helpers =====

function peso(amount, withCents) {
  const digits = withCents ? 2 : 0;
  return '₱' + Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function findItem(id) {
  return MENU.find(item => item.id === id);
}

function findTableByCode(code) {
  return TABLES.find(table => table.code === code);
}

function findTableById(id) {
  return TABLES.find(table => table.id === id);
}

function makeLine(itemId, qty, option) {
  const item = findItem(itemId);
  return { id: item.id, name: item.name, price: item.price, qty: qty, option: option };
}

function getTotals(lines) {
  let subtotal = 0;
  lines.forEach(line => {
    subtotal += line.price * line.qty;
  });
  const service = Math.round(subtotal * SERVICE_CHARGE);
  return { subtotal: subtotal, service: service, total: subtotal + service };
}

function countItems(lines) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

function minutesAgo(time) {
  const mins = Math.round((Date.now() - time) / 60000);
  return mins < 1 ? 'just now' : mins + ' min ago';
}

// link inside the QR code
function tableLink(table) {
  return location.origin + location.pathname + '#t-' + table.code;
}

// ===== Guest screens =====

function menuScreen(table) {
  let html = `
    <div class="rest-head">
      <h2>Kusina ni Lola</h2>
      <p>BGC · Filipino comfort food</p>
      <span class="pill">${table.name}</span>
    </div>`;

  CATEGORIES.forEach((category, index) => {
    const items = MENU.filter(item => item.category === index);
    html += `<div class="section"><h3>${category}</h3>`;
    items.forEach(item => {
      html += `
        <button class="item" data-action="open-item" data-id="${item.id}">
          <div><b>${item.name}</b><span>${item.desc}</span></div>
          <span class="price">${peso(item.price)}</span>
        </button>`;
    });
    html += `</div>`;
  });

  // show track button if this table already ordered
  const hasOrders = data.orders.some(order => order.table === table.id && order.mine);
  if (hasOrders) {
    html += `
      <div class="section" style="padding: 16px 14px">
        <button class="big-btn center light" data-action="go" data-screen="status">Track my orders</button>
      </div>`;
  } else {
    html += `<div style="height: 16px"></div>`;
  }
  return html;
}

function menuFooter() {
  if (data.cart.length === 0) return '';
  const totals = getTotals(data.cart);
  return `
    <div class="footer">
      <button class="big-btn" data-action="go" data-screen="cart">
        <span>View cart · ${countItems(data.cart)}</span>
        <span>${peso(totals.subtotal)}</span>
      </button>
    </div>`;
}

function itemPopup() {
  if (!popup) return '';
  const item = findItem(popup.id);

  let optionsHtml = '';
  if (item.options) {
    item.options.forEach(option => {
      const checked = popup.option === option ? 'checked' : '';
      optionsHtml += `
        <label class="option">
          <input type="radio" name="item-option" value="${option}" ${checked}> ${option}
        </label>`;
    });
  }

  return `
    <div class="sheet-bg" data-action="close-item">
      <div class="sheet">
        <h3>${item.name}</h3>
        <p class="small">${item.desc}</p>
        ${optionsHtml}
        <div class="sheet-actions">
          <div class="qty">
            <button data-action="popup-qty" data-change="-1">−</button>
            <b>${popup.qty}</b>
            <button data-action="popup-qty" data-change="1">+</button>
          </div>
          <button class="big-btn" data-action="add-to-cart">
            <span>Add</span><span>${peso(item.price * popup.qty)}</span>
          </button>
        </div>
      </div>
    </div>`;
}

function cartScreen(table) {
  let html = `
    <div class="back-bar">
      <button data-action="go" data-screen="menu">‹</button>
      Your order · ${table.name}
    </div>
    <div class="section">`;

  if (data.cart.length === 0) {
    return html + `<p class="empty">Cart is empty</p></div>`;
  }

  data.cart.forEach((line, index) => {
    html += `
      <div class="cart-line">
        <div>
          <b>${line.name}</b>
          ${line.option ? `<small>${line.option}</small>` : ''}
          <small>${peso(line.price * line.qty)}</small>
        </div>
        <div class="qty">
          <button data-action="cart-qty" data-index="${index}" data-change="-1">−</button>
          <b>${line.qty}</b>
          <button data-action="cart-qty" data-index="${index}" data-change="1">+</button>
        </div>
      </div>`;
  });

  const totals = getTotals(data.cart);
  html += `
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>${peso(totals.subtotal, true)}</span></div>
      <div class="total-row"><span>Service charge 10%</span><span>${peso(totals.service, true)}</span></div>
      <div class="total-row grand"><span>Total</span><span>${peso(totals.total, true)}</span></div>
    </div>
  </div>`;
  return html;
}

function cartFooter() {
  if (data.cart.length === 0) return '';
  const totals = getTotals(data.cart);
  return `
    <div class="footer">
      <button class="big-btn" data-action="go" data-screen="pay">
        <span>Place order &amp; pay</span>
        <span>${peso(totals.total, true)}</span>
      </button>
    </div>`;
}

// fake payment page for the demo
function payScreen(table) {
  const totals = getTotals(data.cart);

  let methodsHtml = '';
  PAY_METHODS.forEach(method => {
    const checked = payMethod === method ? 'checked' : '';
    methodsHtml += `
      <label class="method">
        <input type="radio" name="pay-method" value="${method}" ${checked}> ${method}
      </label>`;
  });

  return `
    <div class="pay-head">
      <div class="small">Payment checkout · test mode</div>
      <div class="amount">${peso(totals.total, true)}</div>
      <div class="small">Kusina ni Lola · ${table.name}</div>
    </div>
    <div class="section" style="padding-top: 12px">
      ${methodsHtml}
      <button class="big-btn pay" data-action="pay">Pay ${peso(totals.total, true)}</button>
      <p style="text-align: center">
        <button class="link-btn" data-action="go" data-screen="cart">Cancel</button>
      </p>
    </div>`;
}

function waitScreen() {
  return `
    <div class="spinner"></div>
    <p style="text-align: center; font-weight: 700">Confirming payment…</p>`;
}

function statusScreen(table) {
  const myOrders = data.orders
    .filter(order => order.table === table.id && order.mine)
    .sort((a, b) => b.no - a.no);

  let html = `
    <div class="back-bar">
      <button data-action="go" data-screen="menu">‹</button>
      My orders · ${table.name}
    </div>`;

  myOrders.forEach(order => {
    const step = STEPS.indexOf(order.status);
    const totals = getTotals(order.lines);

    let bars = '';
    let labels = '';
    STEPS.forEach((s, i) => {
      bars += `<div class="${i <= step ? 'done' : ''}"></div>`;
      labels += `<span class="${i === step ? 'now' : ''}">${STEP_LABELS[i]}</span>`;
    });

    const itemsText = order.lines.map(line => line.qty + '× ' + line.name).join(', ');

    html += `
      <div class="order-card">
        <b>Order #${order.no}</b>
        <span class="small">· Paid ${order.method} · ${peso(totals.total, true)}</span>
        <div class="progress">${bars}</div>
        <div class="progress-labels">${labels}</div>
        <div class="small" style="margin-top: 6px">${itemsText}</div>
      </div>`;
  });

  html += `
    <div class="section">
      <button class="big-btn center" data-action="go" data-screen="menu">Order more</button>
    </div>`;
  return html;
}

function renderGuest() {
  // table dropdown
  let options = '';
  TABLES.forEach(table => {
    const selected = table.code === data.tableCode ? 'selected' : '';
    options += `<option value="${table.code}" ${selected}>${table.name}</option>`;
  });
  document.getElementById('tableSelect').innerHTML = options;

  const table = findTableByCode(data.tableCode);
  let body = '';
  let footer = '';
  let sheet = '';

  if (!table) {
    body = `<p class="empty">This QR code is not valid.</p>`;
  } else if (screen === 'menu') {
    body = menuScreen(table);
    footer = menuFooter();
    sheet = itemPopup();
  } else if (screen === 'cart') {
    body = cartScreen(table);
    footer = cartFooter();
  } else if (screen === 'pay') {
    body = payScreen(table);
  } else if (screen === 'wait') {
    body = waitScreen();
  } else {
    body = statusScreen(table);
  }

  document.getElementById('phoneBody').innerHTML = body;
  document.getElementById('phoneFooter').innerHTML = footer;
  document.getElementById('phoneSheet').innerHTML = sheet;
}


// ===== Staff screen =====

const NEXT_STEP = {
  NEW: { to: 'ACCEPTED', label: 'Accept', style: '' },
  ACCEPTED: { to: 'PREPARING', label: 'Start preparing', style: '' },
  PREPARING: { to: 'READY', label: 'Mark ready', style: 'green' },
  READY: { to: 'SERVED', label: 'Served', style: 'light' }
};

function ticket(order) {
  const table = findTableById(order.table);
  const next = NEXT_STEP[order.status];

  let items = '';
  order.lines.forEach(line => {
    items += `<li><b>${line.qty}×</b> ${line.name}${line.option ? `<small>${line.option}</small>` : ''}</li>`;
  });

  return `
    <div class="ticket ${order.status}">
      <div class="ticket-head">
        <b>${table ? table.name : order.table}</b>
        <span class="small">#${order.no} · ${minutesAgo(order.time)}</span>
      </div>
      <ul>${items}</ul>
      <div class="ticket-foot">
        <span class="small">Paid · ${order.method}</span>
        <button class="btn ${next.style}" data-action="next-step" data-no="${order.no}">${next.label}</button>
      </div>
    </div>`;
}

function column(title, statuses) {
  const orders = data.orders
    .filter(order => statuses.includes(order.status))
    .sort((a, b) => a.time - b.time);

  let tickets = orders.map(ticket).join('');
  if (orders.length === 0) tickets = `<p class="empty">None</p>`;

  return `<div class="column"><h2>${title} (${orders.length})</h2>${tickets}</div>`;
}

function renderStaff() {
  document.getElementById('staffView').innerHTML = `
    <h1>Order queue</h1>
    <div class="columns">
      ${column('New', ['NEW'])}
      ${column('In the kitchen', ['ACCEPTED', 'PREPARING'])}
      ${column('Ready', ['READY'])}
    </div>`;
}


// ===== Admin screen =====

function qrTab() {
  let cards = '';
  TABLES.forEach(table => {
    cards += `
      <div class="qr-card">
        <b>${table.name}</b>
        <div class="qr" data-link="${tableLink(table)}"></div>
        <button class="btn light" data-action="open-table" data-code="${table.code}">Open</button>
      </div>`;
  });
  return `<p class="small">Print one code per table. Scanning it opens that table's menu.</p>
          <div class="qr-grid">${cards}</div>`;
}

function menuTab() {
  let rows = '';
  MENU.forEach(item => {
    rows += `<tr><td>${item.name}</td><td>${CATEGORIES[item.category]}</td><td class="right">${peso(item.price)}</td></tr>`;
  });
  return `
    <div class="panel">
      <table>
        <thead><tr><th>Item</th><th>Category</th><th class="right">Price</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderAdmin() {
  const qrActive = adminTab === 'qr' ? 'active' : '';
  const menuActive = adminTab === 'menu' ? 'active' : '';

  document.getElementById('adminView').innerHTML = `
    <h1>Admin</h1>
    <div class="admin-tabs">
      <button class="admin-tab ${qrActive}" data-action="admin-tab" data-tab="qr">Table QR codes</button>
      <button class="admin-tab ${menuActive}" data-action="admin-tab" data-tab="menu">Menu</button>
    </div>
    ${adminTab === 'qr' ? qrTab() : menuTab()}`;

  // draw the QR codes
  if (adminTab === 'qr') {
    document.querySelectorAll('.qr').forEach(box => {
      try {
        new QRCode(box, { text: box.dataset.link, width: 216, height: 216 });
      } catch (e) {
        box.textContent = 'QR';
      }
    });
  }
}


// ===== Switch views =====

// show one screen at a time (staff by default)
function showView() {
  let view = currentView;
  if (!['guest', 'staff', 'admin'].includes(view)) view = 'staff';

  document.getElementById('guestView').classList.toggle('show', view === 'guest');
  document.getElementById('staffView').classList.toggle('show', view === 'staff');
  document.getElementById('adminView').classList.toggle('show', view === 'admin');

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });
}

function render() {
  renderGuest();
  renderStaff();
  renderAdmin();
  showView();
  saveData();
}

function goTo(newScreen) {
  screen = newScreen;
  document.getElementById('phoneBody').scrollTop = 0;
  window.scrollTo(0, 0);
}

// open the right table when a QR link is scanned
function readLink() {
  const hash = location.hash.slice(1);
  if (hash.startsWith('t-')) {
    data.tableCode = hash.slice(2);
    currentView = 'guest';
    screen = 'menu';
  } else {
    currentView = hash;
  }
}


// ===== Button clicks =====

document.addEventListener('click', event => {
  // top tabs
  const tab = event.target.closest('.tab');
  if (tab) {
    currentView = tab.dataset.view;
    showView();
    window.scrollTo(0, 0);
    return;
  }

  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;

  // only close popup when the dark background is clicked
  if (action === 'close-item' && event.target !== button) return;

  if (action === 'go') {
    goTo(button.dataset.screen);
  }

  if (action === 'open-item') {
    const item = findItem(button.dataset.id);
    popup = { id: item.id, qty: 1, option: item.options ? item.options[0] : '' };
  }

  if (action === 'close-item') {
    popup = null;
  }

  if (action === 'popup-qty') {
    popup.qty = Math.max(1, popup.qty + Number(button.dataset.change));
  }

  if (action === 'add-to-cart') {
    const same = data.cart.find(line => line.id === popup.id && line.option === popup.option);
    if (same) {
      same.qty += popup.qty;
    } else {
      data.cart.push(makeLine(popup.id, popup.qty, popup.option));
    }
    popup = null;
  }

  if (action === 'cart-qty') {
    const line = data.cart[button.dataset.index];
    line.qty += Number(button.dataset.change);
    if (line.qty < 1) data.cart.splice(button.dataset.index, 1);
  }

  if (action === 'pay') {
    payNow();
    return;
  }

  // staff moves order to next step
  if (action === 'next-step') {
    const order = data.orders.find(o => o.no === Number(button.dataset.no));
    order.status = NEXT_STEP[order.status].to;
  }

  if (action === 'admin-tab') {
    adminTab = button.dataset.tab;
  }

  if (action === 'open-table') {
    data.tableCode = button.dataset.code;
    screen = 'menu';
    currentView = 'guest';
  }

  render();
});

// show "confirming", then send order to staff
function payNow() {
  const table = findTableByCode(data.tableCode);
  const lines = data.cart.slice();
  const method = payMethod;

  screen = 'wait';
  render();

  setTimeout(() => {
    data.orders.push({
      no: data.nextOrderNo,
      table: table.id,
      method: method,
      status: 'NEW',
      time: Date.now(),
      lines: lines,
      mine: true
    });
    data.nextOrderNo++;
    data.cart = [];
    screen = 'status';
    render();
  }, 1500);
}

document.getElementById('resetBtn').addEventListener('click', () => {
  data = newData();
  screen = 'menu';
  popup = null;
  render();
});

document.addEventListener('change', event => {
  const input = event.target;

  if (input.id === 'tableSelect') {
    data.tableCode = input.value;
    screen = 'menu';
    popup = null;
    render();
  }

  if (input.name === 'pay-method') payMethod = input.value;
  if (input.name === 'item-option' && popup) popup.option = input.value;
});

window.addEventListener('hashchange', () => {
  readLink();
  render();
});

// update "min ago" every 30 seconds
setInterval(renderStaff, 30000);


// ===== Start =====
readLink();
render();
