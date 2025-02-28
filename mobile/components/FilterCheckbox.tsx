import { Check } from "lucide-react-native";
import { Text, View } from "./ui";

export default function FilterCheckbox({
  label,
  value,
  onChange,
  checked,
  className,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={[
        "flex items-center rounded-3xl border-2 border-primary px-4 py-2 transition-all",
        checked
          ? "bg-primary text-white brightness-100 filter hover:brightness-90 active:brightness-75"
          : "bg-primary/0 font-bold text-primary hover:bg-primary/10 active:bg-primary/30",
        className,
        props.disabled ? "cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
        className="hidden"
        {...props}
      />
      <Text className="select-none text-sm">{label}</Text>
      <View
        className={cn(
          "ml-0 w-0 overflow-hidden transition-all",
          checked && "ml-3 flex w-3"
        )}
      >
        <Check strokeWidth={6} size={13} />
      </View>
    </label>
  );
}
