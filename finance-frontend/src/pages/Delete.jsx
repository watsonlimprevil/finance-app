export function DeleteConfirm({ deleting, cancel, confirm }) {
  if (!deleting) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Transactions</h3>
        <p>Are you sure you want to delete the transaction?</p>

        <div className="delete-preview">
          <p>{deleting.category}</p>
          <p>${deleting.amount}</p>
        </div>
        <div className="modal-actions">
          <button className="primary danger" onClick={confirm}>
            Confirm
          </button>
          <button className="secondary" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
