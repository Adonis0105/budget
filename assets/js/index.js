const transactionsTable = document
  .getElementById("transactions-table")
  .querySelector("tbody");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Fonction pour afficher les transactions dans le tableau
function renderTransactions() {
  transactionsTable.innerHTML = ""; // Réinitialiser le contenu du tableau

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td>${transaction.type === "income" ? "Revenu" : "Dépense"}</td>
  <td>${transaction.amount} CFA</td>
  <td>${transaction.category}</td>
  <td>${transaction.date}</td>
  <td>
    <button onclick="deleteTransaction(${index})">Supprimer</button>
  </td>
`;

    transactionsTable.appendChild(row);
  });
}

// Supprimer une transaction
function deleteTransaction(index) {
  transactions.splice(index, 1); // Supprime la transaction
  localStorage.setItem("transactions", JSON.stringify(transactions)); // Met à jour le localStorage
  renderTransactions(); // Rafraîchit l'affichage du tableau
}

// Ajouter un événement pour le formulaire (si nécessaire)
document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (isNaN(amount) || amount <= 0 || !category || !date) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  const newTransaction = { type, amount, category, date };
  transactions.push(newTransaction); // Ajoute la nouvelle transaction
  localStorage.setItem("transactions", JSON.stringify(transactions)); // Met à jour le localStorage
  renderTransactions(); // Rafraîchit le tableau
  e.target.reset(); // Réinitialise le formulaire
});

// Initialisation
renderTransactions();

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

// Initialiser la page
calculateTotals();
createChart();
