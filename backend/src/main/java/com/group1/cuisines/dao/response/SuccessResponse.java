package com.group1.cuisines.dao.response;
import lombok.*;
@Data
@AllArgsConstructor
public class SuccessResponse <T>{
    private T data;
    private String message;

}
