import GoogleIcon from "@mui/icons-material/Google";

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
    >
      <GoogleIcon className="text-red-500" />
      <span>Sign up via Google</span>
    </button>
  );
}
