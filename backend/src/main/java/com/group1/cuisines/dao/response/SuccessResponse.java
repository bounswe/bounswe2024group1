package com.group1.cuisines.dao.response;
import lombok.*;
@Data
@AllArgsConstructor
public class SuccessResponse <T>{
    private int status;
    private T data;
    private String message;

}
