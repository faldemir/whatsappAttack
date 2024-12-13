import React, { forwardRef } from "react";
import { Form, Formik } from "formik";
import { FormContainer } from "components/ui";
import * as Yup from "yup";
import CreateTargetForm from "./CreateTargetForm";

const validationSchema = Yup.object().shape({
  target_name: Yup.string().required("Target Name Required"),
  target_number: Yup.string()
    .required("Phone Number Required")
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Phone number is not valid"
    ),
});

const TargetForm = forwardRef((props, ref) => {
  const { onFormSubmit } = props;
  const initialValues = {
    target_name: "",
    target_number: "",
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit?.(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <FormContainer>
            <div className="p-6">
              <CreateTargetForm touched={touched} errors={errors} />
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

export default TargetForm;
