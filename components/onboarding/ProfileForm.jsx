"use client";

import { updateUser } from "../../lib/actions/user.actions";
import { useState } from "react";
import Input from "./Input";
import UploadImage from "./UploadImage";
import Button from "../shared/Button";
import { useStore } from "../../app/store";
import { useRouter } from "next/navigation";

export default function ProfileForm({ username, image, email, clerkId }) {
  const theme = useStore((state) => state.theme);
  const [form, setForm] = useState({
    username: username || "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    isActive: false,
  });

  const router = useRouter();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    submitUserToDB();
    router.push("/onboarding/genres");
  }

  async function submitUserToDB() {
    await updateUser({
      email: email,
      username: form.username,
      image: images[0]?.fileUrl || image,
      onboarded: true,
      clerkId: clerkId,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <UploadImage
        image={image}
        images={images}
        setImages={setImages}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
      <Input
        name="username"
        value={form.username}
        placeholder="Write your username here..."
        handleChange={handleChange}
        title="Username"
      />
      <hr
        className={`w-full border-t-[0.5px] my-[24px] ${
          theme === "light" ? "border-black/20" : "border-white/20"
        }`}
      />
      <Button
        type={"submit"}
        text={"next"}
        attributes="text-[16px] tracking-[0.96px] py-[13px] w-full"
      />
    </form>
  );
}
