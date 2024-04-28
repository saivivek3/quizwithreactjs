function Layout({ children, maxWidth = "max-w-lg", padding = "p-11" }: any) {
  return (
    <div
      className={
        "shadow-2xl rounded-2xl  bg-[#343964] container " +
        ` max-w-sm  p-2 px-5  sm:pd-3s  md:p-5  lg: ${padding}  sm:max-w-lg md:max-w-2xl lg:${maxWidth}`
      }
    >
      {children}
    </div>
  );
}

export default Layout;
