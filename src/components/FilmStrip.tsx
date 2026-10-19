import React, { useEffect, useRef } from "react";
import "./FilmStrip.css";

const FilmStrip = ({ images }) => {
  // Adjusts the scroll duration based on the width of the film strip group
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const pixelsPerSecond = 40;

    const updateDuration = () => {
      const groupWidth = group.getBoundingClientRect().width;
      if (groupWidth > 0) {
        track.style.setProperty("--scroll-duration", `${groupWidth / pixelsPerSecond}s`);
      }
    };

    const observer = new ResizeObserver(updateDuration);
    observer.observe(group, { box: "border-box" });
    updateDuration();

    const strip = track.parentElement;
    let pointer: { x: number; y: number } | null = null;
    let frameId: number | null = null;
    let activePhoto: Element | null = null;

    const clearHover = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      activePhoto?.classList.remove("is-hovered");
      activePhoto = null;
    };

    const updateHover = () => {
      frameId = null;
      if (!pointer) return;
      // Ask the browser which photo is here, even if the mouse hasn't moved
      const hit = document.elementFromPoint(pointer.x, pointer.y);
      if (!hit || !strip.contains(hit)) {
        clearHover();
        return;
      }
      const photo = hit?.closest(".film-strip-frame") ?? null;
      const nextPhoto = track.contains(photo) ? photo : null;
      if (nextPhoto !== activePhoto) {
        activePhoto?.classList.remove("is-hovered");
        nextPhoto?.classList.add("is-hovered");
        activePhoto = nextPhoto;
      }
      frameId = requestAnimationFrame(updateHover);
    };

    const trackPointer = (event: PointerEvent) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frameId === null) updateHover();
    };

    const checkAfterScroll = () => {
      if (pointer && frameId === null) updateHover();
    };

    const forgetPointer = () => {
      pointer = null;
      clearHover();
    };

    // Remember the pointer before the strip scrolls into view underneath it.
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("scroll", checkAfterScroll, { passive: true, capture: true });
    document.addEventListener("pointerleave", forgetPointer);
    window.addEventListener("blur", forgetPointer);

    return () => {
      observer.disconnect();
      clearHover();
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("scroll", checkAfterScroll, true);
      document.removeEventListener("pointerleave", forgetPointer);
      window.removeEventListener("blur", forgetPointer);
    };
  }, []);

  return (
    <div className="film-strip">
      <div ref={trackRef} className="film-strip-track">
        <div ref={groupRef} className="film-strip-group">
          {images.map((image, index) => (
            <div key={index} className="film-strip-frame">
              <div className="film-strip-surface">
                <img
                  src={image}
                  alt={`Film Strip ${index + 1}`}
                  className="film-strip-photo"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="film-strip-group" aria-hidden="true">
          {images.map((image, index) => (
            <div key={index} className="film-strip-frame">
              <div className="film-strip-surface">
                <img
                  src={image}
                  alt=""
                  className="film-strip-photo"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
