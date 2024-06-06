import { IoChatboxEllipses } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="flex flex-col justify-center items-center bg-secondary-foreground h-[100vh] w-[100px] p-4 gap-8">
      <div>
        <Link to="/">
          <IoChatboxEllipses className="text-3xl text-primary hover:text-primary transition-all" />
        </Link>
      </div>
      <div>
        <Link to="/">
          <IoMdNotifications className="text-3xl text-secondary hover:text-primary transition-all" />
        </Link>
      </div>
      <div>
        <Link to="/">
          <FaUserCircle className="text-3xl text-secondary hover:text-primary transition-all" />
        </Link>
      </div>
    </div>
  );
}
