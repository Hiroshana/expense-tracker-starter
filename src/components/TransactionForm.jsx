import { useState } from 'react'
import { capitalize } from '../format'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction" aria-labelledby="add-title">
      <h2 id="add-title">Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="type-toggle">
          <legend className="visually-hidden">Type</legend>
          {["expense", "income"].map(option => (
            <label key={option} className={`type-option type-${option}`}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
              />
              <span>{capitalize(option)}</span>
            </label>
          ))}
        </fieldset>

        <label className="field">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Amount</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{capitalize(cat)}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="primary-btn">Add {type}</button>
      </form>
    </section>
  );
}

export default TransactionForm
