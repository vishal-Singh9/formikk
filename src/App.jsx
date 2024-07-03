import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  details: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      gender: Yup.string()
        .oneOf(["Male", "Female"], "Invalid gender")
        .required("Gender is required"),
      isAbove18: Yup.boolean()
        .oneOf([true], "Must be 18 or older")
        .required("Checkbox is required"),
      age: Yup.string().required("Age is required"),
    })
  ),
});

const Dashboard = () => {
  const defaultValues = [
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      isAbove18: "",
      age: "",
    },
  ];

  const [submittedValues, setSubmittedValues] = useState(null);

  return (
    <div>
      <Formik
        initialValues={{ details: defaultValues }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setSubmittedValues(values);
          resetForm();
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name="details"
              render={(arrayHelpers) => (
                <div>
                  {values.details.map((data, index) => (
                    <div key={index} className="box">
                      <h1>
                        <center>SURVEY FORM</center>
                      </h1>
                      <hr />
                      <label htmlFor={`details.${index}.firstName`}>
                        First Name:
                      </label>
                      <Field type="text" name={`details.${index}.firstName`} />
                      <br />
                      <ErrorMessage
                        name={`details.${index}.firstName`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />
                      <label htmlFor={`details.${index}.lastName`}>
                        Last Name:
                      </label>
                      <Field type="text" name={`details.${index}.lastName`} />
                      <br />

                      <ErrorMessage
                        name={`details.${index}.lastName`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />

                      <label htmlFor={`details.${index}.email`}>Email:</label>
                      <Field type="email" name={`details.${index}.email`} />
                      <br />
                      <ErrorMessage
                        name={`details.${index}.email`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />

                      <label htmlFor={`details.${index}.password`}>
                        Password:
                      </label>
                      <Field
                        type="password"
                        name={`details.${index}.password`}
                      />
                      <br />

                      <ErrorMessage
                        name={`details.${index}.password`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />

                      <label htmlFor={`details.${index}.isAbove18`}>
                        Are you above 18?
                      </label>
                      <Field
                        type="checkbox"
                        name={`details.${index}.isAbove18`}
                      />
                      <br />

                      <ErrorMessage
                        name={`details.${index}.isAbove18`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />

                      <label htmlFor={`details.${index}.age`}>Age:</label>
                      <Field as="select" name={`details.${index}.age`}>
                        <option value="" label="Select Age" />
                        <option value="18-25" label="18-25" />
                        <option value="26-35" label="26-35" />
                        <option value="36-45" label="36-45" />
                        <option value="46-60" label="46-60" />
                        <option value="60+" label="60+" />
                      </Field>
                      <br />

                      <ErrorMessage
                        name={`details.${index}.age`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br />

                      <label htmlFor={`details.${index}.gender`}>Gender:</label>
                      <label>
                        {" "}
                        <Field
                          type="radio"
                          name={`details.${index}.gender`}
                          value="Male"
                        />
                        Male
                      </label>

                      <label>
                        {" "}
                        <Field
                          type="radio"
                          name={`details.${index}.gender`}
                          value="Female"
                        />
                        Female
                      </label>
                      <br />
                      <ErrorMessage
                        name={`details.${index}.gender`}
                        component="div"
                        style={{ color: "red" }}
                      />
                      <br /> <br />
                      <br />
                      { (
                        <button
                          className="btn-6"
                          type="button"
                          style={{ marginRight: "10px" }}
                          onClick={() => {if (values.details.length > 1) {
                            arrayHelpers.remove(index);
                          }}}
                        >
                          Remove Form
                        </button>
                      )}
                      <button
                        className="btn-6"
                        type="button"
                        onClick={() =>
                          arrayHelpers.insert(index + 1, {
                            firstName: "",
                            lastName: "",
                            email: "",
                          })
                        }
                      >
                        Add Form
                      </button>
                    </div>
                  ))}
                  <br />

                  <div>
                    <button type="submit" id="submit">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>

      {submittedValues && (
        <div className="box-2">
          <h2>
            <center>Submitted Details</center>
          </h2>
          <hr />
          <ul>
            {submittedValues.details.map((detail, index) => (
              <div key={index}>
                <li>
                  <p>First Name: {detail.firstName}</p>
                </li>
                <li>
                  <p>Last Name: {detail.lastName}</p>
                </li>
                <li>
                  <p>Email:{detail.email}</p>
                </li>
                <li>
                  <p>Password:{detail.password}</p>
                </li>
                <li>
                  <p>Age:{detail.age}</p>
                </li>
                <li>
                  <p>Gender:{detail.gender}</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


