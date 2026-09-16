import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import React from "react";

function Hero() {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", {
      type: "chars,words",
    });
    const paraSplit = new SplitText(".subtitle", {
      type: "lines",
    });
    gsap.fromTo(
      heroSplit.chars,
      {
        opacity: 0,
        yPercent: 50,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1.8,
        stagger: 0.06,
        ease: "expo.out",
      },
      gsap.from(paraSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      }),
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">Mojito</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>cool.crisp.classic</p>
              <p className="subtitle">sip the Spirit of summer</p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses
                <a href="#cocktails">View cocktails</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
