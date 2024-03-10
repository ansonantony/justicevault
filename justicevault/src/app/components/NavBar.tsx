import Button from 'react-bootstrap/Button';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const astyle ={
    textDecoration: 'none',
    color:'black'
}
  return (
    <nav>
            <div>
            <h2 className='logo'>JusticeVault</h2>
            <a style={astyle} href="/"><p>Home</p></a>
            <a style={astyle} href="/"><p>Features</p></a>
           </div>
            <div>
            <a style={astyle} href="/"><p>App</p></a>
            <a style={astyle} href="/">  <p>English</p></a>
                {/* <button>Sign In</button> */}
                <Button variant='outline-dark'>Sign in</Button>
            </div>
        </nav>
    
  )
}
