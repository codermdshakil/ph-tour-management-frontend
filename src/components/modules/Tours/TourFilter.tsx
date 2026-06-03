
import { useSearchParams } from "react-router";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;


  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

 
  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" >
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          value={selectedDivision ? selectedDivision : ""}
    
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {/* {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          value={selectedTourType ? selectedTourType : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {/* {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}