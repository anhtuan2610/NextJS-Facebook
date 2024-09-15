import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 bg-[#F0F2F5] px-4 flex flex-col xl:flex-row items-center justify-center xl:px-72">
        <div className="text-center xl:text-left xl:w-1/2 mb-8 xl:mb-0">
          <h1 className="text-[3.5rem] text-[#1877F2] font-bold mb-2">
            facebook
          </h1>
          <div className="text-xl mb-4 xl:text-3xl">
            <div>Connect with friends and the world</div>
            <div>around you on Facebook.</div>
          </div>
        </div>
        <LoginForm/>
      </div>
      <div className="text-center p-4">Footer</div>
    </div>
  );
}
