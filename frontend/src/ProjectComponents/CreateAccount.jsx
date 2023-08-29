// import React, { useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import '../ProjectCss/style.css';
// import { useTranslation } from 'react-i18next';



// const CreateAccount = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);

//   let initialValues = {
//     fName: '',
//     lName: '',
//     dob: '',
//     password: '',
//     email: '',
//     role: 'customer',
//   };

//   let onSubmit = async (info) => {
//     try {
//       const formData = new FormData(); 
//       formData.append('img', file); 
//       formData.append('info', JSON.stringify(info)); 

//       console.log('FormData:', formData); 

//       let result = await axios.post(`http://localhost:3001/files/single`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });
//       navigate('/registration-success');
//     } catch (error) {
//       console.log('unable to create:', error);
//     }
//   };

//   let validationSchema = yup.object({
//     fName: yup.string().required('Full Name is required. '),
//     lName: yup.string().required('Full Name is required. '),
//     dob: yup.string().required('DOB is required. '),
//     password: yup.string().required('Password is required. '),
//     email: yup.string().required('Email is required. '),
//     role: yup.string(),
//   });

//   let roleOptions = [
//     {
//       label: 'Select Role',
//       value: '',
//       disabled: true,
//     },
//     {
//       label: 'Admin',
//       value: 'admin',
//     },
//     {
//       label: 'Customer',
//       value: 'customer',
//     },
//     {
//       label: 'superAdmin',
//       value: 'superAdmin',
//     },
//   ];

//   return (
//     <div className="form-container">
//        <h2 className="form-title">{t('form.createAccount')}</h2>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         {(formik) => {
//           return (
//             <Form>
//               <div className="form-element-spacing">
                
//                 <label htmlFor="fName">First Name:</label>
//                 <input
//                   type="text"
//                   id="fName"
//                   //a convenient way to attach Formik's field management functionality to 
//                   // a form input element in your React application.
//                   {...formik.getFieldProps('fName')}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <ErrorMessage name="fName" component="div" className="error-message" />

//               <div className="form-element-spacing">
//                 <label htmlFor="lName">Last Name:</label>
//                 <input
//                   type="text"
//                   id="lName"
//                   {...formik.getFieldProps('lName')}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <ErrorMessage name="lName" component="div" className="error-message" />

//               <div className="form-element-spacing">
//                 <label htmlFor="dob">DOB:</label>
//                 <input
//                   type="date"
//                   id="dob"
//                   {...formik.getFieldProps('dob')}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <ErrorMessage name="dob" component="div" className="error-message" />

//               <div className="form-element-spacing">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                   type="email"
//                   id="email"
//                   {...formik.getFieldProps('email')}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <ErrorMessage name="email" component="div" className="error-message" />

//               <div className="form-element-spacing">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   {...formik.getFieldProps('password')}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="error-message"
//               />

              
//               <div className="form-element-spacing">
//         <label htmlFor="file">Upload File:</label>
//         <input
//           type="file"
//           id="file"
//           onChange={(e) => setFile(e.target.files[0])} 
//           className="form-input"
//         />
//       </div>


//        {/* Sanitize and render user-generated content..... So, unless you are specifically rendering HTML content from user input,
//         you can stick to React's default rendering mechanisms without using DOMPurify.*/}
//        {/* <div className="form-element-spacing">
//                 <label htmlFor="userInput">User Input:</label>
//                 <div
//                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(formik.values.userInput), 
//                   }}></div>
//               </div> */}

//               <div className="form-element-spacing">
//                 <label htmlFor="role">Role:</label>
//                 <select id="role" {...formik.getFieldProps('role')} className="form-select" required>
//                   {roleOptions.map((option) => (
//                     <option key={option.value} value={option.value} disabled={option.disabled}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <ErrorMessage name="role" component="div" className="error-message" />

//               <button type="submit" className="form-button">
//                 Create Account
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default CreateAccount;


import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

import '../ProjectCss/style.css';
import LanguageSwitcher from './LanguageSwitcher';

const CreateAccount = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const initialValues = {
    fName: '',
    lName: '',
    dob: '',
    password: '',
    email: '',
    role: 'customer',
  };

  const onSubmit = async (info) => {
    try {
      const formData = new FormData();
      formData.append('img', file);
      formData.append('info', JSON.stringify(info));

      console.log('FormData:', formData);

      const result = await axios.post(`http://localhost:3001/files/single`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/registration-success');
    } catch (error) {
      console.log('unable to create:', error);
    }
  };

  const validationSchema = yup.object({
    fName: yup.string().required(t('form.fullNameRequired')),
    lName: yup.string().required(t('form.fullNameRequired')),
    dob: yup.string().required(t('form.dobRequired')),
    password: yup.string().required(t('form.passwordRequired')),
    email: yup.string().required(t('form.emailRequired')),
    role: yup.string(),
  });

  const roleOptions = [
    {
      label: t('form.selectRole'),
      value: '',
      disabled: true,
    },
    {
      label: t('form.admin'),
      value: 'admin',
    },
    {
      label: t('form.customer'),
      value: 'customer',
    },
    {
      label: t('form.superAdmin'),
      value: 'superAdmin',
    },
  ];
  return (
    <div className="form-container">
      <LanguageSwitcher></LanguageSwitcher>
      <h2 className="form-title">{t('form.createAccount')}</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <Form>
            <div className="form-element-spacing">
              <label htmlFor="fName">{t('form.firstName')}:</label>
              <input
                type="text"
                id="fName"
                {...formik.getFieldProps('fName')}
                className="form-input"
                required
              />
            </div>
            <ErrorMessage name="fName" component="div" className="error-message" />
  
            <div className="form-element-spacing">
              <label htmlFor="lName">{t('form.lastName')}:</label>
              <input
                type="text"
                id="lName"
                {...formik.getFieldProps('lName')}
                className="form-input"
                required
              />
            </div>
            <ErrorMessage name="lName" component="div" className="error-message" />
  
            <div className="form-element-spacing">
              <label htmlFor="dob">{t('form.dob')}:</label>
              <input
                type="date"
                id="dob"
                {...formik.getFieldProps('dob')}
                className="form-input"
                required
              />
            </div>
            <ErrorMessage name="dob" component="div" className="error-message" />
  
            <div className="form-element-spacing">
              <label htmlFor="email">{t('form.email')}:</label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
                className="form-input"
                required
              />
            </div>
            <ErrorMessage name="email" component="div" className="error-message" />
  
            <div className="form-element-spacing">
              <label htmlFor="password">{t('form.password')}:</label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="form-input"
                required
              />
            </div>
            <ErrorMessage name="password" component="div" className="error-message" />
  
            <div className="form-element-spacing">
              <label htmlFor="file">{t('form.uploadFile')}:</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-input"
              />
            </div>
  
            <div className="form-element-spacing">
              <label htmlFor="role">{t('form.role')}:</label>
              <select
                id="role"
                {...formik.getFieldProps('role')}
                className="form-select"
                required
              >
                {roleOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <ErrorMessage name="role" component="div" className="error-message" />
  
            <button type="submit" className="form-button">
              {t('form.createAccount')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
 }

export default CreateAccount;
                