package com.bootcamp.api.service;

import com.bootcamp.api.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.notification.email}")
    private String notificationEmail;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendRegistrationNotification(User user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(notificationEmail);
            helper.setSubject("🎓 New User Registration - " + user.getUsername());
            helper.setText(buildHtmlEmailBody(user), true);
            
            mailSender.send(message);
            log.info("Registration notification sent for user: {}", user.getUsername());
        } catch (Exception e) {
            log.error("Failed to send registration notification for user: {}", user.getUsername(), e);
        }
    }
    
    private String buildHtmlEmailBody(User user) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
        String formattedDate = user.getCreatedAt() != null ? user.getCreatedAt().format(formatter) : "N/A";
        
        return "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<meta charset='UTF-8'>" +
            "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
            "</head>" +
            "<body style='margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>" +
            "<table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f4f4f4; padding: 20px;'>" +
            "<tr><td align='center'>" +
            "<table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>" +
            
            "<!-- Header -->" +
            "<tr><td style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;'>" +
            "<h1 style='margin:0; color: #ffffff; font-size: 28px;'>🎓 New User Registration</h1>" +
            "<p style='margin: 10px 0 0 0; color: #ffffff; font-size: 14px;'>EuroCore Technologies Bootcamp</p>" +
            "</td></tr>" +
            
            "<!-- Content -->" +
            "<tr><td style='padding: 30px;'>" +
            "<p style='margin: 0 0 20px 0; font-size: 16px; color: #333333;'>A new user has successfully registered on the platform.</p>" +
            
            "<!-- User Details Table -->" +
            "<table width='100%' cellpadding='12' cellspacing='0' style='border: 1px solid #e0e0e0; border-radius: 6px;'>" +
            "<tr style='background-color: #f8f9fa;'>" +
            "<td style='border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555; width: 40%;'>Username</td>" +
            "<td style='border-bottom: 1px solid #e0e0e0; color: #333333;'>" + user.getUsername() + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td style='border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555; background-color: #f8f9fa;'>Full Name</td>" +
            "<td style='border-bottom: 1px solid #e0e0e0; color: #333333;'>" + user.getFirstName() + " " + user.getLastName() + "</td>" +
            "</tr>" +
            "<tr style='background-color: #f8f9fa;'>" +
            "<td style='border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555;'>Email</td>" +
            "<td style='border-bottom: 1px solid #e0e0e0; color: #333333;'>" + user.getEmail() + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td style='border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555; background-color: #f8f9fa;'>Phone</td>" +
            "<td style='border-bottom: 1px solid #e0e0e0; color: #333333;'>" + user.getPhone() + "</td>" +
            "</tr>" +
            "<tr style='background-color: #f8f9fa;'>" +
            "<td style='border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555555;'>Role</td>" +
            "<td style='border-bottom: 1px solid #e0e0e0; color: #333333;'><span style='background-color: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;'>" + user.getRole() + "</span></td>" +
            "</tr>" +
            "<tr>" +
            "<td style='font-weight: bold; color: #555555; background-color: #f8f9fa;'>Registration Date</td>" +
            "<td style='color: #333333;'>" + formattedDate + "</td>" +
            "</tr>" +
            "</table>" +
            
            "<div style='margin-top: 30px; padding: 15px; background-color: #f0f7ff; border-left: 4px solid #667eea; border-radius: 4px;'>" +
            "<p style='margin: 0; font-size: 14px; color: #555555;'><strong>Action Required:</strong> Please review the user details and take necessary actions if needed.</p>" +
            "</div>" +
            "</td></tr>" +
            
            "<!-- Footer -->" +
            "<tr><td style='background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;'>" +
            "<p style='margin: 0; font-size: 12px; color: #888888;'>This is an automated notification from EuroCore Technologies</p>" +
            "<p style='margin: 5px 0 0 0; font-size: 12px; color: #888888;'>© 2026 EuroCore Technologies. All rights reserved.</p>" +
            "</td></tr>" +
            
            "</table>" +
            "</td></tr>" +
            "</table>" +
            "</body>" +
            "</html>";
    }
}
