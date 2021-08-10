import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import sendMessage from "./sendMessage";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/Account.css";

const db = firebase.firestore();

function Account(props) {
  const { currentUser } = useContext(AuthContext);

  const [values, setValues] = useState({
    displayName: "",
    phoneNumber: "",
    photoUrl: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      const docRef = db.collection("Infos").doc(currentUser.email);

      docRef.get().then((doc) => {
        if (doc.exists) setValues(doc.data());
      });
    }
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      var storageRef = firebase.storage().ref();

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child("images/" + file.name)
        .put(file, { contentType: "image/jpeg" });

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default: break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default: break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setValues({ ...values, photoUrl: downloadURL });
          });
        }
      );
    }
  };

  const onPhoneNumberChange = () => {
    if (values.phoneNumber.substr(1) !== currentUser.phoneNumber.substr(3)) {
      //Unlink phonenumber
      const docRef = db.collection("Infos").doc(currentUser.email);

      firebase
        .auth()
        .currentUser.unlink(firebase.auth.PhoneAuthProvider.PROVIDER_ID)
        .then(() => {
          window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              // Bỏ qua xác thực hình ảnh trước
              // callback: (res) => {},
            }
          );

          const appVerifier = window.appVerifier;

          firebase
            .auth()
            .currentUser.linkWithPhoneNumber(
              `+84${values.phoneNumber.slice(1)}`,
              appVerifier
            )
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              // prompt user to entre code
              let code = window.prompt(
                "Please enter the 6 digit code from your phone number!"
              );

              confirmationResult
                .confirm(code)
                .then((result) => {
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    window.confirmationResult.verificationId,
                    code
                  );
                  firebase.auth().currentUser.linkWithCredential(credential);
                })
                .then((res) => {
                  sendMessage(
                    "Successfully",
                    "Xác thực thành công!",
                    "success"
                  );

                  docRef
                    .set(values)
                    .then(() => {
                      sendMessage(
                        "Cập nhật thông tin thành công!",
                        "Successfully",
                        "success"
                      );
                    })
                    .catch((error) => {
                      sendMessage("Error happend!", error.toString(), "danger");
                    });
                })
                .catch((error) => {
                  // reset rechatcha and try again
                  sendMessage("Error happend!", error.toString(), "danger");
                });
            })
            .catch((error) => {
              // reset rechatcha and try again
              sendMessage("Error happend!", error.toString(), "danger");
            });
        });
    } else {
      sendMessage(
        "Error happend!",
        "Vui lòng nhập số điện thoại khác để thay đổi!",
        "danger"
      );
    }
  };

  const onProfileChange = () => {
    const docRef = db.collection("Infos").doc(currentUser.email);

    // Xác thực sđt trước
    if (
      values.phoneNumber &&
      currentUser.phoneNumber &&
      currentUser.phoneNumber.substr(3) !== values.phoneNumber.substr(1)
    ) {
      window.appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          // Bỏ qua xác thực hình ảnh trước
          // callback: (res) => {},
        }
      );

      const appVerifier = window.appVerifier;

      firebase
        .auth()
        .currentUser.linkWithPhoneNumber(
          `+84${values.phoneNumber.slice(1)}`,
          appVerifier
        )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // prompt user to entre code
          let code = window.prompt(
            "Please enter the 6 digit code from your phone number!"
          );

          confirmationResult
            .confirm(code)
            .then((result) => {
              const credential = firebase.auth.PhoneAuthProvider.credential(
                window.confirmationResult.verificationId,
                code
              );
              firebase.auth().currentUser.linkWithCredential(credential);
            })
            .then((res) => {
              sendMessage("Successfully", "Xác thực thành công!", "success");

              docRef
                .set(values)
                .then(() => {
                  sendMessage(
                    "Cập nhật thông tin thành công!",
                    "Successfully",
                    "success"
                  );
                })
                .catch((error) => {
                  sendMessage("Error happend!", error.toString(), "danger");
                });
            })
            .catch((error) => {
              // reset rechatcha and try again
              sendMessage("Error happend!", error.toString(), "danger");
            });
        })
        .catch((error) => {
          // reset rechatcha and try again
          sendMessage("Error happend!", error.toString(), "danger");
        });
    } else {
      docRef
        .set(values)
        .then(() => {
          sendMessage(
            "Cập nhật thông tin thành công!",
            "Successfully",
            "success"
          );
        })
        .catch((error) => {
          sendMessage("Error happend!", error.toString(), "danger");
        });
    }
  };

  if (!currentUser) {
    return (
      <div style={{ margin: "20px" }}>
        <h4>Vui lòng đăng nhập trước khi sử dụng tính năng này!</h4>
        <Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="Account__profile">
      <h1>THAY ĐỔI THÔNG TIN</h1>
      <div className="container">
        <div className="Account__avatar">
          <Avatar
            alt="avatar"
            style={{ width: "200px", height: "200px" }}
            src={values.photoUrl}
          />
          <input
            type="file"
            name="myImage"
            id="changeAvatar"
            style={{ display: "none" }}
            onChange={(e) => onImageChange(e)}
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              document.getElementById("changeAvatar").click();
            }}>
            Thay đổi avatar
          </Button>
        </div>
        <div className="Account__info">
          <TextField
            id="input-with-icon-grid"
            type="text"
            label="Họ và tên"
            onChange={handleChange("displayName")}
            value={values.displayName}
          />
          <TextField
            id="input-with-icon-grid"
            type="text"
            label="Số điện thoại"
            onChange={handleChange("phoneNumber")}
            value={values.phoneNumber}
          />
          {currentUser.phoneNumber && (
            <Button
              variant="outlined"
              color="primary"
              id="recaptcha-container"
              onClick={() => onPhoneNumberChange()}>
              Thay đổi
            </Button>
          )}
          <TextField
            id="input-with-icon-grid"
            type="text"
            label="Địa chỉ"
            onChange={handleChange("address")}
            value={values.address}
          />
        </div>
      </div>
      <div className="btn-action">
        <Button
          variant="outlined"
          color="primary"
          id="recaptcha-container"
          onClick={() => onProfileChange()}>
          Lưu thông tin
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => auth.signOut()}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export default Account;
