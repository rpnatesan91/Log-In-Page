import React, { useEffect, useState} from "react";
import { Card, Button, Alert, Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firestore } from "firebase";

export default function AuthenticatePage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [userImage, setUserImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Get image from Firestore where email matches current user
    firestore()
      .collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserImage(doc.data().image);
        });
      });
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {userImage && (
            <div className="text-center">
              <Image src={userImage} roundedCircle style={{ width: 100 }} />
            </div>
          )}
          <br />
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
