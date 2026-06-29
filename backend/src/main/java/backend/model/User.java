package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    private String userId;

    private String username;
    private String dob;
    private String password;

    private String q1;
    private String a1;

    private String q2;
    private String a2;

    private String passwordChangeDate;

    private Boolean passwordReminderSent = false;

public Boolean getPasswordReminderSent() {
    return passwordReminderSent;
}

public void setPasswordReminderSent(Boolean passwordReminderSent) {
    this.passwordReminderSent = passwordReminderSent;
}

    public User() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getQ1() {
        return q1;
    }

    public void setQ1(String q1) {
        this.q1 = q1;
    }

    public String getA1() {
        return a1;
    }

    public void setA1(String a1) {
        this.a1 = a1;
    }

    public String getQ2() {
        return q2;
    }

    public void setQ2(String q2) {
        this.q2 = q2;
    }

    public String getA2() {
        return a2;
    }

    public void setA2(String a2) {
        this.a2 = a2;
    }

    public String getPasswordChangeDate() {
        return passwordChangeDate;
    }

    public void setPasswordChangeDate(String passwordChangeDate) {
        this.passwordChangeDate = passwordChangeDate;
    }
}