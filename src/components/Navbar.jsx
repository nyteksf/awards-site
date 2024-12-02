import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";

const navItems = [
  { name: "Nexus", to: "features" },
  { name: "Vault", to: "#", isDisabled: true },
  { name: "Prologue", to: "story" },
  { name: "About", to: "about" },
  { name: "Contact", to: "contact" },
];

const Navbar = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();

    if (typeof targetId === "object") return;

    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorPulsing, setIsIndicatorPulsing] = useState(false);
  const [isIndicatorAnimating, setIsIndicatorAnimating] = useState(false);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);

    setIsIndicatorAnimating((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
      setIsIndicatorAnimating(true);
    } else {
      audioElementRef.current.pause();
      setIsIndicatorAnimating(false);
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (!isAudioPlaying) {
      const pulseInterval = setInterval(() => {
        // ACTIVATE PULSE ANIMATION
        setIsIndicatorPulsing(true);

        // DEACTIVATE ANIMATION AFTER 0.9s:
        setTimeout(() => {
          if (isAudioPlaying) {
            setIsIndicatorPulsing(true);
          }
          setIsIndicatorPulsing(false);
        }, 900); // 0.9 SECONDS OF PULSE DURATION
      }, 2500); // WAIT 2.5s BETWEEN ANIMATIONS

      return () => clearInterval(pulseInterval); // TAKE OUT GARBAGE
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="Logo" className="w-10" />
            <Button
              title="Products"
              id="product-button"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden items-center justify-center gap-1 md:flex"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  className={clsx("nav-hover-btn", {
                    "!cursor-not-allowed": item.isDisabled,
                  })}
                  href={item.isDisabled ? "#" : `#${item.to}`}
                  onClick={(e) => handleScrollTo(e, item.to)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("hover:scale-150 indicator-line", {
                    active: isIndicatorAnimating,
                    pulsing: isIndicatorPulsing,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
