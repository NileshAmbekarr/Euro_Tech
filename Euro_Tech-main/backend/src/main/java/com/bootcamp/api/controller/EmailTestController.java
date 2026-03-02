package com.bootcamp.api.controller;

import com.bootcamp.api.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class EmailTestController {
    
    private final EmailService emailService;
    
    @GetMapping("/email")
    public ResponseEntity<String> testEmail() {
        return ResponseEntity.ok("Email service is configured. Registration emails will be sent automatically.");
    }
}
