import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Trash2
} from "lucide-react";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";


import API from "../services/api";

import Sidebar from "../components/Sidebar";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import BudgetForm from "../components/BudgetForm";



function Dashboard(){


const navigate = useNavigate();


const token =
localStorage.getItem("token");



const [income,setIncome]=useState([]);

const [expenses,setExpenses]=useState([]);

const [budgets,setBudgets]=useState([]);




// FETCH INCOME

const fetchIncome=async()=>{

try{

const res=await API.get(

"/income",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setIncome(res.data);


}

catch(err){

console.log(err);

}

};




// FETCH EXPENSE

const fetchExpenses=async()=>{


try{


const res=await API.get(

"/expenses",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setExpenses(res.data);


}

catch(err){

console.log(err);

}


};





// FETCH BUDGET


const fetchBudgets=async()=>{


try{


const res=await API.get(

"/budget",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setBudgets(res.data);


}

catch(err){

console.log(err);

}


};





useEffect(()=>{


fetchIncome();

fetchExpenses();

fetchBudgets();


},[]);







// CALCULATIONS


const totalIncome = income.reduce(

(sum,item)=>

sum+Number(item.amount),

0

);



const totalExpense = expenses.reduce(

(sum,item)=>

sum+Number(item.amount),

0

);



const balance =

totalIncome-totalExpense;



const savings=balance;







// DELETE


const deleteIncome=async(id)=>{


await API.delete(

`/income/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


fetchIncome();


};







const deleteExpense=async(id)=>{


await API.delete(

`/expenses/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


fetchExpenses();


};







const deleteBudget=async(id)=>{


await API.delete(

`/budget/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


fetchBudgets();


};







// PIE DATA


const category={};



expenses.forEach(item=>{


category[item.category]=

(category[item.category]||0)

+Number(item.amount);


});



const pieData=

Object.keys(category).map(item=>(

{

name:item,

value:category[item]

}

));






const barData=[

{

name:"Finance",

Income:totalIncome,

Expense:totalExpense

}

];







return(


<div

style={{

minHeight:"100vh",

background:

"linear-gradient(135deg,#020617,#1e1b4b,#312e81)",

color:"white"

}}

>


<Sidebar/>





<div

style={{

marginLeft:"250px",

padding:"40px",

width:"calc(100% - 250px)",

overflowX:"hidden"

}}

>



<h1>

Dashboard

</h1>


<p

style={{

color:"#cbd5e1"

}}

>

Manage your money smarter with Finora

</p>








{/* CARDS */}


<div className="row mt-4">


<Card

title="Balance"

value={balance}

icon={<Wallet/>}

/>



<Card

title="Income"

value={totalIncome}

icon={<TrendingUp/>}

/>



<Card

title="Expense"

value={totalExpense}

icon={<TrendingDown/>}

/>



<Card

title="Savings"

value={savings}

icon={<PiggyBank/>}

/>


</div>








{/* FORMS */}


<div className="row mt-5">


<div className="col-lg-4">


<IncomeForm

refresh={fetchIncome}

/>


</div>



<div className="col-lg-4">


<ExpenseForm

refresh={fetchExpenses}

/>


</div>




<div className="col-lg-4">


<BudgetForm

refresh={fetchBudgets}

/>


</div>



</div>









{/* CHARTS */}


<div className="row mt-5">



<div className="col-lg-5">


<div

style={boxStyle}

>


<h3>

Expense Chart

</h3>



<ResponsiveContainer

height={300}

width="100%"

>


<PieChart>


<Pie

data={pieData}

dataKey="value"

outerRadius={100}

label

>


{

pieData.map(

(_,index)=>(


<Cell

key={index}

fill={[

"#6366f1",

"#22c55e",

"#f59e0b",

"#ef4444"

][index]}


/>


)

)

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>


</div>









<div className="col-lg-7">


<div

style={{

...boxStyle,

minHeight:"160px",

display:"flex",

flexDirection:"column",

justifyContent:"center"

}}

>


<h3>

Income vs Expense

</h3>



<ResponsiveContainer

height={300}

width="100%"

>


<BarChart

data={barData}

>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="Income"

/>


<Bar

dataKey="Expense"

/>


</BarChart>


</ResponsiveContainer>


</div>


</div>



</div>









{/* BUDGET */}


<div

style={boxStyle}

className="mt-5"

>


<h2>

🎯 Budgets

</h2>



{

budgets.map(item=>(


<div

key={item._id}

className="mt-4"

>


<h5>

{item.category}

</h5>


<p>

₹ {item.amount}

</p>


<button

className="btn btn-danger btn-sm"

onClick={()=>deleteBudget(item._id)}

>

Delete

</button>


</div>


))


}



</div>









{/* TABLES */}



<Table

title="Income History"

data={income}

deleteFunction={deleteIncome}

/>



<Table

title="Expense History"

data={expenses}

deleteFunction={deleteExpense}

/>





</div>


</div>


);

}




function Card({title,value,icon}){


return(

<div className="col-lg-3 mb-3">


<div style={boxStyle}>

<div
  style={{
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
>
  {icon}
</div>

<h5>

{title}

</h5>


<h3>

₹ {value}

</h3>


</div>


</div>


);

}







function Table({title,data,deleteFunction}){


return(


<div

style={boxStyle}

className="mt-5"

>


<h3>

{title}

</h3>


<table className="table table-dark">


<tbody>


{

data.map(item=>(


<tr key={item._id}>


<td>

{item.category}

</td>


<td>

₹ {item.amount}

</td>


<td>


<button

className="btn btn-danger"

onClick={()=>deleteFunction(item._id)}

>

<Trash2 size={16}/>

</button>


</td>


</tr>


))


}


</tbody>


</table>


</div>


);


}






const boxStyle={

background:"rgba(255,255,255,0.12)",

padding:"25px",

borderRadius:"20px",

overflow:"hidden"

};





export default Dashboard;