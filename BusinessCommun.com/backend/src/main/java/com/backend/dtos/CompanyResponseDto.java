package com.backend.dtos;

import org.apache.kafka.common.protocol.types.Field.Str;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponseDto {
    
    private String ownerName;
    private String mobileNumber;

    private String name;
    private Integer establishmentYear;
    private String gstNo;
    private String domain;
    private String orgType;
    private Long revenue;
    private String address;
    private String city;
    private String state;
    private String logoUrl;

    private String title;
    private String description;
    private String productImage;
    private String website;

    


}
