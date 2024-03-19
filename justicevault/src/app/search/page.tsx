import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Search() {
    return (
      <>
        <div className="root">
        <NavBar btnval='Log Out'/>
        <form>
        <div className="search">
         
            <input type="text" className="inner-shadow caseno" placeholder="Enter Case no" />
             <input type="date" className="date" placeholder="Enter Year"/>
            
             
       </div>
       </form>
       <Footer/>
      </div>
      </>
    );
  }