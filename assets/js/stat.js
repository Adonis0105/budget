// Importer les données de localStorage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let filteredTransactions = [...transactions]; // Transactions filtrées (initialement toutes)

// Calculer les totaux
function calculateTotals(data) {
  let totalIncome = 0;
  let totalExpense = 0;

  data.forEach((transaction) => {
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
function calculateCategoryData(data) {
  const categoryTotals = {};

  data.forEach((transaction) => {
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

// Créer ou mettre à jour le graphique
let chartInstance; // Variable pour stocker l'instance du graphique
function updateChart(data) {
  const categoryData = calculateCategoryData(data);
  const labels = Object.keys(categoryData);
  const incomeData = labels.map((category) => categoryData[category].income);
  const expenseData = labels.map((category) => categoryData[category].expense);

  const ctx = document.getElementById("categoryChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy(); // Supprimer l'ancien graphique s'il existe
  }

  chartInstance = new Chart(ctx, {
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

// Appliquer les filtres
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("apply-filters")
    .addEventListener("click", function () {
      const typeFilter = document.getElementById("filter-type").value;
      const categoryFilter = document
        .getElementById("filter-category")
        .value.toLowerCase();
      const startDateFilter =
        document.getElementById("filter-start-date").value;

      filteredTransactions = transactions.filter((transaction) => {
        const matchesType =
          typeFilter === "all" || transaction.type === typeFilter;
        const matchesCategory =
          !categoryFilter ||
          transaction.category.toLowerCase().includes(categoryFilter);
        const matchesDate =
          !startDateFilter || transaction.date >= startDateFilter;

        return matchesType && matchesCategory && matchesDate;
      });

      displayResults(filteredTransactions);
      calculateTotals(filteredTransactions); // Recalculer les totaux
      updateChart(filteredTransactions); // Mettre à jour le graphique
    });

  function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Nettoyer les anciens résultats

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>Aucune transaction trouvée.</p>";
      return;
    }

    results.forEach((transaction) => {
      const transactionElement = document.createElement("div");
      transactionElement.textContent = `Type: ${transaction.type}, Catégorie: ${transaction.category}, Date: ${transaction.date}, Montant: ${transaction.amount}`;
      resultsContainer.appendChild(transactionElement);
    });
  }

  // Initialisation de la page
  calculateTotals(filteredTransactions);
  updateChart(filteredTransactions);
});
