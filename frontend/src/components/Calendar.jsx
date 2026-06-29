
import { useState, useEffect } from "react";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const userId =
    localStorage.getItem(
      "loggedInUser"
    );

  useEffect(() => {

    loadEvents();

  }, []);

  const loadEvents = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/events/${userId}`
        );

      const formattedEvents =
        response.data.map(event => ({
          id: event.eventId,
          title: event.title,
          date: event.eventDate,
          description: event.description
        }));

      setEvents(
        formattedEvents
      );

    } catch (error) {

      console.log(error);

    }
  };

  const handleDateClick = (
    info
  ) => {

    setEditingId(null);

    setSelectedDate(
      info.dateStr
    );

    setTitle("");

    setDescription("");

    setShowModal(true);

  };

  const editEvent = (
    event
  ) => {

    setEditingId(
      event.id
    );

    setSelectedDate(
      event.date
    );

    setTitle(
      event.title
    );

    setDescription(
      event.description
    );

    setShowModal(true);

  };

  const saveEvent = async () => {

    if (
      !title ||
      !description
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

    try {

      if (
        editingId
      ) {

        await axios.put(
          `http://localhost:8080/api/events/${editingId}`,
          {
            userId,
            title,
            description,
            eventDate:
              selectedDate
          }
        );

        alert(
          "Event Updated"
        );

      } else {

        await axios.post(
          "http://localhost:8080/api/events",
          {
            userId,
            title,
            description,
            eventDate:
              selectedDate
          }
        );

        alert(
          "Event Saved"
        );

      }

      setShowModal(false);

      setEditingId(null);

      loadEvents();

    } catch (error) {

      alert(
        "Operation Failed"
      );

    }

  };

  const deleteEvent = async (
    eventId
  ) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/events/${eventId}`
      );

      loadEvents();

    } catch (error) {

      alert(
        "Delete Failed"
      );

    }

  };

  return (

    <div>

      <h2
        style={{
          marginBottom: "20px",
          color: "white"
        }}
      >
        📅 Calendar
      </h2>

      <div
        style={{
          background: "#0f1f4d",
          padding: "20px",
          borderRadius: "20px",
          maxWidth: "1050px",
          margin: "auto"
        }}
      >

        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin
          ]}
          initialView="dayGridMonth"
          height="520px"
          dayMaxEvents={true}
          fixedWeekCount={false}
          events={events}
          dateClick={
            handleDateClick
          }
        />

      </div>

      <div
  style={{
    width: "100%",
    marginTop: "50px",
    clear: "both"
  }}
>
  <h2
    style={{
      color: "white",
      marginBottom: "25px"
    }}
  >
    📌 Events
  </h2>

  {events.length === 0 ? (

    <div
      style={{
        background: "#243552",
        padding: "20px",
        borderRadius: "15px",
        color: "white"
      }}
    >
      No Events Available
    </div>

  ) : (

    events.map((event) => (

      <div
  key={event.id}
  style={{
    background: "#243552",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px",
    color: "white"
  }}
>

  <h3
    style={{
      marginBottom: "15px",
      fontSize: "22px"
    }}
  >
    {event.title}
  </h3>

  <p
    style={{
      color: "#60a5fa",
      marginBottom: "15px",
      fontWeight: "bold"
    }}
  >
    📅 {event.date}
  </p>

  <p
    style={{
      lineHeight: "1.8",
      marginBottom: "25px"
    }}
  >
    {event.description}
  </p>

  <button
    onClick={() =>
      editEvent(event)
    }
    style={{
      width: "120px",
      height: "40px",
      marginRight: "10px"
    }}
  >
    ✏ Edit
  </button>

  <button
    onClick={() =>
      deleteEvent(event.id)
    }
    style={{
      width: "120px",
      height: "40px",
      background: "#dc2626",
      color: "white"
    }}
  >
    🗑 Delete
  </button>

</div>

    ))

  )}

</div>

      {showModal && (

        <div
          style={{
            position:
              "fixed",
            top: 0,
            left: 0,
            width:
              "100%",
            height:
              "100%",
            background:
              "rgba(0,0,0,0.7)",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 999
          }}
        >

          <div
            style={{
              background:
                "#0f172a",
              padding:
                "30px",
              borderRadius:
                "15px",
              width:
                "450px"
            }}
          >

            <h2
              style={{
                color:
                  "white",
                marginBottom:
                  "15px"
              }}
            >
              {editingId
                ? "✏ Edit Event"
                : "📅 Add Event"}
            </h2>

            <label
  style={{
    display: "block",
    color: "white",
    marginBottom: "10px",
    fontWeight: "bold"
  }}
>
  Event Date
</label>

<input
  type="date"
  value={selectedDate}
  onChange={(e) =>
    setSelectedDate(
      e.target.value
    )
  }
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px"
  }}
/>

            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              style={{
                width:
                  "100%",
                padding:
                  "12px",
                borderRadius:
                  "8px",
                marginBottom:
                  "15px"
              }}
            />

            <textarea
              rows="5"
              placeholder="Description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              style={{
                width:
                  "100%",
                padding:
                  "12px",
                borderRadius:
                  "8px",
                marginBottom:
                  "20px"
              }}
            />

            <button
              onClick={
                saveEvent
              }
              style={{
                width:
                  "100%",
                padding:
                  "12px",
                marginBottom:
                  "10px"
              }}
            >
              {editingId
                ? "Update Event"
                : "Save Event"}
            </button>

            <button
              onClick={() =>
                setShowModal(
                  false
                )
              }
              style={{
                width:
                  "100%",
                padding:
                  "12px"
              }}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Calendar;

