package com.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyRequestDto {

	private String name;
    private String gstNo;
    private Long revenue;
    private String address;
    private String city;
    private String state;
    private String logoUrl;
    private String logoType;
    private byte[] logoData;
    private Integer establishmentYear;

    private Long domainId;
    private Long orgTypeId;

    private String ownerName;
    private String mobileNumber;
    private Long userId;

    private String title;
    private String description;
    private String productImage;
    private String website;
}
