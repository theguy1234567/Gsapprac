import React from "react";
import { cocktailLists, mockTailLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/all.js";

function Cocktails() {
  useGSAP(() => {
    const ParalaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    ParalaxTimeline.from("#c-left-leaf", {
      x: -100,
      y: 200,
    }).from("#c-right-leaf", {
      x: 100,
      y: 100,
    });
  });

  return (
    <section id="cocktails" className="noisy">
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
      />
      <div className="list">
        <div className="popular">
          <h2>Most popular cocktail</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me:28">
                  <h3>{name}</h3>
                  <p>{country}</p>
                </div>
                <span>{price}</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Most popular mocktails</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me:28">
                  <h3>{name}</h3>
                  <p>{country}</p>
                </div>
                <span>{price}</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Cocktails;
