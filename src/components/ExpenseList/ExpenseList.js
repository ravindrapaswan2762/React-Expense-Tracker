import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = (props) => {
  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        
      {Array.isArray(props.expenses) && props.expenses.map((expense, index) => (
          <Transaction key={index} expense={expense} index={index} deleteExpense={props.deleteExpense} updateExpense={props.updateExpense}/>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
