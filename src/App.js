import { useEffect, useReducer, useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addDoc, collection, setDoc, deleteDoc, doc, onSnapshot  } from "firebase/firestore";
import { db } from "./components/firebase/firebaseInit";

import "./App.css";

function handleExpenses(expenses, action){
  switch(action.type){
    case 'ADD':
      return action.newExpenses;

    case 'REMOVE':
      const updatedExpenses = expenses.filter((expense) => expense.id !== action.id);
      return updatedExpenses;

    case 'EDIT':
      
      return [...action.newExpenses];

    default:
      return []

  }
}

function App() {
  // const [expenses, setExpenses] = useState([]);
  const [expenses, dispatch] = useReducer(handleExpenses, [{text: "zzz", amount: 1000}]);
  const [selectedState, setSelectedState] = useState("");

  useEffect( ()=>{
  //   async function fetchData() {
  //     try {
  //         const snapshots = await getDocs(collection(db, "expenses"));
  //         const newExpenses = snapshots.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data()
  //         }));
  //         console.log('arr : ', newExpenses);
  //         dispatch({ type: 'ADD', newExpenses });
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }
  // fetchData();

  // displaying in real time
  onSnapshot(collection(db, 'expenses'), (snapShot)=>{
        const newExpenses = snapShot.docs.map( (doc)=>{
            return {
                id: doc.id,
                ...doc.data()
            }
        } );

        console.log(newExpenses);
        dispatch({type: 'ADD', newExpenses});
        console.log('newExpenses ', newExpenses);
      
    })
  }, [] )
  

  //-----------------------------------

  const addExpense = async (expense) => {
    // setExpenses([expense, ...expenses]);
    await addDoc(collection(db, "expenses"), {
      text: expense.text,
      amount: expense.amount,
      createdOn: new Date()
    });
    
    toast.success("Expense added successfully.");
  }

  //--------------------------------------

  const deleteExpense = async (id) => {
    // const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    // setExpenses(updatedExpenses);

    await deleteDoc(doc(db, "expenses", id));

    toast.success("Expense deleted successfully.");
  }
  
  //--------------------------------

  const updateExpense = (id) => {
    setSelectedState(id);
    
  }
  //--------------------------------

  const editExpense = async (updatedExpense) => {
    try {
      // Update the expense in Firestore
      const expenseRef = doc(db, "expenses", selectedState);
      await setDoc(expenseRef, updatedExpense);
    
      setSelectedState("");
      toast.success("Expense updated successfully.");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  
  //------------------------------------
  

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
      <ToastContainer />
        <ExpenseForm addExpense={addExpense} selectedState={selectedState} expenses={expenses} 
        updateExpense={updateExpense}  editExpense={editExpense}/>

        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense}/>
        </div>
      </div>
    </>
  );
}

export default App;
