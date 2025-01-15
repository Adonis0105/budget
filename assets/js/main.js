const transactionForm = document.getElementById("transaction-form");
const transactionsTable = document
  .getElementById("transactions-table")
  .querySelector("tbody");
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");
const filterStartDate = document.getElementById("filter-start-date");
const filterEndDate = document.getElementById("filter-end-date");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
  // Réinitialiser le tableau
  transactionsTable.innerHTML = "";

  // Variables pour les totaux
  let totalIncome = 0;
  let totalExpense = 0;

  // Filtrer et afficher les transactions
  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    if (
      (filterType.value === "all" || transaction.type === filterType.value) &&
      (filterCategory.value === "" ||
        transaction.category.includes(filterCategory.value)) &&
      (filterStartDate.value === "" ||
        new Date(transaction.date) >= new Date(filterStartDate.value)) &&
      (filterEndDate.value === "" ||
        new Date(transaction.date) <= new Date(filterEndDate.value))
    ) {
      row.innerHTML = `
                        <td>${transaction.type === "income" ? "Revenu" : "Dépense"}</td>
                        <td>${transaction.amount}</td>
                        <td>${transaction.category}</td>
                        <td>${transaction.date}</td>
                        <td>
                            <button onclick="deleteTransaction(${index})">Supprimer</button>
                        </td>
                    `;
      transactionsTable.appendChild(row);
    }

    // Calculer les totaux
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  // Mettre à jour les totaux
  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;
  totalBalanceEl.textContent = totalIncome - totalExpense;
}

// Fonction pour ajouter une transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (isNaN(amount) || amount <= 0 || !category || !date) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  transactions.push({ type, amount, category, date });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDisplay();
  transactionForm.reset();
});

// Fonction pour supprimer une transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDisplay();
}

// Appliquer les filtres
document
  .getElementById("apply-filters")
  .addEventListener("click", updateDisplay);

// Initialiser l'affichage
updateDisplay();

// Fonction pour regrouper les transactions par catégorie et calculer les totaux
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

// Fonction pour générer le graphique
function renderChart() {
  const categoryData = calculateCategoryData();

  const labels = Object.keys(categoryData); // Les catégories
  const incomeData = labels.map((category) => categoryData[category].income);
  const expenseData = labels.map((category) => categoryData[category].expense);

  const ctx = document.getElementById("categoryChart").getContext("2d");
  new Chart(ctx, {
    type: "bar", // Type de graphique (barres)
    data: {
      labels: labels,
      datasets: [
        {
          label: "Revenus",
          data: incomeData,
          backgroundColor: "rgba(54, 162, 235, 0.7)", // Bleu pour les revenus
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Dépenses",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.7)", // Rouge pour les dépenses
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top", // Position de la légende
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

// Mettre à jour le graphique à chaque mise à jour de l'affichage
transactionForm.addEventListener("submit", () => setTimeout(renderChart, 0));
document
  .getElementById("apply-filters")
  .addEventListener("click", () => setTimeout(renderChart, 0));

// Initialiser le graphique
renderChart();
