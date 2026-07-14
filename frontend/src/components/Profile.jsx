import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Profile() {

const [user, setUser] =
useState(null);

const [editMode, setEditMode] =
useState(false);

const usernameRef = useRef(null);
const dobRef = useRef(null);
const q1Ref = useRef(null);
const a1Ref = useRef(null);
const q2Ref = useRef(null);
const a2Ref = useRef(null);
const saveBtnRef = useRef(null);

const userId =
localStorage.getItem(
"loggedInUser"
);

useEffect(() => {


loadProfile();


}, []);

useEffect(() => {

    if (editMode) {

        usernameRef.current?.focus();

    }

}, [editMode]);

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


// Username Validation
if (!/^[A-Za-z ]+$/.test(user.username.trim())) {

    alert("Username should contain only alphabets.");

    return;

}

// DOB Validation
const today = new Date();
const dobDate = new Date(user.dob);

if (dobDate >= today) {

    alert("DOB should be before today's date.");

    return;

}

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
    ref={usernameRef}
    type="text"
    value={user.username}
    disabled={!editMode}
    onChange={(e)=>{
        const value=e.target.value.replace(/[^A-Za-z ]/g,"");

        setUser({
            ...user,
            username:value
        });
    }}
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            dobRef.current.focus();

        }

    }}
/>
    <br /><br />

    <label className="profile-label">
  DOB
</label>

    <input
    ref={dobRef}
    type="date"
    value={user.dob}
    max={new Date().toISOString().split("T")[0]}
    disabled={!editMode}
    onChange={(e)=>
        setUser({
            ...user,
            dob:e.target.value
        })
    }
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            q1Ref.current.focus();

        }

    }}
/>

    <br /><br />

  <label className="profile-label">
  Question 1
</label>
<select
    ref={q1Ref}
    value={user.q1}
    disabled={!editMode}
    onChange={(e)=>
        setUser({
            ...user,
            q1:e.target.value
        })
    }
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            a1Ref.current.focus();

        }

    }}
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
    ref={a1Ref}
    type="text"
    value={user.a1}
    disabled={!editMode}
    onChange={(e)=>
        setUser({
            ...user,
            a1:e.target.value
        })
    }
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            q2Ref.current.focus();

        }

    }}
/>

    <br /><br />

   <label className="profile-label">
  Question 2
</label>

<select
    ref={q2Ref}
    value={user.q2}
    disabled={!editMode}
    onChange={(e)=>
        setUser({
            ...user,
            q2:e.target.value
        })
    }
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            a2Ref.current.focus();

        }

    }}
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
    ref={a2Ref}
    type="text"
    value={user.a2}
    disabled={!editMode}
    onChange={(e)=>
        setUser({
            ...user,
            a2:e.target.value
        })
    }
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
            saveBtnRef.current.focus();

        }

    }}
/>

    <br /><br />

   

    <br />
    <br></br>

    <button
    ref={saveBtnRef}
    className="profile-btn"
    onClick={()=>{
        if(!editMode){

            setEditMode(true);

        }else{

            updateProfile();

        }
    }}
    onKeyDown={(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();
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
