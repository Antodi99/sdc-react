import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { loginUser } from "@/store/authSlice"

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading } = useSelector((state: RootState) => state.auth)

  const initialValues: FormValues = { email: "", password: "" }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  async function onSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
    const resultAction = await dispatch(loginUser(values))

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully!")
      navigate("/menu")
    } else {
      const errorCode = resultAction.payload

      switch (errorCode) {
        case "auth/invalid-credential":
          actions.setFieldError("email", "Incorrect email or password")
          actions.setFieldError("password", " ") // Just to skip showing any text for password field
          toast.error("Incorrect email or password. Please try again")
          break
        case "auth/too-many-requests":
          actions.setFieldError("email", "Too many login attempts. Try again later")
          actions.setFieldError("password", " ") // Just to skip showing any text for password field
          toast.error("Too many login attempts. Please wait and try again")
          break
        default:
          toast.error("Unexpected error. Try again later.")
      }
    }

    actions.setSubmitting(false)
  }

  return (
    <main className="bg-lightGreen dark:bg-black min-h-[800px] gap-16 flex flex-col items-center justify-center">
      <h2 className="text-green text-5xl text-center">Login</h2>
      <div className="bg-white dark:bg-black dark:text-white dark:border-white dark:border p-8 rounded-2xl shadow-lg w-full max-w-[500px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-3">
              <div>
                <label htmlFor="email" className="block mb-1">
                  Username
                </label>
                <Field
                  id="email"
                  name="email"
                  className={`w-full bg-gray-100 dark:bg-black outline-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                />
                <div className="min-h-[20px] text-sm mt-1 text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={`w-full bg-gray-100 dark:bg-black outline-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                />
                <div className="min-h-[20px] text-sm mt-1 text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="px-10 py-4 bg-green text-white rounded-md hover:opacity-70 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-10 py-4 bg-white dark:bg-black dark:text-white text-black border border-gray rounded-md hover:bg-gray-100 hover:dark:text-black transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}
