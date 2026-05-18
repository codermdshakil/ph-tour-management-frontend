/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddTourTypeMutation } from "../../../../redux/features/tour/tour.api";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";

export function AddTourTypeModal() {
  const form = useForm();
  const [addTourType] = useAddTourTypeMutation();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const result = await addTourType(data);

    if (result?.data?.success) {
      toast.success(`${result?.data?.message}`);
      console.log(result, "hit");
    }
     setOpen(false);
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button>Add Tour Type</Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-106.25">
      <DialogHeader>
        <DialogTitle>Add Tour Type</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          id="add-tour-type"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tour Type Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Tour type name"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit" form="add-tour-type">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
