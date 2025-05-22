"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

// Sample user data
const users = [
  {
    id: 1,
    initials: "ME",
    name: "Miles Esther",
    property: "Buckeye State Bank",
    email: "Miles@gmail.com",
    phone: "614-551-9393",
    permission: "Low",
    status: "Active",
  },
  {
    id: 2,
    initials: "NS",
    name: "Nguyen Shane",
    property: "Zangmeister Center",
    email: "tranthuy.nute@gmail.com",
    phone: "614-551-0433",
    permission: "Medium",
    status: "Active",
  },
  {
    id: 3,
    initials: "FJ",
    name: "Flores Juanita",
    property: "Zangmeister Center",
    email: "nvt.isst.nute@gmail.com",
    phone: "614-551-0433",
    permission: "High",
    status: "Active",
  },
  {
    id: 4,
    initials: "BM",
    name: "Black Marvin",
    property: "Team Fishel",
    email: "trungkiensptktnd@gmail.com",
    phone: "614-551-9778",
    permission: "Low",
    status: "Inactive",
  },
  {
    id: 5,
    initials: "NS",
    name: "Nguyen Shane",
    property: "Zangmeister Center",
    email: "thuhang.nute@gmail.com",
    phone: "614-551-9245",
    permission: "Medium",
    status: "Active",
  },
  {
    id: 6,
    initials: "BM",
    name: "Black Marvin",
    property: "Chillicothe Carpet",
    email: "binhan628@gmail.com",
    phone: "614-551-4567",
    permission: "Low",
    status: "Active",
  },
  {
    id: 7,
    initials: "FJ",
    name: "Flores Juanita",
    property: "Petland",
    email: "tranthuy.nute@gmail.com",
    phone: "614-551-4334",
    permission: "Custom",
    status: "Active",
  },
  {
    id: 8,
    initials: "NS",
    name: "Nguyen Shane",
    property: "Buckeye State Bank",
    email: "vuhaithuongnute@gmail.com",
    phone: "614-551-3245",
    permission: "Low",
    status: "Active",
  },
  {
    id: 9,
    initials: "AS",
    name: "Alex Shane",
    property: "Buckeye State Bank",
    email: "binhan628@gmail.com",
    phone: "614-551-4334",
    permission: "Medium",
    status: "Active",
  },
  {
    id: 10,
    initials: "CK",
    name: "Cooper Kristin",
    property: "Chillicothe Carpet",
    email: "wxhan628@gmail.com",
    phone: "614-551-4334",
    permission: "Low",
    status: "Active",
  },
  {
    id: 11,
    initials: "HA",
    name: "Henry Arthur",
    property: "Petland",
    email: "tranthuy.nute@gmail.com",
    phone: "614-551-4455",
    permission: "Custom",
    status: "Inactive",
  },
  {
    id: 12,
    initials: "CK",
    name: "Cooper Kristin",
    property: "Buckeye State Bank",
    email: "vuhaithuongnute@gmail.com",
    phone: "614-551-3245",
    permission: "High",
    status: "Active",
  },
]

export function UserTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(users.length / itemsPerPage)

  const getPermissionClass = (permission: string) => {
    switch (permission.toLowerCase()) {
      case "low":
        return "status-low"
      case "medium":
        return "status-medium"
      case "high":
        return "status-high"
      case "custom":
        return "status-custom"
      default:
        return "status-low"
    }
  }

  const getStatusClass = (status: string) => {
    return status.toLowerCase() === "active" ? "status-active" : "status-inactive"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  if (!mounted) return null

  return (
    <div className="theme-table-container">
      <table className="w-full theme-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Property</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Permission</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <motion.tbody variants={containerVariants} initial="hidden" animate="show">
          {currentItems.map((user, index) => (
            <motion.tr key={user.id} variants={itemVariants} custom={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="theme-initials">{user.initials}</div>
                  <span>{user.name}</span>
                </div>
              </td>
              <td>{user.property}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <span className={`status-badge ${getPermissionClass(user.permission)}`}>{user.permission}</span>
              </td>
              <td>
                <span className={`status-badge ${getStatusClass(user.status)}`}>{user.status}</span>
              </td>
              <td>
                <motion.button
                  className="p-1 rounded-full hover:bg-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="h-5 w-5" />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      <div className="theme-table-footer">
        <div className="theme-table-info">
          <span>Items per page: </span>
          <select
            className="theme-input ml-2 py-1"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="theme-pagination">
          <button
            className={`theme-pagination-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            className={`theme-pagination-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Calculate page numbers to show
            let pageNum = i + 1
            if (totalPages > 5) {
              if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
            }

            return (
              <button
                key={i}
                className={`theme-pagination-item ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            )
          })}

          <button
            className={`theme-pagination-item ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className={`theme-pagination-item ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>

        <div className="theme-table-info">
          {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, users.length)} of {users.length} items
        </div>
      </div>
    </div>
  )
}
