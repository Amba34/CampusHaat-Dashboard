import { Button } from "@/components/ui/button";
import Link from "next/link";

const UsersPage = () => {
    return (
        <div>
            <h1>Users Page</h1>
            <p>Welcome to the users page!</p>
            <Button variant="secondary" className="mt-4"  >
                <Link href="/users/ambadas">View User</Link>
            </Button>
        </div>
    );
};

export default UsersPage;