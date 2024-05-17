import { useState } from "react";
import MinusBorder from "@/assets/Icon/General/Minus-Border.svg?react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { FormField, FormMessage } from "./ui/form";

export default function InstructionsInput() {
  const [count, setCount] = useState(1);
  const { register, setValue, getValues, control } = useFormContext();

  const deleteIndex = (index: number) => {
    setCount(count - 1);

    const current = (getValues("instructions") as unknown[]).slice();
    current.splice(index, 1);

    setValue(`instructions`, current);
  };

  return (
    <div className="flex flex-col gap-3">
      {new Array(count).fill(0).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <h5 className="self-start">{idx + 1}.</h5>
          <Textarea
            className="min-h-4 flex-1"
            placeholder="..."
            {...register(`instructions.${idx}`)}
          />
          <div
            className="cursor-pointer self-start p-2"
            onClick={deleteIndex.bind(null, idx)}
          >
            <MinusBorder />
          </div>
        </div>
      ))}
      <FormField
        name="instructions.root"
        control={control}
        render={() => <FormMessage />}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setCount(count + 1);
        }}
        variant="ghost"
        className="justify-start"
      >
        <PlusIcon className="mr-2" />
        Add new step
      </Button>
    </div>
  );
}
