export function DeleteConfirm({deleting , cancel , confirm}){
    if(!deleting) return null;

    return(
        <div className="modal">
            <div className="modal-content">
                <h3>Delete Transactions</h3>
                <p>Are You sure you want to delete this transaction</p>

                <p>
                    <strong>{deleting.category}</strong> -{deleting.amount}
                </p>
                <button onClick={confirm}>Delete</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}