import {
  BsFacebook,
  BsInstagram,
  BsGithub,
  FcGoogle,
  BsLinkedin,
} from "@utils/iconExport";
const Footer = () => {
  const sponsers = [
    { name: "Facebook", icon: <BsFacebook size={30} /> },
    { name: "LinkedIn", icon: <BsLinkedin size={30} /> },
    { name: "Instagram", icon: <BsInstagram size={30} /> },
    { name: "Github", icon: <BsGithub size={30} /> },
    { name: "Google", icon: <FcGoogle size={30} /> },
  ];
  return (
    <footer className="bg-black text-white">
      <section className="lg:w-[80%] mx-auto">
        <div className="flex flex-col justify-center p-4">
          <h2 className="text-center pb-4 font-bold">Sponsors</h2>
          <div className="flex justify-center gap-6">
            {sponsers.map((elem, ind) => (
              <div key={ind}>
                {elem.icon}
                <p>{elem.name}</p>
              </div>
            ))}
          </div>
          ;
        </div>
        <hr />
        <div className="py-4 gap-4 grid justify-items-center md:grid-cols-3">
          <div className="font-bold">Payment methods</div>
          <div className="font-bold">Contact us</div>
          <div className="font-bold">Follow us:</div>
        </div>
        <hr />
        <div className="font-bold p-2 flex justify-center text-lg">
          &copy; CopyRight act 3023
        </div>
      </section>
    </footer>
  );
};

export default Footer;
