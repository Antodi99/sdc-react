import { signInWithEmailAndPassword } from "firebase/auth"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth } from "@/plugins/firebase"

type FormValues = {
  email: string
  password: string
}

type FirebaseAuthError = {
  code: string
  message: string
}

export default function Login() {
  const navigate = useNavigate()

  const initialValues: FormValues = { email: "", password: "" }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  // Handle form submission
  async function onSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
    const { setSubmitting, setFieldError } = actions
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate("/menu")
      toast.success("Logged in successfully!")
    } catch (err) {
      const { code } = err as FirebaseAuthError

      switch (code) {
        case "auth/invalid-credential":
          setFieldError("email", "Incorrect email or password")
          setFieldError("password", " ") // Just to skip showing any text for password field
          toast.error("Incorrect email or password. Please try again")
          break

        case "auth/too-many-requests":
          setFieldError("email", "Too many login attempts. Try again later")
          setFieldError("password", " ") // Just to skip showing any text for password field
          toast.error("Too many login attempts. Please wait and try again")
          break

        default:
          toast.error("Unexpected error. Please try again later")
          break
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-lightGreen min-h-[800px] gap-16 flex flex-col items-center justify-center">
      <h2 className="text-green text-5xl text-center">Login</h2>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px]">
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
                  className={`w-full bg-gray-100 outline-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
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
                  className={`w-full bg-gray-100 outline-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                />
                <div className="min-h-[20px] text-sm mt-1 text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-4 bg-green text-white rounded-md hover:opacity-70 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-10 py-4 bg-white text-black border border-gray rounded-md hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
