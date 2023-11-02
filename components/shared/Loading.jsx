// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

// this component is used to show a loading spinner whenever the app is waiting for a response from the server

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-[100svh]">
      <div className={`animate-spin`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
        >
          <path
            d="M32.6936 17.5C33.9674 17.5 35.0156 16.4629 34.8482 15.2002C34.4975 12.5545 33.5447 10.0134 32.0507 7.77752C30.1278 4.89966 27.3947 2.65664 24.197 1.33211C20.9993 0.00757459 17.4806 -0.338984 14.0859 0.336258C10.6913 1.0115 7.57305 2.67821 5.12563 5.12563C2.67821 7.57305 1.0115 10.6913 0.336258 14.0859C-0.338984 17.4806 0.00757463 20.9993 1.33211 24.197C2.65664 27.3947 4.89966 30.1278 7.77752 32.0507C10.0134 33.5447 12.5545 34.4975 15.2002 34.8482C16.4629 35.0156 17.5 33.9674 17.5 32.6936V32.6936C17.5 31.4197 16.4593 30.408 15.2058 30.1813C13.4743 29.868 11.8169 29.2019 10.3403 28.2152C8.22104 26.7992 6.56926 24.7865 5.59387 22.4317C4.61848 20.0769 4.36327 17.4857 4.86052 14.9859C5.35777 12.486 6.58515 10.1897 8.38744 8.38744C10.1897 6.58515 12.486 5.35777 14.9859 4.86052C17.4857 4.36327 20.0769 4.61848 22.4317 5.59387C24.7865 6.56926 26.7992 8.22104 28.2152 10.3403C29.2019 11.8169 29.868 13.4743 30.1813 15.2058C30.408 16.4593 31.4197 17.5 32.6936 17.5V17.5Z"
            fill="url(#paint0_linear_298_1416)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_298_1416"
              x1="-5.6"
              y1="0.7"
              x2="35.7"
              y2="31.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7E43DF" />
              <stop offset="1" stopColor="#00D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
