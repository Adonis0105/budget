// Fonction pour mettre à jour dynamiquement la section des totaux
function updateSummary(data) {
  let totalIncome = 0;
  let totalExpense = 0;

  data.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpense += transaction.amount;
    }
  });

  // Mettre à jour les éléments dans le DOM
  document.getElementById("total-balance").textContent = (
    totalIncome - totalExpense
  ).toFixed(2);
  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expense").textContent =
    totalExpense.toFixed(2);
}

// Exemple d'appel initial (utilise toutes les transactions par défaut)
document.addEventListener("DOMContentLoaded", function () {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  updateSummary(transactions); // Appel initial
});
