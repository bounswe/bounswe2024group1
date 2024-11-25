import { useNavigation } from "expo-router";
import { Search } from "lucide-react-native";
import { useId, useState } from "react";
import { Icon, View } from "./ui";
import { Button } from "./ui/button";
import { Input, InputField } from "./ui/input";

export const SearchBar = () => {
  const id = useId();
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  return (
    <View className="flex items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          params.append("type", "tags"); // TODO: Add select parameter
          params.append("q", search);

          // @ts-ignore
          navigation.navigate("/search?" + params.toString());
        }}
        className="flex gap-4"
      >
        <Input>
          <InputField
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search for..."
            type="text"
            id={id}
          />
        </Input>
        <Button className="gap-2">
          <Icon as={Search} size={16} />
          Search
        </Button>
      </form>
    </View>
  );
};
