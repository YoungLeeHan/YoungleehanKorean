import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";
import useScrollToTop from "./../../hooks/useScrollToTop";

export default function BlogCategory() {
    // hooks
    const [auth, setAuth] = useAuth();
    useScrollToTop();

    // states
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/blog/category/list");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/blog/category", { name });
            if (data?.error) {
                toast.error(data.error);
            } else {
                loadCategories();
                setName("");
                toast.success(`"${data.name}" is created`);
            }
        } catch (err) {
            console.log(err);
            toast.error("Create category failed. Try again.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/blog/category/${selected._id}`, {
                name: updatingName,
            });
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is updated`);
                setSelected(null);
                setUpdatingName("");
                loadCategories();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Category may already exist. Try again.");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(
                `/blog/category/${selected._id}`
            );
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is deleted`);
                setSelected(null);
                loadCategories();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete. Try again.");
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Blog Category Management"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={5} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Manage Blog Category
                        </div>
                        <div>
                            <CategoryForm
                                value={name}
                                setValue={setName}
                                handleSubmit={handleSubmit}
                            />

                            <hr />

                            <div className="col">
                                {categories?.map((c) => (
                                    <button
                                        key={c._id}
                                        className="btn btn-outline-primary m-3"
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setSelected(c);
                                            setUpdatingName(c.name);
                                        }}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>

                            <Modal
                                open={isModalOpen}
                                onOk={() => setIsModalOpen(false)}
                                onCancel={() => setIsModalOpen(false)}
                                footer={null}
                            >
                                <CategoryForm
                                    value={updatingName}
                                    setValue={setUpdatingName}
                                    handleSubmit={handleUpdate}
                                    buttonText="Update"
                                    handleDelete={handleDelete}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
