import { Button, Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import LibraryForm from "../../components/forms/LibraryForm";
import { useState } from "react";



const TABLE_HEAD = ["Book id", "Book title", "Person", "Status", "Date", "", ""];

export function LibraryScreen() {
    const [formActive, setFormActive] = useState(false);
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["library"],
        queryFn: async () => {
            return (await fetch("http://localhost:5050/library/view")).json()
        }

    })


    const handleDelete = (id) => {

        if (!confirm("do you want to delete ?")) return

        fetch(`http://localhost:5050/library/delete/:${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                refetch()
                toast.success("library  data deleted");
            }
            else toast.error("Error while deleting library data")
        })
    }


    if (isLoading) return <h1>Loading...</h1>

    return (
        <Card className="h-full w-full bg-transparent">
            <Typography className="h-20 px-3 py-5 text-lg font-semibold">Library details</Typography>
            <div className="w-full px-2">
                {
                    formActive && <LibraryForm refetch={refetch} />
                }
            </div>
            <div className="w-4/5 h-14  grid items-start justify-items-end">
                <Button className={`${formActive ? "bg-red-500" : "bg-black"} "rounded"`} onClick={() => setFormActive(pre => !pre)}>{formActive ? "cancel" : "New record"}</Button>
            </div>
            <table className="w-4/5 min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ _id, book_id, book_title, receipient_det, is_returned, createdAt }, index) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {book_id}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {book_title}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {receipient_det?.name}
                                    </Typography>
                                </td><td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {is_returned ? "returned" : "keeping"}
                                    </Typography>
                                </td><td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {new Date(createdAt).toLocaleDateString()}
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href={`/edit/screen/:library/:${_id}`}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Edit
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium text-red-500"
                                        onClick={() => handleDelete(_id)}
                                    >
                                        Delete
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}