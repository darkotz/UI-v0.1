import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();
  const overlayRef = useRef();
  

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",     // ✅ поверх всего
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,          // ✅ гарантирует, что будет над всем
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
          padding: "24px",
          width: "90%",
          maxWidth: "480px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            color: "#555",
            background: "none",
            border: "none",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
