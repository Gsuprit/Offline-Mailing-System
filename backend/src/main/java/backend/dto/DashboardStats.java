package backend.dto;

public class DashboardStats {

    private long inboxCount;
    private long sentCount;
    private long unreadCount;
    private long eventCount;

    public DashboardStats(
            long inboxCount,
            long sentCount,
            long unreadCount,
            long eventCount
    ) {
        this.inboxCount = inboxCount;
        this.sentCount = sentCount;
        this.unreadCount = unreadCount;
        this.eventCount = eventCount;
    }

    public long getInboxCount() {
        return inboxCount;
    }

    public long getSentCount() {
        return sentCount;
    }

    public long getUnreadCount() {
        return unreadCount;
    }

    public long getEventCount() {
        return eventCount;
    }
}