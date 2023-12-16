import React, { useReducer } from "react";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

function setCurrentHoverIndex(currentHoverIndex, action){
  switch(action.type){
    case 'ONMOUSEOVER':
      currentHoverIndex = action.index;
      return currentHoverIndex;

    case 'ONMOUSELEAVE':
       currentHoverIndex = action.index;
       return currentHoverIndex;

    default:
      currentHoverIndex = null;
  }
}

const Transaction = ({ expense, deleteExpense, index, updateExpense }) => {
  const [currentHoverIndex, dispatch] = useReducer(setCurrentHoverIndex, null);
  return (
    <li
      key={expense.id}
      className={`${styles.transaction} ${
        expense.amount > 0 ? styles.profit : styles.loss
      }`}
      onMouseOver={() => {
        // setCurrentHoverIndex(index);
        dispatch({type: 'ONMOUSEOVER', index: index})
      }}
      onMouseLeave={() => {
        // setCurrentHoverIndex(null);
        dispatch({type: 'ONMOUSELEAVE', index: null})
      }}
    >
      <div>{expense.text}</div>
      <div className={styles.transactionOptions}>
        <div
          className={`${styles.amount} ${
            currentHoverIndex === index && styles.movePrice
          }`}
        >
          ₹{expense.amount}
        </div>
        <div
          className={`${styles.btnContainer} ${
            currentHoverIndex === index && styles.active
          }`}
        >
          <div className={styles.edit} onClick={() => updateExpense(expense.id)}>
            <img src={EditImage} height="100%" alt="Edit" />
          </div>
          <div
            className={styles.delete}
            onClick={() => deleteExpense(expense.id)}
          >
            <img src={DeleteImage} height="100%" alt="Delete" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
