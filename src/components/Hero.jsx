import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

function Hero() {
  const vidRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 }); //react responsive
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

    const startVal = isMobile ? "top 50%" : "center 60%";
    const endVal = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startVal,
        end: endVal,
        scrub: true,
        pin: true,
      },
    });

    vidRef.current.onloadedmetadata = () => {
      tl.to(vidRef.current, {
        currentTime: vidRef.current.duration,
      });
    };
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
      <div className="video absolute inset-0">
        <video
          ref={vidRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
}

export default Hero;
