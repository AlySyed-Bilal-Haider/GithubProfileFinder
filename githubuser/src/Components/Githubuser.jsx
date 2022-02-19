import React,{useState} from 'react';
import axios from "axios";
import './githubuser.css';
function Githubuser() {
     //we are axios third party library for github API.
    //  and create one search input, user enter github user name, and then display on webpage infotmations.
    //  one create registerhandler function and getvalue arrow function, getvalue func is use for get data from Github
    //  user, with the help api.
    const [userObj,setUserobject]=useState([{
        username:'',
       }]);
    const[Profilechecker,setProfilechecker]=useState(false);
       const[showprofile,getProfile]=useState('');
       const[Isvalidate,setValidate]=useState();
       const RegisterHandler=(e)=>{
        var getvalue=e.target.value;
        setUserobject({...userObj,[e.target.name]:getvalue});
       }
       const SubmitHandler= async(event)=>{
         event.preventDefault();
         const formdata={
           username: event.target[0].value,
         }     
         const name= formdata.username;
         const baseURL=`https://api.github.com/users/${name}`;
         axios.get(baseURL).then((response)=>{
            console.log(response.data);
            getProfile(response.data);
            setProfilechecker(true);
          }).catch((error)=>{
             alert(error);
          })   
       }
  return <>
<div>
      <form className="user-form" id="form" onSubmit={SubmitHandler}>  
    <input type="text" id="search" autoComplete="off"  onChange={RegisterHandler} value={userObj.username} name="username" placeholder="Search a Github User"/>  
   </form>  
   {Profilechecker===true &&<main id="main">
   <div className="card">  
   <div>  
    <img src={`${showprofile.avatar_url}`}  alt={`${showprofile.name}`} className="avatar"/>  
   </div>
   <div className="user-info">  
    <h2>{showprofile.name || showprofile.login }</h2>  
    {showprofile.bio?`${showprofile.bio}` : ''  }  
    <ul>  
     <li>{showprofile.followers}<strong>Followers</strong></li>  
     <li>{showprofile.following}<strong>Following</strong></li>  
     <li>{showprofile.public_repos} <strong>Repos</strong></li>  
    </ul>   
   </div>  
   </div>
       </main> }
  </div>
  </>
}

export default Githubuser;
