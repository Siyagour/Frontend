/* ============================================================
   FinWise — Sample Student Financial Data (March 2026)
   ============================================================ */

const STUDENT_DATA = {
    name: "Rahul Sharma",
    role: "Student — 3rd Year B.Tech",
    month: "March 2026",
    income: {
        total: 25000,
        sources: [
            { name: "Monthly Allowance (Parents)", amount: 15000 },
            { name: "Part-time Tutoring", amount: 7000 },
            { name: "Freelance Web Work", amount: 3000 }
        ]
    },
    expenses: {
        total: 21200,
        categories: [
            {
                name: "Food",
                icon: "fas fa-utensils",
                color: "#f97316",
                bgColor: "#ffedd5",
                total: 6500,
                recommended: 5000,
                subcategories: [
                    { name: "Mess / Canteen", amount: 3500 },
                    { name: "Outside / Ordering In", amount: 1800 },
                    { name: "Snacks & Beverages", amount: 800 },
                    { name: "Groceries", amount: 400 }
                ]
            },
            {
                name: "Transport",
                icon: "fas fa-bus",
                color: "#ef4444",
                bgColor: "#fee2e2",
                total: 2200,
                recommended: 2500,
                subcategories: [
                    { name: "Bus / Metro Pass", amount: 800 },
                    { name: "Auto / Cab Rides", amount: 1000 },
                    { name: "Fuel (Bike)", amount: 400 }
                ]
            },
            {
                name: "Entertainment",
                icon: "fas fa-film",
                color: "#8b5cf6",
                bgColor: "#ede9fe",
                total: 3500,
                recommended: 2000,
                subcategories: [
                    { name: "OTT Subscriptions", amount: 500 },
                    { name: "Movies / Outings", amount: 1200 },
                    { name: "Gaming", amount: 800 },
                    { name: "Social Events", amount: 1000 }
                ]
            },
            {
                name: "Education",
                icon: "fas fa-book",
                color: "#3b82f6",
                bgColor: "#dbeafe",
                total: 3000,
                recommended: 3500,
                subcategories: [
                    { name: "Books & Stationery", amount: 800 },
                    { name: "Online Courses", amount: 1200 },
                    { name: "Printing / Photocopies", amount: 300 },
                    { name: "Project Materials", amount: 700 }
                ]
            },
            {
                name: "Rent & Utilities",
                icon: "fas fa-home",
                color: "#0ea5e9",
                bgColor: "#e0f2fe",
                total: 4500,
                recommended: 5000,
                subcategories: [
                    { name: "Hostel / PG Rent", amount: 3500 },
                    { name: "Electricity / Wi-Fi", amount: 600 },
                    { name: "Laundry", amount: 400 }
                ]
            },
            {
                name: "Miscellaneous",
                icon: "fas fa-ellipsis-h",
                color: "#14b8a6",
                bgColor: "#ccfbf1",
                total: 1500,
                recommended: 1500,
                subcategories: [
                    { name: "Phone Recharge", amount: 400 },
                    { name: "Personal Care", amount: 500 },
                    { name: "Gifts / Donations", amount: 300 },
                    { name: "Others", amount: 300 }
                ]
            }
        ]
    },
    savings: {
        total: 3800,
        rate: 15.2,
        projected: [2000, 3800, 5500, 7000, 8200, 9500, 10800]
    }
};

