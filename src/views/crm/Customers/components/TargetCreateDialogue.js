import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { setCreateDrawerClose } from "../store/stateSlice";
import TargetCreateContent from "./TargetCreateContent";

const DrawerFooter = ({ onSaveClick, onCancel }) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const TargetCreateDialogue = () => {
  const dispatch = useDispatch();
  const createDrawerOpen = useSelector(
    (state) => state.crmCustomers.state.createDrawerOpen
  );

  const onDrawerClose = () => {
    dispatch(setCreateDrawerClose());
  };

  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Dialog isOpen={createDrawerOpen} onClose={onDrawerClose} width={500}>
      <TargetCreateContent ref={formikRef} />
      <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
    </Dialog>
  );
};

export default TargetCreateDialogue;
