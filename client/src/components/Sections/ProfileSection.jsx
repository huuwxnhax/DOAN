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
        <h2>Hồ Sơ Cá Nhân</h2>
        <p>Hồ Sơ Chi Tiết</p>
      </div>
      <div className="profile-body">
        <form className="form-container">
          <div className="form-items">
            <label htmlFor="name">Tên:</label>
            <a>Tran Huu Nha</a>
          </div>
          <div className="form-items">
            <label htmlFor="email">Email:</label>
            <a>huunha21032k2@gmail.com</a>
          </div>
          <div className="form-items">
            <label htmlFor="email">Số Điện Thoại:</label>
            <a>0987654321</a>
          </div>

          <div className="form-items">
            <label htmlFor="email">Giới Tính:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Nam</label>
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
              <label htmlFor="female">Nữ</label>
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
              <label htmlFor="other">Khác</label>
            </div>
          </div>

          <div className="dropzone">
            <Dropzone
              openRef={openRef}
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
            >
              <Group
                position="center"
                spacing="xl"
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
                    Kéo và thả hoặc chọn ảnh của bạn vào đây
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    (Tối đa 5MB)
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Group position="center" mt="md">
              <Button onClick={() => openRef.current?.()}>Chọn Ảnh</Button>
            </Group>
          </div>

          <Button className="update-btn" variant="filled">
            Cập Nhật
          </Button>
        </form>
      </div>
    </>
  );
};

export default ProfileSection;