/* =========== AI Chatbot Knowledge Base =========== */
const CHATBOT_KNOWLEDGE = {
    greetings: [
        "Hello! I'm your FinWise AI advisor. How can I help you manage your finances today?",
        "Hi there! Ready to talk about your financial wellness. What would you like to know?"
    ],
    
    responses: {
        // Expense related
        expenses: `Here's your **detailed expense breakdown** for ${STUDENT_DATA.month}:\n\n` +
            STUDENT_DATA.expenses.categories.map(c => {
                const pct = ((c.total / STUDENT_DATA.expenses.total) * 100).toFixed(1);
                const status = c.total > c.recommended ? "⚠️ OVER BUDGET" : "✅ Within Budget";
                return `**${c.name}**: ₹${c.total.toLocaleString()} (${pct}%) — ${status}\n` +
                    c.subcategories.map(s => `  • ${s.name}: ₹${s.amount.toLocaleString()}`).join('\n');
            }).join('\n\n') +
            `\n\n**Total Expenses**: ₹${STUDENT_DATA.expenses.total.toLocaleString()} (${((STUDENT_DATA.expenses.total / STUDENT_DATA.income.total) * 100).toFixed(1)}% of income)`,

        food: `**🍽️ Food Expenses — ₹6,500** (30.7% of expenses, 26% of income)\n\n` +
            `This is **₹1,500 over** the recommended budget of ₹5,000.\n\n` +
            `Subcategory breakdown:\n` +
            `• Mess / Canteen: ₹3,500 (53.8%)\n` +
            `• Outside / Ordering In: ₹1,800 (27.7%) — 🔴 High!\n` +
            `• Snacks & Beverages: ₹800 (12.3%)\n` +
            `• Groceries: ₹400 (6.2%)\n\n` +
            `💡 **Tip**: Reduce ordering in by ₹800-1,000/month. Cook simple meals or use the mess more. This alone can save ₹12,000/year!`,

        entertainment: `**🎬 Entertainment Expenses — ₹3,500** (16.5% of expenses, 14% of income)\n\n` +
            `This is **₹1,500 over** the recommended budget of ₹2,000. This is your biggest overspending area!\n\n` +
            `Subcategory breakdown:\n` +
            `• OTT Subscriptions: ₹500 (14.3%) — Consider sharing plans\n` +
            `• Movies / Outings: ₹1,200 (34.3%) — 🔴 Can reduce\n` +
            `• Gaming: ₹800 (22.9%) — 🔴 Set a monthly cap\n` +
            `• Social Events: ₹1,000 (28.6%) — Choose free/low-cost events\n\n` +
            `💡 **Tip**: Set a weekly entertainment budget of ₹400 (₹1,600/month). Share OTT plans with friends to save ₹300+/month.`,

        transport: `**🚌 Transport Expenses — ₹2,200** (10.4% of expenses)\n\n` +
            `Within budget (recommended: ₹2,500). Good job! ✅\n\n` +
            `• Bus / Metro Pass: ₹800 — Great, using public transport!\n` +
            `• Auto / Cab Rides: ₹1,000 — Try to reduce cab usage\n` +
            `• Fuel (Bike): ₹400\n\n` +
            `💡 **Tip**: You can save another ₹300-500 by carpooling or using bike more often.`,

        education: `**📚 Education Expenses — ₹3,000** (14.2% of expenses)\n\n` +
            `Well within budget (recommended: ₹3,500). ✅\n\n` +
            `• Books & Stationery: ₹800\n` +
            `• Online Courses: ₹1,200 — Great investment!\n` +
            `• Printing / Photocopies: ₹300\n` +
            `• Project Materials: ₹700\n\n` +
            `💡 **Tip**: Check your college library and free online resources (NPTEL, Coursera audits) before purchasing courses.`,

        rent: `**🏠 Rent & Utilities — ₹4,500** (21.2% of expenses)\n\n` +
            `Within budget (recommended: ₹5,000). ✅\n\n` +
            `• Hostel / PG Rent: ₹3,500\n` +
            `• Electricity / Wi-Fi: ₹600\n` +
            `• Laundry: ₹400\n\n` +
            `💡 **Tip**: This is a fixed cost and well-managed. Keep it stable.`,

        misc: `**📦 Miscellaneous — ₹1,500** (7.1% of expenses)\n\n` +
            `Right at budget (recommended: ₹1,500). ✅\n\n` +
            `• Phone Recharge: ₹400\n` +
            `• Personal Care: ₹500\n` +
            `• Gifts / Donations: ₹300\n` +
            `• Others: ₹300`,

        income: `**💰 Your Income — ₹25,000/month**\n\n` +
            `Sources:\n` +
            `• Monthly Allowance (Parents): ₹15,000 (60%)\n` +
            `• Part-time Tutoring: ₹7,000 (28%)\n` +
            `• Freelance Web Work: ₹3,000 (12%)\n\n` +
            `💡 **Tip**: Great diversification! Consider increasing freelance work during vacations to boost savings.`,

        savings: `**🐷 Your Savings — ₹3,800/month** (15.2% of income)\n\n` +
            `Financial experts recommend saving at least 20% of income. You're at 15.2%, which is decent but can improve.\n\n` +
            `If you reduce Food and Entertainment overspending:\n` +
            `• Potential additional savings: ₹2,500-3,000/month\n` +
            `• New savings rate: 25-27%\n` +
            `• Annual savings: ₹75,000-80,000\n\n` +
            `💡 **Tip**: Set up auto-transfer of ₹5,000 on salary day to a savings account. Treat savings as a non-negotiable expense!`,

        reduce: `Here are practical ways to **reduce your spending**:\n\n` +
            `🔴 **Food (Save ₹1,000-1,500)**\n` +
            `• Cook simple meals instead of ordering in\n` +
            `• Use mess more, outside food is 3x costlier\n` +
            `• Carry a water bottle, avoid packaged drinks\n\n` +
            `🔴 **Entertainment (Save ₹1,000-1,500)**\n` +
            `• Share OTT subscriptions with friends\n` +
            `• Set weekly entertainment budget of ₹400\n` +
            `• Attend free campus events instead\n` +
            `• Limit gaming purchases to ₹500/month\n\n` +
            `🟡 **Transport (Save ₹300-500)**\n` +
            `• Use bus/metro pass more\n` +
            `• Carpool for cab rides\n\n` +
            `Implementing these can boost your savings to **₹6,000-7,000/month** (24-28% of income)!`,

        budget: `Here's a **recommended budget** for a student earning ₹25,000/month:\n\n` +
            `| Category | Recommended | Your Actual | Difference |\n` +
            `|----------|------------|-------------|------------|\n` +
            `| Food | ₹5,000 (20%) | ₹6,500 | +₹1,500 ⚠️ |\n` +
            `| Transport | ₹2,500 (10%) | ₹2,200 | -₹300 ✅ |\n` +
            `| Entertainment | ₹2,000 (8%) | ₹3,500 | +₹1,500 ⚠️ |\n` +
            `| Education | ₹3,500 (14%) | ₹3,000 | -₹500 ✅ |\n` +
            `| Rent | ₹5,000 (20%) | ₹4,500 | -₹500 ✅ |\n` +
            `| Misc | ₹1,500 (6%) | ₹1,500 | ₹0 ✅ |\n` +
            `| **Savings** | **₹5,500 (22%)** | **₹3,800** | **-₹1,700** |\n\n` +
            `💡 By following this budget, you could save ₹66,000 per year!`,

        overspending: `⚠️ **Overspending Alert — 2 Categories Flagged**\n\n` +
            `**1. Food — ₹1,500 over budget**\n` +
            `• Actual: ₹6,500 | Recommended: ₹5,000\n` +
            `• Main culprit: Outside ordering (₹1,800) and snacks (₹800)\n` +
            `• Action: Reduce ordering in by 50%, save ₹900/month\n\n` +
            `**2. Entertainment — ₹1,500 over budget**\n` +
            `• Actual: ₹3,500 | Recommended: ₹2,000\n` +
            `• Main culprits: Movies/outings (₹1,200) and gaming (₹800)\n` +
            `• Action: Set weekly cap of ₹400, save ₹1,100/month\n\n` +
            `Combined potential savings: **₹2,000-3,000/month** or **₹24,000-36,000/year**!`,

        tips: `💡 **Top 10 Money-Saving Tips for Students**:\n\n` +
            `1. 🍳 Cook simple meals — saves ₹1,000+/month\n` +
            `2. 📱 Share OTT/gaming subscriptions with friends\n` +
            `3. 🚌 Use public transport, avoid frequent cabs\n` +
            `4. 📚 Use library and free online courses (NPTEL, MIT OCW)\n` +
            `5. 💧 Carry water bottle and homemade snacks\n` +
            `6. 🎯 Follow the 50/30/20 rule (Needs/Wants/Savings)\n` +
            `7. 📊 Track every expense — awareness reduces spending\n` +
            `8. 🏦 Auto-transfer savings on payday\n` +
            `9. 🎉 Attend free campus events instead of paid outings\n` +
            `10. 📝 Review expenses weekly, not monthly`,

        default: `I understand you're asking about your finances. Here are the areas I can help with:\n\n` +
            `• **"expenses"** — Full expense breakdown\n` +
            `• **"food"** — Food spending analysis\n` +
            `• **"entertainment"** — Entertainment analysis\n` +
            `• **"transport"** — Transport costs\n` +
            `• **"education"** — Education expenses\n` +
            `• **"rent"** — Rent & utilities\n` +
            `• **"income"** — Income sources\n` +
            `• **"savings"** — Savings analysis\n` +
            `• **"reduce spending"** — Tips to reduce expenses\n` +
            `• **"budget"** — Recommended budget\n` +
            `• **"overspending"** — Overspending alerts\n` +
            `• **"tips"** — Money-saving tips\n\n` +
            `Try asking: *"How can I reduce my spendings according to my income?"*`
    }
};
