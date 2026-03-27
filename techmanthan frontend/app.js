/* ============================================================
   FinWise — Main Application Logic
   ============================================================ */

// ======================== NAV ========================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDashboard();
    initChat();
    initBreakdown();
    initInsights();
});

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navigateTo(page);
            // close mobile sidebar
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}

function navigateTo(page) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const target = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (target) target.classList.add('active');

    // Update pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');
}

// ======================== DASHBOARD ========================
function initDashboard() {
    renderExpenseTable();
    renderExpenseDonut();
    renderSavingsLine();
    renderAlerts();
}

function renderExpenseTable() {
    const tbody = document.getElementById('expense-table-body');
    if (!tbody) return;
    let html = '';

    STUDENT_DATA.expenses.categories.forEach(cat => {
        const pctExpense = ((cat.total / STUDENT_DATA.expenses.total) * 100).toFixed(1);
        const pctIncome = ((cat.total / STUDENT_DATA.income.total) * 100).toFixed(1);
        const isOver = cat.total > cat.recommended;

        // Category row
        html += `<tr class="category-row">
            <td><i class="${cat.icon}" style="color:${cat.color};margin-right:8px;"></i>${cat.name}</td>
            <td>—</td>
            <td>₹${cat.total.toLocaleString()}</td>
            <td>${pctExpense}%</td>
            <td>${pctIncome}%</td>
            <td>${isOver
                ? `<span class="status-badge status-danger"><i class="fas fa-exclamation-triangle"></i> Over ₹${(cat.total - cat.recommended).toLocaleString()}</span>`
                : `<span class="status-badge status-ok"><i class="fas fa-check"></i> On Track</span>`
            }</td>
        </tr>`;

        // Subcategory rows
        cat.subcategories.forEach(sub => {
            const subPctCat = ((sub.amount / cat.total) * 100).toFixed(1);
            const subPctIncome = ((sub.amount / STUDENT_DATA.income.total) * 100).toFixed(1);
            html += `<tr class="subcategory-row">
                <td>${sub.name}</td>
                <td>${subPctCat}% of ${cat.name}</td>
                <td>₹${sub.amount.toLocaleString()}</td>
                <td>${((sub.amount / STUDENT_DATA.expenses.total) * 100).toFixed(1)}%</td>
                <td>${subPctIncome}%</td>
                <td></td>
            </tr>`;
        });
    });

    tbody.innerHTML = html;
}

