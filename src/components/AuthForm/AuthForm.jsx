import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import spriteSVG from "assets/images/sprite.svg";
import { SignUpSchema, LoginSchema } from "assets/schemas/authSchemas";
import { login, signUp } from "redux/auth/authActionThunk";

import s from "./AuthForm.module.scss";

const AuthForm = ({ type }) => {
  // const [redirect, setRedirect] = useState(false);
  const { registerPass } = useSelector((state) => state.auth);
  console.log(registerPass);
  // const auth = useSelector((state) => state.auth);
  // console.log(auth);

  const dispatch = useDispatch();
  const isRegister = type === "register";

  const initialValue = isRegister
    ? { name: "", email: "", password: "", confirmPassword: "" }
    : { email: "", password: "" };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={isRegister ? SignUpSchema : LoginSchema}
        onSubmit={(values) => {
          // console.log(values);
          try {
            const { name, email, password } = values;
            const data = isRegister
              ? { name, email, password }
              : { email, password };

            isRegister ? dispatch(signUp(data)) : dispatch(login(data));
            // setRedirect(true);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {({ handleSubmit }) => (
          <div className={s.auth}>
            <div className={isRegister ? s.formReg : s.form}>
              <div className={s.google}>
                <button>
                  <svg className={s.iconGoogle}>
                    <use href={`${spriteSVG}#google`}></use>
                  </svg>
                  Google
                </button>
              </div>
              <Form onSubmit={handleSubmit}>
                <div>
                  {isRegister && (
                    <div className={s.name}>
                      <p>
                        Name <b>*</b>
                      </p>
                      <Field
                        className={s.nameInput}
                        type="name"
                        name="name"
                        placeholder="name"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        className={s.errorMessage}
                        name="name"
                        component="div"
                      />
                    </div>
                  )}
                  <div className={s.email}>
                    <p>
                      Email <b>*</b>
                    </p>
                    <Field
                      className={s.emailInput}
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      className={s.errorMessage}
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className={s.password}>
                    <p>
                      Password <b>*</b>
                    </p>
                    <Field
                      className={s.passwordInput}
                      type="password"
                      name="password"
                      placeholder=". . ."
                    />
                    <ErrorMessage
                      className={s.errorMessage}
                      name="password"
                      component="div"
                    />
                  </div>

                  {isRegister && (
                    <div className={s.password}>
                      <p>
                        Confirm password <b>*</b>
                      </p>
                      <Field
                        className={s.passwordInput}
                        type="password"
                        name="confirmPassword"
                        placeholder=". . ."
                      />
                      <ErrorMessage
                        className={s.errorMessage}
                        name="confirmPassword"
                        component="div"
                      />
                    </div>
                  )}
                </div>
                <div className={s.buttons}>
                  <button className={s.login} type="submit">
                    {isRegister ? "Register" : "Login"}
                  </button>
                  {isRegister ? (
                    <p className={s.alreadyReg}>
                      Already register
                      <NavLink to="/login" className={s.changePage}>
                        login
                      </NavLink>
                    </p>
                  ) : (
                    <NavLink to="/register" className={s.changePage}>
                      Registration
                    </NavLink>
                  )}
                  {registerPass && <Redirect to="/login" />}
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
