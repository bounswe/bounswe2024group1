import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";

interface DifficultyFilterProps {
  value?: DifficultyLevel;
  onChange: (value: DifficultyLevel | undefined) => void;
}

export function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(val) =>
        onChange(val === "all" ? undefined : (val as DifficultyLevel))
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Filter by difficulty</SelectItem>
        <SelectItem value="EASY">Easy</SelectItem>
        <SelectItem value="MEDIUM">Medium</SelectItem>
        <SelectItem value="HARD">Hard</SelectItem>
      </SelectContent>
    </Select>
  );
}
