import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";
import useScrollToTop from "./../../hooks/useScrollToTop";
import useAgeCategory from "../../hooks/useAgeCategory";

export default function ProductAgeCategory() {
    // hooks
    useScrollToTop();
    const [auth, setAuth] = useAuth();
    const { ageCategories, loadAgeCategories } = useAgeCategory();

    // states
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/ageCategory", { name });
            if (data?.error) {
                toast.error(data.error);
            } else {
                loadAgeCategories();
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
            const { data } = await axios.put(`/ageCategory/${selected._id}`, {
                name: updatingName,
            });
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is updated`);
                setSelected(null);
                setUpdatingName("");
                loadAgeCategories();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Age category may already exist. Try again.");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`/ageCategory/${selected._id}`);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is deleted`);
                setSelected(null);
                loadAgeCategories();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Category may already exist. Try again.");
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Product Category Management"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={2} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Manage Product Age Category
                        </div>
                        <div>
                            <CategoryForm
                                value={name}
                                setValue={setName}
                                handleSubmit={handleSubmit}
                            />

                            <hr />

                            <div className="col">
                                {ageCategories?.map((c) => (
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
