'use client';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/Features";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
export default function Casedetails() {
  return (
    <>
      <div className="root">
      <NavBar btnval="Log Out"/>

      <div className="grid md:grid-cols-3 items-start gap-4 w-full max-w-5xl mx-auto">
       <Card/>
       <Card/>
       <Card/>
       </div>
       <Footer/>
      </div>
    </>
  );
}
