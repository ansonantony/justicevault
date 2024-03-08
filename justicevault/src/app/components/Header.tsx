
import NavBar from "./NavBar"

export default function Header() {
    return(
        <>
    <NavBar/>
    <div className="header">
        <h2>File storage and sharing for remote <br /> clients on <span className="web3">Web3</span></h2>
        <p>JusticeVault is a online digital vaulti on decentralized cloud IPFS that allows you storage, share,<br/> collect files privately .</p>
        <button type="submit">Get Started</button>
    </div>
    </>
    );
}