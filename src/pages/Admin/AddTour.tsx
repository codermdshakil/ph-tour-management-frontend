/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatISO } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleImageUploader from "../../components/MultipleImageUploader";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import type { FileMetadata } from "../../hooks/use-file-upload";
import { useGetAllDivisionQuery } from "../../redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "../../redux/features/tour/tour.api";

const AddTour = () => {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const [addTour, { isLoading }] = useAddTourMutation();

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const tourTypeOptions = tourTypeData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      startDate: "",
      endDate: "",
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
    },
  });

  // included
  const { fields:includedFields, append:includedAppend,remove:includedRemove } = useFieldArray({
    control: form.control,
    name: "included", // unique name for your Field Array
  });

  // excluded
  const { fields: excludedFields, append:excludedAppend,remove:excludedRemove } = useFieldArray({
    control: form.control,
    name: "excluded", // unique name for your Field Array
  });

  // excluded
  const { fields: amenitiesFields, append:amenitiesAppend,remove:amenitiesRemove } = useFieldArray({
    control: form.control,
    name: "amenities", // unique name for your Field Array
  });

  // tourPlan
  const { fields: tourPlanFields, append:tourPlanAppend, remove:tourPlanRemove } = useFieldArray({
    control: form.control,
    name: "tourPlan", // unique name for your Field Array
  });


  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included:data.included.map((item:{value:string}) => item.value),
      excluded:data.excluded.map((item:{value:string}) => item.value),
      amenities:data.amenities.map((item:{value:string}) => item.value),
      tourPlan:data.tourPlan.map((item:{value:string}) => item.value)
    };


    formData.append("data", JSON.stringify(tourData));
    images.map((image) => formData.append("files", image as File));

    try {
      const res = await addTour(formData).unwrap();

      if(res.success){
        toast.success(res.message);
      }

      console.log(res, "hit");

    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="w-full max-w-4xl border-2 rounded-2xl mx-auto mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* division */}
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={divisionLoading}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {divisionOptions?.map(
                              (item: { label: string; value: string }) => (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* tourType */}
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TourType</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={tourTypeLoading}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a TourType" />
                          </SelectTrigger>
                          <SelectContent>
                            {tourTypeOptions?.map(
                              (item: { label: string; value: string }) => (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* date picker */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="justify-start font-normal">
                            {field.value
                              ? new Date(field.value).toLocaleDateString()
                              : "Select Start Date"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1),
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="justify-start font-normal">
                            {field.value
                              ? new Date(field.value).toLocaleDateString()
                              : "Select End Date"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1),
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <MultipleImageUploader onChange={setImages} />
                </div>
              </div>

              <div className="border-t border-muted w-full"></div>

              
              {/* included fields */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">Included</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => includedAppend({ value: "" })}>
                  {" "}
                  <Plus />
                </Button>
              </div>
              <div className="space-y-4 mt-4">
                {includedFields.map((item:{value:string, id:string}, index: any) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`included.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      onClick={() => includedRemove(index)}
                      variant="destructive"
                      size="icon"
                      type="button">
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>

              {/* excluded fields */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">Excluded</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => excludedAppend({ value: "" })}>
                  {" "}
                  <Plus />
                </Button>
              </div>
              <div className="space-y-4 mt-4">
                {excludedFields.map((item:{value:string, id:string}, index: any) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`excluded.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      onClick={() => excludedRemove(index)}
                      variant="destructive"
                      size="icon"
                      type="button">
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>

              {/* amenities fields */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">Amenities</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => amenitiesAppend({ value: "" })}>
                  {" "}
                  <Plus />
                </Button>
              </div>
              <div className="space-y-4 mt-4">
                {amenitiesFields.map((item:{value:string, id:string}, index: any) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`amenities.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      onClick={() => amenitiesRemove(index)}
                      variant="destructive"
                      size="icon"
                      type="button">
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>

              {/* tourPlan fields */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">Tour Plan</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => tourPlanAppend({ value: "" })}>
                  {" "}
                  <Plus />
                </Button>
              </div>
              <div className="space-y-4 mt-4">
                {tourPlanFields.map((item:{value:string, id:string}, index: any) => (
                  <div className="flex gap-2" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`tourPlan.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      onClick={() => tourPlanRemove(index)}
                      variant="destructive"
                      size="icon"
                      type="button">
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>



              <div className=" flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Tour"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTour;
