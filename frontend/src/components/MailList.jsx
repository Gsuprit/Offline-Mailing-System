import { useState, useEffect } from "react";
import axios from "axios";

function MailList({
selectedMenu,
setSelectedMail
}) {

const [receiverId, setReceiverId] =
useState("");

const [subject, setSubject] =
useState("");

const [message, setMessage] =
useState("");

const [mails, setMails] =
useState([]);

const [searchText, setSearchText] =
useState("");

const [attachments, setAttachments] =
useState([]);

const loggedInUser =
localStorage.getItem(
"loggedInUser"
);

useEffect(() => {


loadMails();

}, [selectedMenu]);

const loadMails = async () => {

try {

  if (selectedMenu === "inbox") {

    const response =
      await axios.get(
        `http://localhost:8080/api/mails/inbox/${loggedInUser}`
      );

    setMails(response.data);
  }

  if (selectedMenu === "sent") {

    const response =
      await axios.get(
        `http://localhost:8080/api/mails/sent/${loggedInUser}`
      );

    setMails(response.data);
  }

} catch (error) {

  console.log(error);

}


};

const sendMail = async () => {

  if (
    !receiverId ||
    !subject ||
    !message
  ) {

    alert(
      "Fill all fields"
    );

    return;
  }

  try {

    const usersResponse =
      await axios.get(
        "http://localhost:8080/api/users"
      );

    const users =
      usersResponse.data;

    const receiverExists =
      users.some(
        (user) =>
          user.userId === receiverId
      );

    if (!receiverExists) {

      alert(
        "Receiver User ID does not exist"
      );

      return;
    }

    let uploadedFiles = [];

    for (
      const file of attachments
    ) {

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const uploadResponse =
        await axios.post(
          "http://localhost:8080/api/files/upload",
          formData
        );

      uploadedFiles.push(
        uploadResponse.data
      );

    }

    await axios.post(
      "http://localhost:8080/api/mails/send",
      {
        senderId:
          loggedInUser,
        receiverId,
        subject,
        message,
        attachments:
          uploadedFiles.join(",")
      }
    );

    alert(
      "Mail Sent Successfully"
    );

    setReceiverId("");
    setSubject("");
    setMessage("");
    setAttachments([]);

  } catch (error) {

    alert(
      "Failed To Send Mail"
    );

    console.log(error);

  }

};

const filteredMails =
mails.filter((mail) => {

  const search =
    searchText.toLowerCase();

  return (

    mail.subject
      ?.toLowerCase()
      .includes(search)

    ||

    mail.senderId
      ?.toLowerCase()
      .includes(search)

    ||

    mail.receiverId
      ?.toLowerCase()
      .includes(search)

    ||

    mail.message
      ?.toLowerCase()
      .includes(search)

  );
});

if (selectedMenu === "compose") {

return (

  <div>

    <h2>
      ✉ Compose Mail
    </h2>

    <p
      style={{
        marginTop: "20px",
        marginBottom: "30px",
        fontSize: "24px"
      }}
    >
      <strong>From:</strong>{" "}
      {loggedInUser}
    </p>

    <input
      type="email"
      placeholder="Receiver Email"
      value={receiverId}
      onChange={(e) =>
        setReceiverId(
          e.target.value
        )
      }
    />

    <br /><br />

    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) =>
        setSubject(
          e.target.value
        )
      }
    />

    <br /><br />

    <textarea
      rows="12"
      placeholder="Write your message..."
      value={message}
      onChange={(e) =>
        setMessage(
          e.target.value
        )
      }
    />

    <input
  type="file"
  multiple
  onChange={(e) =>
    setAttachments(
      Array.from(e.target.files)
    )
  }
/>

    <br /><br />

    <button
      onClick={sendMail}
    >
      Send
    </button>

  </div>
);

}

return (

<div>

  <h2>
    {selectedMenu === "inbox"
      ? "📥 Inbox"
      : "📤 Sent"}
  </h2>

  <input
    type="text"
    placeholder="🔍 Search Mail"
    value={searchText}
    onChange={(e) =>
      setSearchText(
        e.target.value
      )
    }
  />

  <br /><br />

  {filteredMails.length === 0 && (

    <div
      style={{
        textAlign: "center",
        padding: "40px",
        opacity: "0.8"
      }}
    >
      📭 No mails found
    </div>

  )}

  {filteredMails.map((mail) => (

    <div
      key={mail.mailId}
      className={
        mail.isRead === false
          ? "mail-card unread-mail"
          : "mail-card"
      }
      onClick={() =>
        setSelectedMail(mail)
      }
    >

      <strong>

        {selectedMenu === "inbox"
          ? mail.senderId
          : `To: ${mail.receiverId}`}

      </strong>

      <br />

      {selectedMenu === "inbox" &&
        mail.isRead === false && (

        <span
          style={{
            color: "#ef4444",
            fontWeight: "bold"
          }}
        >
          ●
        </span>

      )}

      {" "}
      {mail.subject}

    </div>

  ))}

</div>

);
}

export default MailList;
