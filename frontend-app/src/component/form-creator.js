import * as formik from "formik";
import  * as yup from "yup"

export default function CreatForm(initialValues, onSubmit, nameBtn="Submit") {

    const validationObj = {};
    Object.keys(initialValues).forEach(e => {
        validationObj[e] = yup.string().required("required");
    });

    return function (props) {
        const formh = formik.useFormik({
            initialValues: initialValues,
            validationSchema: yup.object().shape(validationObj),
            onSubmit: onSubmit,
        })
        return <form onSubmit={formh.handleSubmit}>
            {Object.keys(initialValues).map(e => {
                return <> <input
                    value={e} id={e}
                    placeholder={e} key={e}
                    onChange={formh.handleChange}
                    onBlur={formh.handleBlur}
                />
                <div>{formh.touched[e]&& formh.errors[e]}</div>
                </>
            })}
            <button type="submit">{nameBtn}</button>
        </form>
    }
}