import { formatMoney } from '../format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : 0;

  return (
    <section className="overview" aria-label="Overview">
      <p className="overview-sentence">
        You’ve spent <strong className="figure figure-expense">{formatMoney(totalExpenses)}</strong>
        {totalIncome > 0 && (
          <> of the <strong className="figure figure-income">{formatMoney(totalIncome)}</strong> you earned</>
        )}
        .
      </p>

      {totalIncome > 0 && (
        <div className="meter">
          <div
            className="meter-track"
            role="meter"
            aria-label="Share of income spent"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(spentShare * 100)}
          >
            <div className="meter-fill" style={{ "--share": spentShare }} />
          </div>
          <div className="meter-legend">
            <span>{Math.round(spentShare * 100)}% of income spent</span>
            <span className={balance < 0 ? "balance-negative" : "balance-positive"}>
              {balance < 0 ? `${formatMoney(-balance)} over` : `${formatMoney(balance)} left`}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default Summary
