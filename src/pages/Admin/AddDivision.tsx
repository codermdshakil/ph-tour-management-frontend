import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmation } from "../../components/DeleteConfirmation";
import { AddDivisionModal } from "../../components/modules/Division/AddDivisionModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  useGetDivisionsQuery,
  useRemoveDivisionMutation,
} from "../../redux/features/division/division.api";
import type { IDivisionResponse } from "../../types/division.type";
import Loading from "../Loading";

const AddDivision = () => {
  const { data: divisions, isLoading } = useGetDivisionsQuery(undefined);
  const [removeDivision] = useRemoveDivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    try {
      const response = await removeDivision(divisionId).unwrap();

      if (response.success) {
        toast.success("Division deleted successfully");
      }
    } catch (error) {
      const divisionError = error as {
        data?: { message?: string };
        message?: string;
      };

      toast.error(
        divisionError.data?.message ||
          divisionError.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Divisions</h1>
          <p className="text-muted-foreground">Manage tour divisions</p>
        </div>
        <AddDivisionModal />
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {isLoading ? (
          <Loading />
        ) : divisions?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Division</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {divisions.map((division: IDivisionResponse) => (
                <TableRow key={division._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={division.thumbnail}
                        alt={division.name}
                        className="size-12 rounded-md object-cover"
                      />
                      <span className="font-medium">{division.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {division.slug}
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    {division.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveDivision(division._id)}
                    >
                      <button
                        type="button"
                        aria-label={`Delete ${division.name}`}
                        title={`Delete ${division.name}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="p-6 text-center text-muted-foreground">
            No divisions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddDivision;