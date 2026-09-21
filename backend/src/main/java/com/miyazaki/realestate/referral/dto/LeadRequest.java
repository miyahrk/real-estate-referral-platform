package com.miyazaki.realestate.referral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String contact;

    private String area;
    private String budget;
    private String purpose;
}
