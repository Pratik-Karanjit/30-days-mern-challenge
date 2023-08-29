import React from 'react'
import {Field, Form, Formik} from 'formik'
import * as yup from "yup"
import FormikInput from './FormikInput'


const FormikForm = () => {

    let initialValues = {
        firstName: "",
        lastName: "",
    }
    let onSubmit = (value, other)=> {
        console.log(value)
    }
    let validationSchema = yup.object({
        firstName:yup.string().required("FirstName is required. "),
        lastName:yup.string().required("LastName is required. "),
    })

  return (
    <div>
        <Formik 
        initialValues= {initialValues}
        onSubmit = {onSubmit}
        validationSchema = {validationSchema}>
            {
                (formik)=> {
                    return <Form>


                <FormikInput name = "firstName" 
                label = "First Name: " 
                type="text" 
                onChange={(e) => {
                formik.setFieldValue('firstName', e.target.value)
                }}
                placeholder = "First Name"
                required = {true}
                ></FormikInput>



                <FormikInput name = "lastName" 
                label = "Last Name: " 
                type="text" 
                onChange={(e) => {
                formik.setFieldValue('lastName', e.target.value)
                }}
                required = {true}
                 ></FormikInput>

                        <button type='submit'>Submit</button>
                    </Form>
                }
            }
        </Formik>

    </div>
  )
}

export default FormikForm