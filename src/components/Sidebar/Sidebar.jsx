import { useContext, useState } from "react";
import style from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { showAddModal } from "../../utils/Note";
import { NoteContext } from "../../Context/NoteContext";

export default function Sidebar({setIsMinimized , isMinimized}) {
const { logOut,tokenUser} = useContext(UserContext)  
const { setAllNots} = useContext(NoteContext)  
const navigate = useNavigate()

function openOrClose(){
  setIsMinimized(!isMinimized)
}

function logOutUser(){
  logOut()
  navigate("/Login")
 }


  return (
    <>
      <nav className={`${style.nav}  shadow-sm`}>
        <button onClick={()=>{
          showAddModal({updater:setAllNots, tokenUser})
        }} className="btn btn-main text-capitalize w-100 mb-3">
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized?" New Note":""}

         
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized?"Home":""}
              
            </NavLink>
          </li>
          <li>
          <NavLink to="/">

              <i className="bi bi-search me-2"></i> 
              {isMinimized?"Search":""}
            </NavLink>


          </li>
          <li>
           

            <span onClick={logOutUser} className="pointer">
              <i  className="bi bi-box-arrow-left me-2"></i>
              {isMinimized?"Log Out":""}
             
            </span>
            
          </li>
          <li></li>
        </ul>
        <div onClick={openOrClose} className={`${style.change} shadow pointer`}>
          <i className={!isMinimized? `fa-solid fa-chevron-right `: `fa-solid fa-chevron-left `}></i>
        </div>
      </nav>
    </>
  );
}
