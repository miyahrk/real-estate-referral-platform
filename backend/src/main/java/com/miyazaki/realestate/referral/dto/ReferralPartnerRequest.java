package com.miyazaki.realestate.referral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReferralPartnerRequest {

    @NotBlank
    private String companyName;

    private String contactPerson;
    private String area;
    private String specialty;
    private String notes;
}
