export default function Summary({summary}){
  if(!summary) return null;

  return(
   
   <div className="highlight-bar">

  <div className="highlight-item income">
    <span className="label">Income</span>
    <span className="value">${summary?.income || 0}</span>
  </div>

  <div className="highlight-item expenses">
    <span className="label">Expenses</span>
    <span className="value">${summary?.expenses || 0}</span>
  </div>

  <div className="highlight-item net">
    <span className="label">Net</span>
    <span className="value">${summary?.net || 0}</span>
  </div>

</div>

  )
}