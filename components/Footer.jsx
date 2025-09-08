export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{padding:0}}>
        © {new Date().getFullYear()} Dylan Perrill · <a href="https://github.com/Dylan-Perrill">GitHub</a> · <a href="https://www.linkedin.com/in/dylan-perrill-455789294/">LinkedIn</a>
      </div>
    </footer>
  );
}
