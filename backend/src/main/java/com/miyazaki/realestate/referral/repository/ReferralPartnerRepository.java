package com.miyazaki.realestate.referral.repository;

import com.miyazaki.realestate.referral.entity.ReferralPartner;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferralPartnerRepository extends JpaRepository<ReferralPartner, UUID> {

    List<ReferralPartner> findAllByOrderByCreatedAtDesc();
}
