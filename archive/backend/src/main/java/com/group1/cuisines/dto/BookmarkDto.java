package com.group1.cuisines.dto;
import  lombok.*;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkDto {

    private Integer id;
    private String name;
    private String instructions;
    private List<IngredientsDto> ingredients;
    private int servingSize;
    private Integer cookTime;
    private Integer prepTime;
    //private List<String> images;
    private CuisineDto cuisine;
    private DishDto dish;
    private Double avgRating;

    private AuthorDto author;
}
