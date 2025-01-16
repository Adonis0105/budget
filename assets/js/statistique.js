// Importer les données de localStorage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Calculer les totaux
function calculateTotals() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  document.getElementById("total-balance").textContent =
    totalIncome - totalExpense;
  document.getElementById("total-income").textContent = totalIncome;
  document.getElementById("total-expense").textContent = totalExpense;
}

// Calculer les données pour le graphique
function calculateCategoryData() {
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = { income: 0, expense: 0 };
    }
    if (transaction.type === "income") {
      categoryTotals[transaction.category].income += transaction.amount;
    } else {
      categoryTotals[transaction.category].expense += transaction.amount;
    }
  });

  return categoryTotals;
}

// Créer le graphique
function createChart() {
  const categoryData = calculateCategoryData();
  const labels = Object.keys(categoryData);
  const incomeData = labels.map((category) => categoryData[category].income);
  const expenseData = labels.map((category) => categoryData[category].expense);

  const ctx = document.getElementById("categoryChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Revenus",
          data: incomeData,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Dépenses",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Répartition des revenus et dépenses par catégorie",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Initialiser la page
calculateTotals();
createChart();
