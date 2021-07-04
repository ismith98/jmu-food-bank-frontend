import React, {useState, useEffect} from 'react'
import { Button } from "react-bootstrap";
import {getAnnouncement, updateAnnouncement} from "../hooks/useFirebase";
import { useAlert } from "../contexts/AlertContext";



export default function Announcements() {
    const [announcement, setAnnouncement] = useState("");
    const { setErrorAlert, setSuccessAlert } = useAlert();


    useEffect(() => getAnnouncement(setAnnouncement), [])

    function submitChanges() {
        let isVisible = announcement.length > 0;
        let announcementObject = {isVisible: `${isVisible}`, message: announcement}
        updateAnnouncement(announcementObject, setErrorAlert, setSuccessAlert)
    }

    return (
        <div style={{flex: 1, width: "100%"}}>
            <h1>Announcements</h1>
            <textarea
          value={announcement}
          onChange={(val) => setAnnouncement(val.target.value)}
          rows={5}
          style={{width: "60%"}}
          placeholder="Write your announcements here."
          //cols={5}
        />
        <br></br>
        <Button type="submit" onClick={submitChanges}>
          Submit
        </Button>
        </div>
    )
}
