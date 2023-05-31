const Button = ({ children }) => {
  return (
    <button className="flex items-center rounded my-3 px-6 py-1 text-md text-teal-900 font-semibold mx-auto  bg-teal-200 hover:bg-teal-900">
      {children}
    </button>
  );
};

export default Button;
