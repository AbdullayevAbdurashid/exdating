import ReactDOM from "react-dom";

const Portal: React.FC = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default Portal;
