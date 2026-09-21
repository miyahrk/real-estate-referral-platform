package com.miyazaki.realestate.referral.controller;

import com.miyazaki.realestate.referral.dto.LeadRequest;
import com.miyazaki.realestate.referral.dto.LeadStatusUpdateRequest;
import com.miyazaki.realestate.referral.entity.Lead;
import com.miyazaki.realestate.referral.repository.LeadRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private static final Set<String> VALID_STATUSES =
            Set.of("new", "hearing", "referred", "closed_won", "closed_lost");

    private final LeadRepository leadRepository;

    public LeadController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lead create(@Valid @RequestBody LeadRequest request) {
        Lead lead = Lead.builder()
                .name(request.getName())
                .contact(request.getContact())
                .area(request.getArea())
                .budget(request.getBudget())
                .purpose(request.getPurpose())
                .build();
        return leadRepository.save(lead);
    }

    @GetMapping
    public List<Lead> list() {
        return leadRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public Lead get(@PathVariable UUID id) {
        return findOrThrow(id);
    }

    @PatchMapping("/{id}/status")
    public Lead updateStatus(@PathVariable UUID id, @Valid @RequestBody LeadStatusUpdateRequest request) {
        if (!VALID_STATUSES.contains(request.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid status: " + request.getStatus());
        }
        Lead lead = findOrThrow(id);
        lead.setStatus(request.getStatus());
        return leadRepository.save(lead);
    }

    private Lead findOrThrow(UUID id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "lead not found: " + id));
    }
}
