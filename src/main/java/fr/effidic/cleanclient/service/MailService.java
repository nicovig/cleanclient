package fr.effidic.cleanclient.service;

import fr.effidic.cleanclient.domain.Facture;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.User;
import io.github.jhipster.config.JHipsterProperties;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;
import java.lang.String;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    //noms visibles sur l'html
    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";
    //
	//private final static String directoryPath ="C:\\jhipster\\cleanclient\\tmp\\";
    //private final static String directoryName = "Nettoyage_";

	private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    public MailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
            MessageSource messageSource, SpringTemplateEngine templateEngine) {
        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    } 

    @Async
    public void sendEmail(String to, 
    					  String subject, 
    					  String content, 
    					  boolean isHtml, 
    					  Facture facture,
    					  List<ImportLigne> result){
        
    	log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isHtml, to, subject, content);
        boolean isMultipart = true;
        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            
            //Aller chercher result dans le même repo que facture
//            DataSource source2 = new FileDataSource("C:\\jhipster\\cleanclient\\tmp\\Nettoyage_"
//				    + facture.getImportFichier().getId()
//				    + "\\resultat.pdf"); 
            //message.addAttachment("resultat.pdf", source2);

            DataSource source = new FileDataSource("C:\\jhipster\\cleanclient\\tmp\\Nettoyage_"
            									    + facture.getImportFichier().getId()
            									    + "\\facture.pdf"); 
            
            message.addAttachment("facture.pdf", source);
            javaMailSender.send(mimeMessage);
            //log.debug("Sent email to User '{}'", to);
        } catch (Exception e) {
            if (log.isDebugEnabled()) {
                log.warn("Email could not be sent to user '{}'", to, e);
            } else {
                log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
            }
        }
    }

    @Async
    public void sendEmailFromTemplate(User user, 
    								  String templateName, 
    								  String titleKey, 
    								  Facture facture, 
    								  List<ImportLigne> result) {    	
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl()); 
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, true, facture, result);

    }

    @Async
    public void sendActivationEmail(User user, Facture facture, List<ImportLigne> result) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        System.out.println("envoi du mail template");
        sendEmailFromTemplate(user, "mail/templateCreationResultBill", "email.activation.title", facture, result);
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.creation.title", null, null);
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title", null, null);
    }
    
//    @Async
//    public void sendInvoiceResultActivationEmail(User user) {	
//    	log.debug("Envoi du mail avec les résultats, la facture et l'activation à l'utilisateur '{}'", user.getEmail());
//    	String templateName = "mail/invoiceresultactivationEmail";
//    	
//    	String titleKey = "email.invoiceResultActivation.title";
//    	
//        //LANGUE
//    	Locale locale = Locale.forLanguageTag(user.getLangKey());
//        Context context = new Context(locale);
//        
//        context.setVariable(USER, user);
//        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
//        String content = templateEngine.process(templateName, context);
//        String subject = messageSource.getMessage(titleKey, null, locale);
//        
//        //
//        boolean isMultipart = false;
//        boolean isHtml = true;
//        sendEmail(user.getEmail(), subject, content, false, true);
//        String to = user.getEmail();
//        //
//        // Prepare message using a Spring helper
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        try {
//            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
//            message.setTo(to);
//            message.setFrom(jHipsterProperties.getMail().getFrom());
//                      
//            message.setSubject(subject);
//            
//            message.setText(content, isHtml);           
//            javaMailSender.send(mimeMessage);
//            log.debug("Sent email to User '{}'", to);
//        } catch (Exception e) {
//            if (log.isDebugEnabled()) {
//                log.warn("Email could not be sent to user '{}'", to, e);
//            } else {
//                log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
//            }
//        }
//        
//    	
//    }
}
