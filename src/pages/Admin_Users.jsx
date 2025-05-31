import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    name: "Zaeem",
    subscriptionStatus: "Active",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "InActive",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "Active",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "InActive",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "Active",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "InActive",
    city: "Lahore",
    contact: "1212121212",
  },
  {
    name: "Zaeem",
    subscriptionStatus: "Active",
    city: "Lahore",
    contact: "1212121212",
  },
];

const Admin_Users = () => {
  return (
    <div className="mx-[5%]">
      <h1 className="text-2xl sm:text-3xl md:text-[28px] lg:text-3xl font-bold text-black mt-4 mb-8">
        Users
      </h1>
      <Table className="min-w-[526px]">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-black">
        <TableRow>
          <TableHead className="w-[100px] text-gray-100 font-medium sm:text-[15px] lg:text-lg text-center">Name</TableHead>
          <TableHead className="text-gray-100 font-medium sm:text-[15px] lg:text-lg text-center"> Subscription Status</TableHead>
          <TableHead className="text-gray-100 font-medium sm:text-[15px] lg:text-lg text-center">City</TableHead>
          <TableHead className="text-gray-100 font-medium sm:text-[15px] lg:text-lg text-center">Contact</TableHead>
          {/* <TableHead className="text-right text-gray-100 font-medium text-lg">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.name}>
            <TableCell className="font-normal text-[15px] text-center">{user.name}</TableCell>
            <TableCell className={`ont-normal text-[15px] ${user.subscriptionStatus === 'Active' ? 'text-green-600' : 'text-red-600'} text-center font-medium`}>{user.subscriptionStatus}</TableCell>
            <TableCell className="font-normal text-[15px] text-center">{user.city}</TableCell>
            <TableCell className="font-normal text-[15px] text-center">{user.contact}</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default Admin_Users;
