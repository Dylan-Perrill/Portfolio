export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{padding:0}}>
        © {new Date().getFullYear()} Your Name · <a href="https://github.com/yourusername">GitHub</a> · <a href="https://www.linkedin.com/in/yourusername/">LinkedIn</a>
      </div>
    </footer>
  );
}
