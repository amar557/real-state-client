import { Link } from "react-router-dom";

function SecondaryHeading({ children, category }) {
  return (
    <Link
      to={`search?${category}`}
      className="text-sm text-blue-800 mb-2 first-letter:uppercase hover:underline "
    >
      {children}
    </Link>
  );
}

export default SecondaryHeading;
