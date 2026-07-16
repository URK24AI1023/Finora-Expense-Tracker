import { useState } from "react";
import API from "../services/api";


function BudgetForm({refresh}){


const [budget,setBudget]=useState({

category:"",
amount:"",
month:""

});



const handleChange=(e)=>{


setBudget({

...budget,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{


e.preventDefault();


try{


const token =
localStorage.getItem("token");



await API.post(

"/budget",

budget,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



alert("Budget Created!");



setBudget({

category:"",
amount:"",
month:""

});



refresh();



}

catch(error){


console.log(error);


alert("Failed to create budget");


}


};





return(


<div>


<h4 className="mb-4">

Create Budget

</h4>




<form onSubmit={handleSubmit}>



<select

name="category"

className="form-control mb-3"

value={budget.category}

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


<option>

Health

</option>



</select>






<input

type="number"

name="amount"

placeholder="Budget Amount"

className="form-control mb-3"

value={budget.amount}

onChange={handleChange}

required

/>






<input

type="month"

name="month"

className="form-control mb-3"

value={budget.month}

onChange={handleChange}

required

/>







<button

className="btn w-100"

style={{

background:
"linear-gradient(90deg,#f59e0b,#ea580c)",

color:"white",

fontWeight:"700"

}}

>

Create Budget

</button>



</form>


</div>


);


}


export default BudgetForm;