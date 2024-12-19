const Footer = () => {
  return (
    <footer className="bg-stone-50 text-blue-950 py-6 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center md:flex-row justify-between">
        {/* Left side: Brand name */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold ">DWash</h2>
        </div>

        {/* Right side: Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm ">
            © {new Date().getFullYear()} DWash. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
