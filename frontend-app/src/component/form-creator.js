import formik from "formik";
import yup from "yup"




export default function CreatForm(initialValues, onSubmit) {

    const validationObj = {};
    initialValues.keys().forEach(k => {
        validationObj[k] = yup.string().required("required");
    });

    return function (props) {
        const formh = formik.useFormik({
            initialValues: initialValues,
            validationSchema: validationObj,
            onSubmit: onSubmit,
        })
        return <form onSubmit={formh.handleSubmit}>
            {initialValues.keys().map(e => {
                return <> <input
                    value={e} id={e}
                    placeholder={e}
                    onChange={formh.handleChange}
                    onBlur={formh.handleBlur}
                />
                <div>{formh.touched[k]&& formh.errors[k]}</div>
                </>
            })}
        </form>
    }
}