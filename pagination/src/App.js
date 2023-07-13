/*eslint-disable*/

import React, { useState,useEffect } from 'react'
import Data from './Data.json'
import './App.css'
import axios from "axios";
const App = () => {
  const[currentpage,setCurrentpage]=useState(1);
  const[data,setData]=useState([]);
  const[searchterm,setSearchterm]=useState();
  const[searchresult,setSearchresult]=useState([])
  const [sort,setSort]=useState({sort:"id",reversed:false});
  const recordsperpage=4;
  const lastindex=currentpage*recordsperpage;
  const firstindex=lastindex-recordsperpage;
  const records=searchresult.slice(firstindex,lastindex);
  //pagination function to change current page and display the data accordingly
  const npage=Math.ceil(searchresult.length/recordsperpage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  const prepage=()=>{
    if(currentpage!==1){
        setCurrentpage(currentpage-1)
    }
}
const chancecpage=(ID)=>{
    setCurrentpage(ID)
   
}


const search=()=>{
 
  const filterdata=searchresult.filter((x)=>x.username.toLowerCase().includes(searchterm.toLowerCase()))
  setSearchresult(filterdata);
 
}

const onchange=(e)=>{
  setSearchterm(e.target.value)
  if(e.target.value==''){
    setSearchresult(data);
  }else{
  setSearchterm(e.target.value)
    }
}

const nextpage=()=>{
    if(currentpage!==npage){
        setCurrentpage(currentpage+1)
    }
  }

 const sortbtID=()=>{
  setSort({sort:"id",reversed:!sort.reversed})
  const userdata=[...data];
  userdata.sort((userA,userB)=>{
    if(sort.reversed){
      return userB.id-userA.id;
    }
    return userA.id-userB.id;
  })
  setSearchresult(userdata);
 }

 const sortByName=()=>{
  setSort({sort:"name",reversed:!sort.reversed})
  const userData=[...data];
  userData.sort((userA,userB)=>{
     if(sort.reversed){
      return userB.username.localeCompare(userA.username);
     }
     return userA.username.localeCompare(userB.username);
  })
  setSearchresult(userData)

 }

 const sortByEmail=()=>{
  setSort({sort:"email",reversed:!sort.reversed})
  const userData=[...data];
  userData.sort((userA,userB)=>{
     if(sort.reversed){
      return userB.email.localeCompare(userA.email);
     }
     return userA.email.localeCompare(userB.email);
  })
  setSearchresult(userData)

 }




  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res=>{setData(res.data);setSearchresult(res.data)})
    .catch(err=>console.log(err));
},[])


const displayData = () =>{

  return(
 records.map((d,i)=>{
  return <tr key={i}>
  <td>{d.id}</td>
  <td>{d.username}</td>
  <td>{d.email}</td>
 </tr>
 }))
}


   
  return (
    <div>
      <input type="text" placeholder='type item' value={searchterm} onChange={onchange}></input><br></br>
      <button onClick={search}>search</button>
      <button onClick={sortbtID}>SortById</button>
      <button onClick={sortByName}>SortByName</button>
      <button onClick={sortByEmail}>SortByEmail</button>
      <table className='table1'>
        <thead>
          <th>ID</th>
          <th>usename</th>
          <th>email</th>
        </thead>
        <tbody>
          {
           displayData()
          }
        </tbody>
      </table>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={prepage}>Previous</a>
          </li>         
          {
             numbers.map((n,i)=>
             
             <li key={i}>
              <a href="#" onClick={()=>chancecpage(n)}>{n}</a>
             </li>
             )
          }
         <li>
          <a href="#" onClick={nextpage}>next</a>
         </li>

        </ul>
      </nav>
    </div>
  )
}

export default App;