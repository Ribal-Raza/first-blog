import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container } from "../index";
import LogoutBtn from "../buttons/LogoutBtn";
const Header = () => {
  const authStatus = useSelector((state) => state.status);

  const menuItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow">
      <Container>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span className="font-bold text-2xl">FirstBlog</span>
          </div>
          <div className="items-center lg:flex">
            <ul className="ml-12 inline-flex items-center space-x-8">
              {menuItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="inline-flex items-center text-[1.1rem] font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          {authStatus ? (
            <div className="hidden space-x-2 lg:block">
              <LogoutBtn />
            </div>
          ) : (
            <div className="hidden space-x-2 lg:block">
              <Button
                type="button"
                className=" hover:bg-black/10 hover:text-black/40"
              >
                Sign up
              </Button>
              <Button
                type="button"
                className=" hover:bg-black hover:text-white border border-black"
              >
                Login
              </Button>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
