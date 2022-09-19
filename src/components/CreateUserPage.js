import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { storage, firestore } from "firebase";

export default function CreateUserPage() {
  const emailRef = useRef();
  const imageRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if passwords is less than 6 characters
    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    // Check if image is uploaded
    if (imageRef.current.files.length === 0) {
      return setError("Please upload an image");
    }

    // Check if is image type
    if (imageRef.current.files[0].type.split("/")[0] !== "image") {
      return setError("Please upload an image file");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      // Upload Image to Firebase Storage and Save URL to Firestore
      const file = imageRef.current.files[0];
      const storageRef = storage().ref();
      const fileRef = storageRef.child("images/" + file.name);
      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((url) => {
          // Save URL to Firestore
          firestore().collection("users").add({
            email: emailRef.current.value,
            image: url,
          });

          // Redirect to Login Page
          history.push("/");
        });
      });
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" ref={imageRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
