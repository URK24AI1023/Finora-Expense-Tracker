import { useState } from "react";
import API from "../services/api";


function IncomeForm({refresh}){


const [income,setIncome]=useState({

amount:"",
category:"",
description:"",
date:""

});



const handleChange=(e)=>{

setIncome({

...income,

[e.target.name]:e.target.value

});

};




const handleSubmit=async(e)=>{

e.preventDefault();


try{


const token =
localStorage.getItem("token");



await API.post(

"/income",

income,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



alert("Income Added Successfully");



setIncome({

amount:"",
category:"",
description:"",
date:""

});



refresh();


}


catch(error){

console.log(error);

alert("Failed to add income");

}


};




return(


<div>


<h4 className="mb-4">

Add New Income

</h4>



<form onSubmit={handleSubmit}>



<input

type="number"

name="amount"

placeholder="Amount"

className="form-control mb-3"

value={income.amount}

onChange={handleChange}

required

/>





<select

name="category"

className="form-control mb-3"

value={income.category}

onChange={handleChange}

required

>


<option value="">

Select Income Type

</option>


<option>

Salary

</option>


<option>

Business

</option>


<option>

Freelance

</option>


<option>

Investment

</option>


<option>

Other

</option>



</select>





<input

type="text"

name="description"

placeholder="Description"

className="form-control mb-3"

value={income.description}

onChange={handleChange}

/>





<input

type="date"

name="date"

className="form-control mb-3"

value={income.date}

onChange={handleChange}

/>





<button

className="btn w-100"

style={{

background:
"linear-gradient(90deg,#22c55e,#16a34a)",

color:"white",

fontWeight:"700"

}}

>

Add Income

</button>




</form>



</div>


);


}


export default IncomeForm;