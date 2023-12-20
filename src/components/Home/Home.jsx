import { useContext, useEffect } from "react";
import { NoteContext } from "../../Context/NoteContext";
import Loading from "../Loading/Loading";
import style from "./Home.module.css";
import Note from "../Note/Note";
import { getDataToAddNote } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";

export default function Home() {
  const { allNots ,setAllNots } = useContext(NoteContext);
  const { tokenUser } = useContext(UserContext);
  useEffect(() => {
    getDataToAddNote({tokenUser,updater:setAllNots})
  }, [])
  

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>

      {allNots == null ? (
        <Loading /> 
      ) :
        <div className={style.notes}>
          {allNots.map((note) => (
            <Note key={note._id} noteobj={note} />
          )}
        </div>
      )}
    </>
  );
}
