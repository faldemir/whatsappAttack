import { Button } from "components/ui";
import { useDispatch } from "react-redux";
import { setCreateDrawerOpen } from "../store/stateSlice";

const ExtraHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="solid"
        size="sm"
        onClick={() => dispatch(setCreateDrawerOpen())}
      >
        Create Target
      </Button>
    </div>
  );
};

export default ExtraHeader;
