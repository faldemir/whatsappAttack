import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerList, postTarget } from "../store/dataSlice";
import { setCreateDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import TargetForm from "views/crm/CustomerForm/TargetForm";


const TargetCreateContent = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.crmCustomers.data.customerList);
  let newData = cloneDeep(data);
  const onFormSubmit = (values) => {
    if (!isEmpty(values)) {
      newData = [values, ...newData];
      dispatch(setCustomerList(newData));
      dispatch(postTarget(values));
    }

    dispatch(setCreateDrawerClose());
  };

  return <TargetForm ref={ref} onFormSubmit={onFormSubmit} />;
});

export default TargetCreateContent;
