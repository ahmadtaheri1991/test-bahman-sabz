export default function Login() {
  return (
    <div className="bg-[#F9F9FC] min-h-screen">
      <div className="flex flex-col justify-center max-w-[448px] mx-auto py-8">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          Sign in to Socket
        </h1>

        <div
          className={[
            "p-6 bg-white rounded-md",
            "flex flex-col gap-8",
            "shadow-[0px_1px_2px_0px_color-mix(in_srgb,#111128_10%,transparent)]",
          ].join(" ")}
        >
          <form>
            <div className="flex flex-col gap-4">
              <input
                placeholder="Enter your username"
                className={[
                  "h-10 w-full px-3",
                  "rounded-md border border-[#e4e4ee]",
                  "focus:border-2 focus:outline-none focus:border-[#6B46C1]",
                ].join(" ")}
              />

              <input
                placeholder="Enter your password"
                className={[
                  "h-10 w-full px-3",
                  "rounded-md border border-[#e4e4ee]",
                  "focus:border-2 focus:outline-none focus:border-[#6B46C1]",
                ].join(" ")}
              />

              <button
                type="submit"
                className="rounded-md cursor-pointer bg-[#6B46C1] text-white h-10 font-semibold"
              >
                Continue with email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
