import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>XP: {user.xp}</p>
      <p>Badges: {user.badges?.length || 0}</p>
      <p>Completed Actions: {user.completedActions?.length || 0}</p>
    </div>
  );
};

export default UserProfile;
