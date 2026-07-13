import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavbarContext } from "../context";
import { CloseButton, MenuButton } from "./form";
import { DotButton, DotsNav, FullNavList, StyledNavbar } from "./Navbar.styled";
import { NavbarItem, Mascot } from "./ui";

const DOT_SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const Navbar = ({ children }) => {
  const activeDot = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  const scrollToPage = (pageId) => {
    setIsScrolling(true);
    document.getElementById(`${pageId}-page`)?.scrollIntoView();
    setCurrentPage(pageId);
    moveActiveDot(pageId);
    setNavBarVisible(false);
    window.setTimeout(() => setIsScrolling(false), 650);
  };

  const moveActiveDot = (pageId) => {
    const target = document.getElementById(`nav-${pageId}`);
    if (!target || !activeDot.current) return;

    const state = Flip.getState(activeDot.current);
    target.appendChild(activeDot.current);
    document.querySelectorAll(".navbar-item").forEach((el) => {
      el.classList.toggle("active", el.id === `nav-${pageId}`);
    });
    Flip.from(state, {
      duration: 0.5,
      absolute: true,
      ease: "elastic.out(1,0.8)",
    });
  };

  const handleFullNavClick = (pageId) => (e) => {
    e.preventDefault();
    if (pageId === "home" && e.target.closest("[data-mascot-action]")) {
      return;
    }
    scrollToPage(pageId);
  };

  useEffect(() => {
    if (currentPage && isScrolling === false) {
      moveActiveDot(currentPage);
    }
  }, [currentPage, isScrolling]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const shouldCollapse = currentScrollY > window.innerHeight * 0.58;

      setCollapsed(shouldCollapse);
      if (currentScrollY < 80 || navBarVisible) {
        setNavHidden(false);
      } else if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
        setNavHidden(scrollingDown);
      }

      lastScrollY.current = Math.max(currentScrollY, 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navBarVisible]);

  return (
    <>
      <MenuButton
        className={navBarVisible ? "" : "active"}
        onClick={() => setNavBarVisible(true)}
      >
        <AiOutlineMenu size="30" />
      </MenuButton>
      <StyledNavbar
        className={`${navBarVisible ? "active" : ""} ${
          navHidden ? "hidden" : ""
        } ${collapsed ? "collapsed" : ""}`}
      >
        <CloseButton onClick={() => setNavBarVisible(false)}>
          <AiOutlineClose size={30} />
        </CloseButton>
        <FullNavList>
          <li className="mobile-home-item">
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("home")}
              id="nav-mobile-home"
            >
              Home
            </NavbarItem>
          </li>
          <li>
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("about")}
              id="nav-about"
            >
              About
            </NavbarItem>
          </li>
          <li>
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("projects")}
              id="nav-projects"
            >
              Projects
            </NavbarItem>
          </li>
          <li>
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("home")}
              id="nav-home"
            >
              <span data-mascot-action>
                <Mascot />
              </span>
              <div className="dot" ref={activeDot} />
            </NavbarItem>
          </li>
          <li>
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("experience")}
              id="nav-experience"
            >
              Experience
            </NavbarItem>
          </li>
          <li>
            <NavbarItem
              className="navbar-item"
              onClick={handleFullNavClick("contact")}
              id="nav-contact"
            >
              Contact
            </NavbarItem>
          </li>
        </FullNavList>
        <DotsNav aria-label="Section navigation">
          {DOT_SECTIONS.slice(0, 2).map((section) => (
            <DotButton
              key={section.id}
              className={currentPage === section.id ? "active" : ""}
              data-label={section.label}
              onClick={() => scrollToPage(section.id)}
              type="button"
              aria-label={section.label}
            />
          ))}
          <div className="mascot-slot">
            <Mascot />
          </div>
          {DOT_SECTIONS.slice(2).map((section) => (
            <DotButton
              key={section.id}
              className={currentPage === section.id ? "active" : ""}
              data-label={section.label}
              onClick={() => scrollToPage(section.id)}
              type="button"
              aria-label={section.label}
            />
          ))}
        </DotsNav>
      </StyledNavbar>
      <NavbarContext.Provider value={setCurrentPage}>
        {children}
      </NavbarContext.Provider>
    </>
  );
};
