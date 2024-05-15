import {
  useCreateRecipe,
  useGetDishById,
} from "@/services/api/semanticBrowseComponents";
import type { NewRecipe } from "@/services/api//semanticBrowseSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Profile from "@/assets/Icon/General/Profile.svg?react";
import Clock from "@/assets/Icon/General/Clock.svg?react";
import Serving from "@/assets/Icon/General/Serving.svg?react";
import Allergies from "@/assets/Icon/General/Allergies.svg?react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BadgeFormInput, BadgeFormItem } from "@/components/BadgeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import IngredientsInput from "@/components/IngredientsInput";
import InstructionsInput from "@/components/InstructionsInput";

const newRecipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  ingredients: z.array(
    z.object({ name: z.string().min(1), amount: z.string() }),
  ),
  instructions: z.array(z.string().min(1)),
  images: z.array(z.string().min(1)),
  prepTime: z.coerce.number().min(1),
  cookTime: z.coerce.number().min(1),
  servingSize: z.coerce.number().min(1),
  allergens: z.string(),
  dishId: z.string().optional(),
});

type NewRecipe2 = z.infer<typeof newRecipeSchema>;

export default function CreateRecipePage() {
  const [params] = useSearchParams();

  const dishId = params.get("dishId") ?? "";

  const { data: dish, error: dishError } = useGetDishById(
    {
      pathParams: { dishId },
    },
    { enabled: !!dishId },
  );

  const form = useForm<NewRecipe & NewRecipe2>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
      images: [],
      prepTime: 0,
      cookTime: 0,
      servingSize: 0,
      allergens: "",
      dishId: !dishId ? undefined : dishId,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync } = useCreateRecipe();

  return (
    <Form {...form}>
      <div className="container flex flex-col gap-4 py-16">
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <form
          onSubmit={handleSubmit((val) =>
            mutateAsync({
              body: {
                ...val,
                instructions: val.instructions.join(";") as unknown,
              },
            }),
          )}
          className="grid grid-cols-3 gap-12"
        >
          <div className="flex flex-col gap-4">
            <h4>Basic Information</h4>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="My Icli Kofte Recipe 🩷" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="servingSize"
              render={({ field }) => (
                <BadgeFormItem>
                  <div className="flex items-center gap-4">
                    <Profile />
                    <p className="m-0 font-bold">Serves</p>
                  </div>
                  <FormControl>
                    <BadgeFormInput placeholder="4" {...field} />
                  </FormControl>
                </BadgeFormItem>
              )}
            />
            <FormField
              control={control}
              name="prepTime"
              render={({ field }) => (
                <BadgeFormItem>
                  <div className="flex items-center gap-4">
                    <Clock />
                    <p className="m-0 font-bold">Prep time</p>
                  </div>
                  <div className="flex gap-2">
                    <FormControl>
                      <BadgeFormInput placeholder="..." {...field} />
                    </FormControl>
                    <span> min</span>
                  </div>
                </BadgeFormItem>
              )}
            />
            <FormField
              control={control}
              name="cookTime"
              render={({ field }) => (
                <BadgeFormItem>
                  <div className="flex items-center gap-4">
                    <Clock />
                    <p className="m-0 font-bold">Cook time</p>
                  </div>
                  <div className="flex gap-2">
                    <FormControl>
                      <BadgeFormInput placeholder="..." {...field} />
                    </FormControl>
                    <span> min</span>
                  </div>
                </BadgeFormItem>
              )}
            />
            <BadgeFormItem>
              <div className="flex items-center gap-4">
                <Serving />
                <p className="m-0 font-bold">Dish</p>
              </div>
              <FormControl>
                <BadgeFormInput
                  disabled
                  value={
                    !dishError
                      ? dishId
                        ? dish?.data?.name || "Loading..."
                        : "None"
                      : "Error loading dish"
                  }
                />
              </FormControl>
            </BadgeFormItem>
            {/* <FormField
            control={control}
            name="calorieCount"
            render={({ field }) => (
              <BadgeFormItem>
                <div className="flex items-center gap-4">
                  <Calorie />
                  <p className="m-0 font-bold">Calories</p>
                </div>
                <FormControl>
                  <BadgeFormInput placeholder="700" {...field} />
                </FormControl>
              </BadgeFormItem>
            )}
          /> */}
          </div>
          <div className="flex flex-col gap-4">
            <h4>Ingredients</h4>
            <IngredientsInput />
          </div>
          <div className="flex flex-col gap-4">
            <h4>Description</h4>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your recipe..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h4>Allergens</h4>
            <FormField
              control={control}
              name="allergens"
              render={({ field }) => (
                <FormItem className="flex-row items-center gap-4 space-y-0">
                  <Allergies />
                  <FormControl>
                    <Input placeholder="Peanuts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h4>Steps</h4>
            <InstructionsInput />
            <FormField name="root.serverError" render={() => <FormMessage />} />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary"
            >
              {isSubmitting ? "Saving..." : "Save my recipe"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
