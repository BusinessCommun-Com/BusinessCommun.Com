package com.backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
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
    private java.util.List<String> productImageUrls;
    private String website;

    // Connect Type
    private String connectType; // "partner" or "investor" 

    // Connect Details
    private String requirement;
    private String minimumQualification;
    private String skills;
    private String equityPercentage;
    private String investmentRange; // Only for investor   
}
