"use client";
import React, { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";

function Menue() {
  const contentRef = useRef();
  const [currentIndex, setCurentIndex] = useState(0);
  const totalCocktails = sliderLists.length;
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurentIndex(newIndex);
  };
  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };
  useGSAP(() => {
    const paralaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    paralaxTimeline
      .from("#m-left-leaf", {
        x: -100,
        y: 200,
      })
      .from("#m-right-leaf", {
        x: 100,
        y: 100,
      });

    gsap.fromTo(
      "#title",
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        duration1: 1,
        x: 200,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -150,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".details h2",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        opacity: 100,
        yPercent: 0,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".details p",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        opacity: 100,
        yPercent: 0,
        ease: "power1.inOut",
      },
    );
  }, [currentIndex]);
  const currentCoctail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCoctail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menue-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 className="sr-only" id="menue-heading">
        Cocktail Menue
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? "text-white  border-white" : "text-white/50 border-white/50"}`}
              onClick={() => {
                goToSlide(index);
              }}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => {
              goToSlide(currentIndex - 1);
            }}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-right"
            onClick={() => {
              goToSlide(currentIndex + 1);
            }}
          >
            <span>{nextCoctail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCoctail.image} alt="" />
        </div>
      </div>
      <div className="recipe">
        <div ref={contentRef} className="info">
          <p id="title">{currentCoctail.name}</p>
        </div>
        <div className="details">
          <h2>{currentCoctail.title}</h2>
          <p>{currentCoctail.description}</p>
        </div>
      </div>
    </section>
  );
}

export default Menue;
