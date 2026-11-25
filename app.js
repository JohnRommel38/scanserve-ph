/* Colors */
:root {
  --bg: #f6f4fb;
  --card: #ffffff;
  --text: #17121f;
  --muted: #625b70;
  --line: #e5e0ee;
  --purple: #5b21b6;
  --purple-light: #efe9fb;
  --purple-text: #6d28d9;
  --green: #15803d;
  --orange: #b45309;
  --teal: #0f766e;
}

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font: 15px/1.5 "Plus Jakarta Sans", Arial, sans-serif;
}

button, input, select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: 0;
  background: none;
}

/* Top bar */
.top {
  background: var(--purple);
  color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 10px 24px;
}

.brand {
  font-weight: 800;
  font-size: 19px;
  margin-right: auto;
}

.brand span {
  font-weight: 400;
  font-size: 13px;
  opacity: 0.8;
}

.tabs {
  display: flex;
  gap: 4px;
  order: 2;
}

.tab {
  color: #fff;
  padding: 9px 14px;
  border-radius: 10px;
  font-weight: 600;
}

.tab.active {
  background: #fff;
  color: var(--purple);
}

.ghost {
  order: 3;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
}

/* Page layout */
main {
  display: grid;
  gap: 24px;
  padding: 20px 24px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.view {
  display: none;
}

.view.show {
  display: block;
}

.demo {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 8px;
}

select {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 7px 10px;
  font-size: 16px;
}

h1 {
  margin: 0 0 12px;
  font-size: 30px;
}

.small {
  font-size: 12px;
  color: var(--muted);
}

.empty {
  color: var(--muted);
  font-size: 13px;
  text-align: center;
  padding: 20px;
}

/* Phone frame */
.phone {
  position: relative;
  background: var(--card);
  border: 10px solid #1d1726;
  border-radius: 40px;
  height: min(780px, calc(100vh - 140px));
  min-height: 540px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.phone-body {
  flex: 1;
  overflow-y: auto;
}

/* Restaurant header */
.rest-head {
  background: var(--purple);
  color: #fff;
  padding: 16px 18px;
}

.rest-head h2 {
  margin: 0;
  font-size: 22px;
}

.rest-head p {
  margin: 2px 0 8px;
  font-size: 13px;
  opacity: 0.85;
}

.pill {
  background: #fff;
  color: var(--purple);
  border-radius: 99px;
  padding: 4px 12px;
  font-weight: 700;
  font-size: 13px;
}

/* Menu */
.section {
  padding: 0 14px;
}

.section h3 {
  font-size: 16px;
  margin: 16px 0 4px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 11px 0;
  border-bottom: 1px solid var(--line);
}

.item b {
  display: block;
}

.item span {
  font-size: 13px;
  color: var(--muted);
}

.item .price {
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
  white-space: nowrap;
}

/* Buttons */
.footer {
  padding: 10px 14px 14px;
  border-top: 1px solid var(--line);
}

.big-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: var(--purple);
  color: #fff;
  border-radius: 14px;
  padding: 13px 16px;
  font-weight: 700;
  min-height: 50px;
}

.big-btn.center {
  justify-content: center;
}

.big-btn.light {
  background: var(--purple-light);
  color: var(--purple-text);
}

.big-btn.pay {
  background: var(--teal);
  justify-content: center;
  margin-top: 12px;
}

.btn {
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 13px;
  min-height: 40px;
  background: var(--purple);
  color: #fff;
}

.btn.green {
  background: var(--green);
}

.btn.light {
  background: var(--purple-light);
  color: var(--purple-text);
}

.link-btn {
  font-size: 13px;
  color: var(--muted);
  text-decoration: underline;
  min-height: 40px;
}

/* Back bar */
.back-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  font-weight: 700;
}

.back-bar button {
  font-size: 22px;
  width: 40px;
  height: 40px;
}

/* Item popup */
.sheet-bg {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
}

.sheet {
  background: var(--card);
  width: 100%;
  border-radius: 20px 20px 0 0;
  padding: 18px 16px 16px;
}

.sheet h3 {
  margin: 0;
  font-size: 20px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
}

.option input {
  width: 20px;
  height: 20px;
  accent-color: var(--purple);
}

.sheet-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

