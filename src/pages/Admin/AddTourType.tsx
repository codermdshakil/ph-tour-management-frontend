import { Trash2 } from "lucide-react";
import { AddTourTypeModal } from "../../components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useGetTourTypesQuery } from "../../redux/features/tour/tour.api";
import Loading from "../Loading";

const AddTourType = () => {
  const { data, isLoading } = useGetTourTypesQuery(undefined);

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-16">
        <h2>Tour Types</h2>
      
        <AddTourTypeModal/>
      </div>
      <div className="border-2 border-muted p-3 rounded-md">
       {isLoading && <Loading/>}
       {data && !isLoading && <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25 font-medium">Name</TableHead>
              <TableHead className="font-medium text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="" >
            {[...data?.data || []].reverse().map((item: { name: string }) => (
              <TableRow >
                <TableCell className="font-medium  w-full ">{item.name}</TableCell>
                <TableCell>
                  <Button size="icon-sm">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </div>
    </div>
  );
};

export default AddTourType;
