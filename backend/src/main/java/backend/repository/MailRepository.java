package backend.repository;

import backend.model.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

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