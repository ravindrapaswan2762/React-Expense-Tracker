import { useState, useEffect } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!props.selectedState || !props.expenses) {
      return;
    }
  
    const expense = props.expenses.find((expense) => expense.id === props.selectedState);
  
    if (expense) {
      setText(expense.text);
      setAmount(expense.amount);
    }
  }, [props.selectedState, props.expenses]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (props.selectedState) {
      const updatedExpense = {
        id: props.selectedState,
        text: text,
        amount: parseFloat(amount),
      };
      props.editExpense(updatedExpense);
      
    } else {
      const newExpense = {
        text: text,
        amount: parseFloat(amount),
        id: new Date().getTime(),
      };
      props.addExpense(newExpense);
    }
  
    setText("");
    setAmount(0);
  };
  
  
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add new transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={(e)=>{setText(e.target.value)} }
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        value={amount}
        onChange={(e)=>{setAmount(e.target.value)} }
        required
      />
      <button className={styles.submitBtn}>{props.selectedState?'Edit Transaction': 'Add Transaction'}</button>
    </form>
    
  );
};

export default ExpenseForm;
