import { useState } from 'react'
import { capitalize, formatDate, formatMoney } from '../format'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const isFiltered = filterType !== "all" || filterCategory !== "all";

  const handleDeleteClick = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  return (
    <section className="transactions" aria-labelledby="transactions-title">
      <div className="transactions-header">
        <h2 id="transactions-title">Transactions</h2>
        <div className="filters">
          <label className="field field-inline">
            <span>Show</span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </label>
          <label className="field field-inline">
            <span>in</span>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{capitalize(cat)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col" className="num">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="date">{formatDate(t.date)}</td>
                <td className="description">{t.description}</td>
                <td><span className="category-tag">{capitalize(t.category)}</span></td>
                <td className={`num amount amount-${t.type}`}>
                  {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                </td>
                <td className="actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(t)}
                    aria-label={`Delete ${t.description}`}
                    title="Delete"
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="empty-state">
            {isFiltered ? (
              <>
                <p>No transactions match these filters.</p>
                <button
                  className="text-btn"
                  onClick={() => { setFilterType("all"); setFilterCategory("all"); }}
                >
                  Clear filters
                </button>
              </>
            ) : (
              <p>No transactions yet. Add your first one above.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionList
