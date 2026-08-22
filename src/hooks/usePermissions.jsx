import { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";


export default function usePermissions() {
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/admin/roles");
      const allRoles = res.data?.data || [];

      const admin = JSON.parse(localStorage.getItem("admin"));
      const roleName = admin?.role;  

      const userRole = allRoles.find(r => r.roleName === roleName);
      const rolePermissions = userRole?.permissions || {};

      localStorage.setItem("rolePermissions", JSON.stringify(rolePermissions));

      setPermissions(rolePermissions);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch permissions", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const roleName = admin?.role;

    if (!roleName) {
      console.warn("⚠️ No role found in admin object!");
       localStorage.clear();
      window.location.replace("/login");
      setLoading(false);
      return;
    }

    // const cached = localStorage.getItem("rolePermissions");

    // if (cached) {
    //   setPermissions(JSON.parse(cached));
    //   setLoading(false);
    // } else {
    //   fetchPermissions();
    // }
    const cached = localStorage.getItem("rolePermissions");
    const cachedRole = localStorage.getItem("roleName");

    if (cached && cachedRole === roleName) {
      setPermissions(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchPermissions();
    }
  }, []);

  const canAccess = (section, key) => {
    return permissions?.[section]?.[key] === true;
  };

  return { permissions, loading, canAccess };
}

