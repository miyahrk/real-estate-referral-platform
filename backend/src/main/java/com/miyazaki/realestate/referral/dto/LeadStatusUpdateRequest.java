package com.miyazaki.realestate.referral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadStatusUpdateRequest {

    @NotBlank
    private String status;
}
