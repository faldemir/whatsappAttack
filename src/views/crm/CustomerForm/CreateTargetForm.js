import React from "react";
import { Input, FormItem } from "components/ui";
import { HiUserCircle, HiPhone } from "react-icons/hi";
import { Field } from "formik";

const CreateTargetForm = (props) => {
  const { touched, errors } = props;

  return (
    <>
      <FormItem
        label="Name"
        invalid={errors.target_name && touched.target_name}
        errorMessage={errors.target_name}
      >
        <Field
          type="text"
          autoComplete="off"
          name="target_name"
          placeholder="Name"
          component={Input}
          prefix={<HiUserCircle className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Phone Number"
        invalid={errors.target_number && touched.target_number}
        errorMessage={errors.target_number}
      >
        <Field
          type="text"
          autoComplete="off"
          name="target_number"
          placeholder="Phone Number"
          component={Input}
          prefix={<HiPhone className="text-xl" />}
        />
      </FormItem>
    </>
  );
};

export default CreateTargetForm;
