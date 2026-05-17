import { useGetTourTypesQuery } from "../../redux/features/tour/tour.api";

const AddTourType = () => {

  const {data} = useGetTourTypesQuery(undefined);

  console.log(data, "hit....");

  return (
    <div>
      <h1>AddTourType Component</h1>
    </div>
  );
};

export default AddTourType;