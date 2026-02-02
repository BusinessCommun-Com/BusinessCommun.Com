package com.backend.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponseDto {
    
    private Long id;
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
    private java.util.List<String> productImageUrls;
    private String website;

    // Connect Info
    private String connectType; // "PARTNER" or "INVESTOR"
    private String requirement;
    private String skills;
    private String equityPercentage;
    private String investmentRange; // Only for Investor
    private String minimumQualification;

}
