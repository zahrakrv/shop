const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center rounded my-3 px-12 py-1 text-md text-teal-900 font-semibold mx-auto  bg-teal-500 hover:bg-teal-900 "
    >
      {children}
    </button>
  );
};

export default Button;
