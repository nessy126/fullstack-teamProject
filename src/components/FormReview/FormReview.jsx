import s from "./FormReview.module.scss";

import { ErrorMessage, Formik } from "formik";
import Rating from "components/Rating/Rating";
import { validationReviewForm } from "utils/validation/validationReviewForm";
import { toast } from "react-toastify";

import MediaQuery from "react-responsive";

export default function FormReview({ closeModal }) {
  // const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          rating: 0,
          review: "",
        }}
        validationSchema={validationReviewForm}
        onSubmit={(values, { resetForm }) => {
          // dispatch(addBook(values));
          console.log("values", values);
          resetForm();
          closeModal();
          toast.success(" Your review is saved");
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.form__container}>
              <h2 className={s.modalTitle}>Choose rating of the book</h2>
              <Rating values={values} />
              <ErrorMessage
                component="div"
                name="rating"
                className={s.errorMessage}
              />
              <div className={s.hiddenMargin}></div>
              <label className={s.form__label}>
                <h2 className={s.Resume}>Resume</h2>
                <ErrorMessage
                  component="div"
                  name="review"
                  className={s.errorMessageUp}
                />
                <textarea
                  type="text"
                  name="review"
                  autoComplete="off"
                  value={values.review}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className={s.textArea}
                />
              </label>
            </div>

            <MediaQuery maxWidth={767}>
              <button
                type="button"
                className={s.form__btn__close}
                onClick={() => closeModal()}
              >
                <span className={s.btn__close__text}>Back</span>
              </button>
              <button type="submit" className={s.form__btn__submit}>
                <span className={s.btn__submit__text}>Save</span>
              </button>
            </MediaQuery>
            <MediaQuery minWidth={768}>
              <div className={s.buttonDiv}>
                <button
                  type="button"
                  className={s.form__btn__close}
                  onClick={() => closeModal()}
                >
                  <span className={s.btn__close__text}>Back</span>
                </button>
                <button type="submit" className={s.form__btn__submit}>
                  <span className={s.btn__submit__text}>Save</span>
                </button>
              </div>
            </MediaQuery>
          </form>
        )}
      </Formik>
    </>
  );
}
