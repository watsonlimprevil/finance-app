export default function Summary({ summary }) {
  return (
    <div>
      <h2>This Month</h2>
      <p>Income: ${summary.income || 0}</p>
      <p>Expenses: ${summary.expenses || 0}</p>
      <p>Net: ${summary.net || 0}</p>
    </div>
  );
}
