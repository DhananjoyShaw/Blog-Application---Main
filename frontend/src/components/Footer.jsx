const Footer = () => {

  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[200px] flex flex-col md:flex-row space-y-6 md:space-y-0 items-start md:items-center justify-between text-sm md:text-md py-8">
        <div className="flex flex-col font-serif text-white space-y-2">
          <p className="hover:underline cursor-pointer">Featured Blogs</p>
          <p className="hover:underline cursor-pointer">Most Viewed</p>
          <p className="hover:underline cursor-pointer">Readers Choice</p>
        </div>

        <div className="flex flex-col font-serif text-white space-y-2">
          <p className="hover:underline cursor-pointer">Forum</p>
          <p className="hover:underline cursor-pointer">Support</p>
          <p className="hover:underline cursor-pointer">Recent Posts</p>
        </div>

        <div className="flex flex-col font-serif text-white space-y-2">
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">About Us</p>
          <p className="hover:underline cursor-pointer">Terms & Conditions</p>
          <p className="hover:underline cursor-pointer">Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center font-serif text-white bg-black text-sm">
        All rights reserved @Blog Market 2023
      </p>
    </>
  )
}

export default Footer;
