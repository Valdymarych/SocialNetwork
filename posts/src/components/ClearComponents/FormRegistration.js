import styles from "./Form.module.css"
import PreLoader from "../PreLoader";
import { NavLink } from "react-router-dom";

export function FormRegistration(props){
  return (
    <div className={styles.FormContainer}>
      <form method="post" action="/api/user/reg" onSubmit={props.onSubmit} className={styles.Form}>
        <div className={styles.Field}>
          <label htmlFor="name">Name</label>
          <input name="name" id="name" value={props.regName} onChange={(e) => props.setRegName(e.target.value)} autoComplete="off"></input>
        </div>
        <div className={styles.Field}>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" value={props.regPassword} onChange={(e) => props.setRegPassword(e.target.value)} autoComplete="off"></input>
        </div>
        {props.isFetching? (<PreLoader/>): (<input type="submit" value="Зареєструватися"></input>)}
        <NavLink to={"/login"} className={styles.Regist}>Login</NavLink>
      </form>
    </div>
  )
}