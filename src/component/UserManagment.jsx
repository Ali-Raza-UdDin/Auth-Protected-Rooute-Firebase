import React, { useCallback, useEffect } from "react";
import { Table, Input, Button, message, Popconfirm } from "antd";
import { useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../App.css";
import { Truck, User } from "lucide-react";
import DriverModal from "./userModal";

function UserManagment() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Search } = Input;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
  }, [isModalOpen]);

  const getData = async () => {
    setLoading(true);
    try {
      const userRef = collection(db, "Users");
      const docSnap = await getDocs(userRef);
      const data = docSnap.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
        status: doc.data().status || "Active",
      }));
      setUsers(data);
      setFilteredData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    try {
      const userDoc = doc(db, "Users", key);
      await deleteDoc(userDoc);

      // Update local state to reflect the deletion
      const newData = users.filter((item) => item.key !== key);
      setUsers(newData);
      setFilteredData(newData);

      message.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting Truck:", error);
      message.error("Failed to delete the User.");
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active"; // Toggle the status
    const updatedUser = users.map(
      (t) => (t.key === id ? { ...t, status: newStatus } : t) // Update local state immediately
    );
    setUsers(updatedUser);

    try {
      const userDoc = doc(db, "Users", id);
      await updateDoc(userDoc, { status: newStatus }, { merge: true });
      message.success(`Users ${newStatus.toLowerCase()} successfully`);
    } catch (error) {
      console.error("Error updating User status:", error);
      message.error("Error updating User status");
    }
  };

  const columns = [
    {
      key: "0",
      title: "No.",
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#3b5998",
          color: "white",
          fontWeight: "bold",
          borderRadius: "0px",
        },
      }),
    },
    {
      key: "1",
      title: "USERNAME",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onHeaderCell: () => ({
        style: { backgroundColor: "#3b5998", color: "white" }, // Style for 'Age' header cell
      }),
    },
    {
      key: "2",
      title: "EMAIL",
      dataIndex: "email",
      onHeaderCell: () => ({
        style: { backgroundColor: "#3b5998", color: "white" }, // Style for 'Age' header cell
      }),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      key: "4",
      title: "Status",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#3b5998",
          color: "white",
          borderRadius: "0px",
        },
      }),

      filters: [
        { text: "Suspended", value: "Suspended" },
        { text: "Active", value: "Active" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <>
          <div className="inline-flex rounded-md shadow-sm mr-5" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-green-500 focus:text-white transition-colors duration-300 ${
                record.status === "Active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-900 hover:text-green-700 hover:bg-gray-100"
              }`}
              onClick={() => handleStatusChange(record.key, record.status)} // Change status on click
            >
              Activated
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-red-500 focus:text-white transition-colors duration-300 ${
                record.status === "Suspended"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-900 hover:text-red-700 hover:bg-gray-100"
              }`}
              onClick={() => handleStatusChange(record.key, record.status)} // Change status on click
            >
              Suspended
            </button>
          </div>
        </>
      ),
    },
    {
      key: "5",
      title: "Action",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#3b5998",
          borderRadius: "0px",
          color: "white",
          fontWeight: "bold",
        }, // Style for 'Name' header cell
      }),
      render: (_, record) => (
        <>
          <Popconfirm
            title="Are you sure to delete this User?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1  mt-2 gap-4">
        <div className="">
          <div className="w-full flex justify-end mt-2 gap-3  ">
            <Search
              className="w-1/2 sm:w-1/3"
              placeholder="Search by name & email"
              value={searchText}
              onChange={handleSearch}
              style={{ marginBottom: 20 }}
            />
            <Button className="mr-2 py-4 px-2 " onClick={openModal}>
              <User className="gap-2" />
              <span className="text-lg text-black"> Add User </span>{" "}
            </Button>
            <DriverModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>

      <Table
        className="bg-[#3b5998] my-table"
        loading={loading}
        rowKey={(record) => record.key}
        dataSource={filteredData}
        columns={columns}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          },
        }}
      />
    </div>
  );
}

export default UserManagment;