/* Quantity +/- */
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.qty button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-weight: 700;
  color: var(--purple-text);
}

.qty b {
  min-width: 26px;
  text-align: center;
}

/* Cart */
.cart-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.cart-line small {
  display: block;
  color: var(--muted);
}

.totals {
  padding: 12px 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 14px;
}

.total-row.grand {
  font-weight: 800;
  font-size: 17px;
  border-top: 1px solid var(--line);
  margin-top: 6px;
  padding-top: 8px;
}

/* Payment page */
.pay-head {
  background: var(--teal);
  color: #fff;
  padding: 16px 18px;
}

.pay-head .amount {
  font-size: 28px;
  font-weight: 800;
}

.pay-head .small {
  color: rgba(255, 255, 255, 0.8);
}

.method {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
  font-weight: 600;
}

.method input {
  width: 20px;
  height: 20px;
  accent-color: var(--teal);
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid var(--purple-light);
  border-top-color: var(--purple-text);
  margin: 60px auto 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Order status */
.order-card {
  border: 1px solid var(--line);
  border-radius: 14px;
  margin: 12px 14px;
  padding: 14px;
}

.progress {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin: 10px 0 4px;
}

.progress div {
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}

.progress div.done {
  background: var(--green);
}

.progress-labels {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 11px;
  color: var(--muted);
  text-align: center;
}

.progress-labels .now {
  color: var(--green);
  font-weight: 700;
}

/* Staff queue */
.columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
}

.column {
  background: #ece8f4;
  border-radius: 14px;
  padding: 10px;
  min-height: 180px;
}

.column h2 {
  font-size: 15px;
  margin: 4px 6px 10px;
}

.ticket {
  background: var(--card);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  border-top: 4px solid var(--purple-text);
}

.ticket.PREPARING {
  border-top-color: var(--orange);
}

.ticket.READY {
  border-top-color: var(--green);
}

.ticket-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.ticket-head b {
  font-size: 19px;
}

.ticket ul {
  list-style: none;
  padding: 0;
  margin: 8px 0;
  font-size: 14px;
}

.ticket small {
  display: block;
  color: var(--muted);
  padding-left: 20px;
}

.ticket-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

/* Admin */
.admin-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 12px;
}

.admin-tab {
  padding: 10px 14px;
  font-weight: 700;
  color: var(--muted);
  border-bottom: 3px solid transparent;
}

.admin-tab.active {
  color: var(--purple-text);
  border-color: var(--purple-text);
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}

.qr-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px;
  text-align: center;
}

.qr {
  width: 120px;
  height: 120px;
  margin: 6px auto;
  background: #fff;
  padding: 6px;
  border-radius: 8px;
}

.qr img,
.qr canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.panel {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 4px 12px;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}

th, td {
  padding: 9px 6px;
  border-bottom: 1px solid var(--line);
  text-align: left;
}

th {
  color: var(--muted);
  font-weight: 600;
}

.right {
  text-align: right;
}

/* Keep the guest menu phone-sized on big screens */
.phone,
.demo {
  max-width: 430px;
  margin-left: auto;
  margin-right: auto;
}

/* Phone or short screen: full screen, no frame */
@media (max-width: 600px), (max-height: 620px) {
  .phone {
    border: 0;
    border-radius: 0;
    height: auto;
    min-height: 0;
    overflow: visible;
    max-width: none;
  }
  .phone-body {
    overflow: visible;
  }
  #phoneFooter {
    position: sticky;
    bottom: 0;
    background: var(--card);
  }
  .sheet-bg {
    position: fixed;
    z-index: 10;
  }
}

/* Phone */
@media (max-width: 600px) {
  .top {
    position: sticky;
    top: 0;
    z-index: 5;
    padding: 10px 16px;
  }
  .ghost {
    order: 1;
  }
  .tabs {
    width: 100%;
  }
  .tab {
    flex: 1;
  }
  main {
    padding: 0 0 24px;
    gap: 0;
  }
  #staffView,
  #adminView {
    padding: 16px 14px 0;
  }
  .demo {
    padding: 10px 14px;
    margin: 0;
    max-width: none;
    background: var(--card);
    border-bottom: 1px solid var(--line);
  }
  .qr {
    width: 104px;
    height: 104px;
  }
}
