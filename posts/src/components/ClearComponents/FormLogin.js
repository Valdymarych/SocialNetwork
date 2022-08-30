import styles from "./Form.module.css"
import PreLoader from "../PreLoader";
import { NavLink } from "react-router-dom";

export function FormLogin(props){
  return ( 
    <div className={styles.FormContainer}>
      <form method="post" action="/api/user/login" onSubmit={props.onSubmit} className={styles.Form}>
        <div className={styles.Field}>
          <label htmlFor="name">Name</label>
          <input name="name" id="name" value={props.logName} onChange={(e) => props.setLoginName(e.target.value)} autoComplete="off"></input>
        </div>
        <div className={styles.Field}>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" value={props.logPassword} onChange={(e) => props.setLoginPassword(e.target.value)} autoComplete="off"></input>
        </div>
        {props.isFetching? (<PreLoader/>): (<input type="submit" value="Ввійти"></input>)}
        <NavLink to={"/regist"} className={styles.Regist}>Зареєструватись</NavLink>
      </form>
    </div>
  )
}