import Button from 'react-bootstrap/Button';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <nav>
            <div>
            <h2 className='logo'>JusticeVault</h2>
            <p>Home</p>
            <p>Features</p>
           </div>
            <div>
                <p>App</p>
                <p>English</p>
                {/* <button>Sign In</button> */}
                <Button variant='outline-dark'>Sign in</Button>
            </div>
        </nav>
    
  )
}
