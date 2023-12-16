import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = (props) => {
  // Add logic here to calculate the grand total, profit and expense amount here
  let [total, setTotal] = useState(0);
  let [income, setIncome] = useState(0);
  let [expense, setExpense] = useState(0);


  useEffect(() => {

    let totalIncome = 0;
    let totalExpenses = 0;

    if (Array.isArray(props.expenses)) {
      props.expenses.forEach((data) => {
        const amount = parseFloat(data.amount);
        if (amount > 0) {
          totalIncome += amount;
        } else {
          totalExpenses += amount;
        }
      });
    }


    setIncome(totalIncome);
    setExpense(totalExpenses);

    // Calculate the total after setting income and expenses
    setTotal(totalIncome + totalExpenses);
  }, [props.expenses]);

  return (
    <div className={styles.expenseInfoContainer}>

      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>₹{total.toFixed(2)}</h1>
      </div>

      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +₹{income}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -₹{expense}
          </p>
        </div>
      </div>

    </div>
  );
};

export default ExpenseInfo;
