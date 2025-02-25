import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UserDataRow = ({ userData, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, role, status } = userData || {};
  const axiosSecure = useAxiosSecure();

  // handle user role update
  const updateRole = async (selected) => {
    if (role === selected) return;

    try {
      await axiosSecure.patch(`/user/role/${email}`, {
        role: selected,
      });
      toast.success("Role updated successfully!");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <motion.tr
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    viewport={{ once: true }} // Animate only once when it enters the viewport
  >
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status ? (
          <p
            className={`whitespace-no-wrap ${
              status === "Requested"
                ? "text-yellow-500"
                : status === "Verified"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {status || "Unavailable"}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role={role}
          updateRole={updateRole}
        />
      </td>
    </motion.tr>
  );
};

UserDataRow.propTypes = {
  userData: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
