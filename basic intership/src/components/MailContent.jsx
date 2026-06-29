import { useEffect } from "react";
import axios from "axios";

function MailContent({
  selectedMail,
  setSelectedMenu,
  setReplyMail
}) {

  useEffect(() => {

    const markAsRead = async () => {

      if (
        selectedMail &&
        selectedMail.isRead === false
      ) {

        try {

          await axios.put(
            `http://localhost:8080/api/mails/read/${selectedMail.mailId}`
          );

        } catch (error) {

          console.log(error);

        }

      }

    };

    markAsRead();

  }, [selectedMail]);

  if (!selectedMail) {

    return (

      <div>

        <h2>
          No Mail Selected
        </h2>

      </div>

    );

  }

  const formattedDate =
    selectedMail.createdAt
      ? new Date(
          selectedMail.createdAt
        ).toLocaleString()
      : "Not Available";

  const deleteMail = async () => {

    try {

      await axios.delete(
        `http://localhost:8080/api/mails/delete/${selectedMail.mailId}`
      );

      alert(
        "Mail Deleted"
      );

      window.location.reload();

    } catch (error) {

      alert(
        "Delete Failed"
      );

    }

  };

  const replyToMail = () => {

    setReplyMail(
      selectedMail
    );

    setSelectedMenu(
      "compose"
    );

  };

  return (

    <div>

      <h2>
        📧 Mail Details
      </h2>

      <div className="mail-info-row">
  <span className="label">From</span>
  <span className="value">{selectedMail.senderId}</span>
</div>

<div className="mail-info-row">
  <span className="label">To</span>
  <span className="value">{selectedMail.receiverId}</span>
</div>

<div className="mail-info-row">
  <span className="label">Date</span>
  <span className="value">{formattedDate}</span>
</div>

<div className="mail-info-row">
  <span className="label">Subject</span>
  <span className="value">{selectedMail.subject}</span>


       
      </div>

      <hr />

      <br />

      <p>
        {selectedMail.message}
      </p>

      {selectedMail.attachments && (

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >

          <strong>
            Attachments:
          </strong>

          <br />
          <br />

          {selectedMail.attachments
            .split(",")
            .map((file, index) => (

              <div
                key={index}
                style={{
                  marginBottom: "10px"
                }}
              >

                <a
                  href={`http://localhost:8080/uploads/${file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📎 {file}
                </a>

              </div>

          ))}

        </div>

      )}

      <button
        style={{
          width: "100%",
          marginTop: "20px",
          marginBottom: "10px"
        }}
        onClick={replyToMail}
      >
        ↩ Reply
      </button>

      <button
        className="delete-btn"
        onClick={deleteMail}
      >
        🗑 Delete Mail
      </button>

    </div>

  );

}

export default MailContent;