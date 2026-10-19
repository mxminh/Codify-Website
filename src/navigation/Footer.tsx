import React from "react";
import { Link } from "react-router-dom";
import {
  BsInstagram,
  BsLinkedin,
  BsGithub,
  BsDiscord,
  BsSpotify,
} from "react-icons/bs";
import { footerLinks, lowercaseFooterLinks } from "../data/navBarLinks";

export default function Footer() {
  return (
    <div className="flex flex-grow   sm:flex-row bg-footer-light-gray justify-between p-4 sm:px-10">
      {/**Codify Berkeley Logo and Icon Links */}
      <div className="flex flex-col">
        <div className="text-left">
          <h2 className="text-black text-xl">Codify Berkeley</h2>
          <p className="text-black text-small">
            @2026 UC Berkeley Student Organization
          </p>
        </div>
        {/**Link Icons */}
        <div className="flex flex-row place-content-evenly">
          <a
            href="https://github.com/Codify-Club-Berkeley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <BsGithub size="20"></BsGithub>
          </a>
          <a
            href="https://www.instagram.com/codifyberkeley/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <BsInstagram size="20"></BsInstagram>
          </a>
          <a
            href="https://www.linkedin.com/company/codify-berkeley/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <BsLinkedin size="20"></BsLinkedin>
          </a>
          <a
            href="https://discord.gg/mBEnPjDSQG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <BsDiscord size="20"></BsDiscord>
          </a>
          <a
            href="https://open.spotify.com/playlist/3DVxp7bz1heKBx6S2hEmAY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <BsSpotify size="20"></BsSpotify>
          </a>
        </div>
      </div>

      {/**Footer Links */}
      <div className="flex flex-wrap space-x-3 place-content-around py-5 sm:py-0">
        {footerLinks.map((link, index) => {
          // link.replace(/\s/g, "") removes all whitespace for the routing to work
          return (
            <Link
              to={"/" + lowercaseFooterLinks[index]}
              className="no-underline hover:underline text-black hover:text-link-blue"
            >
              <h4 className="text-base font-small">{link}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
