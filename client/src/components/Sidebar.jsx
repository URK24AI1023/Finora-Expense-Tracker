import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Target,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";


function Sidebar(){


const navigate = useNavigate();



const logout = ()=>{

localStorage.removeItem("token");

navigate("/");

};




return(


<div

style={{

width:"250px",

height:"100vh",

background:"#111827",

padding:"30px 20px",

position:"fixed",

left:0,

top:0,

zIndex:1000,

boxShadow:"4px 0 20px rgba(0,0,0,0.3)"

}}

>


<h1

style={{

fontWeight:"800",

color:"#ffffff",

textAlign:"center",

marginBottom:"50px"

}}

>

Finora

</h1>





<MenuItem

icon={<LayoutDashboard size={22}/>}

text="Dashboard"

/>



<MenuItem

icon={<Wallet size={22}/>}

text="Income"

/>



<MenuItem

icon={<CreditCard size={22}/>}

text="Expenses"

/>



<MenuItem

icon={<Target size={22}/>}

text="Budget"

/>






<button

onClick={logout}

style={{

marginTop:"50px",

width:"100%",

padding:"12px",

border:"none",

borderRadius:"12px",

background:"#ef4444",

color:"white",

fontWeight:"600",

display:"flex",

alignItems:"center",

justifyContent:"center",

gap:"8px",

cursor:"pointer"

}}

>


<LogOut size={18}/>

Logout


</button>




</div>


);


}

function MenuItem({icon,text}){


return(

<div

style={{

display:"flex",

alignItems:"center",

gap:"15px",

padding:"15px",

marginBottom:"15px",

borderRadius:"15px",

color:"#e2e8f0",

cursor:"pointer",

background:

"text"==="Dashboard"

?

"rgba(99,102,241,0.25)"

:

"transparent",

transition:"0.3s"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.background=

"rgba(99,102,241,0.25)";

}}


onMouseLeave={(e)=>{

e.currentTarget.style.background=

"transparent";

}}


>


{icon}


<span>

{text}

</span>


</div>


);


}

export default Sidebar;