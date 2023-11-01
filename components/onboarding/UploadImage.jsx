"use client";

import { UploadButton } from "@uploadthing/react";
import { motion as m } from "framer-motion";

// This component is used to upload the image for the onboarding process, it uses the UploadThing library
export default function UploadImage({
  image,
  images,
  setImages,
  loading,
  setLoading,
  setError,
}) {
  return (
    <div className="flex justify-center mt-[48px] mb-[24px]">
      <div
        style={{
          backgroundImage: `url("${images[0]?.fileUrl || image}")`,
        }}
        className="relative w-[151px] aspect-square bg-cover bg-no-repeat bg-center bg-light-purple rounded-full"
      >
        {!loading && (
          <>
            {image === "" && images.length === 0 ? (
              <div className="text-center absolute inset-0 flex items-center justify-center flex-col gap-[8px]">
                <img
                  src="/image-icon.png"
                  alt="upload-image"
                  width={32.5}
                  height={27.5}
                />
                <p className="text-primary-purple font-semibold uppercase text-[14px] tracking-[0.8px]">
                  +Upload Image
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center flex-col gap-[8px]">
                <img
                  src="/image-icon.png"
                  alt="upload-image"
                  width={32.5}
                  height={27.5}
                />
                <p className="text-white font-semibold uppercase text-[14px] tracking-[0.8px]">
                  Change Image
                </p>
              </div>
            )}
          </>
        )}
        {loading && (
          <m.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              mass: 0.3,
            }}
          >
            <img
              src={"/loading-icon.png"}
              alt="loading-icon"
              width={40}
              height={40}
            />
          </m.div>
        )}
        <UploadButton
          appearance={{
            button: {
              opacity: 0,
              position: "absolute",
              inset: 0,
              backgroundColor: "red",
              width: "100%",
              height: "100%",
            },
            allowedContent: {
              opacity: 0,
            },
          }}
          endpoint="media"
          onUploadProgress={() => {
            setLoading(true);
            setError({ message: "", isActive: false });
          }}
          onClientUploadComplete={(res) => {
            setLoading(false);
            if (res) {
              setImages(res);
            }
          }}
          onUploadError={(error) => {
            // Do something with the error.
            setLoading(false);
            setError({
              message: "Image can't be larger than 4 MB",
              isActive: true,
            });
          }}
        />
      </div>
    </div>
  );
}
