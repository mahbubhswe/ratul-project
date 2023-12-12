"use client";
import React from "react";
import AppNavBar from "./components/navbar";
import Hero from "./components/hero";
import Footer from "./components/footer";
import AboutUs from "./components/aboutus";
import AfterNav from "./components/afterNav";

export default function Home() {
  return (
    <React.Fragment>
      <AppNavBar />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="what-we-offer">
          <AfterNav />
        </section>
        <section id="about-us">
          <AboutUs />
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
}
