import CardList from "@/components/CardList";
import EditUser from "@/components/EditUser";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { Sheet,  SheetTrigger } from "@/components/ui/sheet";


const SingalUserPage = () => {
    return (<div>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Ambadas</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-4 flex flex-col xl:flex-row gap-8">
            {/* Left */}
            <div className="w-full xl:w-1/3 space-y-6">
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h1>
                            User Info
                        </h1>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>
                                    Edit Button
                                </Button>
                            </SheetTrigger>
                            <EditUser />
                        </Sheet>

                    </div>
                    <div className=" space-y-4 mt-4">
                        <div className=" flex items-center gap-2">
                            <span className="font-bold">User Name</span>
                            <span>Ambadas</span>
                        </div>
                        <div className=" flex items-center gap-2">
                            <span className="font-bold">Email</span>
                            <span>ambadasjoshi34@gmail.com</span>
                        </div>

                    </div>
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <CardList title="Resent Questions" />
                </div>
            </div>
        </div>
    </div>

    );
};

export default SingalUserPage;