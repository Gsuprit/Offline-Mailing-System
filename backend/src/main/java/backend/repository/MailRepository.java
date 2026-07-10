package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Mail;

public interface MailRepository
        extends JpaRepository<Mail, Integer> {

    List<Mail> findByReceiverId(
            String receiverId
    );

    List<Mail> findBySenderId(
            String senderId
    );

    List<Mail> findByReceiverIdAndIsRead(
            String receiverId,
            Boolean isRead
    );
}

