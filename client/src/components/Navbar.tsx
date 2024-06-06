import { Input } from "@/components/ui/input";
export default function Navbar() {
  return (
    <div className="flex gap-2 shadow-md">
      <div className="text-primary text-2xl font-bold">Chat App</div>
      <div>
        <Input placeholder="Search user" className="w-full" />
      </div>
    </div>
  );
}
