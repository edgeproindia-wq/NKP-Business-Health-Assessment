// ========================================
// NKP | NAMMA KANAKKUPILLAI
// SUBCATEGORIES
// ========================================

const selectedCategory =
    localStorage.getItem("startCategory");

const selectedCategoryElement =
    document.getElementById("selectedCategory");

const categoryDescription =
    document.getElementById("categoryDescription");

const categoryIcon =
    document.getElementById("categoryIcon");

const subcategoryGrid =
    document.getElementById("subcategoryGrid");


// ========================================
// SUBCATEGORY DATA
// ========================================

const subcategories = {

    "Operational Efficiency": [
        {
            name: "Process Efficiency",
            icon: "⚙️",
            description:
                "Evaluate how efficiently your daily business processes are managed."
        },
        {
            name: "Resource Management",
            icon: "📦",
            description:
                "Understand how effectively you manage business resources."
        },
        {
            name: "Workforce Productivity",
            icon: "👥",
            description:
                "Assess employee productivity, responsibilities and performance."
        },
        {
            name: "Inventory & Supply Chain",
            icon: "🚚",
            description:
                "Review inventory control, suppliers and supply chain efficiency."
        },
        {
            name: "Technology & Automation",
            icon: "💻",
            description:
                "Measure your use of technology and automation in business."
        }
    ],


    "Financial Growth": [
        {
            name: "Revenue Performance",
            icon: "💰",
            description:
                "Analyse your revenue performance and income generation."
        },
        {
            name: "Profitability",
            icon: "📊",
            description:
                "Understand your profit margins and business profitability."
        },
        {
            name: "Cash Flow",
            icon: "💵",
            description:
                "Evaluate how effectively your business manages cash inflows and outflows."
        },
        {
            name: "Cost Management",
            icon: "🧾",
            description:
                "Review your operating costs and expense management."
        },
        {
            name: "Financial Stability",
            icon: "🏦",
            description:
                "Assess the overall financial stability of your business."
        }
    ],


    "Market Position & Competitiveness": [
        {
            name: "Customer Retention",
            icon: "🤝",
            description:
                "Evaluate how well your business retains existing customers."
        },
        {
            name: "Market Presence",
            icon: "🌐",
            description:
                "Understand your visibility and presence in the market."
        },
        {
            name: "Brand Strength",
            icon: "⭐",
            description:
                "Assess your brand awareness and customer perception."
        },
        {
            name: "Competition",
            icon: "🏆",
            description:
                "Understand your competitive position within your market."
        },
        {
            name: "Customer Satisfaction",
            icon: "😊",
            description:
                "Measure customer satisfaction and overall experience."
        }
    ],


    "Compliance & Risk Management": [
        {
            name: "Legal & Regulatory Compliance",
            icon: "⚖️",
            description:
                "Review your business compliance with applicable rules and regulations."
        },
        {
            name: "Financial Risk",
            icon: "💳",
            description:
                "Identify and evaluate financial risks affecting your business."
        },
        {
            name: "Operational Risk",
            icon: "⚠️",
            description:
                "Assess risks that may affect your daily business operations."
        },
        {
            name: "Data & Cybersecurity",
            icon: "🔐",
            description:
                "Evaluate how your business protects data and digital systems."
        },
        {
            name: "Business Continuity",
            icon: "🛡️",
            description:
                "Assess your preparedness for unexpected business disruptions."
        }
    ],


    "Business Sustainability & Growth": [
        {
            name: "Scalability",
            icon: "📈",
            description:
                "Evaluate your ability to expand your business successfully."
        },
        {
            name: "Innovation",
            icon: "💡",
            description:
                "Assess how your business adopts new ideas, products and methods."
        },
        {
            name: "Leadership",
            icon: "👑",
            description:
                "Understand leadership practices and decision-making in your business."
        },
        {
            name: "Adaptability",
            icon: "🔄",
            description:
                "Measure how effectively your business responds to changes."
        },
        {
            name: "Long-Term Growth",
            icon: "🚀",
            description:
                "Evaluate your plans and readiness for sustainable long-term growth."
        }
    ]

};


// ========================================
// CATEGORY ICONS
// ========================================

const categoryIcons = {

    "Operational Efficiency": "⚙️",

    "Financial Growth": "💰",

    "Market Position & Competitiveness": "📈",

    "Compliance & Risk Management": "🛡️",

    "Business Sustainability & Growth": "🚀"

};


// ========================================
// CHECK CATEGORY
// ========================================

if (!selectedCategory) {

    window.location.href =
        "categories.html";

} else {

    selectedCategoryElement.textContent =
        selectedCategory;

    categoryIcon.textContent =
        categoryIcons[selectedCategory] || "📊";


    // ====================================
    // DESCRIPTION
    // ====================================

    categoryDescription.textContent =
        `Explore the key areas of ${selectedCategory} and evaluate your business performance.`;


    // ====================================
    // CREATE CARDS
    // ====================================

    const areas =
        subcategories[selectedCategory] || [];

    areas.forEach(function (area) {

        const card =
            document.createElement("article");

        card.className =
            "subcategory-card";

        card.innerHTML = `

            <div class="subcategory-icon">
                ${area.icon}
            </div>

            <h3>
                ${area.name}
            </h3>

            <p>
                ${area.description}
            </p>

            <div class="subcategory-action">
                Start Assessment
                <span>→</span>
            </div>

        `;


        // =================================
        // CARD CLICK
        // =================================

        card.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "selectedSubCategory",
                    area.name
                );

                window.location.href =
                    "questions.html";

            }
        );


        subcategoryGrid.appendChild(card);

    });

}

console.log(
    "NKP Subcategories loaded successfully."
);