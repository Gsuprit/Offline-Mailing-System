import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

const [user, setUser] =
useState(null);

const [editMode, setEditMode] =
useState(false);

const userId =
localStorage.getItem(
"loggedInUser"
);

useEffect(() => {


loadProfile();


}, []);

const loadProfile = async () => {


try {

  const response =
    await axios.get(
      `http://localhost:8080/api/user/${userId}`
    );

  setUser(
    response.data
  );

} catch (error) {

  console.log(error);
}


};

const updateProfile = async () => {


try {

  console.log(user);
  const response = await axios.put(
    `http://localhost:8080/api/user/${userId}`,
    {
        username: user.username,
        dob: user.dob,

        q1: user.q1,
        a1: user.a1,

        q2: user.q2,
        a2: user.a2,

        password: user.password,
        passwordChangeDate: user.passwordChangeDate,
        passwordReminderSent: user.passwordReminderSent
    }
);

  console.log(
    response.data
  );

  alert(
    "Profile Updated Successfully"
  );

  loadProfile();

  setEditMode(false);

} catch (error) {

  console.log(error);

  alert(
    "Update Failed"
  );
}


};

if (!user) {


return (
  <h2>
    Loading...
  </h2>
);


}

return (

<div className="profile-container">

  <h2 className="profile-title">
    👤 User Profile
  </h2>

  <br />

  <div className="profile-card">

    <label className="profile-label">
      User ID:
      {" "}
      {user.userId}
    </label>

    <br />

   <label className="profile-label">
  Username
</label>

    <input
      type="text"
      value={user.username}
      disabled={!editMode}
      onChange={(e) =>
        setUser({
          ...user,
          username:
            e.target.value
        })
      }
    />

    <br /><br />

    <label className="profile-label">
  DOB
</label>

    <input
      type="date"
      value={user.dob}
      disabled={!editMode}
      onChange={(e) =>
        setUser({
          ...user,
          dob:
            e.target.value
        })
      }
    />

    <br /><br />

  <label className="profile-label">
  Question 1
</label>

<select
  value={user.q1}
  disabled={!editMode}
  onChange={(e) =>
    setUser({
      ...user,
      q1: e.target.value
    })
  }
>
  <option>
    What is your nickname?
  </option>

  <option>
    What is your first school?
  </option>
</select>

    <br /><br />

    <label className="profile-label">
  Answer 1
</label>

    <input
      type="text"
      value={user.a1}
      disabled={!editMode}
      onChange={(e) =>
        setUser({
          ...user,
          a1:
            e.target.value
        })
      }
    />

    <br /><br />

   <label className="profile-label">
  Question 2
</label>

<select
  value={user.q2}
  disabled={!editMode}
  onChange={(e) =>
    setUser({
      ...user,
      q2: e.target.value
    })
  }
>
  <option>
    What is your birthplace?
  </option>

  <option>
    What is your pet name?
  </option>
</select>

    <br /><br />

    <label className="profile-label">
  Answer 2
</label>

    <input
      type="text"
      value={user.a2}
      disabled={!editMode}
      onChange={(e) =>
        setUser({
          ...user,
          a2:
            e.target.value
        })
      }
    />

    <br /><br />

   

    <br />
    <br></br>

    <button
  className="profile-btn"
  onClick={() => {

    if (!editMode) {

      setEditMode(true);

    } else {

      updateProfile();

    }

  }}
>
  {editMode
    ? "💾 Save Changes"
    : "✏ Edit Profile"}
</button>

  </div>

</div>


);
}

export default Profile;
