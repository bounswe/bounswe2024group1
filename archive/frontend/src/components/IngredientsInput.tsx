import { useState } from "react";
import { Input } from "./ui/input";
import MinusBorder from "@/assets/Icon/General/Minus-Border.svg?react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export default function IngredientsInput() {
  const [count, setCount] = useState(1);
  const { register, setValue, getValues } = useFormContext();

  const deleteIndex = (index: number) => {
    setCount(count - 1);

    const current = (getValues("ingredients") as unknown[]).slice();
    current.splice(index, 1);

    setValue(`ingredients`, current.slice(0, count));
  };

  return (
    <div className="flex flex-col gap-3">
      {new Array(count).fill(0).map((_, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <Input
            {...register(`ingredients.${idx}.name`)}
            className="flex-1"
            placeholder="flour"
          />
          <Input
            {...register(`ingredients.${idx}.amount`)}
            className="w-20"
            placeholder="100 g"
          />
          <div
            className="cursor-pointer p-2"
            onClick={deleteIndex.bind(null, idx)}
          >
            <MinusBorder />
          </div>
        </div>
      ))}
      <Button
        onClick={(e) => {
          e.preventDefault();
          setCount(count + 1);
        }}
        variant="ghost"
        className="justify-start"
      >
        <PlusIcon className="mr-2" />
        Add ingredient
      </Button>
    </div>
  );
}
