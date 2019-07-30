import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { passwordValidator, emailValidator, nameValidator } from '../lib/validators';
import {  }from '../Auth';

const Wrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 360,
  border: '1px solid #ddd',
  marginBottom: '40px',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width:'80%'
}

const fieldStyle = {
  marginBottom: '1em',
  padding: '5px 10px',
  width: '100%'
}

const ErrorMessage = styled.div({
  color: 'red',
  margin: '0 0 3px',
  fontSize: '0.9em'
})

const CustomLabel = styled.div({
  marginBottom: 3,
  fontSize: '0.9em',
  padding: 5,
  alignSelf:'flex-start'
})

const validate = (({ email, name, password }) => {
  return Promise.all([
    passwordValidator(password), 
    emailValidator(email), 
    nameValidator(name)
  ])
  .then((results) => {
    const errors = {}
    results.forEach(result => {
      if (result.error) {
        errors[result.type] = result.error
      }
    })
    if (Object.keys(errors).length > 0) {
      throw errors
    }
  })
})

export default class extends Component {
  render() {
    const handleSubmit = (values, actions) => {
      this.props.login(values)
      .then(data => {
        actions.setSubmitting(false);
        alert(data.message)
      })
      .catch((error) => {
        const errors = {
          server: error.message
        }
        actions.setSubmitting(false);
        alert(error.message)
        actions.setErrors(errors)
        
      })
    }
    return (
      <div style={Wrapper}>
        <Formik
          validateOnBlur={true}
          validateOnChange={false}
          initialValues={{ 
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ 
            errors,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
                <Form onSubmit={handleSubmit} style={formStyle}>
                  <p　style={{alignSelf:'flex-start'}}>利用にはログインが必要です。</p>
                  {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}
                  
                  <CustomLabel >メールアドレス</CustomLabel>
                  <Field type="email" name="email" style={fieldStyle}/>
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  
                  <CustomLabel>パスワード</CustomLabel>
                  <Field type="text" name="password" style={fieldStyle}/>
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                  
                  <Button type="submit" disabled={isSubmitting} style={fieldStyle}>
                    ログインする
                  </Button>
                </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}