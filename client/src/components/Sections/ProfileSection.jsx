import React from "react";
import { useState, useEffect, useRef } from "react";

import { Button, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

const ProfileSection = ({ props }) => {
  const [gender, setGender] = useState("");
  const openRef = useRef(null);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Gender:", gender);
    // You can handle the form submission here, e.g., send data to a server
  };
  return (
    <>
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Profile details</p>
      </div>
      <div className="profile-body">
        <form className="form-container">
          <div className="form-items">
            <label htmlFor="name">Name:</label>
            <a>Tran Huu Nha</a>
          </div>
          <div className="form-items">
            <label htmlFor="email">Email:</label>
            <a>huunha21032k2@gmail.com</a>
          </div>
          <div className="form-items">
            <label htmlFor="email">Phone Number:</label>
            <a>0987654321</a>
          </div>

          <div className="form-items">
            <label htmlFor="email">Select Gender:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={handleChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div>
            <Dropzone
              openRef={openRef}
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Group justify="center" mt="md">
              <Button onClick={() => openRef.current?.()}>Select files</Button>
            </Group>
          </div>

          <Button variant="filled">Update</Button>
        </form>
      </div>
    </>
  );
};

export default ProfileSection;
