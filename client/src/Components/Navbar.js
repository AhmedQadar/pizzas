import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#333',   // Set background color
    color: '#fff',             // Set text color
    padding: '15px',           // Add padding
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    margin: 0,                 // Remove default margin for h1
  };

  const navLinksStyle = {
    display: 'flex',
  };

  const linkStyle = {
    color: '#fff',             // Set link text color
    textDecoration: 'none',    // Remove underline from links
    marginRight: '20px',       // Add spacing between links
  };

  const linkHoverStyle = {
    textDecoration: 'underline', // Underline links on hover
  };

  return (
    <header style={navbarStyle}>
      <div className="logo" style={logoStyle}>
        <h1>The Pizza Society</h1>
      </div>
      <nav style={navLinksStyle}>
        <Link to="/" style={linkStyle} activeStyle={linkHoverStyle}>
          Home
        </Link>
        {/* Add more links as needed */}
      </nav>
    </header>
  );
}

export default Navbar;