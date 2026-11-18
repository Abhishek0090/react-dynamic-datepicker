import DemoLoader from "./demo-loader";
import { ThemeToggle } from "./theme";

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <div className="topbar">
          <h1>React Dynamic Datepicker</h1>
          <ThemeToggle />
        </div>
        <p>
          A React calendar and date picker with week, month and year views, event lists, a date input
          popover, themes and dark mode. Works with Next.js App Router.
        </p>
        <pre className="install">npm install react-dynamic-datepicker</pre>
        <nav className="links">
          <a href="https://www.npmjs.com/package/react-dynamic-datepicker">npm</a>
          <a href="https://github.com/Abhishek0090/react-dynamic-datepicker">GitHub</a>
          <a href="https://github.com/Abhishek0090/react-dynamic-datepicker#readme">Docs</a>
        </nav>
      </header>
      <DemoLoader />
    </main>
  );
}
