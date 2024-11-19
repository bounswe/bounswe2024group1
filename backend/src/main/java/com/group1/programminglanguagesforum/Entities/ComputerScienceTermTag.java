package com.group1.programminglanguagesforum.Entities;
import jakarta.persistence.Entity;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ComputerScienceTermTag extends Tag{
    private String stackExchangeTag;
}
