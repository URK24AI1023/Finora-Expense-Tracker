import { useState } from "react";
import API from "../services/api";

function ExpenseForm({ refresh }) {

  const [expense,setExpense] = useState({

    amount:"",
    category:"",
    description:"",
    date:""

  });



  const handleChange=(e)=>{

    setExpense({

      ...expense,
      [e.target.name]:e.target.value

    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      const token =
      localStorage.getItem("token");


      await API.post(

        "/expenses",

        expense,

        {

          headers:{

            Authorization:
            `Bearer ${token}`

          }

        }

      );


      alert("Expense Added Successfully");


      setExpense({

        amount:"",
        category:"",
        description:"",
        date:""

      });


      refresh();


    }
    catch(error){

      console.log(error);

      alert("Failed to add expense");

    }


  };



  return (

    <div>


      <h4 className="mb-4">
        Add New Expense
      </h4>



      <form onSubmit={handleSubmit}>


        <input

          type="number"

          name="amount"

          placeholder="Amount"

          className="form-control mb-3"

          value={expense.amount}

          onChange={handleChange}

          required

        />



        <select

          name="category"

          className="form-control mb-3"

          value={expense.category}

          onChange={handleChange}

          required

        >

          <option value="">
            Select Category
          </option>

          <option>
            Food
          </option>

          <option>
            Travel
          </option>

          <option>
            Shopping
          </option>

          <option>
            Bills
          </option>

          <option>
            Education
          </option>


        </select>




        <input

          type="text"

          name="description"

          placeholder="Description"

          className="form-control mb-3"

          value={expense.description}

          onChange={handleChange}

        />



        <input

          type="date"

          name="date"

          className="form-control mb-3"

          value={expense.date}

          onChange={handleChange}

        />




        <button

          className="btn w-100"

          style={{

            background:
            "linear-gradient(90deg,#6366f1,#8b5cf6)",

            color:"white",

            fontWeight:"700"

          }}

        >

          Add Expense

        </button>



      </form>


    </div>

  );

}


export default ExpenseForm;