function renderExpenseDonut() {
    const ctx = document.getElementById('expenseDonutChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: STUDENT_DATA.expenses.categories.map(c => c.name),
            datasets: [{
                data: STUDENT_DATA.expenses.categories.map(c => c.total),
                backgroundColor: STUDENT_DATA.expenses.categories.map(c => c.color),
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '58%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 16,
                        font: { family: 'Inter', size: 12, weight: '500' },
                        color: '#374151'
                    }
                },
                tooltip: {
                    backgroundColor: '#1a3c28',
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            const value = context.parsed;
                            const pct = ((value / STUDENT_DATA.expenses.total) * 100).toFixed(1);
                            return ` ₹${value.toLocaleString()} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

function renderSavingsLine() {
    const ctx = document.getElementById('savingsLineChart');
    if (!ctx) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Savings (₹)',
                data: STUDENT_DATA.savings.projected,
                borderColor: '#2e8b47',
                backgroundColor: 'rgba(46,139,71,0.08)',
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#2e8b47',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: v => '₹' + (v / 1000).toFixed(0) + 'k',
                        font: { family: 'Inter', size: 11 },
                        color: '#6b7280'
                    },
                    grid: { color: 'rgba(0,0,0,0.04)' }
                },
                x: {
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#6b7280' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: { family: 'Inter', size: 12, weight: '600' },
                        color: '#1a3c28'
                    }
                },
                tooltip: {
                    backgroundColor: '#1a3c28',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: ctx => ` ₹${ctx.parsed.y.toLocaleString()}`
                    }
                }
            }
        }
    });
}

function renderAlerts() {
    const alertsList = document.getElementById('alerts-list');
    if (!alertsList) return;

    const alerts = STUDENT_DATA.expenses.categories
        .filter(c => c.total > c.recommended)
        .map(c => ({
            name: c.name,
            over: c.total - c.recommended,
            actual: c.total,
            recommended: c.recommended,
            icon: c.icon,
            color: c.color,
            topSubcats: c.subcategories
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 2)
                .map(s => s.name)
                .join(', ')
        }));

    alertsList.innerHTML = alerts.map((a, i) => `
        <div class="alert-item ${i > 0 ? 'warning' : ''}" style="animation-delay: ${i * 0.15}s">
            <div class="alert-icon"><i class="${a.icon}"></i></div>
            <div class="alert-content">
                <h3>${a.name} — ₹${a.over.toLocaleString()} over budget</h3>
                <p>You spent ₹${a.actual.toLocaleString()} vs recommended ₹${a.recommended.toLocaleString()}.
                Top subcategories: <strong>${a.topSubcats}</strong>.
                Consider reducing spending in these areas to improve your savings rate.</p>
            </div>
        </div>
    `).join('');
}

// ======================== AI CHAT ========================
function initChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('chat-messages');

    // Initial bot message
    addMessage('bot', CHATBOT_KNOWLEDGE.greetings[0]);

    // After a short delay, add the second welcome message
    setTimeout(() => {
        addMessage('bot', `I have your financial data for **${STUDENT_DATA.month}**. You can ask me about your expenses, income, savings, overspending areas, or get money-saving tips!\n\nTry asking:\n• *"Show me my expenses"*\n• *"How can I reduce my spending?"*\n• *"Where am I overspending?"*`);
    }, 800);

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Auto resize textarea
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
}

function handleSend() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage('user', text);
    input.value = '';
    input.style.height = 'auto';

    // Show typing indicator
    const typingId = showTyping();

    // Simulate thinking delay
    setTimeout(() => {
        removeTyping(typingId);
        const response = generateResponse(text);
        addMessage('bot', response);
    }, 800 + Math.random() * 700);
}

function addMessage(sender, text) {
    const container = document.getElementById('chat-messages');
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const msgDiv = document.createElement('div');
    msgDiv.className = `message message-${sender}`;

    const avatar = sender === 'bot'
        ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
        : '<div class="message-avatar"><i class="fas fa-user"></i></div>';

    // Format markdown-like text
    const formatted = formatMessageText(text);

    msgDiv.innerHTML = `
        ${avatar}
        <div>
            <div class="message-content">${formatted}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function formatMessageText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/\|(.+)\|/g, (match) => {
            // Simple table support
            const rows = match.split('<br>').filter(r => r.trim().startsWith('|'));
            if (rows.length < 2) return match;
            let html = '<table style="width:100%;font-size:12px;margin:8px 0;border-collapse:collapse;">';
            rows.forEach((row, i) => {
                if (row.includes('---')) return;
                const cells = row.split('|').filter(c => c.trim());
                const tag = i === 0 ? 'th' : 'td';
                html += '<tr>' + cells.map(c =>
                    `<${tag} style="padding:6px 8px;border:1px solid rgba(0,0,0,0.1);text-align:left;">${c.trim()}</${tag}>`
                ).join('') + '</tr>';
            });
            html += '</table>';
            return html;
        });
}

let typingCounter = 0;
function showTyping() {
    const container = document.getElementById('chat-messages');
    const id = `typing-${++typingCounter}`;
    const div = document.createElement('div');
    div.className = 'message message-bot';
    div.id = id;
    div.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function generateResponse(input) {
    const lower = input.toLowerCase();

    // Keyword matching
    if (/hello|hi|hey|greet/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.greetings[Math.floor(Math.random() * CHATBOT_KNOWLEDGE.greetings.length)];
    }

    if (/all.*expense|total.*expense|full.*breakdown|show.*expense|expense.*breakdown|my.*expense|detail/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.expenses;
    }

    if (/food|eat|meal|canteen|mess|dining|restaurant|order/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.food;
    }

    if (/entertain|movie|gaming|ott|netflix|subscription|outing|fun/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.entertainment;
    }

    if (/transport|travel|bus|metro|cab|auto|fuel|commut/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.transport;
    }

    if (/education|book|course|study|learn|tuition|school|college/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.education;
    }

    if (/rent|house|hostel|utilit|electric|wifi|laundry/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.rent;
    }

    if (/misc|other|phone|recharge|personal|gift/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.misc;
    }

    if (/income|earn|salary|allowance|money.*come|source/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.income;
    }

    if (/saving|save|invest|future|emergency|fund/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.savings;
    }

    if (/reduce|cut|less|lower|minimize|spend.*less|how.*reduce|how.*save|how.*cut/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.reduce;
    }

    if (/budget|recommend|plan|allocat|50.*30.*20|ideal/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.budget;
    }

    if (/over.*spend|overspend|alert|warning|exceed|too.*much/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.overspending;
    }

    if (/tip|advice|suggest|hack|trick/i.test(lower)) {
        return CHATBOT_KNOWLEDGE.responses.tips;
    }

    // Default
    return CHATBOT_KNOWLEDGE.responses.default;
}

// ======================== EXPENSE BREAKDOWN PAGE ========================
function initBreakdown() {
    const grid = document.getElementById('breakdown-grid');
    if (!grid) return;

    grid.innerHTML = STUDENT_DATA.expenses.categories.map(cat => {
        const share = ((cat.total / STUDENT_DATA.expenses.total) * 100).toFixed(1);
        const isOver = cat.total > cat.recommended;
        const maxSubAmount = Math.max(...cat.subcategories.map(s => s.amount));

        return `
        <div class="breakdown-card">
            <div class="breakdown-card-header">
                <div class="breakdown-cat-info">
                    <div class="breakdown-cat-icon" style="background:${cat.bgColor};color:${cat.color}">
                        <i class="${cat.icon}"></i>
                    </div>
                    <div>
                        <div class="breakdown-cat-name">${cat.name}</div>
                        <div class="breakdown-cat-total">₹${cat.total.toLocaleString()} ${isOver ? `<span style="color:#ef4444;font-weight:600;">⚠️ Over by ₹${(cat.total - cat.recommended).toLocaleString()}</span>` : `<span style="color:#22c55e;">✅ Within budget</span>`}</div>
                    </div>
                </div>
                <div class="breakdown-share">
                    <div class="breakdown-share-value" style="color:${cat.color}">${share}%</div>
                    <div class="breakdown-share-label">of total</div>
                </div>
            </div>
            <div class="breakdown-subcategories">
                ${cat.subcategories.map(sub => {
            const barWidth = ((sub.amount / maxSubAmount) * 100).toFixed(0);
            return `
                    <div class="sub-item">
                        <span class="sub-name">${sub.name}</span>
                        <div class="sub-details">
                            <span class="sub-amount">₹${sub.amount.toLocaleString()}</span>
                            <div class="sub-bar">
                                <div class="sub-bar-fill" style="width:${barWidth}%;background:${cat.color}"></div>
                            </div>
                        </div>
                    </div>`;
        }).join('')}
            </div>
        </div>`;
    }).join('');
}

// ======================== INSIGHTS PAGE ========================
function initInsights() {
    const grid = document.getElementById('insights-grid');
    if (!grid) return;

    const insights = [
        {
            type: 'negative',
            icon: 'fas fa-exclamation-triangle',
            title: 'Food Overspending Detected',
            desc: 'You spent ₹6,500 on food (₹1,500 over budget). Outside ordering accounts for 27.7%. Reducing it by half can save ₹900/month.'
        },
        {
            type: 'negative',
            icon: 'fas fa-gamepad',
            title: 'Entertainment Budget Exceeded',
            desc: 'Entertainment costs ₹3,500 (₹1,500 over budget). Gaming and movies are top spenders. Set a weekly cap of ₹400.'
        },
        {
            type: 'positive',
            icon: 'fas fa-bus',
            title: 'Transport Well Managed',
            desc: 'Transport is ₹300 under budget at ₹2,200. Great use of public transit! Bus/metro pass is a smart choice.'
        },
        {
            type: 'positive',
            icon: 'fas fa-book',
            title: 'Education Spending is Smart',
            desc: 'Education at ₹3,000 is ₹500 under budget. Investment in online courses (₹1,200) is excellent for career growth.'
        },
        {
            type: 'neutral',
            icon: 'fas fa-piggy-bank',
            title: 'Savings Rate Can Improve',
            desc: 'Current savings rate is 15.2%. Experts recommend 20%+. Fixing overspending in Food & Entertainment can push this to 25-27%.'
        },
        {
            type: 'neutral',
            icon: 'fas fa-chart-line',
            title: 'Income Diversification',
            desc: 'You have 3 income sources which is great! Consider increasing freelance work during holidays to boost savings rate.'
        },
        {
            type: 'positive',
            icon: 'fas fa-home',
            title: 'Rent & Utilities Stable',
            desc: 'Housing costs are ₹500 under budget. This is your most stable category. Keep maintaining these fixed costs.'
        },
        {
            type: 'neutral',
            icon: 'fas fa-target',
            title: 'Set a 6-Month Savings Goal',
            desc: 'At current rate, you\'ll have ₹10,800 by July. With optimized spending, you could reach ₹15,000+ — enough for an emergency fund.'
        }
    ];

    grid.innerHTML = insights.map(ins => `
        <div class="insight-card ${ins.type}">
            <div class="insight-icon"><i class="${ins.icon}"></i></div>
            <h3>${ins.title}</h3>
            <p>${ins.desc}</p>
        </div>
    `).join('');
}
