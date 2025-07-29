import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#daf1de]  py-8 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">253 CSUiter</h2>
          <p className="text-sm">Empowering smarter risk decisions.</p>
          <p className="text-sm">Finalists - VPBank Hackathon 2025</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#solutions" className="hover:underline">
                Solutions
              </a>
            </li>
            <li>
              <a href="#userGuide" className="hover:underline">
                User Guide
              </a>
            </li>
            <li>
              <a href="#aboutUs" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Contact</h3>
          <p className="text-sm">Email: 253csuiter.team@gmail.com</p>
          <p className="text-sm">
            University of Information Technology, VNU-HCM
          </p>
        </div>
      </div>

      <div className="border-t border-[#00b552] mt-6 pt-4 text-center text-xs text-gray-700">
        © 2025 253 CSUiter. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
