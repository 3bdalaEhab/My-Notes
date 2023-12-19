import { useContext } from "react";
import {  showDeleteModal, updateNote } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({noteobj}) {
  const { tokenUser } = useContext(UserContext);
  const { setAllNots } = useContext(NoteContext);

  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteobj.title}</h2>
          <p className={`mb-0 mt-2`}>{noteobj.content}</p>
        </div>

        <div className="note-footer">
          <i onClick={()=>updateNote({prevTitle:noteobj.title,prevContent:noteobj.content,id:noteobj._id,tokenUser,updater:setAllNots})} className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i onClick={()=>showDeleteModal({id:noteobj._id,tokenUser,updater:setAllNots})} className="bi bi-archive-fill pointer"></i>
        </div>
      </div>
    </>
  );
}
