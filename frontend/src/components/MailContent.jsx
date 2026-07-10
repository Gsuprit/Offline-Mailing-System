import { useEffect, useState } from "react";
import axios from "axios";


function MailContent({
  selectedMail
  
}) {

  const [showReplyBox, setShowReplyBox] = useState(false);
const [replyMessage, setReplyMessage] = useState("");

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
  setShowReplyBox(true);
};

const sendReply = async () => {

  if (!replyMessage.trim()) {
    alert("Please enter a reply.");
    return;
  }

  try {

    const loggedInUser = localStorage.getItem("loggedInUser");

const receiver =
  selectedMail.senderId === loggedInUser
    ? selectedMail.receiverId
    : selectedMail.senderId;

const originalMessage = selectedMail.message.includes("----- Original Message -----")
  ? selectedMail.message
  : `----- Original Message -----

${selectedMail.message}`;
const replyMail = {

  senderId: loggedInUser,

  receiverId: receiver,

  subject: selectedMail.subject.startsWith("Re:")
  ? selectedMail.subject
  : "Re: " + selectedMail.subject,
message: `${originalMessage}

----- Reply -----

${replyMessage}`,

  attachments: null

};

    await axios.post(
      "http://localhost:8080/api/mails/send",
      replyMail
    );

    alert("Reply sent successfully.");

    setReplyMessage("");
    setShowReplyBox(false);

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert("Reply failed.");

  }

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
    marginBottom: "15px"
  }}
  onClick={replyToMail}
>
  ↩ Reply
</button>

{showReplyBox && (

  <div style={{ marginBottom: "20px" }}>

    <textarea
      placeholder="Type your reply..."
      value={replyMessage}
      onChange={(e) => setReplyMessage(e.target.value)}
      rows="6"
      style={{
        width: "100%",
        marginBottom: "10px"
      }}
    />

    <button
      style={{
        width: "100%"
      }}
      onClick={sendReply}
    >
      📤 Send Reply
    </button>

  </div>

)}

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