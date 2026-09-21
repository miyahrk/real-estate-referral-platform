package com.miyazaki.realestate.referral.controller;

import com.miyazaki.realestate.referral.dto.ReferralPartnerRequest;
import com.miyazaki.realestate.referral.entity.ReferralPartner;
import com.miyazaki.realestate.referral.repository.ReferralPartnerRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/referral-partners")
public class ReferralPartnerController {

    private final ReferralPartnerRepository referralPartnerRepository;

    public ReferralPartnerController(ReferralPartnerRepository referralPartnerRepository) {
        this.referralPartnerRepository = referralPartnerRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReferralPartner create(@Valid @RequestBody ReferralPartnerRequest request) {
        ReferralPartner partner = ReferralPartner.builder()
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .area(request.getArea())
                .specialty(request.getSpecialty())
                .notes(request.getNotes())
                .build();
        return referralPartnerRepository.save(partner);
    }

    @GetMapping
    public List<ReferralPartner> list() {
        return referralPartnerRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ReferralPartner get(@PathVariable UUID id) {
        return findOrThrow(id);
    }

    @PutMapping("/{id}")
    public ReferralPartner update(@PathVariable UUID id, @Valid @RequestBody ReferralPartnerRequest request) {
        ReferralPartner partner = findOrThrow(id);
        partner.setCompanyName(request.getCompanyName());
        partner.setContactPerson(request.getContactPerson());
        partner.setArea(request.getArea());
        partner.setSpecialty(request.getSpecialty());
        partner.setNotes(request.getNotes());
        return referralPartnerRepository.save(partner);
    }

    private ReferralPartner findOrThrow(UUID id) {
        return referralPartnerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "referral partner not found: " + id));
    }
}
