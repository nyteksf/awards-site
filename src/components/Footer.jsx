import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky } from "@fortawesome/free-brands-svg-icons";
import { FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

const links = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
  {
    href: "https://bsky.app/",
    icon: (
      <FontAwesomeIcon className="align-middle mt-[-11px]" icon={faBluesky} />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-[#333333]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm text-[#333333] md:text-left">
          &copy;Nova 2024. All rights reserved.
        </p>

        <div className="flex justify-center gap-4 md:justify-left">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#333333] transition-colors duration-500 ease-in-out hover:text-[#F5F5F5]"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm text-[#333333] cursor-not-allowed hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
